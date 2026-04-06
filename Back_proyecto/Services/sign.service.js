import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Inicia sesión: comprueba que el usuario exista y que la contraseña sea correcta.
export async function loginService(username, password) {
  const user = await userModel.findOne({ username }).select("+password");

  if (!user) {
    return { status: 404, message: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password.toString(), user.password);

  if (!isPasswordValid) {
    return { status: 401, message: "Invalid password" };
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  return {
    status: 200,
    message: { token, role: user.role },
  };
}

// Registra un nuevo usuario con rol "user" por defecto.
export async function registerService(name, email, username, password) {
  const existingUser = await userModel.findOne({ username });

  if (existingUser) {
    return { status: 409, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  await userModel.create({ name, email, username, password: hashedPassword, role: "user" });

  return { status: 201, message: "User created successfully" };
}

// Genera un código de verificación de 6 dígitos y lo guarda hasheado en la base de datos.
export async function generateCodeService(email) {
  const user = await userModel.findOne({ email });

  if (!user) {
    return { status: 404, message: "Email not found" };
  }

  const code = Math.floor(100000 + Math.random() * 900000); // siempre 6 dígitos
  const hashedCode = await bcrypt.hash(code.toString(), 10);

  await userModel.updateOne({ email }, { $set: { code: hashedCode } });

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // TODO: enviar el código al email mediante una API de correo
  console.log(`Código de recuperación para ${email}: ${code}`);

  return { status: 200, message: "Code sent successfully", resetToken };
}

// Comprueba que el código introducido coincida con el guardado en la base de datos.
export async function checkCodeService(checkCode, email) {
  const user = await userModel.findOne({ email }).select("+code");

  if (!user || !user.code) {
    return { status: 404, message: "Email not found or code not set" };
  }

  const isCodeValid = await bcrypt.compare(checkCode.toString(), user.code);

  if (!isCodeValid) {
    return { status: 401, message: "Invalid code" };
  }

  return { status: 200, message: "Code found" };
}

// Actualiza la contraseña del usuario con el nuevo valor hasheado.
export async function resetPasswordService(email, password) {
  const user = await userModel.findOne({ email });

  if (!user) {
    return { status: 404, message: "Email not found" };
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  await userModel.updateOne({ email }, { $set: { password: hashedPassword } });

  return { status: 200, message: "Password reset successfully" };
}
