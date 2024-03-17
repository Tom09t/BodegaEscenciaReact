import "./ModalGroupRestaurant.css"
import { useState } from "react"
import { FirstButton } from "../../buttons/FirstButton"
import { useFetch } from "../../../useFetch"

export const ModalGroupRestaurant = ({estado, cambiarEstado}) => {
  
  const [comensales, setComensales] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState('');

  const handleCloseModal = () =>{
    cambiarEstado(false);
  }
  
  const handleAceptar = async (e) => {
    e.preventDefault();
    console.log(Number(selectedEmpresa));
    // Construir el objeto con los datos
    const nuevoGrupo = {
      empresa: Number(selectedEmpresa),
      comensales: Number(comensales)
    };

    // Hacer la petición al backend para crear el grupo
    try {
      const response = await fetch('http://localhost:8080/grupos/CrearNuevoGrupo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoGrupo),
      });

      if (response.ok) {
        // Manejar la respuesta exitosa (puede ser redirigir, mostrar un mensaje, etc.)
        console.log('Grupo creado exitosamente');
        handleCloseModal();
      } else {
        // Manejar la respuesta con error
        console.error('Error al crear el grupo');
      }
    } catch (error) {
      // Manejar errores de red u otros
      console.error('Error de red:', error.message);
    }

  };

  
  
  const { data } = useFetch("http://localhost:8080/empresa");

  

  return (
    <>
    {estado &&
        <div className="overlay">
            <div className="modal">
                <h2 className="title">Crear Nuevo Grupo</h2>
                <h2 className="subtitle">Empresa</h2>
                <form onSubmit={handleAceptar}>

                  <select className="select-restaurant" value={selectedEmpresa} onChange={(e) => setSelectedEmpresa(e.target.value)}>
                    <option value="0">Seleccionar Empresa</option>
                    {data &&
                      data.map((empresa) => (
                        <option key={empresa.id} value={empresa.id}>
                          {empresa.nombreEmpresa}
                        </option>
                      ))
                    }
                  </select>

                  <h2 className="subtitle">Cantidad de comensales</h2>

                  <input type="number" placeholder="Ingrese cantidad de comensales" className="input-restaurant" value={comensales} onChange={(e) => setComensales(e.target.value)} />

                  <div className="container-buttons-right-modal">
                    <FirstButton value={"Aceptar"} clase={"small-button"} type={"submit"}/>
                    <FirstButton value={"Cancelar"} clase={"small-button"} onClick={handleCloseModal}/>
                  </div>
                </form>
                
            </div>
        </div>
      }
    </>
  )
}
