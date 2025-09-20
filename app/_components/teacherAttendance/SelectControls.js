"use client";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const SelectControls = ({ markAllPresent, markAllAbsent }) => {
  return (
    <div className="flex flex-col text-sm sm:flex-row gap-3 ">
      <button
        onClick={markAllPresent}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
      >
        <FaCheck className="text-sm" />
        Mark All Present
      </button>
      <button
        onClick={markAllAbsent}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
      >
        <FaTimes className="text-sm" />
        Mark All Absent
      </button>
    </div>
  );
};

export default SelectControls;