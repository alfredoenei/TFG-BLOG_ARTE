const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db'); // NUEVO: Importamos la lógica de conexión

// NUEVO: Ejecutamos la conexión a la Base de Datos
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de FutbolConnect funcionando correctamente ⚽');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});