
import React, { useState ,useEffect} from 'react';
import "./modal.css"



const ModalNota = ({ grupo, onGuardarNota })  => {
        

const [mostrarModal, setMostrarModal] = useState(false);
const [nota, setNota] = useState('');
const [botonColor, setBotonColor] = useState('default');

useEffect(() => {
  const notaGuardada = localStorage.getItem(`nota_${grupo.id}`);
  if (notaGuardada) {
    setNota(notaGuardada);
  }
}, [grupo.id]);

const handleAbrirModal = () => {
  setMostrarModal(true);
};

const handleCerrarModal = () => {
  setMostrarModal(false);
};

const handleGuardarNota = async () => {
  // Guardar la nota
  localStorage.setItem(`nota_${grupo.id}`, nota);
  setBotonColor(nota ? 'green' : 'default');
  // Cerrar el modal después de guardar la nota
  handleCerrarModal();
};




return (
  <>
    {/* Botón para abrir el modal */}
    <button onClick={handleAbrirModal} style={{ backgroundColor: botonColor ,borderRadius: '8px',}}>Nota</button>

    {/* Modal */}
    {mostrarModal && (
      <div className="modal-overlay">
       
 
        <div className="modal">
        <h2>Agregar/Editar Nota al Grupo</h2>
          <textarea className='text-tarea'
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe tu nota aquí..."
          />
             <div>
        <button onClick={() => { handleGuardarNota(); handleCerrarModal(); }} >
          Guardar Nota
          </button>
        </div>
       
        </div>
     
        
      </div>
    )}
  </>
);
};

export default ModalNota;
