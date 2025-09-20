"use client";

import { FaHome, FaChartPie, FaCalendarAlt, FaBookOpen } from "react-icons/fa";

export default function Toolbar({ activeTab, setActiveTab }) {
    const items = [
      { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
      { id: "attendance", label: "Attendance", icon: <FaCalendarAlt /> },
      { id: "subject wise", label: "Subject-Wise", icon: <FaBookOpen /> },
      { id: "summary", label: "Summary", icon: <FaChartPie /> },
    ];

  return (
    <nav className="flex justify-around p-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col font-semibold items-center gap-1 text-sm ${
            activeTab === item.id
              ? "text-[var(--btn-pmy)]"
              : "text-[var(--text-sdy)] hover:text-gray-700"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}