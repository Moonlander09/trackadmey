"use client";
import React from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

const AttendanceTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "create",
      label: "Create Attendance",
      icon: FaPlus,
    },
    {
      id: "update", 
      label: "Update Attendance",
      icon: FaEdit,
    }
  ];

  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-2 mx-2 md:m-0">
      <div className="flex relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex-1 justify-center ${
                isActive
                  ? "bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white shadow-inner transform translate-y-0.5"
                  : "text-[var(--text-sdy)] hover:text-[var(--text-pmy)] hover:bg-gray-100 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner"
              }`}
            >
              <Icon className={`text-2xl ${isActive ? "text-white" : "text-[var(--text-pmy)]"}`} />
              <span className="font-medium">{tab.label}</span>
            
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTabs;