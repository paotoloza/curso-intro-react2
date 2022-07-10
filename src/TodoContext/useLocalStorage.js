import React from 'react';

function useLocalStorage(itemName, initialValue) { //custom hook (permite ir guardando y actualizando las listas y acciones en la app)
  // Creamos el estado inicial para nuestros errores y carga
  const [error, setError] = React.useState(false); //para cuando exista un error se convierte en false
  const [loading, setLoading] = React.useState(true); //para cuando este cargando y sera true
  const [item, setItem] = React.useState(initialValue); //el estado por defecto o inicial sera un array vacio, string vacio, etc
  
  React.useEffect(() => {
    // Simulamos un segundo de delay de carga 
    setTimeout(() => {
       // Manejamos la tarea dentro de un try/catch por si ocurre algún error
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue)); 
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem); //que actualice el estado con la informacion que estaba guardad en localStorage (parsedItem)
        setLoading(false); //luego que cargue la aplicacion y deje de cargar loading pasa a false
      } catch(error) {
         // En caso de un error lo guardamos en el estado
        setError(error);
      }
    }, 3000); //tiempo de espera 1 segundo
  });
  
// Actualizamos la función para guardar nuestro item con las nuevas variables y parámetros
const saveItem = (newItem) => { //guardar la información
  // Manejamos la tarea dentro de un try/catch por si ocurre algún error
 try {
 const stringifiedItem = JSON.stringify(newItem); //la primera información convertida en texto//
 localStorage.setItem(itemName, stringifiedItem); //guardar la información//
 setItem(newItem);
} catch(error) {
// En caso de algún error lo guardamos en el estado
setError(error);
}
};

// Regresamos los datos que necesitamos
// Para tener un mejor control de los datos retornados, podemos regresarlos dentro de un objeto
return {
item,
saveItem,
loading,
error,
};
}

export { useLocalStorage };