const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Base de Datos conectada con éxito');
    } catch (error) {
        console.error('❌ Error al conectar a la Base de Datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;