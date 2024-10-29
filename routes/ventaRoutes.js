const express = require('express');
const router = express.Router();
const Venta = require('../models/venta');
const Producto = require('../models/producto');

// Registrar una venta
router.post('/', async (req, res) => {
  const { productoId, cantidad, precioVenta } = req.body;
  try {
    const producto = await Producto.findById(productoId);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    if (producto.cantidad < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    const nuevaVenta = new Venta({ productoId, cantidad, precioVenta });
    await nuevaVenta.save();

    producto.cantidad -= cantidad; // Actualizar stock
    await producto.save();

    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

// Informe de ventas en un rango de fechas
router.get('/informe', async (req, res) => {
    const { inicio, fin } = req.query;
    try {
      const ventas = await Venta.find({
        fecha: {
          $gte: new Date(inicio),
          $lte: new Date(fin)
        }
      });
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  