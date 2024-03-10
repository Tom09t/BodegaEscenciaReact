import "./buttons.css"

export const FirstButton = ({value, type, clase, onClick}) => {
  return (
    <>
      <button type={type} className={clase} onClick={onClick}>{value}</button>
    </>
  )
}
