const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
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
  precioVenta: {
    type: Number,
    required: true
  }
});

const Venta = mongoose.model('Venta', ventaSchema);
module.exports = Venta;
