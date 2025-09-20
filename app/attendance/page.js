"use client";
import React, { useState } from "react";
import AttendanceTabs from "../_components/teacherAttendance/AttendanceTabs";
import CreateAttendance from "../_components/teacherAttendance/CreateAttendance";
import UpdateAttendance from "../_components/teacherAttendance/UpdateAttendance";

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState("create"); // "create" | "update"

  return (
    <main className="py-8 md:p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2 md:mb-6 text-center bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text">
            Attendance
          </h1>
          <p className="p-2 mx-2 mb-8 text-[var(--text-sdy)]">
            Mark students present or absent with one click, and update records anytime if you made an error. No stress, no hassle — just simple, smart attendance management.
          </p>
      <AttendanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {activeTab === "create" ? <CreateAttendance /> : <UpdateAttendance />}
      </div>
    </main>
  );
};

export default AttendancePage;