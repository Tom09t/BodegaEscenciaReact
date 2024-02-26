import { FirstButton } from "../../components/buttons/FirstButton"
import Logo from "../../assets/Logo.png"
import "./login.css"
 
export const Login = () => {
  return (
    <>
    <div className="flex-container">
        <div className="container">
            <h2 className="title text-center">Bodega Escencia</h2>
            
            <div className="container-img">
                <img src={Logo} alt="" />
            </div>

            <form action="" className="form-login">
                <label className="form-item">INGRESE SU USUARIO</label>
                <input type="text" className="form-item" placeholder="Ingrese su usuario"/>
                <label className="form-item">INGRESE CONTRASEÑA</label>
                <input type="password" className="form-item"placeholder="Ingrese su contraseña"/>
            </form>

            <div className="container-buttons-right">
                <FirstButton value={"Ingresar"} type={"submit"} clase={"small-button"}/>
            </div>
        </div>
    </div>
    </>
  )
}

