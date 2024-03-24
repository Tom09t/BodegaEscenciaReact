import React, { useState, useEffect } from 'react';


function ListaProductos({ onSelectProducto }) {
const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener la lista de productos
    fetch('http://localhost:8080/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  return (
    <div>
      
      <select onChange={(e) => onSelectProducto(parseInt(e.target.value))}>
        <option value="">Selecciona un producto...</option>
        {productos.map(producto => (
          <option key={producto.id} value={producto.id}>
            {producto.nombreProducto}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListaProductos;
