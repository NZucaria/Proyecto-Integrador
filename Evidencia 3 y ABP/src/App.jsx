import axios from "axios";
import React, { useEffect, useState, useRef} from "react";
import Card from "./componentes/card";
import Stats from "./componentes/StatsPanel";
import SearchBar from "./componentes/SearchBar";
import ProductList from "./componentes/ProductList";

function ListadoDeProductos() {
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);


  const containerRef = useRef(null);

  const limit = 20;

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`).then((response) => {
      setLista(response.data.products);
    });
  }, [page]);

  const filteredProducts = lista.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

   const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        containerRef.current.classList.toggle("dark-mode");
    };

  return (
    <div ref={containerRef}>
      <h1 className="text-6xl font-bold text-center my-4">Productos</h1>
      <button
        onClick={toggleDarkMode}
        className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-150 transition"
      >
        Modo {darkMode ? "Claro" : "Oscuro"}
      </button>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        {filteredProducts.length === 0 && <div>No se encontraron productos</div>}

      <ProductList products={filteredProducts} />

      <div className="flex gap-2 my-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-150 transition"
        >
          Anterior
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-150 transition"
        >
          Siguiente
        </button>

        <button
          onClick={() => setShow(!show)}
          className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-150 transition"
        >
          {show ? "Ocultar Estadísticas" : "Mostrar Estadísticas"}
        </button>
      </div>

      {show && <Stats filteredProducts={filteredProducts} />}
      
    </div>
  );
}

export default ListadoDeProductos;