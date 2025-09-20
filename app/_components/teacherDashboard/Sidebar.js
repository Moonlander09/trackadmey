"use client";

import { FaHome, FaChartPie, FaCalendarAlt } from "react-icons/fa";

export default function Sidebar({ activeTab, setActiveTab }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "summary", label: "Summary", icon: <FaChartPie /> },
    { id: "attendance", label: "Attendance", icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold mb-8 text-center text-[var(--btn-pmy)]">Teacher Panel</h2>
      <nav className="flex flex-col gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 font-semibold px-4 py-2 rounded-lg transition-colors ${
              activeTab === item.id
                ? "bg-[var(--btn-pmy)] text-white"
                  : "text-[var(--text-sdy)] hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}