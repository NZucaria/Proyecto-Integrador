import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#fa8072"];

function GraficosPanel({ productos }) {
  // cantidad de productos por categoria (BarChart)
  const cantidadPorCategoria = Object.entries(
    productos.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([cat, cant]) => ({ categoria: cat, cantidad: cant }));

  // lineChart
  
  const preciosEvolucion = productos.slice(0, 20).map((p, i) => ({
    fecha: `Día ${i + 1}`,
    precio: p.price
  }));

  // proporcion de productos según stock
  const stockData = [
    { name: "Stock > 50", value: productos.filter(p => p.stock > 50).length },
    { name: "Stock 1-50", value: productos.filter(p => p.stock > 0 && p.stock <= 50).length },
    { name: "Sin stock", value: productos.filter(p => p.stock === 0).length }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 my-8">
      {/* grafico de barras */}
      <div>
        <h3 className="text-lg font-bold mb-2">Cantidad por Categoría</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={cantidadPorCategoria}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* grafico de lineas */}
      <div>
        <h3 className="text-lg font-bold mb-2">Evolución de Precios (simulada)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={preciosEvolucion}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="precio" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* pie chart */}
      <div>
        <h3 className="text-lg font-bold mb-2">Proporción por Stock</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={stockData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {stockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GraficosPanel;