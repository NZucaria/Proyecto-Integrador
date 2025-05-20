// Saludo.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function ListadoDeProductos() {
  const [lista, setlista] = useState([]);
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setlista(response.data.products);
    });
  }, []);
    // 1. El producto más caro (mostrar el nombre y el precio).
  const precios = lista.map(p => p.price);
  const precioMaximo = Math.max(...precios);
  const productoMasCaro = lista.find(p => p.price === precioMaximo);

  // 2. El producto más barato (mostrar el nombre y el precio).
  const precioMinimo = Math.min(...precios);
  const productoMasBarato = lista.find(p => p.price === precioMinimo);

  // 3. La cantidad de productos cuyo título contiene más de 20 caracteres.
  const productosConTituloLargo = lista.filter(producto => producto.title.length > 20).length;

  // 4. El precio total de todos los productos filtrados.
  const precioTotalFiltrado = lista.reduce((total, producto) => total + producto.price, 0);

  // 5. El promedio de descuento (discountPercentage) de los productos filtrados.
  const promedioDescuentoFiltrado = lista.reduce((sum, producto) => sum + producto.discountPercentage, 0) / lista.length;

  // 6. Otra estadística propuesta: Promedio de precio de los productos.
  const promedioPrecio = precios.reduce((a, b) => a + b, 0) / precios.length;
  return (
    <>
      {lista?.map((producto) => { <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"></div>
        return ( 
          <div className=" border p-4 m-2">
            <h1 className="text-xl">{producto.title} <b>{producto.price}</b></h1>
            <p className="mt-2">Descripcion: {producto.description}</p>
          </div> 
        )
      })}
    </>
  );
}

export default ListadoDeProductos;
