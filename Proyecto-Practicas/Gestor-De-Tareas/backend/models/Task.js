const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  columnId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Column', // Conecta la tarea con su columna
    required: true 
  },
  order: { 
    type: Number, 
    default: 0 // Fundamental para el Drag & Drop
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);