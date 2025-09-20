"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SubjectWiseChart({ data }) {
  const chartData = [
    { name: "Present", value: data.present },
    { name: "Absent", value: data.absent },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium mb-1">{`${label}`}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm font-semibold" style={{ color: item.color }}>
              {`Count: ${item.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6">
      <h2 className="text-center md:text-left font-semibold mb-4">Attendance Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            strokeOpacity={0.6}
          />
          <XAxis 
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px', outline: 'none' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="var(--btn-pmy)"
            strokeWidth={3}
            dot={{ 
              fill: 'var(--btn-pmy)', 
              strokeWidth: 2, 
              r: 5,
              stroke: '#fff'
            }}
            activeDot={{ 
              r: 7, 
              stroke: 'var(--btn-pmy)', 
              strokeWidth: 2, 
              fill: '#fff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
            animationDuration={800}
            animationBegin={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}