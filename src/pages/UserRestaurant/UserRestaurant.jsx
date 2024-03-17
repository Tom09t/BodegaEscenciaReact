import { FirstButton } from "../../components/buttons/FirstButton"
import { ButtonNavigate } from "../../components/buttons/ButtonNavigate"
import "./UserRestaurant.css"
import { Header } from "../../components/Header/Header"
import { ModalGroupRestaurant } from "../../components/Modal/ModalGroupRestaurant/ModalGroupRestaurant";
import { useState, useEffect } from "react"
import ModalNota from "./ModalNota"
import CrearVenta from "./ModalVenta"
import { Link } from 'react-router-dom';
import Comision from "./comision"

export const UserRestaurant = () => {
  
  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reloadData, setReloadData] = useState(false);
  const [nuevoComensales, setNuevoComensales] = useState('');
  const setEditandoComensales = (grupoId, valor) => {
    setEdicionPorGrupo((prevEdicion) => {
      return { ...prevEdicion, [grupoId]: valor };
    });
  };

  const [edicionPorGrupo, setEdicionPorGrupo] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/grupos/listR")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de la API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, [reloadData]);

  const idEmpresa=(grupo)=>{

    const empresa=grupo.empresa.id;
    return empresa;
    
      }

      const calcularComisionTotal = (grupo) => {
        if (!grupo || !grupo.empresa || !grupo.empresa.empleadoEmpresa) {
          console.error("Datos de grupo incompletos o incorrectos");
          return 0;
        }

        const comisionEmpresa = grupo.empresa.comision;
        const comisionEmpleados = grupo.empresa.empleadoEmpresa.reduce((acc, empleado) => acc + empleado.comision, 0);
    
        return comisionEmpresa + comisionEmpleados;
      };
    
    
    
    
    
    
    
      const actualizarEstadoGrupo = async (grupoId, nuevoEstado) => {
        try {
          const response = await fetch(`http://localhost:8080/grupos/${grupoId}/a`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              estadoGrupo: nuevoEstado,
            }),
          });
          if (response.ok) {
            console.log(`Grupo ${grupoId} actualizado a ${nuevoEstado} con éxito.`);
            // Actualizar localmente el estado del grupo en data
            setData(prevData => {
              return prevData.map(grupo => {
                if (grupo.id === grupoId) {
                  return { ...grupo, estadoGrupo: nuevoEstado };
                }
                return grupo;
              });
            });
          } else {
            console.error(`Error al actualizar el estado del grupo ${grupoId}.`);
          }
        } catch (error) {
          console.error('Error en la llamada a la API:', error);
        }
      };
    
      const actualizarComensales = async (grupoId, comensales) => {
        try {
          const response = await fetch(`http://localhost:8080/grupos/${grupoId}/a`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              comensales: comensales, // Cambia estadoGrupo a comensales
            }),
          });
    
          if (response.ok) {
            console.log(`Grupo ${grupoId} actualizado a ${comensales} con éxito.`);
            // Actualizar localmente el estado del grupo en data
            setData((prevData) => {
              return prevData.map((grupo) => {
                if (grupo.id === grupoId) {
                  return { ...grupo, comensales: comensales };
                }
                return grupo;
              });
            });
            setEditandoComensales(false); // Después de actualizar, deja de editar
          } else {
            console.error(`Error al actualizar el estado del grupo ${grupoId}.`);
          }
        } catch (error) {
          console.error('Error en la llamada a la API:', error);
        }
      };
      const handleUpdateComensales = (grupoId) => {
        actualizarComensales(grupoId, nuevoComensales);
        setEditandoComensales(grupoId, false);
        reloadData();
      };
    
    
    
      const handleVentaCreada = (nuevaVenta) => {
        // Lógica para manejar la nueva venta
        console.log('Nueva venta creada:', nuevaVenta);
        // Actualizar el estado para forzar el recargado de datos
        setReloadData((prev) => !prev);
      };
    
      const handleCerrarModal = () => {
        setVentaSeleccionada(null);
        setMostrarModal(false);
        
    };
    
    
    
    
      const handleInputChange = (event) => {
        setNuevoComensales(parseInt(event.target.value, 10)); // Convierte el valor a un número entero
      };

  return (
    
    <>
    
      <Header titulo={"Usuario Restaurante"}/>
      <ModalGroupRestaurant 
      estado={estadoModal1}
      cambiarEstado={cambiarEstadoModal1}/>

      <div className="container-title-restaurant">
        <h2 className="title">Seccion Restaurante</h2>
        <h3 className="subtitle">Grupos</h3>
        <FirstButton clase={"small-button"} value={"Agregar Grupo"} onClick={() =>{cambiarEstadoModal1(true)}}/>
      </div>
       
      
      <table className="table-generic">
        <tbody>
          <tr className="row-grey">
            <th>Nro Grupo</th>
            <th>Empresa</th>
            <th>Fecha Y Hora</th>
            <th>Comision</th>
            <th>Ventas</th>
            <th>Total Ventas</th>
            <th>Total Mesa</th>
            <th>Comensales</th>
            <th>Descuentos c/c</th>
            <th>Descuento Comision</th>
            <th>Total</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
          {data?.map((grupo) => (
            <tr key={grupo.id}>
              <td>{grupo.id}</td>
              <td>{grupo.empresa.nombreEmpresa}</td>
              <td>{/*fecha */}</td>
              <td>{calcularComisionTotal(grupo)} %
           <Comision empresa={idEmpresa(grupo)}></Comision>
              </td>
     

              <td>
                <Link to={`/ventas/${grupo.id}`}>
                  <FirstButton value={"ver"} clase={"view-button"}/>
                </Link>
                <CrearVenta grupoId={grupo.id} onVentaCreada={handleVentaCreada} reloadData={reloadData}/>
              </td>
              <td>{grupo.montoVentasGrupo}</td>
              <td>{grupo.montoMesa}</td>
           <td>
              {edicionPorGrupo[grupo.id] ? (
                <>
                  <input className="input-mod"
                    type="number"
                    value={nuevoComensales}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleUpdateComensales(grupo.id)}>
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  {grupo.comensales}
                  <FirstButton value={"Modi"} clase={"modify-button"} onClick={() => setEditandoComensales(grupo.id, true)}/> 
                  
                </>
              )}
              </td>


              <td>{grupo.descuentoCtaCorriente}</td>
              <td>{grupo.descuentoComision}</td>
              <td>{grupo.total}</td>
              <td> <ModalNota grupo={grupo} onGuardarNota={(grupoId, nuevaNota) => guardarNota(grupoId, nuevaNota)} /></td>
              <td>

                <select
                  value={grupo.estadoGrupo}
                  onChange={(e) => actualizarEstadoGrupo(grupo.id, e.target.value)}
                >
                  <option value="ABIERTO">Abierto</option>
                  <option value="CERRADO">Cerrado</option>
                  <option value="SUSPENDIDO">Suspendido</option>
                </select>
              </td>


            </tr>
          ))}


        </tbody>
      </table>

      <div className="container-buttons-right">
        <FirstButton clase={"medium-button"} value={"Cerrar Dia"}/>
        <ButtonNavigate clase={"medium-button"} value={"Volver"} ruta={"/HomeUser"}/>
      </div>
    </>
  )
}

