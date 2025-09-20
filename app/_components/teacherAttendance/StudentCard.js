"use client";
import React from "react";
import { motion } from "framer-motion";

const StudentCard = ({ student, status, toggleStatus }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 "
    >
      <div className="flex items-center justify-between">
        {/* Student Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] flex items-center justify-center text-white font-bold text-sm shadow-md">
            {student.firstName?.charAt(0)?.toUpperCase() || 'S'}
          </div>
          
          {/* Student Details */}
          <div>
            <p className="font-semibold text-sm ">
              {student.firstName} {student.lastName || ''}
            </p>
            <p className="text-xs text-gray-500 font-medium">{student.studentId}</p>
          </div>
        </div>

        {/* Status Toggle Button */}
        <button
          onClick={() => toggleStatus(student._id)}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
            status === "present"
              ? "bg-green-100 text-green-800 border-2 border-green-200 hover:bg-green-200"
              : "bg-red-100 text-red-800 border-2 border-red-200 hover:bg-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full ${
                status === "present" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            {status === "present" ? "Present" : "Absent"}
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default StudentCard;