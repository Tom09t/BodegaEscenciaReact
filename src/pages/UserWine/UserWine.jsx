import { Header } from "../../components/Header/Header"
import { FirstButton } from "../../components/buttons/FirstButton"
import { useState, useEffect } from "react"
import { ModalGroupWine } from "../../components/Modal/ModalGroupWine/ModalGroupWine";
import { Link } from 'react-router-dom';
import Comision from "../UserRestaurant/comision";
import CreanVentaWine from "./VentasWine/CreanVentaWine";




export const UserWine = () => {

    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const [edicionPorGrupo, setEdicionPorGrupo] = useState({});

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reloadData, setReloadData] = useState(false);

    const setEditandoComensales = (grupoId, valor) => {
        setEdicionPorGrupo((prevEdicion) => {
            return { ...prevEdicion, [grupoId]: valor };
        });
    };




    const idEmpresa = (grupo) => {

        const empresa = grupo.empresa.id;
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


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/grupos/listW")
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




    const actualizarEstadoGrupo = async (grupoId, nuevoEstado) => {
        try {
            const response = await fetch(`http://localhost:8080/grupos/${grupoId}/a`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estadoGrupoWine: nuevoEstado,
                }),
            });
            if (response.ok) {
                console.log(`Grupo ${grupoId} actualizado a ${nuevoEstado} con éxito.`);
                // Actualizar localmente el estado del grupo en data
                setData(prevData => {
                    return prevData.map(grupo => {
                        if (grupo.id === grupoId) {
                            return { ...grupo, estadoGrupoWine: nuevoEstado };
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
            <ModalGroupWine estado={estadoModal1} cambiarEstado={cambiarEstadoModal1} />
            <Header titulo={"Usuario Wine"} />
            <div className="container-title-restaurant">
                <h2 className="title">Seccion Wine</h2>
                <h2 className="subtitle">Grupos</h2>
                <FirstButton clase={"small-button"} value={"Agregar Grupo"} onClick={() => { cambiarEstadoModal1(true); }} />
            </div>

            <table className="table-generic">
                <tbody>
                    <tr className="row-grey">
                        <th>NroGrupo</th>
                        <th>Empresa</th>
                        <th>Fecha Y Hora</th>
                        <th>Comision</th>
                        <th>Ventas</th>
                        <th>Total Ventas</th>
                        <th>Regalos</th>
                        <th>Descuento</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>

                    {data?.map((grupo) => (
                        <tr key={grupo.id}>
                            <td>{grupo.id}</td>
                            <td>{grupo.empresa.nombreEmpresa}</td>
                            <td>{/*fecha */}</td>
                            <td>{calcularComisionTotal(grupo)}

                                <Comision empresa={idEmpresa(grupo)}></Comision>
                            </td>

                            <td>
                            <Link to={`/ventasWine/${grupo.id}`}>
                                <button>Ver</button>
                            </Link>
                            <CreanVentaWine grupoId={grupo.id} onVentaCreada={handleVentaCreada} reloadData={reloadData} />
                            </td>
                            
                            <td>{grupo.montoVentasGrupo}</td>
                            
                            <td>
                                <Link to={`/regalos/${grupo.id}`}>
                                    <button>Ver</button>
                                </Link>


                            </td>



                            <td>{grupo.descuentoComision}</td>
                            <td>{grupo.total}</td>

                            <td>
                                <select
                                    value={grupo.estadoGrupoWine}
                                    onChange={(e) => actualizarEstadoGrupo(grupo.id, e.target.value)}
                                >
                                    <option value="ABIERTOWINE">Abierto</option>
                                    <option value="CERRADOWINE">Cerrado</option>
                                    <option value="SUSPENDIDOWINE">Suspendido</option>
                                </select>
                            </td>


                        </tr>

                    ))}
                </tbody>
            </table>



            <div className="container-buttons-right">
                <FirstButton clase={"medium-button"} value={"Cerrar Dia"} />
                <FirstButton clase={"medium-button"} value={"Volver"} ruta={"/HomeUser"} />
            </div>


        </>
    )
}
