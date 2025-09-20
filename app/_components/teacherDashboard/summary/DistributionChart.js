// teacherDashboard/DistributionChart.js
"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["var(--present)", "#3b82f6", "#facc15", "#ef4444"];
// Green = Excellent, Blue = Good, Yellow = Average, Red = Poor

export default function DistributionChart({ students }) {
  // calculate category distribution
  const distribution = {
    excellent: 0,
    good: 0,
    average: 0,
    poor: 0,
  };

  students.forEach((s) => {
    const pct = parseFloat(s.percentage);
    if (pct >= 90) {
      distribution.excellent += 1;
    } else if (pct >= 70) {
      distribution.good += 1;
    } else if (pct >= 50) {
      distribution.average += 1;
    } else {
      distribution.poor += 1;
    }
  });

  const data = [
    { name: "Excellent (≥90%)", value: distribution.excellent },
    { name: "Good (70–89%)", value: distribution.good },
    { name: "Average (50–69%)", value: distribution.average },
    { name: "Poor (<50%)", value: distribution.poor },
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

  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6">
      <h3 className="text-center md:text-left font-semibold mb-2">
        Attendance Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, index) => (
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
            <Legend iconSize={10}
              wrapperStyle={{ paddingTop: "20px", 
                fontSize:"14px",outline: "none" }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
