import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: '',
        categoria: '',
        costo: '',
        codigoUnico: ''
    });

    // Cargar productos al iniciar la aplicación
    useEffect(() => {
        const cargarProductos = async () => {
            const response = await axios.get('/api/productos');
            setProductos(response.data);
        };
        cargarProductos();
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Añadir un nuevo producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/productos', formData);
        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
            cantidad: '',
            categoria: '',
            costo: '',
            codigoUnico: ''
        });
        const response = await axios.get('/api/productos');
        setProductos(response.data);
    };

    // Eliminar un producto
    const eliminarProducto = async (id) => {
        await axios.delete(`/api/productos/${id}`);
        const response = await axios.get('/api/productos');
        setProductos(response.data);
    };

    return (
        <div className="App">
            <h1>Gestión de Stock</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
                <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
                <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required />
                <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required />
                <input type="number" name="costo" placeholder="Costo" value={formData.costo} onChange={handleChange} required />
                <input type="text" name="codigoUnico" placeholder="Código Único" value={formData.codigoUnico} onChange={handleChange} required />
                <button type="submit">Añadir Producto</button>
            </form>
            <div>
                <h2>Lista de Productos</h2>
                {productos.map(producto => (
                    <div key={producto._id}>
                        <h4>{producto.nombre}</h4>
                        <p>Código: {producto.codigoUnico}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.cantidad}</p>
                        <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
