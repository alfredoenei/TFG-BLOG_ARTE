import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import obrasRoutes from "./routes/obrasRoutes.js";
import signRoutes from "./routes/sign.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  "http://localhost:4200",
  "https://tfg-blog-arte.netlify.app", // URL real de Netlify
  /\.netlify\.app$/ // Permitir cualquier subdominio de Netlify (opcional)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS (Backend TFG)'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rutas de la API
app.use("/api/obras", obrasRoutes);
app.use("/api/auth", signRoutes);
app.use("/api", favoritesRoutes);
app.use("/api/auth/blog", blogRoutes);

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔥 Conectado a MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));
