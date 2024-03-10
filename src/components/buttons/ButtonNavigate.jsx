import "./buttons.css"
import { useNavigate } from "react-router-dom"

export const ButtonNavigate = ({type, clase, value, ruta}) => {
    const navigate = useNavigate();
    
    const navega = (e) =>{
        e.preventDefault();
        navigate(ruta);
      }

    return (
    <>
        <button type={type} className={clase} onClick={navega}>{value}</button>
    </>
  )
}
