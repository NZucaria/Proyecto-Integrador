//Actividad 3 

function procesar(array, callback) {
    const nuevoArray = array.map(callback);
    return nuevoArray;
  }