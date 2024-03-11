

import React, { useState, useEffect } from 'react';
import "./modalDetalle.css"

const DetallesCombo = ({ id, onClose, cargarVentas  }) => {
    const [detallesCombo, setDetallesCombo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detalleEliminado, setDetalleEliminado] = useState(false);

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
      }, [id,detalleEliminado]);

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
                        <span className="detalle-cantidad">{detalle.combo?.nombreCombo}</span>
                        <span className="detalle-producto">{detalle.cantidad}</span>
                        <span className="detalle-subtotal">{detalle.subTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                        <span className="detalle-subtotal">
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
