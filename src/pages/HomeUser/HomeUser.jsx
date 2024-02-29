import { FirstButton } from "../../components/buttons/FirstButton"
import Logo from "../../assets/Logo.png"



export const HomeUser = () => {
  return (
    <>
        <div className="flex-container">
        <div className="container">
            <h2 className="title text-center">¡BIENVENIDO!</h2>
            <h3 className="subtitle text-center">Que desea hacer hoy?</h3>
            
            <div className="container-img">
                <img src={Logo} alt="" />
            </div>
            <div className="container-buttons-center">
                <FirstButton value={"Restaurante"} clase={"medium-button"} ruta={"/UserRestaurant"}/>
                <FirstButton value={"Wine"} clase={"medium-button"} ruta={"/UserWine"}/>
            </div>
        </div>
        </div>  
    </>
  )
}
