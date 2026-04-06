const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // El título es obligatorio
  }
}, { timestamps: true }); // timestamps crea automáticamente 'createdAt' y 'updatedAt'

module.exports = mongoose.model('Board', boardSchema);