"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AttendanceChart = ({ totalPresent, totalAbsent }) => {
  const data = [
    { name: "Present", value: totalPresent },
    { name: "Absent", value: totalAbsent },
  ];

  const COLORS = ["var(--present)", "var(--absent)"]; // green for present, red for absent
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

export default AttendanceChart;