import { Header } from "../../components/Header/Header"
import { FirstButton } from "../../components/buttons/FirstButton"
import { useState } from "react"
import { ModalGroupWine } from "../../components/Modal/ModalGroupWine/ModalGroupWine";

export const UserWine = () => {
    
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
  
    return (
    <>
        <ModalGroupWine estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}/>
        <Header titulo={"Usuario Wine"}/>
        <div className="container-title-restaurant">
            <h2 className="title">Seccion Wine</h2>
            <h2 className="subtitle">Grupos</h2>
            <FirstButton clase={"small-button"} value={"Agregar Grupo"} onClick={() =>{cambiarEstadoModal1(true);}}/>
        </div>

        <table className="table-generic">
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
            <tr> 
                <td>1</td>
                <td>Andesmar</td>
                <td>09-05-2023 18:00</td>
                <td className="flex-td">
                <span>14%</span>
                <FirstButton value={"ver"} clase={"view-button"}/>
                </td>
                <td>
                <FirstButton value={"ver"} clase={"view-button"}/>
                <FirstButton value={"+"} clase={"add-button"} ruta={"/SaleWine"}/>
                </td>
                <td>$100000</td>
                <td><FirstButton value={"+"} clase={"add-button"}/></td>
                <td>-$19000</td>
                <td>$300000</td>
            </tr>
        </table>

        
        <div className="container-buttons-right">
            <FirstButton clase={"medium-button"} value={"Cerrar Dia"}/>
            <FirstButton clase={"medium-button"} value={"Volver"} ruta={"/HomeUser"}/>
        </div>
        

    </>
  )
}
