import "./buttons.css"

export const FirstButton = ({value, type, clase}) => {
  return (
    <button type={type} className={clase}>{value}</button>
  )
}
