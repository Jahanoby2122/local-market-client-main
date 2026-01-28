import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

const PriceGraph = ({ product }) => {
  const trend = calculateTrend(product.prices);

  return (
    <div className="w-full md:w-3/4 bg-white rounded shadow p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{product.itemName}</h2>
        <p>Market: {product.marketName}</p>
        <p>Vendor: {product.vendor}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={product.prices}>
          <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), "MMM d")} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2">
        Trend: <span className={`font-bold ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
          {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
        </span> last 7 days
      </p>
    </div>
  );
};

const calculateTrend = (prices) => {
  if (prices.length < 2) return 0;
  const first = prices[0].price;
  const last = prices[prices.length - 1].price;
  return ((last - first) / first) * 100;
};

export default PriceGraph;
