import "./buttons.css"
import { useNavigate } from "react-router-dom"

export const FirstButton = ({value, type, clase, ruta}) => {
  
  const navigate = useNavigate();

  const navega = (e) =>{
    e.preventDefault();
    navigate(ruta);
    console.log("click!")
  }
  
  return (

    <button type={type} className={clase} onClick={navega}>{value}</button>
  )
}
