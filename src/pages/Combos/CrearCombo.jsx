import React from 'react'
import { useState, useEffect } from "react"
const CrearCombo = ({ reloadData, setReloadData }) => {

    const [mostrarModal, setMostrarModal] = useState(false);
    const [data, setData] = useState({

        nombreCombo: "",
        productosIds: [],
        cantidad1: "",
        cantidad2: "",
        cantidad3: ""

    })




    const handleAbrirModal = () => {
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setReloadData(prevState => !prevState);
    };

 
    const manejarEnvio = async (event) => {
        console.log('Datos a enviar:', data); // Agrega este console.log para imprimir los datos antes de enviar la solicitud
        if (event) {
            event.preventDefault();
    
            // Divide la cadena de texto en un array de strings
            const productosIds = data.productosIds[0].split(',');
    
            const url = 'http://localhost:8080/combos/guardar';
            const opcionesSolicitud = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Utiliza el array de strings resultante en lugar del original
                body: JSON.stringify({ ...data, productosIds }),
            };
    
            try {
                const response = await fetch(url, opcionesSolicitud);
    
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
    
                const datos = await response.json();
                console.log('Respuesta exitosa:', datos);
    
                // Llama a la función onVentaCreada pasada como prop
    
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
    
            setData({
                nombreCombo: "",
                productosIds: [],
                cantidad1: "",
                cantidad2: "",
                cantidad3: ""
            });
        }
    };
    
    
    return (
        <>
            <button onClick={handleAbrirModal} >Agregar</button>
            {mostrarModal && (

                <div className='overlay-producto'>
                    <div className='container-producto'>
                        <div className='encabezado-producto'>
                            <h2>Crear Combo</h2>
                        </div>
                        <div className='container-2'>
                            <div className='container3'>
                                <form onSubmit={(event) => { manejarEnvio(event); }}>
                                    <div className=' grid-container'>
                                        <label className="grid-item">
                                            Nombre Combo:
                                            <input
                                                type='text'
                                                name={`nombreCombo`}
                                                value={data.nombreCombo}
                                                onChange={(e) => setData({ ...data, nombreCombo: e.target.value })}
                                            />
                                        </label>

                                        <label className="grid-item">
                                            Productos
                                            <input
                                                type='text'
                                                name={`productosIds`}
                                                value={data.productosIds.join(';')}
                                                onChange={(e) => setData({ ...data, productosIds: e.target.value.split(';') })}
                                            />
                                        </label>


                                        <label className="grid-item">
                                            Cantidad del Producto 1
                                            <input
                                                type='number'
                                                name={`cantidad1`}
                                                value={data.cantidad1}
                                                onChange={(e) => setData({ ...data, cantidad1: e.target.value })}
                                            />
                                        </label>
                                        <label className="grid-item">
                                            Cantidad del Producto 2
                                            <input
                                                type='number'
                                                name={`cantidad2`}
                                                value={data.cantidad2}
                                                onChange={(e) => setData({ ...data, cantidad2: e.target.value })}
                                            />
                                        </label>
                                        <label className="grid-item">
                                            Cantidad del Producto 3
                                            <input
                                                type='number'
                                                name={`cantidad3`}
                                                value={data.cantidad3}
                                                onChange={(e) => setData({ ...data, cantidad3: e.target.value })}
                                            />
                                        </label>
                                    </div>
                                    {/* Campos para el detalle */}
                                </form>
                            </div>
                            <div className='boton-container-producto'>
                                <button
                                    className='boton'
                                    type="submit"
                                    onClick={async (event) => { await manejarEnvio(event); handleCerrarModal(); }}
                                >
                                    Guardar
                                </button>
                                <button className='boton' onClick={() => { handleCerrarModal(); }}>CERRAR</button>
                            </div>
                        </div>

                    </div>
                </div>

            )}

        </>
    )
}

export default CrearCombo
