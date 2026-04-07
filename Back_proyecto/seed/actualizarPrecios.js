import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Obra from '../models/obrasModel.js';

dotenv.config();

async function actualizarPrecios() {
  try {
    console.log('🔗 Conectando a la base de datos...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conexión exitosa.');

    // Buscamos todas las obras que no tengan precio o tengan precio 0
    const obras = await Obra.find({ 
      $or: [
        { precio: 0 },
        { precio: { $exists: false } }
      ]
    });

    console.log(`🖼️ Se han encontrado ${obras.length} obras para actualizar.`);

    if (obras.length === 0) {
      console.log('✨ Todas las obras ya tienen un precio asignado.');
      process.exit();
    }

    const promesas = obras.map(obra => {
      // Generamos un precio aleatorio "realista" entre 150 y 3500 euros
      // Redondeamos a múltiplos de 10 para que quede más limpio (ej: 420€ en vez de 423€)
      const randomPrice = Math.floor(Math.random() * (3500 - 150 + 1) + 150);
      const roundedPrice = Math.round(randomPrice / 10) * 10;

      return Obra.findByIdAndUpdate(obra._id, { precio: roundedPrice });
    });

    await Promise.all(promesas);

    console.log('✔ ¡Precios actualizados correctamente!');
    process.exit();
  } catch (error) {
    console.error('❌ Error actualizando precios:', error);
    process.exit(1);
  }
}

// Ejecutar
actualizarPrecios();
