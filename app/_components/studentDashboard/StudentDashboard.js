"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import DashboardHome from "./DashboardHome";
import Attendance from "./attendance/Attendance";
import SubjectWise from "./subject-wise/SubjectWise";
import Summary from "./summary/Summary";
import {motion} from 'framer-motion'



export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome/>;
      case "summary":
        return <Summary/>;
      case "attendance":
        return <Attendance/>;
        case 'subject wise':
          return <SubjectWise/>;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex mx-2 md:m-0">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 h-[600px]  rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 md:pb-2 md:px-6 md:h-[600px] md:overflow-y-auto scrollbar-hide">
        {renderContent()}
      </div>

      {/* Toolbar for mobile */}
      <motion.div initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}  className="md:hidden fixed bottom-0 mx-3 mb-1.5 left-0 right-0 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg">
        <Toolbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    </div>
  );
}