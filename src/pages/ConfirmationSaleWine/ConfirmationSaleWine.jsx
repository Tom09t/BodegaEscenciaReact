import { Header } from "../../components/Header/Header"

export const ConfirmationSaleWine = () => {
  return (
    <>
        <Header titulo={"Usuario Wine"}/>
        <div className="container-page">
            <h2 className="title">Detalle Venta</h2>
            <div className="container-gray">
                <h3>Detalle venta nro 455</h3>
                <div className="container-sales">
                    <div className="container-flex">
                        <h4>Titulo</h4>
                        <h4>Precio</h4>
                    </div>
                    <div className="container-flex">
                        <h4>Titulo</h4>
                        <h4>Precio</h4>
                    </div>
                    <div className="container-flex">
                        <h4>Titulo</h4>
                        <h4>Precio</h4>
                    </div>
                </div>
                <div className="grid-container-3col">
                    <h2>Total</h2>
                    <h2>Descuento</h2>
                    <h2>Subtotal</h2>
                </div>
            </div>
        </div>
        

    </>
  )
}
