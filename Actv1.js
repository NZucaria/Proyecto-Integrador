
//Actividad 1

// Declaración de variables
const nombre = "Ana";
const edad = 22;
console.log(`Hola, me llamo ${nombre} y tengo ${edad} años.`);

// Array de números
const numeros = [3, 7, 12, 5, 2];

// a) Numeros al cuadrado
const cuadrados = numeros.map(num => num * num);
console.log("Cuadrados:", cuadrados);

// b) Numeros mayores a 5
const mayoresA5 = numeros.filter(num => num > 5);
console.log("Mayores a 5:", mayoresA5);

// c) Funcion flecha par-impar
const esParOImpar = num => (num % 2 === 0 ? "par" : "impar");
numeros.forEach(num => console.log(`El número ${num} es ${esParOImpar(num)}.`));
