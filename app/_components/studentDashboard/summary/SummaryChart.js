"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function SummaryChart({ overall, subjects }) {
  const overallData = [
    { name: "Present", value: overall.present },
    { name: "Absent", value: overall.absent },
  ];

  const pieData = [
    { name: "Present", value: overall.present },
    { name: "Absent", value: overall.absent },
  ];

  const COLORS = ["var(--present)", "var(--absent)"];

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold mb-2 text-gray-900">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Attendance:</span> {data.percentage}
              %
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Present:</span> {data.present}/
              {data.total}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Absent:</span> {data.absent}/
              {data.total}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Color gradient based on percentage
  const getBarColor = (percentage) => {
    const perc = parseFloat(percentage);
    if (perc >= 80) return "#10b981"; // Green
    if (perc >= 60) return "#f59e0b"; // Yellow/Orange
    if (perc >= 40) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Overall Donut */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6">
        <h2 className="text-center md:text-left font-semibold mb-4">
          Overall Attendance
        </h2>
        <ResponsiveContainer width="100%" height={250}>
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
                  style={{
                    outline: "none",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px", outline: "none" }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Subject-wise Bar */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6">
        <h2 className="text-center md:text-left font-semibold mb-4">
          Subject-wise Attendance %
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={subjects}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeOpacity={0.6}
              vertical={false}
            />
            <XAxis
              dataKey="subjectName"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar
              dataKey="percentage"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              animationBegin={0}
            >
              {subjects.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.percentage)}
                  stroke="none"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
