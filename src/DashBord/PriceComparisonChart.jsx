import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceComparisonChart = ({ prices = [] }) => {
  const sorted = [...prices].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10 border border-gray-200">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 text-lg">↗</span>
        <h3 className="text-lg font-semibold text-gray-800">
          Price Trend (Onion - Last 7 Days)
        </h3>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sorted}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [`price : ${value}`, ""]}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#15803d"
              strokeWidth={3}
              dot={{ r: 4, fill: "#15803d" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceComparisonChart;