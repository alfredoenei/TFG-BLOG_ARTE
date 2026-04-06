import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, select: false }, // oculto por defecto en queries
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  code: { type: String, select: false }, // código de recuperación, oculto por defecto
  favorites: [{ type: Schema.Types.ObjectId, ref: "Obra" }],
});

export default model("User", userSchema);

