"use client";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function AttendanceChart({ history }) {
  const presentCount = history.filter((h) => h.status === "present").length;
  const absentCount = history.filter((h) => h.status === "absent").length;

  const pieData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];

  const barData = history.map((h) => ({
    date: new Date(h.date).toLocaleDateString(),
    status: h.status,
    present: h.status === "present" ? 1 : 0,
    absent: h.status === "absent" ? 1 : 0,
  }));

  const COLORS = ["#10b981", "#ef4444"]; // green, red

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium mb-1">{`Date: ${label}`}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {`${item.name}: ${item.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6 flex flex-col items-center justify-center text-center">
        <h2 className="font-semibold mb-4">Overall Attendance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              animationBegin={0}
              animationDuration={800}
            >
              {pieData.map((_, index) => (
                <Cell 
                  key={index} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                  style={{ outline: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px', outline: 'none' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6 flex flex-col items-center justify-center text-center">
        <h2 className=" font-semibold mb-4">Attendance Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              domain={[0, 1]}
              ticks={[0, 1]}
            />
            <Tooltip content={<CustomLineTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px', outline: 'none' }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="present"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
              name="Present"
            />
            <Line
              type="monotone"
              dataKey="absent"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: '#fff' }}
              name="Absent"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}