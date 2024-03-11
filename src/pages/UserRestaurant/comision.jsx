import React, { useState, useEffect } from 'react';
import "./comision.css";




const Comision = ({ empresa,onClose }) => {
  
  const [empresaData, setEmpresaData] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
 
        const response = await fetch(`http://localhost:8080/empresa/${empresa}`);

        if (response.ok) {
  
          const data = await response.json();
          
          setEmpresaData(data);
        } else {
        
          console.error(`Error al obtener datos de la empresa. Estado: ${response.status}`);
        }
      } catch (error) {
        
        console.error('Error en la solicitud:', error);
      }
    };

    fetchData();
  }, [empresa]);



  const handleAbrirModal = () => {
    setMostrarModal(true);
  };
  
  const handleCerrarModal = () => {
    setMostrarModal(false);
  };
  

  return (
    <>
      <button onClick={handleAbrirModal}>Ver</button>
  
      {mostrarModal && (
        <div className="overlay">
          <div className="detalle-comision-container">
            <h2>Detalles de la Empresa</h2>
            {empresaData ? (
              <div className="empresa-details">
                <p>ID: {empresaData.id}</p>
                <p>Nombre: {empresaData.nombreEmpresa}</p>
                <p>Comisión Empresa: {empresaData.comision}%</p>
  
                <h3>Empleados:</h3>
                <ul>
                  {empresaData.empleadoEmpresa.map((empleado, index) => (
                    <li key={index}>
                      {`Empleado ${empleado.id}: ${empleado.nombreEmpleado} - Comisión: ${empleado.comision}%`}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Cargando datos de la empresa...</p>
            )}
            <button onClick={() => handleCerrarModal()}>
              cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
            }  
export default Comision;
