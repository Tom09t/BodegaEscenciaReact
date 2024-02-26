import { Header } from "../../components/Header/Header"
import { FirstButton } from "../../components/buttons/FirstButton"

export const DetailSalesRestaurant = () => {
  return (
    <>
        <Header titulo={"Usuario Restaurante"}/>
        <div className="container-page">
            <h2 className="title">Ventas</h2>
            <table className="table-generic">
                <tr className="row-grey">
                    <th>nro venta</th>
                    <th>Fecha Venta</th>
                    <th>Detalle Venta</th>
                    <th>Total Ventas</th>
                    <th>Acciones</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>09-05-2023  18:00</td>
                    <td><FirstButton value={"Ver"} clase={"view-button"}/></td>
                    <td>$70000</td>
                    <td><FirstButton value={"Borrar"} clase={"status-button-bad"}/></td>
                </tr>
            </table>
            <div className="container-buttons-right">
                <FirstButton clase={"medium-button"} value={"Volver"}/>
            </div>
        </div>
    </>
  )
}
