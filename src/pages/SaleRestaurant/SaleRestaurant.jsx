import { useState } from "react"
import { FirstButton } from "../../components/buttons/FirstButton"
import { Header } from "../../components/Header/Header"
import "./SaleRestaurant.css"

export const SaleRestaurant = () => {

    const [count, setCount] = useState(0)

    const increase = () =>{
        setCount(count+1);
    }

    
    const decrease = () =>{
        setCount(count-1);
    }


    return (

    <>
        <Header titulo={"Usuario Restaurante"}/>
        
        <div className="container-page">
            <h2 className="title">Cargar nueva venta</h2>
            <div className="flex-container">
                <div className="container">
                        <div className="container-formaPago">
                            <h2 className="subtitle">Forma de pago</h2>
                            <select className="select-restaurant">
                                <option value="">Forma de pago</option>
                                <option value="">Chau</option>
                                <option value="">Como estas?</option>
                            </select>
                        </div>
                        <div className="container-detalle">
                            <h2 className="subtitle text-red">Detalle Venta</h2>
                
                            <div className="container-grid-saleRestaurant">
                                <h2 className="subtitle">Productos</h2>

                                <h2 className="subtitle">Cantidad</h2>

                                <h2 className="subtitle text-red">Precio</h2>

                                <select className="select-restaurant">
                                    <option value="">Hola</option>
                                    <option value="">Chau</option>
                                </select>

                                <div className="counter-item">
                                    <button onClick={decrease}>-</button>
                                    <span>{count}</span>
                                    <button onClick={increase}>+</button>
                                </div>

                                <h2>$0</h2>

                                <div className="container-buttons-left">
                                    <FirstButton value={"+"} clase={"status-button-ok"}/>
                                    <h3>Agregar Producto</h3>
                                </div>
                        
                                <div className="grid-item-total">
                                    <h2 className="subtitle">Total</h2>
                                    <h2>$0</h2>
                                </div>
                            </div>
                        </div>
                        

                        <div className="container-buttons-right">
                            <FirstButton value={"Aceptar"} clase={"medium-button"}/>     
                            <FirstButton value={"Volver"} clase={"medium-button"}/>
                        </div>
                    </div>
            </div>         
                
        </div>
        
    </>
    
  )
}

