import { Header } from "../../components/Header/Header"
import { FirstButton } from "../../components/buttons/FirstButton"
import "./SaleWine.css"

export const SaleWine = () => {
  return (
    <>
      <Header titulo={"Usuario Wine"}/>
      <div className="container-page">
        <h2 className="title">Cargar Nueva Venta Wine</h2>

        <div className="container-gray grid-container-wine">
          <h2>Escanee Producto</h2>
          <h3 className="text-red">Cod Producto</h3>
          <h3 className="text-red">Nombre</h3>
          <h3 className="text-red">Precio</h3>
          <h3 className="text-red">Acciones</h3>

          <h3>134</h3>
          <h3>Vino SexyFish</h3>
          <h3>$8000</h3>
          <h3><FirstButton value={"Borrar"} clase={"status-button-bad"}/></h3>

        </div>

        <div className="flex-container-sale-wine">
          <div>
            <h3 className="text-red">Descuento</h3>
            <h3>-$9000</h3>
          </div>
          <div>
            <h3 className="text-red">Total</h3>
            <h3>$40000</h3>
          </div>
        </div>
          
        <div className="container-buttons-right">
          <FirstButton value={"Aceptar"} clase={"medium-button"}/>     
          <FirstButton value={"Volver"} clase={"medium-button"}/>
        </div>
          
      </div>
    </>
  )
}
