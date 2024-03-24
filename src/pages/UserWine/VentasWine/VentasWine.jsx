
import React, { useState, useEffect } from 'react';
import { Header } from '../../../components/Header/Header';
import { useParams } from 'react-router-dom';
import DetallesCombo from '../../UserRestaurant/ModalDetalle/DetalleCombo';
import DetalleModal from '../../UserRestaurant/ModalDetalle/Detalle';

const VentasWine = () => {

    const { id } = useParams();
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [mostrarModalCombo, setMostrarModalCombo] = useState(false)
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
    const [ventaSeleccionadaCombo, setVentaSeleccionadaCombo] = useState(null);
    const [actualizarVentas, setActualizarVentas] = useState(true); // Nuevo estado


    useEffect(() => {
        console.log('Entró en el useEffect de ListaVentas');
        if (actualizarVentas) {
            console.log('Se actualizarán las ventas...');
            setLoading(true);
            fetch(`http://localhost:8080/ventas/grupoW/${id}`)
                .then((response) => response.json())
                .then((ventas) => {
                    console.log("Datos de la API:", ventas);
                    setVentas(ventas);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    setLoading(false);
                    setActualizarVentas(false); // Marcamos como actualizado
                    console.log('Ventas actualizadas.');
                });
        }
    }, [id, actualizarVentas]);

    const cargarVentas = () => {
        setActualizarVentas(true);
    };

    const handleEliminarVenta = (ventaId) => {
        // Realizar la solicitud DELETE utilizando el ID de la venta
        fetch(`http://localhost:8080/ventas/e/${ventaId}`, {
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
                // Actualizar localmente las ventas después de eliminar la venta
                setVentas(prevVentas => prevVentas.filter(venta => venta.id !== ventaId));
            })
            .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
                // Aquí puedes manejar errores si es necesario
            });
    };


    const handleAbrirModal = (ventaId) => {
        setVentaSeleccionada(ventaId);
        setMostrarModal(true);
    };


    const handleAbrirModalCombo = (ventaId) => {
        setVentaSeleccionada(ventaId);
        setMostrarModalCombo(true);
    };

    const handleCerrarModal = () => {
        setVentaSeleccionada(null);
        setMostrarModal(false);
    };
 

    const handleCerrarModalCombo = () => {
        setMostrarModalCombo(false);
        setVentaSeleccionadaCombo(null);
    };

  return (
    <>
    <Header titulo={"Ventas Wine"} />
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
                          <DetalleModal id={ventaSeleccionada} onClose={handleCerrarModal} cargarVentas={cargarVentas} />
                        )}
                    </td>
                    <td>
                        <button onClick={() => handleAbrirModalCombo(venta.id)}>Ver Detalles Combo</button>
                        {mostrarModalCombo && (
                            <DetallesCombo id={ventaSeleccionada} onClose={handleCerrarModalCombo}  cargarVentas={cargarVentas}/>
                        )}
                    </td>
                    <td>{venta.montoVenta}</td>
                    <td>
                        <button onClick={() => handleEliminarVenta(venta.id)}>
                            Eliminar Venta
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</>
);
};

export default VentasWine
