"use client";

import { FaHome, FaCalendarAlt, FaBookOpen, FaChartPie } from "react-icons/fa";

export default function Sidebar({ activeTab, setActiveTab }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "attendance", label: "Attendance", icon: <FaCalendarAlt /> },
    { id: "subject wise", label: "Subject-Wise", icon: <FaBookOpen /> },
    { id: "summary", label: "Summary", icon: <FaChartPie /> },
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