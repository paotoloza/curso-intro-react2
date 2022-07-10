import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';
 // import './App.css';

 //tareas//
//  const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el curso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: true },
//   { text: 'LALALALAA', completed: false },
// ];

//llamamos a las variables de index.js de App//
function AppUI(){
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext); //Permite acceder a los datos globales desde cualquier componente 

  return (
    <React.Fragment> {/*En vez de usar varios div se utiliza react.fragment para envolver varias etiquetas o componentes dentro de una función */}
      <TodoCounter />
      <TodoSearch />

       <TodoList> {/*recorre las tareas y dentro de la lista se debe identificar el tipo de componente (text o completed) y cuando se randeriza una 
       lista se debe agregar el key para que React identifique cual es cual en la lista,muestra mensaje error, cargando o todo ok según corresponda*/}
        {error && <TodosError />}
        {loading && <TodosLoading />}
        {(!loading && !searchedTodos.length) && <EmptyTodos />}
        
       {searchedTodos.map(todo => (
           <TodoItem
             key={todo.text}
             text={todo.text}
             completed={todo.completed} 
             onComplete={() => completeTodo(todo.text)} /*Llama la funcion completeTodo, se hace click en complete (tick) y se actualiza (completa una tarea) */
             onDelete={() => deleteTodo(todo.text)} /*Llama la funcion deleteTodo, se hace click en delete (X) y se actualiza (borra una tarea) */
           />
         ))}
       </TodoList>

       {!!openModal && (
         <Modal> 
         {/* <p>{searchedTodos[0]?.text}</p> primero pregunta si es que existe el array de "todos" antes de imprimir los textos, si no hay texto no se mostrará nada */}
         <TodoForm />
         </Modal>
       )}

       <CreateTodoButton /*El botón + actualiza el estado del modal y permite que aparezca el modal */
         setOpenModal={setOpenModal}  
       />
     </React.Fragment>
   );
 }

 export { AppUI };
