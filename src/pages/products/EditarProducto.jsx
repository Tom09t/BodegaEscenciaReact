import React from 'react'
import { useState, useEffect } from 'react'
import './productos.css'

const EditarProducto = ({ productoId,edicionRealizada,setEdicionRealizada }) => {


    const [data, setData] = useState({
        nombreProducto: "",
        precio: 0,
        stock: 0,
        stockRegalo: 0
    });
    const [loading, setLoading] = useState(true);
    const [edicionProducto, setEdicionProducto] = useState({});

    const [mostrarModal, setMostrarModal] = useState(false);
    const handleAbrirModal = () => {
        cargarDatosProducto(productoId);
        setMostrarModal(true);
    };


    const handleCerrarModal = () => {
        setMostrarModal(false);

    };




    const cargarDatosProducto = (productoId) => {
        fetch(`http://localhost:8080/productos/${productoId}`)
            .then(response => response.json())
            .then(producto => {
                setData({
                    nombreProducto: producto.nombreProducto,
                    precio: producto.precio,
                    stock: producto.stock,
                    stockRegalo: producto.stockRegalo
                });
            })
            .catch(error => console.error('Error al cargar datos del producto:', error));
    };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const editarProducto = async (productoId) => {
        try {
            console.log('Datos a enviar:', data);
            const requestBody = {
                nombreProducto: data.nombreProducto,
                precio: data.precio,
                stock: data.stock,
                stockRegalo: data.stockRegalo
            };

            const response = await fetch(`http://localhost:8080/productos/a/${productoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Error en la llamada a la API: ${response.statusText}`);
            }

            setEdicionRealizada(prev => !prev);

        } catch (error) {
            console.error('Error en la llamada a la API:', error);
        }
    };


    return (
        <>
            <button onClick={handleAbrirModal}>Editar</button>
            {mostrarModal && (
                <div className='overlay-producto'>
                    <div className='container-producto'>
                        <div className='encabezado-producto'>
                            <h2>Editar Producto</h2>
                        </div>
                        <div className='container-2'>
                            <div className='container3'>
                                <form>
                                    <div className='grid-container'>
                                        <label className="grid-item">
                                            Nombre Producto:
                                            <input
                                                type='text'
                                                name='nombreProducto'
                                                value={data.nombreProducto}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <label className="grid-item">
                                            Precio
                                            <input
                                                type='number'
                                                name='precio'
                                                value={data.precio}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <label className="grid-item">
                                            Stock
                                            <input
                                                type='number'
                                                name='stock'
                                                value={data.stock}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <label className="grid-item">
                                            Stock Regalo
                                            <input
                                                type='number'
                                                name='stockRegalo'
                                                value={data.stockRegalo}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>
                                    <div className='boton-container-producto'>
                                        <button
                                            className='boton'
                                            onClick={() => {
                                                console.log("Guardando producto...");
                                                editarProducto(productoId);
                                                handleCerrarModal();
                                            }}
                                        >
                                            Guardar
                                        </button>
                                        <button className='boton' onClick={handleCerrarModal}>CERRAR</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditarProducto;
