import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from 'recharts';

// Professional color palette
const COLORS = {
  increase: {
    light: '#10b981',
    dark: '#059669',
    gradient: ['#34d399', '#10b981'],
  },
  decrease: {
    light: '#ef4444',
    dark: '#dc2626',
    gradient: ['#f87171', '#ef4444'],
  },
  neutral: {
    light: '#fbbf24',
    dark: '#f59e0b',
    gradient: ['#fcd34d', '#fbbf24'],
  },
  background: '#f8fafc',
  grid: '#e2e8f0',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
};

const getColor = (diff) => {
  if (diff > 0) return COLORS.increase;
  if (diff < 0) return COLORS.decrease;
  return COLORS.neutral;
};

// Enhanced gradient bar component
const GradientBar = ({ x, y, width, height, color }) => {
  return (
    <defs>
      <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLORS[color]?.gradient[0] || color} />
        <stop offset="100%" stopColor={COLORS[color]?.gradient[1] || color} />
      </linearGradient>
    </defs>
  );
};

// Professional Tooltip with trend indicators
const ProfessionalTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const colorSet = getColor(data.diff);
  const symbol = data.diff > 0 ? '↗' : data.diff < 0 ? '↘' : '→';
  const percentage = data.prevPrice 
    ? `${((data.diff / data.prevPrice) * 100).toFixed(1)}%`
    : null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">Date</span>
        <span className="font-semibold text-gray-900">{label}</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">Price</span>
        <span className="text-2xl font-bold text-gray-900">৳{data.price.toLocaleString()}</span>
      </div>

      {data.diff !== 0 && (
        <div className="flex items-center justify-between p-3 rounded-md" 
             style={{ backgroundColor: `${colorSet.light}15` }}>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorSet.light }} />
            <span className="font-medium" style={{ color: colorSet.dark }}>
              {data.diff > 0 ? 'Increased' : 'Decreased'}
            </span>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg" style={{ color: colorSet.dark }}>
              {symbol} ৳{Math.abs(data.diff).toLocaleString()}
            </div>
            {percentage && (
              <div className="text-sm" style={{ color: colorSet.dark }}>
                {percentage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Axis tick for better readability
const CustomAxisTick = ({ x, y, payload }) => {
  const date = new Date(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill={COLORS.text.secondary}
        className="text-sm"
      >
        {date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })}
      </text>
    </g>
  );
};

// Legend component
const ChartLegend = () => (
  <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
    <div className="flex items-center">
      <div className="w-4 h-4 rounded mr-2" style={{ background: `linear-gradient(135deg, ${COLORS.increase.gradient[0]}, ${COLORS.increase.gradient[1]})` }} />
      <span className="text-sm text-gray-600">Price Increase</span>
    </div>
    <div className="flex items-center">
      <div className="w-4 h-4 rounded mr-2" style={{ background: `linear-gradient(135deg, ${COLORS.decrease.gradient[0]}, ${COLORS.decrease.gradient[1]})` }} />
      <span className="text-sm text-gray-600">Price Decrease</span>
    </div>
    <div className="flex items-center">
      <div className="w-4 h-4 rounded mr-2" style={{ background: `linear-gradient(135deg, ${COLORS.neutral.gradient[0]}, ${COLORS.neutral.gradient[1]})` }} />
      <span className="text-sm text-gray-600">No Change</span>
    </div>
  </div>
);

const PriceComparisonChart = ({ prices = [] }) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const sorted = [...prices].sort((a, b) => new Date(a.date) - new Date(b.date));

  const dataWithDiff = sorted.map((p, i) => {
    if (i === 0) return { 
      ...p, 
      diff: 0, 
      color: 'neutral',
      prevPrice: null 
    };
    
    const prevPrice = sorted[i - 1].price;
    const diff = p.price - prevPrice;
    const color = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'neutral';
    
    return {
      ...p,
      diff,
      color,
      prevPrice,
    };
  });

  // Calculate statistics for the header
  const totalChange = dataWithDiff[dataWithDiff.length - 1]?.price - dataWithDiff[0]?.price;
  const avgChange = totalChange / (dataWithDiff.length - 1);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 mt-10 border border-gray-100">
      {/* Header with stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Price Trend Analysis</h3>
          <p className="text-gray-500 mt-1">Daily price changes and trends</p>
        </div>
        
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="text-center">
            <div className="text-sm text-gray-500">Total Change</div>
            <div className={`text-xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChange >= 0 ? '↗' : '↘'} ৳{Math.abs(totalChange).toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Avg. Daily Change</div>
            <div className={`text-xl font-bold ${avgChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {avgChange >= 0 ? '↗' : '↘'} ৳{Math.abs(avgChange).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataWithDiff}
            margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            barSize={48}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setHoveredBar(e.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <defs>
              {Object.keys(COLORS).map(key => {
                if (COLORS[key]?.gradient) {
                  return (
                    <linearGradient 
                      key={key} 
                      id={`gradient-${key}`} 
                      x1="0" 
                      y1="0" 
                      x2="0" 
                      y2="1"
                    >
                      <stop offset="0%" stopColor={COLORS[key].gradient[0]} />
                      <stop offset="100%" stopColor={COLORS[key].gradient[1]} />
                    </linearGradient>
                  );
                }
                return null;
              })}
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={COLORS.grid}
              strokeOpacity={0.5}
            />
            
            <XAxis 
              dataKey="date" 
              tick={<CustomAxisTick />}
              axisLine={{ stroke: COLORS.grid }}
              tickLine={false}
            />
            
            <YAxis 
              axisLine={{ stroke: COLORS.grid }}
              tickLine={false}
              tick={{ fill: COLORS.text.secondary, fontSize: 12 }}
              tickFormatter={(value) => `৳${value.toLocaleString()}`}
            />
            
            <Tooltip 
              content={<ProfessionalTooltip />}
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            />
            
            <Bar
              dataKey="price"
              radius={[8, 8, 0, 0]}
              onMouseEnter={(data, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {dataWithDiff.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${entry.color})`}
                  strokeWidth={hoveredBar === index ? 2 : 0}
                  stroke="white"
                  strokeOpacity={0.8}
                  style={{
                    filter: hoveredBar === index 
                      ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
                      : 'none',
                    transition: 'all 0.2s ease',
                    opacity: hoveredBar === null || hoveredBar === index ? 1 : 0.7,
                  }}
                />
              ))}
              
              <LabelList
                dataKey="diff"
                position="top"
                formatter={(val) => {
                  if (val === 0) return '—';
                  return `${val > 0 ? '↗' : '↘'}`;
                }}
                style={{
                  fill: COLORS.text.primary,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and additional info */}
      <ChartLegend />
      
      {/* Trend summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Period: {dataWithDiff.length} days</span>
          <span>Total data points: {dataWithDiff.length}</span>
          <span>Updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceComparisonChart;