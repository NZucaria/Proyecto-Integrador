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
