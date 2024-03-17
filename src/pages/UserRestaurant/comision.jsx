import React, { useState, useEffect } from 'react';
import "./comision.css";
import { FirstButton } from '../../components/buttons/FirstButton';




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
      <FirstButton value={"Ver"} clase={"view-button"} onClick={handleAbrirModal}/>
  
      {mostrarModal && (
        <div className="overlay">
          <div className="detalle-comision-container">
            <h2 className='title'>Detalles de la Empresa</h2>
            {empresaData ? (
              <div className="empresa-details">
                <p>Nombre Empresa: {empresaData.nombreEmpresa}</p>
                <p>Comisión Empresa: {empresaData.comision}%</p>
  
                <h2 className='title'>Empleados:</h2>
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
            <FirstButton clase={"medium-button"}  value={"Cerrar"} onClick={() => handleCerrarModal()}/>
          </div>
        </div>
      )}
    </>
  );
            }  
export default Comision;
