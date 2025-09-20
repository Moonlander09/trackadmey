"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // green, red

const SummaryCharts = ({ students }) => {
  const chartData = students.map((s, index) => ({
    name: `${index + 1}`,
    fullName: s.firstName,
    Present: s.presentCount,
    Absent: s.absentCount,
  }));

  // Pie data = overall present vs absent
  const totalPresent = students.reduce((sum, s) => sum + s.presentCount, 0);
  const totalAbsent = students.reduce((sum, s) => sum + s.absentCount, 0);

  const pieData = [
    { name: "Present", value: totalPresent },
    { name: "Absent", value: totalAbsent },
  ];

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

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold mb-2 text-gray-900">
            {data.fullName}
          </p>
          <div className="space-y-1">
            {payload.map((item, index) => (
              <p key={index} className="text-sm" style={{ color: item.color }}>
                <span className="font-medium">{item.dataKey}:</span>{" "}
                {item.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6">
        <h3 className="text-center md:text-left font-semibold mb-4">
          Attendance by Student
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey={"name"}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              label={{
                value: "Students",
                position: "insideBottom",
                offset: -10,
                style: {
                  textAnchor: "middle",
                  fontSize: "14px",
                  fill: "#6b7280",
                  fontWeight: "bold",
                },
              }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar
              dataKey="Present"
              fill="#10B981"
              radius={[2, 2, 0, 0]}
              animationDuration={800}
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.1))" }}
            />
            <Bar
              dataKey="Absent"
              fill="#EF4444"
              radius={[2, 2, 0, 0]}
              animationDuration={800}
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.1))" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6">
        <h3 className="font-semibold text-center md:text-left mb-4">
          Overall Attendance
        </h3>
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
    </div>
  );
};

export default SummaryCharts;
