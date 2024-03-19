import React, { useState, useEffect } from 'react';

const CrearProducto = ({reloadData, setReloadData}) => {
 
    const [mostrarModal, setMostrarModal] = useState(false);
    const [data, setData] = useState({
     
        nombreProducto:'',
        precio:'',
        stock:'',
        stockRegalo:''
    })




    const handleAbrirModal = () => {
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setReloadData(prevState => !prevState);
    };

    const manejarEnvio = async (event) => {
        console.log('Entró en manejarEnvio');
        if (event) {
            event.preventDefault();

            const url = 'http://localhost:8080/productos/guardar';
            const opcionesSolicitud = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
                nombreProducto: '',
                precio: '',
                stock: '',
                stockRegalo: ''
              });
        }
    };



    return (
        <>
        <button onClick={handleAbrirModal} >Agregar</button>
        {mostrarModal &&(

<div className='overlay-producto'>
    <div className='container-producto'>
        <div className='encabezado-producto'>
            <h2>Crear Producto</h2>
        </div>
        <div className='container-2'>
            <div className='container3'>
                <form onSubmit={(event) => { manejarEnvio(event); }}>
                    <div className=' grid-container'>
                        <label className="grid-item">
                            Nombre Producto:
                            <input
                                type='text'
                                name={`nombreProducto`}
                                value={data.nombreProducto}
                                onChange={(e) => setData({ ...data, nombreProducto: e.target.value })}
                            />
                        </label>
                        <label className="grid-item">
                            Precio
                            <input
                                type='number'
                                name={`precio`}
                                value={data.precio}
                                onChange={(e) => setData({ ...data, precio: e.target.value })}
                            />
                        </label>
                        <label className="grid-item">
                            Stock
                            <input
                                type='number'
                                name={`stock`}
                                value={data.stock}
                                onChange={(e) => setData({ ...data, stock: e.target.value })}
                            />
                        </label>
                        <label className="grid-item">
                            Stock Regalo
                            <input
                                type='number'
                                name={`stockRegalo`}
                                value={data.stockRegalo}
                                onChange={(e) => setData({ ...data, stockRegalo: e.target.value })}
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

export default CrearProducto