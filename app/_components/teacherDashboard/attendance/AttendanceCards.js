"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBusinessTime, FaCalendarAlt, FaCalendarCheck, FaCalendarTimes, FaPercentage, FaUsers } from "react-icons/fa";

const AttendanceCards = ({
  totalStudents,
  totalPresent,
  totalAbsent,
  percentagePresent,
  date,
}) => {
  const cards = [
    {
      label: "Date",
      value: new Date(date).toLocaleDateString(),
      icon: <FaCalendarAlt className="text-orange-500 text-2xl" />,
    },
    {
      label: "Total Students",
      value: totalStudents,
      icon: <FaUsers className="text-[var(--btn-pmy)] text-2xl" />,
    },
    {
      label: "Present",
      value: totalPresent,
      icon: <FaCalendarCheck className="text-[var(--present)] text-2xl" />,
    },
    {
      label: "Absent",
      value: totalAbsent,
      icon: <FaCalendarTimes className="text-[var(--absent)] text-2xl" />,
    },
    {
      label: "Percentage",
      value: `${percentagePresent}%`,
      icon: <FaPercentage className="text-purple-500 text-2xl" />,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={index}
          className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6 flex flex-col items-center justify-center text-center text-sm md:text-base"
        >
          {card.icon}
            <h2 className="mt-3 font-semibold">{card.label}</h2>
            <p className="mt-1 font-bold">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AttendanceCards;
