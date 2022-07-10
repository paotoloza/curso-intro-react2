import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';

function TodoForm() { 
    // Creamos un estado para nuestro nuevo TODO
  const [newTodoValue, setNewTodoValue] = React.useState(''); //el estado por defecto es un string vacio ('')
  // Desestructuramos las funciones que necesitamos para añadir un TODO y cerrar nuestro modal
  const {
    addTodo,
    setOpenModal,
  } = React.useContext(TodoContext);

 // Creamos una función para actualizar el estado de nuestro nuevo TODO
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

   // Función para cerrar el modal
  const onCancel = () => {
    setOpenModal(false);
  };

   // Función para agregar nuestro nuevo TODO
  const onSubmit = (event) => {
     // prevent default para evitar recargar la página
    event.preventDefault();
    // Utilizamos nuestra función para añadir nuestro TODO
    addTodo(newTodoValue);
     // También estaría bien resetear nuestro formulario
    setOpenModal(false);
  };

  return ( //fomulario
    <form onSubmit={onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea //sirve para tener espacio en el texto donde se escribira el nuevo "todo" y que continue escribiendo hacia abajo no al lado
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla para el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
          >
          Cancelar
        </button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };