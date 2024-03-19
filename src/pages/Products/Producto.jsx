

import React from 'react'
import { Header } from '../../components/Header/Header'
import { FirstButton } from '../../components/buttons/FirstButton'
import './productos.css'
import { useState, useEffect } from "react"
import CrearProducto from './CrearProducto'
import EditarProducto from './Editar'

const Productos = () => {


    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reloadData, setReloadData] = useState(false);
    const [productos, setProductos] = useState([]);
    const [edicionRealizada, setEdicionRealizada] = useState(false);

    const [productoId, setProductoId] = useState(null);

    const handleEditarProducto = (id) => {
        setProductoId(id);

    };

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/productos")
            .then((response) => response.json())
            .then((data) => {
                console.log("Datos de la API:", data);
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => setLoading(false));
    }, [reloadData,edicionRealizada]);


    const eliminarProducto = (productoId) => {

        fetch(`http://localhost:8080/productos/${productoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Puedes incluir cualquier otro encabezado necesario aquí
            },
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al borrar la venta: ${response.status}`);
                }
                console.log('Venta borrada exitosamente');
                // Actualizar localmente los prdocutos después de eliminar la venta
                setData(prevProductos => prevProductos.filter(producto => producto.id !== productoId));
            })
            .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
                // Aquí puedes manejar errores si es necesario
            });

    }




    return (
        <div>
            <Header titulo={"Control de Productos"} />
            <div className="container-title-restaurant">

                <h3 className="subtitle">Productos</h3>
                <CrearProducto reloadData={reloadData} setReloadData={setReloadData} ></CrearProducto>

            </div>

            <table className="table-generic">
                <tbody>
                    <tr className="row-grey">
                        <th>Id Prodcuto</th>
                        <th>nombre Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Stock de regalo</th>
                        <th>Acciones</th>

                    </tr>

                    {data?.map((producto) => (
                        <tr key={producto.id}>

                            <td>{producto.id}</td>
                            <td>{producto.nombreProducto}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.stockRegalo}</td>
                            <td>
                                
                                <EditarProducto productoId={producto.id}  edicionRealizada={edicionRealizada}
                    setEdicionRealizada={setEdicionRealizada}/>
                                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                            </td>

                        </tr>


                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Productos