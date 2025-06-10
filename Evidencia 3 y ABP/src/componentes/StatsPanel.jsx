function Stats({filteredProducts}) {
    
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

const precioPromedio = filteredProducts.length > 0
  ? (precioTotal / filteredProducts.length).toFixed(2)
  : 0;
  
const cantidadPorCategoria = filteredProducts.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});

const stockMayor50 = filteredProducts.filter(p => p.stock > 50).length;
const ratingMayor45 = filteredProducts.filter(p => p.rating > 4.5).length;

const promedioPorCategoria = {};
filteredProducts.forEach(p => {
  if (!promedioPorCategoria[p.category]) promedioPorCategoria[p.category] = { total: 0, count: 0 };
  promedioPorCategoria[p.category].total += p.price;
  promedioPorCategoria[p.category].count += 1;
});

const extremosPorCategoria = {};
filteredProducts.forEach(p => {
  if (!extremosPorCategoria[p.category]) extremosPorCategoria[p.category] = { max: p, min: p };
  if (p.price > extremosPorCategoria[p.category].max.price) extremosPorCategoria[p.category].max = p;
  if (p.price < extremosPorCategoria[p.category].min.price) extremosPorCategoria[p.category].min = p;
});

const ratingPromedio = filteredProducts.length > 0
  ? (filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length).toFixed(2)
  : 0;

const ratingPorCategoria = {};
filteredProducts.forEach(p => {
  if (!ratingPorCategoria[p.category]) ratingPorCategoria[p.category] = { total: 0, count: 0 };
  ratingPorCategoria[p.category].total += p.rating;
  ratingPorCategoria[p.category].count += 1;
});

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Estadísticas de Productos</h2>
      <ul className="list-disc pl-5">
        <li>Total de productos: {filteredProducts.length}</li>
        <li>Precio promedio: ${precioPromedio}</li>
        <li>Precio máximo: ${productoMasCaro ? productoMasCaro.price : 'N/A'}</li>
        <li>Precio mínimo: ${productoMasBarato ? productoMasBarato.price : 'N/A'}</li>
        <li>Producto más caro: {productoMasCaro ? `${productoMasCaro.title} - $${productoMasCaro.price}` : 'N/A'}</li>
        <li>Producto más barato: {productoMasBarato ? `${productoMasBarato.title} - $${productoMasBarato.price}` : 'N/A'}</li>
        <li>Precio total de productos: ${precioTotal.toFixed(2)}</li>
        <li>Promedio de descuento: {promedioDescuento}%</li>
        <li>Cantidad con stock &gt; 50: {stockMayor50}</li>
        <li>Cantidad con rating &gt; 4.5: {ratingMayor45}</li>
        <li>Promedio de rating general: {ratingPromedio}</li>
      </ul>
      <h3 className="font-bold mt-4">Cantidad de productos por categoría:</h3>
      <ul>
        {Object.entries(cantidadPorCategoria).map(([cat, cant]) => (
          <li key={cat}>{cat}: {cant}</li>
        ))}
      </ul>
      <h3 className="font-bold mt-4">Precio promedio por categoría:</h3>
      <ul>
        {Object.entries(promedioPorCategoria).map(([cat, obj]) => (
          <li key={cat}>{cat}: ${(obj.total / obj.count).toFixed(2)}</li>
        ))}
      </ul>
      <h3 className="font-bold mt-4">Producto más caro y más barato por categoría:</h3>
      <ul>
        {Object.entries(extremosPorCategoria).map(([cat, obj]) => (
          <li key={cat}>
            {cat}: Más caro: {obj.max.title} (${obj.max.price}) | Más barato: {obj.min.title} (${obj.min.price})
          </li>
        ))}
      </ul>
      <h3 className="font-bold mt-4">Promedio de rating por categoría:</h3>
      <ul>
        {Object.entries(ratingPorCategoria).map(([cat, obj]) => (
          <li key={cat}>{cat}: {(obj.total / obj.count).toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;