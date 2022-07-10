import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext(); //createContext nos permite crear herramientas para compartir el estado por todos los componentes

function TodoProvider(props) {  //Para envolver toda la app en nuestro componente app.js (estado compartido)
  const { //entregarle toda la información a TodoProvider
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false); //para abrir o cerrar el modal //

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) { /*si la longitud de lo que escribi en el buscador NO es mayor o igual a 1*/
  searchedTodos = todos; /*Mostrar toda la lista de tareas*/
  } else { /*si la longitud de lo que escribi en el buscador SI es mayor o igual a 1*/
  searchedTodos = todos.filter(todo => { /*Buscador, filtrar en toda la lista */
    const todoText = todo.text.toLowerCase();  /*Convertir en minuscula toda lista de todo para comparar con lo escrito en el buscador*/
    const searchText = searchValue.toLowerCase(); /*Convertir en minuscula lo escrito en el buscador (para comparar con la lista)*/
    return todoText.includes(searchText); /*retornar (si es que en alguna parte se incluye algo del texto que escribrimos en nuestra busqueda)*/
  });
  }
// Función para añadir un nuevo TODO
  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({ //push añade valores al array
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  // Función para completar un TODO
  const completeTodo = (text) => { /*Cuando se llame a completetodo se devolvera un text (funcion cuando se marca una tarea completada)*/
  const todoIndex = todos.findIndex(todo => todo.text === text); /*Se examina en toda la lista cual tiene el mismo texto y se obtiene la posición*/
  const newTodos = [...todos]; /*Crea una nueva lista de "todos"*/
  newTodos[todoIndex].completed = true; /*luego de obtener la posicion se obtiene un objeto y se coloca como completa la tarea*/
  saveTodos(newTodos); /*Actualiza el estado (guarda la información)*/
};

// Función para borrar un TODO
const deleteTodo = (text) => { /*Borrar una tarea de la lista*/
const todoIndex = todos.findIndex(todo => todo.text === text); /*Se examina en toda la lista cual tiene el mismo texto y se obtiene la posición*/
const newTodos = [...todos]; /*Crea una nueva lista de "todos"*/
newTodos.splice(todoIndex, 1); /*Borrar la tarea presionada (posicion todoIndex), 1 porque se quiere eliminar de a una tarea*/
saveTodos(newTodos); /*Actualiza el estado (guarda la información)*/
};
  
  return (
    <TodoContext.Provider value={{ 
      loading,
      error,
      totalTodos,
      completedTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
      openModal,
       setOpenModal,
    }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };