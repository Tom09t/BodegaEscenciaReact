import { Header } from "../../components/Header/Header"
import { FirstButton } from "../../components/buttons/FirstButton"
import "./ConfirmationSaleWine.css"

export const ConfirmationSaleWine = () => {
  return (
    <>
        <Header titulo={"Usuario Wine"}/>
        <div className="container-page">
            <h2 className="title">Detalle Venta</h2>
            <div className="container-gray">
                
                <h3 className="subtitle">Detalle venta nro <span className="text-red">455</span></h3>
                
                <div className="container-sales">
                    
                    <div className="container-formaPago">
                        <h2 className="subtitle">Forma de pago</h2>
                        <select className="select-restaurant">
                            <option value="">Forma de pago</option>
                            <option value="">Chau</option>
                            <option value="">Como estas?</option>
                        </select>
                    </div>

                    <div className="container-flex">
                        <h2 className="text-red">Vino SexyFish</h2>
                        <h2 className="price">$8000</h2>
                    </div>

                    <div className="container-flex">
                        <h2 className="text-red">Castañas de caju</h2>
                        <h2 className="price">$900</h2>
                    </div>

                    <div className="container-flex">
                        <h2 className="text-red">Caja Alfajores Entre dos</h2>
                        <h2 className="price">4000</h2>
                    </div>
                </div>
                
                <div className="container-flex-right">
                    <h2>Subtotal <span className="text-red price">$18000</span></h2>
                    <h2>Descuento <span className="text-red price">-$8000</span></h2>
                    <h2>Total <span className="text-green price">$10000</span></h2>
                </div>
                
            </div>
            <div className="container-buttons-right">
                <FirstButton value={"Aceptar"} clase={"medium-button"} ruta={"/UserWine"}/>
                <FirstButton value={"Volver"} clase={"medium-button"} ruta={"/SaleWine"}/>
            </div>
        </div>
        

    </>
  )
}
