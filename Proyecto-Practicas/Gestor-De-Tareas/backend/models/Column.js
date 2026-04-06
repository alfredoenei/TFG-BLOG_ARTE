const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  boardId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Board', // Esto conecta la columna con un Tablero específico
    required: true 
  },
  order: { 
    type: Number, 
    default: 0 // Esto nos servirá más adelante para ordenar las columnas
  }
}, { timestamps: true });

module.exports = mongoose.model('Column', columnSchema);