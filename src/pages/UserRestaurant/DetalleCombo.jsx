

import React, { useState, useEffect } from 'react';

const DetallesCombo = ({ id, onClose, cargarVentas  }) => {
    const [detallesCombo, setDetallesCombo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detalleEliminado, setDetalleEliminado] = useState(false);
    const [detalleEditando, setDetalleEditando] = useState(null);
    const [edicionDetalles, setEdicionDetalles] = useState({})
    const [nombreComboEditando, setNombreComboEditando] = useState('');

  
  
  
    const handleEditarClick = (detalleId) => {
      setDetalleEditando(detalleId);
      setNombreComboEditando(edicionDetalles[detalleId]?.combo.nombreCombo || detallesCombo.find(detalle => detalle.id === detalleId)?.combo.nombreCombo|| '');
    };


    const handleInputChange = (detalleId, campo, valor) => {
      setEdicionDetalles((prevEdicionDetalles) => ({
        ...prevEdicionDetalles,
        [detalleId]: {
          ...prevEdicionDetalles[detalleId],
          [campo]: valor,
        },
      }));
      if (campo === 'nombreCombo') {
        setNombreComboEditando(valor);
      }
    }



    const handleGuardarClick = async (detalleId) => {
      try {
        const requestBody = {};
    
        if (edicionDetalles[detalleId]?.nombreCombo !== undefined) {
          requestBody.combo = {
            nombreCombo: edicionDetalles[detalleId].nombreCombo,
          };
        }
    
        if (edicionDetalles[detalleId]?.cantidad !== undefined) {
          requestBody.cantidad = edicionDetalles[detalleId].cantidad;
        }
    
        const response = await fetch(`http://localhost:8080/detallesVentas/c/${id}/${detalleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          console.log(`Detalle de venta con ID ${detalleId} actualizado con éxito.`);
          setDetalleEditando(null);
          cargarVentas();
        } else {
          console.error(`Error al actualizar el detalle de venta con ID ${detalleId}.`);
        }
      } catch (error) {
        console.error('Error en la llamada a la API:', error);
      }
    };

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/detallesVentas/dc/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Datos de la API:", data);
            setDetallesCombo(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          })
          .finally(() => setLoading(false));
      }, [id,detalleEliminado,detalleEditando]);





      const eliminarDetalleVenta = (idVenta, idDetalleVenta) => {
        fetch(`http://localhost:8080/detallesVentas/${idVenta}/${idDetalleVenta}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error al eliminar el detalle de venta. Estado: ${response.status}`);
          }
      
          console.log('Detalle de venta eliminado exitosamente.');
          setDetalleEliminado(prevState => !prevState); 
          cargarVentas();
        })
        .catch(error => {
          console.error('Error al eliminar el detalle de venta:', error.message);
        });
      };
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalles de Combo</h2>
            {loading ? (
              <p>Cargando detalles...</p>
            ) : (
              <div className="detalle-list">
                {detallesCombo.length === 0 ? (
                  <p>No se encontraron detalles de combo.</p>
                ) : (
                  <>
                    <div className="detalle-header">
                      <span className="detalle-cantidad">Combo</span>
                      <span className="detalle-producto">Cantidad</span>
                      <span className="detalle-subtotal">Total</span>
                      <span className="detalle-subtotal">Acciones</span>
                    </div>
                    {detallesCombo.map((detalle) => (
                      <div key={detalle.id} className="detalle-item">
                          {console.log(detalle.combo)}
                          {detalleEditando === detalle.id ? (
                    <input
                    type="text"
                    className="detalle-cantidad"
                    value={nombreComboEditando}
                    onChange={(e) => handleInputChange(detalle.id, 'nombreCombo', e.target.value)}
                  />
                    ) : (

                        <span className="detalle-cantidad">{detalle.combo?.nombreCombo}</span>
                        )}
                          {detalleEditando === detalle.id ? (
                      <input
                        type="number"
                        className="detalle-producto"
                        value={edicionDetalles[detalle.id]?.cantidad || detalle.cantidad}
                        onChange={(e) => handleInputChange(detalle.id, 'cantidad', e.target.value)}
                      />
                    ):(

                        <span className="detalle-producto">{detalle.cantidad}</span>
                        )}
                          <span className="detalle-subtotal">
                      {detalle.subTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </span>
                   
                   
                        <span className="detalle-subtotal">
                        {detalleEditando === detalle.id ? (
                      <button onClick={() => handleGuardarClick(detalle.id)}>Guardar</button>
                    ) : (
                      <button onClick={() => handleEditarClick(detalle.id)}>Editar</button>
                    )}
                    <button onClick={() => eliminarDetalleVenta( id, detalle.id)}>X</button>
        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
            <button className="cerrar-button" onClick={onClose}>X</button>
          </div>
        </div>
      );
                    }        
export default DetallesCombo;
