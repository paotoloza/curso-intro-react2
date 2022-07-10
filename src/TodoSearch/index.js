import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoSearch.css';

 function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);

  const onSearchValueChange = (event) => {
    console.log(event.target.value); /*Muestra en consola letra por letra que escribo en el buscador*/
    setSearchValue(event.target.value);
  };

  return ( /*Conecta el buscador con lo que escribimos */
    <input 
    className="TodoSearch"
    placeholder="Cebolla"
    value={searchValue} /*El valor es lo que escribimos en el buscador*/
    onChange={onSearchValueChange} /*onChange se ocupa porque se va ir actualizando el buscador según lo que queramos buscar*/
  />
  );
}

 export { TodoSearch };