//Actividad 2

const persona = {
    nombre: "Lucía",
    edad: 28,
    profesion: "Diseñadora"
  };
  
  // a) desestructuración
  const { nombre, edad, profesion } = persona;
  console.log(`${nombre} tiene ${edad} años y trabaja como ${profesion}.`);
  
  // b) propiedad ciudad
  persona.ciudad = "Rosario";
  console.log(persona);
