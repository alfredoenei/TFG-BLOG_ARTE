const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middlewares
app.use(cors()); // Permite que tu Frontend (Vite) se comunique con este Backend
app.use(express.json()); // Permite que tu servidor entienda los datos JSON que envíe el Frontend

// 2. Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('¡El servidor de mi Kanban está vivo! 🚀');
});

// 3. Conexión a la Base de Datos y Arranque del Servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('📦 Conectado a MongoDB con éxito');
    app.listen(PORT, () => {
      console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error.message);
  });