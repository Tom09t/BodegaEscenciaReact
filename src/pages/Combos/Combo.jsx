import React from 'react'
import { Header } from '../../components/Header/Header'
import { useState, useEffect } from "react"
import CrearCombo from './CrearCombo'
import "./combo.css"




const Combo = () => {


    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reloadData, setReloadData] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedCombo, setSelectedCombo] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/combos")
            .then((response) => response.json())
            .then((data) => {
                console.log("Datos de la API:", data);
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => setLoading(false));
    }, [reloadData]);



    const handleVerClick = (combo) => {
        setSelectedCombo(combo);
        setShowModal(true);
        console.log('Combo seleccionado:', combo);
        console.log('ProductosIds del combo:', combo.productosIds);
    };
    
    const handleCerrarModal = () => {
        setShowModal(false);
        setSelectedCombo(null);
    };
    const eliminarCombo = (comboId) => {

        fetch(`http://localhost:8080/combos/${comboId}`, {
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
                
                setData(prevCombos => prevCombos.filter(combo => combo.id !== comboId));
            })
            .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
                // Aquí puedes manejar errores si es necesario
            });

    }




    return (
        <div>
            <Header titulo={"Combos"} />

            <div className="container-title-restaurant">

                

                <h3 className="subtitle">Crear combos</h3>
                
                <CrearCombo reloadData={reloadData} setReloadData={setReloadData} ></CrearCombo>
</div>
                <table className="table-generic">
                <tbody>
                    <tr className="row-grey">
                        <th>Id Combo</th>
                        <th>nombre Combo</th>
                        <th>Precio</th>
                        <th>Productos</th>
                        <th>Acciones</th>

                    </tr>

                    {data?.map((combo) => (
                        <tr key={combo.id}>

                            <td>{combo.id}</td>
                            <td>{combo.nombreCombo}</td>
                            <td>{combo.precioTotal}</td>
                            <td><button onClick={() => handleVerClick(combo)}>Ver</button></td>
                            <td>
                                
                         
                            <button onClick={() => eliminarCombo(combo.id)}>Eliminar</button>
                            </td>

                        </tr>


                    ))}
                    </tbody>
                    </table>
                    {showModal && selectedCombo && (
    <div className="modal">
        <div className="modal-background" onClick={handleCerrarModal}></div>
        <div className="modal-content">
            <div className="box">
                <h3>{selectedCombo.nombreCombo}</h3>
                <p>Productos:</p>
                <ul>
                    {selectedCombo.productos.map((producto, index) => (
                        <span key={producto.id}>
                            {producto.nombreProducto} - Cantidad: {selectedCombo.cantidadesXproductos[index]}
                        </span>
                    ))}
                </ul>
            </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleCerrarModal}></button>
    </div>
)}

        </div>

            
       
    )
}

export default Combo
