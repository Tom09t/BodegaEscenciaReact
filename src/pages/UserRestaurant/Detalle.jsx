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
          {detalles.map((detalle) => (
            <div key={detalle.id} className="detalle-item">
              <span className="detalle-cantidad">{detalle.cantidad}</span>
              <span className="detalle-subtotal">{detalle.subTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
              <span className="detalle-producto">{detalle.producto.nombreProducto}</span>
            </div>
          ))}
        </div>
      )}

    </div>
    <button className="cerrar-button" onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetalleModal;
