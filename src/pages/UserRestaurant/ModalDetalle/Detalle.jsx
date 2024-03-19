import React, { useState, useEffect } from 'react';
import "./modalDetalle.css"


  // ... importa useState y useEffect si no los has importado ya

  // ... importa useState y useEffect si no los has importado ya
  ;

const DetalleModal = ({ id, onClose, cargarVentas }) => {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalleEditando, setDetalleEditando] = useState(null);
  const [edicionDetalles, setEdicionDetalles] = useState({});
  const [nombreProductoEditando, setNombreProductoEditando] = useState('');
  const [detalleEliminado, setDetalleEliminado] = useState(false);
  
  const handleEditarClick = (detalleId) => {
    setDetalleEditando(detalleId);
    setNombreProductoEditando(edicionDetalles[detalleId]?.nombreProducto || detalles.find(detalle => detalle.id === detalleId)?.producto.nombreProducto || '');
  };

  
  const handleInputChange = (detalleId, campo, valor) => {
    setEdicionDetalles((prevEdicionDetalles) => ({
      ...prevEdicionDetalles,
      [detalleId]: {
        ...prevEdicionDetalles[detalleId],
        [campo]: valor,
      },
    }));
    if (campo === 'nombreProducto') {
      setNombreProductoEditando(valor);
    }
  };
// ...




const handleGuardarClick = async (detalleId) => {
  try {
    const requestBody = {};

    if (edicionDetalles[detalleId]?.nombreProducto !== undefined) {
      requestBody.producto = {
        nombreProducto: edicionDetalles[detalleId].nombreProducto,
      };
    }

    if (edicionDetalles[detalleId]?.cantidad !== undefined) {
      requestBody.cantidad = edicionDetalles[detalleId].cantidad;
    }

    const response = await fetch(`http://localhost:8080/detallesVentas/${id}/${detalleId}`, {
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
  }, [id, detalleEditando,detalleEliminado]);

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
                  <span className="detalle-subtotal">Acciones</span>
                </div>
                {detalles.map((detalle) => (
                  <div key={detalle.id} className="detalle-item">
                    {detalleEditando === detalle.id ? (
                    <input
                    type="text"
                    className="detalle-cantidad"
                    value={nombreProductoEditando}
                    onChange={(e) => handleInputChange(detalle.id, 'nombreProducto', e.target.value)}
                  />
                    ) : (
                      <span className="detalle-cantidad">{detalle.producto.nombreProducto}</span>
                    )}

                    {detalleEditando === detalle.id ? (
                      <input
                        type="number"
                        className="detalle-producto"
                        value={edicionDetalles[detalle.id]?.cantidad || detalle.cantidad}
                        onChange={(e) => handleInputChange(detalle.id, 'cantidad', e.target.value)}
                      />
                    ) : (
                      <span className="detalle-producto">{detalle.cantidad}</span>
                    )}
                    <span className="detalle-subtotal">
                      {detalle.subTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </span>
                    {detalleEditando === detalle.id ? (
                      <button onClick={() => handleGuardarClick(detalle.id)}>Guardar</button>
                    ) : (
                      <button onClick={() => handleEditarClick(detalle.id)}>Editar</button>
                    )}
                    <button onClick={() => eliminarDetalleVenta(id, detalle.id)}>X</button>
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
};

export default DetalleModal;