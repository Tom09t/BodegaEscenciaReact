import { Header } from "../../components/Header/Header"
import { FirstButton } from "../../components/buttons/FirstButton"
import { useState, useEffect } from "react"
import { ModalGroupWine } from "../../components/Modal/ModalGroupWine/ModalGroupWine";
import { Link } from 'react-router-dom';
import Comision from "../UserRestaurant/comision";
export const UserWine = () => {

    const [estadoModal1, cambiarEstadoModal1] = useState(false);


    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reloadData, setReloadData] = useState(false);




    const idEmpresa=(grupo)=>{

        const empresa=grupo.empresa.id;
        return empresa;
        
          }
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
                    </tr>

                    {data?.map((grupo) => (
                        <tr key={grupo.id}>
                            <td>{grupo.id}</td>
                            <td>{grupo.empresa.nombreEmpresa}</td>
                            <td>{/*fecha */}</td>
                            <td>
                                <Comision empresa={idEmpresa(grupo)}></Comision>
                            </td>
                            <td>
                                Ver
                            </td>
                            <td>
                            1000


                            </td>
                            <td>
                                <Link to={`/regalos/${grupo.id}`}>
                                    <button>Ver</button>
                                </Link>


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
