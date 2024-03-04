import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./modalVenta.css"



const CrearVenta = ({ grupoId ,onVentaCreada, reloadData }) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    
    
    
    
    const [datos, setDatos] = useState({
        formaPago: 'CUENTA_CORRIENTE',
        grupoId: grupoId,
        tipoVenta: 'WINE',
        detalles: [
            {
                cantidad: 0,
                tipo: 'producto',
                productoId: 0,
            },
        ],
    });


    const handleAbrirModal = () => {
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
    };





    const manejarEnvio = async (event) => {
        console.log('Entró en manejarEnvio');
        if (event) {
            event.preventDefault();

            const url = 'http://localhost:8080/ventas/guardar';
            const opcionesSolicitud = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            };

            try {
                const response = await fetch(url, opcionesSolicitud);
            
                if (!response.ok) {
                  throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
            
                const data = await response.json();
                console.log('Respuesta exitosa:', data);
            
                // Llama a la función onVentaCreada pasada como prop
                onVentaCreada(data);
            
              } catch (error) {
                console.error('Error en la solicitud:', error);
              }
        }
    };



    const manejarCambios = (event) => {

        const { name, value } = event.target;
        setDatos({ ...datos, [name]: value });
    };


    const [cantidadDetalles, setCantidadDetalles] = useState(1);

    const manejarBorrarDetalle = () => {
        setCantidadDetalles((prevCantidad) => Math.max(prevCantidad - 1, 1));
    };

    const manejarCambiosDetalle = (event, indice) => {
        console.log('Valor del evento:', event.target.value);
        const { name, value } = event.target;
        setDatos((prevDatos) => ({
            ...prevDatos,
            detalles: prevDatos.detalles.map((detalle, i) => {
                if (i === indice) {
                    return { ...detalle, [name]: value };
                }
                return detalle;
            }),
        }));
    };



    const manejarAgregarDetalle = () => {
        setCantidadDetalles((prevCantidad) => prevCantidad + 1);
        setDatos((prevDatos) => {
            const nuevosDetalles = [
                ...prevDatos.detalles,
                { cantidad: "", productoId: "", tipo: 'producto' },
            ];

            return { ...prevDatos, detalles: nuevosDetalles };
        });
    };

    const camposDetalles = [];
    for (let i = 0; i < cantidadDetalles; i++) {
        camposDetalles.push(
            <div key={i}>
                <label>
                    Cantidad:
                    <input
                        type="number"
                        name={`cantidad`}
                        value={datos.detalles[i].cantidad}
                        onChange={(event) => manejarCambiosDetalle(event, i)}
                    />
                </label>
                <label>
                    Producto ID:
                    <input
                        type="number"
                        name={`productoId`}
                        value={datos.detalles[i].productoId}
                        onChange={(event) => manejarCambiosDetalle(event, i)}
                    />
                </label>
                <label>
                    Tipo de Detalle:
                    <select
                        name={`tipo`}
                        value={datos.detalles[i].tipo}
                        onChange={(event) => manejarCambiosDetalle(event, i)}
                    >
                        <option value="producto">Producto</option>
                        <option value="combo">Combo</option>
                    </select>
                </label>
            </div>
        );
    }







    return (

        <>

            <button onClick={handleAbrirModal} >+</button>

            {mostrarModal && (
                <div className='overlay'>
                    <div className='container'>
                        <div className='encabezado'>
                            <h2>AGREGAR VENTA al grupo  {grupoId}</h2>
                        </div>
                        <div className='container-2'>
                            <div className='container3'>
                           
                            <form  onSubmit={(event) => { manejarEnvio(event); }}>
                                <div className='formaPago'>
                                <label>
                                    Forma de Pago:
                                    <select
                                        name="formaPago"
                                        value={datos.formaPago}
                                        onChange={manejarCambios}
                                    >
                                        <option value="CUENTA_CORRIENTE">CUENTA_CORRIENTE</option>
                                        <option value="EFECTIVO">EFECTIVO</option>
                                        <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                                    </select>
                                </label>
                                <label>
                                    Tipo de Venta:
                                    <select
                                        name="tipoVenta"
                                        value={datos.tipoVenta}
                                        onChange={manejarCambios}
                                    >
                                        <option value="WINE">WINE</option>
                                        <option value="RESTAURANTE">RESTAURANTE</option>

                                    </select>
                                </label>
                                
                                 </div>
                                {/* Campos para el detalle */}
                                <div className='detalle'>
                                {camposDetalles}
                                </div>

                           
                            </form>
                           <div className='boton-container2' >
                            <button className="boton2" onClick={manejarAgregarDetalle}>
                                    Agregar otro detalle  </button>
                                <button className="boton2" onClick={manejarBorrarDetalle}>
                                    Borrar último detalle
                                </button>
                            </div>
                            </div>
                         
                        </div>
                        <div className='boton-container'>
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
            )}


        </>


    )

}

export default CrearVenta;