import { FirstButton } from "../../components/buttons/FirstButton"
import "./UserRestaurant.css"
import ModalNota from "./ModalNota"
import CrearVenta from "./ModalVenta"

import { Header } from "../../components/Header/Header"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';



export const UserRestaurant = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/grupos/list")
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

  const calcularComisionTotal = (grupo) => {
    if (!grupo || !grupo.empresa || !grupo.empresa.empleadoEmpresa) {
      console.error("Datos de grupo incompletos o incorrectos");
      return 0;
    }


    const comisionEmpresa = grupo.empresa.comision;
    const comisionEmpleados = grupo.empresa.empleadoEmpresa.reduce((acc, empleado) => acc + empleado.comision, 0);

    return comisionEmpresa + comisionEmpleados;
  };


  const calcularDescuentoComision = (grupo) => {
    if (!grupo || !grupo.empresa || !grupo.empresa.empleadoEmpresa) {
      console.error("Datos de grupo incompletos o incorrectos");
      return 0;
    }

    const comisionEmpresa = grupo.empresa.comision;
    const comisionEmpleados = grupo.empresa.empleadoEmpresa.reduce((acc, empleado) => acc + empleado.comision, 0);
    const totalComision = comisionEmpresa + comisionEmpleados;
    const totalVentas = (grupo.montoGrupo + grupo.montoMesa) * totalComision
    const total = totalVentas / 100
    return total;
  }

  const calcularTotalGeneral = (grupo) => {
    const totalDescuentoComision = calcularDescuentoComision(grupo);
    const totalGeneral = grupo.montoGrupo + grupo.montoMesa - totalDescuentoComision;

    return totalGeneral;
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

  const handleVentaCreada = (nuevaVenta) => {
    // Lógica para manejar la nueva venta
    console.log('Nueva venta creada:', nuevaVenta);
    // Actualizar el estado para forzar el recargado de datos
    setReloadData((prev) => !prev);
  };



  return (
    <>
      <Header titulo={"Usuario Restaurante"} />
      <div className="container-title-restaurant">
        <h2 className="title">Seccion Restaurante</h2>
        <h3 className="subtitle">Grupos</h3>
        <FirstButton clase={"small-button"} value={"Agregar Grupo"} />
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
              <td>{calcularComisionTotal(grupo)}</td>
              <td>
                <Link to={`/ventas/${grupo.id}`}>
                  <button>Ver</button>
                </Link>
                <CrearVenta grupoId={grupo.id} onVentaCreada={handleVentaCreada} reloadData={reloadData} />


              </td>
              <td>{grupo.montoGrupo}</td>
              <td>{grupo.montoMesa}</td>
              <td>{grupo.comensales}</td>
              <td>{grupo.montoGrupo}</td>
              <td>{calcularDescuentoComision(grupo)}</td>
              <td>{calcularTotalGeneral(grupo)}</td>
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
        <FirstButton clase={"medium-button"} value={"Cerrar Dia"} />
        <FirstButton clase={"medium-button"} value={"Volver"} />
      </div>
    </>
  )
}

