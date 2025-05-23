// Saludo.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

function ListadoDeProductos() {
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState("");
  const[show, setShow] = useState(true);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setLista(response.data.products);
    });
  }, []);

  const filteredProducts = lista.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()));
 

  //total de productos
const TotalProducts = filteredProducts.length;

//precios maximos
const MaxProduct = Math.max(...filteredProducts.map((p) => p.price));

//producto mas caro y barato
const productoMasCaro = filteredProducts.reduce((max, p) => p.price > (max?.price ?? -Infinity) ? p : max, null);

const productoMasBarato = filteredProducts.reduce((min, p) => p.price < (min?.price ?? Infinity) ? p : min, null);

//precio total
const precioTotal = filteredProducts.reduce((total, p) => total + p.price, 0);

//descuento
const promedioDescuento = filteredProducts.length > 0
  ? (filteredProducts.reduce((acc, p) => acc + p.discountPercentage, 0) / filteredProducts.length).toFixed(2)
  : 0;

  return (
    <>
      <input
        type="text"
        placeholder="Buscar producto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 m-2"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredProducts.map((producto) => (
          <div key={producto.id} className="border p-4 m-2 bg-purple-100 rounded shadow transition duration-300 hover:shadow-lg">
            <h1 className="text-xl">
              {producto.title} <b>{producto.price}</b>
            </h1>
            <p className="mt-2">Descripcion: {producto.description}</p>
          </div>
        ))}
      </div>

<button onClick={() => setShow(!show)}
  className="border p-4 m-2 bg-purple-100 text-black px-4 py-2 rounded shadow hover:bg-purple-700 transition"> Ocultar </button>

{show && (
       <div className="bg-gray-100 rounded p-4 mt-4 shadow transition duration-300">
  <h2 className="text-xl">Estadísticas</h2>
  <p>Productos totales: {TotalProducts}</p>
  <p>Precio máximo: {MaxProduct}</p>
  <p>Producto más caro: {productoMasCaro ? `${productoMasCaro.title} ($${productoMasCaro.price})` : 'N/A'}</p>
  <p>Producto más barato: {productoMasBarato ? `${productoMasBarato.title} ($${productoMasBarato.price})` : 'N/A'}</p>
  <p>Precio total: ${precioTotal}</p>
  <p>Promedio de descuento: {promedioDescuento}%</p>
</div>)}

    </>
  );
}

export default ListadoDeProductos;