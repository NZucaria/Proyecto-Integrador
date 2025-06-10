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
  
  return (
    <div >
      <h2 className="text-2xl font-bold mb-4">Estadísticas de Productos</h2>
      <ul className="list-disc pl-5">
        <li>Total de productos: {filteredProducts.length}</li>
        <li>Producto más caro: {productoMasCaro ? `${productoMasCaro.title} - $${productoMasCaro.price}` : 'N/A'}</li>
        <li>Producto más barato: {productoMasBarato ? `${productoMasBarato.title} - $${productoMasBarato.price}` : 'N/A'}</li>
        <li>Precio total de productos: ${precioTotal.toFixed(2)}</li>
        <li>Promedio de descuento: {promedioDescuento}%</li>
      </ul>
    </div>
  );
}

export default Stats;