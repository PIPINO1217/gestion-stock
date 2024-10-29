document.addEventListener("DOMContentLoaded", async () => {
    const productosDiv = document.getElementById('productos');
    const productoForm = document.getElementById('productoForm');

    // Función para cargar los productos
    const cargarProductos = async () => {
        productosDiv.innerHTML = ''; // Limpiar el div antes de cargar productos
        try {
            const response = await fetch('/api/productos');
            const productos = await response.json();

            productos.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.innerHTML = `
                    <h4>${producto.nombre}</h4>
                    <p>Código: ${producto.codigoUnico}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Stock: ${producto.cantidad}</p>
                    <button onclick="eliminarProducto('${producto._id}')">Eliminar</button>
                    <button onclick="editarProducto('${producto._id}', '${producto.nombre}', '${producto.descripcion}', '${producto.precio}', '${producto.cantidad}', '${producto.categoria}', '${producto.costo}', '${producto.codigoUnico}')">Editar</button>
                `;
                productosDiv.appendChild(productoElement);
            });
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    // Cargar los productos al cargar la página
    await cargarProductos();

    // Función para añadir un nuevo producto
    productoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const cantidad = document.getElementById('cantidad').value;
        const categoria = document.getElementById('categoria').value;
        const costo = document.getElementById('costo').value;
        const codigoUnico = document.getElementById('codigoUnico').value;

        try {
            await fetch('/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, descripcion, precio, cantidad, categoria, costo, codigoUnico }),
            });

            // Recargar la lista de productos
            await cargarProductos();
            productoForm.reset();
        } catch (error) {
            console.error("Error al añadir producto:", error);
        }
    });
});

// Función para eliminar un producto
const eliminarProducto = async (id) => {
    try {
        await fetch(`/api/productos/${id}`, {
            method: 'DELETE',
        });
        location.reload(); // Recargar la página
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};

// Función para editar un producto
const editarProducto = (id, nombre, descripcion, precio, cantidad, categoria, costo, codigoUnico) => {
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('precio').value = precio;
    document.getElementById('cantidad').value = cantidad;
    document.getElementById('categoria').value = categoria;
    document.getElementById('costo').value = costo;
    document.getElementById('codigoUnico').value = codigoUnico;

    const productoForm = document.getElementById('productoForm');
    productoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            await fetch(`/api/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio: document.getElementById('precio').value,
                    cantidad: document.getElementById('cantidad').value,
                    categoria: document.getElementById('categoria').value,
                    costo: document.getElementById('costo').value,
                    codigoUnico: document.getElementById('codigoUnico').value,
                }),
            });

            location.reload(); // Recargar la página
        } catch (error) {
            console.error("Error al editar producto:", error);
        }
    });
};

// Función para registrar una compra
const registrarCompra = async (codigo, cantidad) => {
    try {
        const response = await fetch(`/api/productos`, { method: 'GET' });
        const productos = await response.json();
        const producto = productos.find(prod => prod.codigoUnico === codigo);

        if (producto) {
            producto.cantidad += cantidad;
            await fetch(`/api/productos/${producto._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            });
            alert('Compra registrada con éxito');
        } else {
            alert('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al registrar compra:', error);
    }
};

// Función para registrar una venta
const registrarVenta = async (codigo, cantidad) => {
    try {
        const response = await fetch(`/api/productos`, { method: 'GET' });
        const productos = await response.json();
        const producto = productos.find(prod => prod.codigoUnico === codigo);

        if (producto) {
            if (producto.cantidad >= cantidad) {
                producto.cantidad -= cantidad;
                await fetch(`/api/productos/${producto._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(producto),
                });
                alert('Venta registrada con éxito');
            } else {
                alert('Stock insuficiente');
            }
        } else {
            alert('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al registrar venta:', error);
    }
};

// Manejadores de eventos para formularios de compra y venta
document.getElementById('compraForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const codigo = document.getElementById('codigoCompra').value;
    const cantidad = parseInt(document.getElementById('cantidadCompra').value, 10);
    await registrarCompra(codigo, cantidad);
});

document.getElementById('ventaForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const codigo = document.getElementById('codigoVenta').value;
    const cantidad = parseInt(document.getElementById('cantidadVenta').value, 10);
    await registrarVenta(codigo, cantidad);
});

