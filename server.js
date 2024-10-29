const express = require('express');
const mongoose = require('mongoose');
const productoRouter = require('./routes/producto'); // Asegúrate de que esta ruta sea correcta

const app = express();
app.use(express.json()); // Para poder recibir datos JSON

// Conexión a la base de datos MongoDB (cambia 'tu_base_de_datos' por el nombre de tu base de datos)
mongoose.connect('mongodb://localhost/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a la base de datos exitosa'))
.catch(err => console.error('Error al conectar a la base de datos', err));

// Usar las rutas de productos
app.use('/productos', productoRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gestion-stock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

const express = require('express');
const productosRoutes = require('./routes/productos');

const app = express();
app.use(express.json());

app.use('/api', productosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
