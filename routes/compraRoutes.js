const express = require('express');
const router = express.Router();
const Compra = require('../models/compra');
const Producto = require('../models/producto');

// Registrar una compra
router.post('/', async (req, res) => {
  const { productoId, cantidad, precioCompra } = req.body;
  try {
    const producto = await Producto.findById(productoId);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const nuevaCompra = new Compra({ productoId, cantidad, precioCompra });
    await nuevaCompra.save();

    producto.cantidad += cantidad; // Actualizar stock
    await producto.save();

    res.status(201).json(nuevaCompra);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
