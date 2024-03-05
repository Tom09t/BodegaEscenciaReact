import React, { useState, useEffect } from 'react';
import "./modalDetalle.css"

const DetalleModal = ({ id, onClose }) => {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/detallesVentas/d/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de la API:", data);
        setDetalles(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalles de la Venta</h2>
        {loading ? (
          <p>Cargando detalles...</p>
        ) : (
          <div className="detalle-list">
            {detalles.length === 0 ? (
              <p>No se encontraron detalles de la venta.</p>
            ) : (
              <>
                <div className="detalle-header">
                  <span className="detalle-cantidad">Producto</span>
                  <span className="detalle-producto">Cantidad</span>
                  <span className="detalle-subtotal">Total</span>
                </div>
                {detalles.map((detalle) => (
                  <div key={detalle.id} className="detalle-item">
                    <span className="detalle-cantidad">{detalle.producto.nombreProducto}</span>
                    <span className="detalle-producto">{detalle.cantidad}</span>
                    <span className="detalle-subtotal">{detalle.subTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
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

export default DetalleModal;
