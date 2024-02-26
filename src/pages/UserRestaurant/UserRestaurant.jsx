import { FirstButton } from "../../components/buttons/FirstButton"
import "./UserRestaurant.css"
import { Header } from "../../components/Header/Header"

export const UserRestaurant = () => {
  return (
    <>
      <Header titulo={"Usuario Restaurante"}/>
      <div className="container-title-restaurant">
        <h2 className="title">Seccion Restaurante</h2>
        <h3 className="subtitle">Grupos</h3>
        <FirstButton clase={"small-button"} value={"Agregar Grupo"}/>
      </div>
      
      <table className="table-generic">
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
        <tr>
          <td>1</td>
          <td>Andesmar</td>
          <td>12/2/2024 13:00hs</td>
          <td className="flex-td">
            <span>14%</span>
            <FirstButton value={"ver"} clase={"view-button"}/>
          </td>
          <td>
            <FirstButton value={"ver"} clase={"view-button"}/>
            <FirstButton value={"+"} clase={"add-button"}/>
          </td>
          <td>$34445</td>
          <td>
            $0
            <FirstButton value={"Modi"} clase={"modify-button"}/>
          </td>
          <td>
            160
            <FirstButton value={"Modi"} clase={"modify-button"}/>
          </td>
          <td>-$12000</td>
          <td>-$18000</td>
          <td>$19000</td>
          <td>
            <FirstButton value={"Vacio"} clase={"status-button-ok"}/>
          </td>
          <td>
            <span className="text-green">Abierto</span>
            <FirstButton value={"Modi"} clase={"modify-button"}/>
          </td>
        </tr>
      </table>
      <div className="container-buttons-right">
        <FirstButton clase={"medium-button"} value={"Cerrar Dia"}/>
        <FirstButton clase={"medium-button"} value={"Volver"}/>
      </div>
    </>
  )
}

