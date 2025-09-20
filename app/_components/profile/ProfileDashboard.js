"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import UserProfile from "./UserProfile";
import ProfilePasswordChange from "./ProfilePasswordChange";

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "change-password":
        return <ProfilePasswordChange />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 h-[600px]  rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">{renderContent()}</div>

      {/* Toolbar for mobile */}
      <motion.div initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }} className="md:hidden fixed bottom-0 mx-3 mb-1.5 left-0 right-0 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg">
        <Toolbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    </div>
  );
}