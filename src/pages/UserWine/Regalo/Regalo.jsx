import React, { useState, useEffect } from 'react';
import { Header } from '../../../components/Header/Header';
import { useParams } from 'react-router-dom';
import DetalleRegalo from './DetalleRegalo';


const Regalo = () => {

    const [regalos, setRegalos] = useState([]);
    const [actualizarRegalo, setActualizarRegalo] = useState(true); // Nuevo estado
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [regaloSeleccionado, setRegaloSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);


    useEffect(() => {
        console.log('Entró en el useEffect de ListaVentas');
        if (actualizarRegalo) {
            console.log('Se actualizarán las regalos...');
            setLoading(true);
            fetch(`http://localhost:8080/regalos/grupo/${id}`)
                .then((response) => response.json())
                .then((regalos) => {
                    console.log("Datos de la API:", regalos);
                    setRegalos(regalos);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    setLoading(false);
                    setActualizarRegalo(false); // Marcamos como actualizado
                    console.log('Regalo actualizadas.');
                });
        }
    }, [id,actualizarRegalo]);

    const cargarRegalo = () => {
        setActualizarRegalo(true);
    };

    const handleEliminarRegalo = (regaloId) => {
        
        fetch(`http://localhost:8080/regalos/e/${regaloId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Puedes incluir cualquier otro encabezado necesario aquí
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al borrar la REGALO: ${response.status}`);
                }
                console.log('regalo borrada exitosamente');
    
                
                setRegalos(prevRegalos => prevRegalos.filter(regalo => regalo.id !== regaloId)); // Corrección aquí
            })
            .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
            
            });
    };

    const handleAbrirModal = (regaloId) => {
        setRegaloSeleccionado(regaloId);
        setMostrarModal(true);
    };



    const handleCerrarModal = () => {
        setRegaloSeleccionado(null);
        setMostrarModal(false);
    };
 


  return (
  

      <>
            <Header titulo={"Regalos"} />
            <div className="container-title-restaurant">
                <h2 className="title">Regalos del Grupo {id}</h2>
            </div>

            <table className="table-generic">
                <tbody>
                    <tr className="row-grey">
                        <th>Nro Regalo</th>
                        <th>Fecha de Regalo</th>
                        <th>Detalle Regalo</th>
                     
                        <th>Acciones</th>
                    </tr>

                    {regalos?.map((regalo) => (
                        <tr key={regalo.id}>
                            <td>{regalo.id}</td>
                            <td>{regalo.fecha}</td>
                            
                            <td>
                                <button onClick={() => handleAbrirModal(regalo.id)}>Ver Detalles</button>
                                {mostrarModal && (
                                  <DetalleRegalo id={regaloSeleccionado} onClose={handleCerrarModal} cargarRegalo={cargarRegalo} />
                                )}
                            </td>                             
                            
                         
                          
                            <td>
                            <button onClick={() => handleEliminarRegalo(regalo.id)}>
                                    Eliminar Regalo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    
  )
}

export default Regalo
