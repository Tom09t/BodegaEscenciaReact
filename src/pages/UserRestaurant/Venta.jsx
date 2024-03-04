import React, { useState, useEffect } from 'react';
import { Header } from "../../components/Header/Header"
import { useParams } from 'react-router-dom';
import DetalleModal from './Detalle'




const ListaVentas = () => {
    const { id } = useParams();
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/ventas/grupo/${id}`)
            .then((response) => response.json())
            .then((ventas) => {
                console.log("Datos de la API:", ventas);
                setVentas(ventas);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleAbrirModal = (ventaId) => {
        setVentaSeleccionada(ventaId);
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setVentaSeleccionada(null);
        setMostrarModal(false);
    };

    return (
        <>
            <Header titulo={"Ventas"} />
            <div className="container-title-restaurant">
                <h2 className="title">Ventas del grupo {id}</h2>
            </div>

            <table className="table-generic">
                <tbody>
                    <tr className="row-grey">
                        <th>Nro Venta</th>
                        <th>Fecha de Venta</th>
                        <th>Detalle venta</th>
                        <th>Detalle combo</th>
                        <th>Total Venta</th>
                        <th>Acciones</th>
                    </tr>

                    {ventas?.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.fechaVenta}</td>
                            <td>
                                <button onClick={() => handleAbrirModal(venta.id)}>Ver Detalles</button>
                                {mostrarModal && (
                                    <DetalleModal id={ventaSeleccionada} onClose={handleCerrarModal} />
                                )}
                            </td>
                            <td>
                                <button>Ver detallesCombo</button>
                            </td>
                            <td>{venta.montoVenta}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ListaVentas;
