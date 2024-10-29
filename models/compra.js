const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  precioCompra: {
    type: Number,
    required: true
  }
});

const Compra = mongoose.model('Compra', compraSchema);
module.exports = Compra;
