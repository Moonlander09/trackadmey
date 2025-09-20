"use client";

import { motion } from "framer-motion";
import { FaCalendarCheck, FaCalendarTimes, FaPercentage } from "react-icons/fa";

export default function SubjectWiseCards({ data }) {
  const cards = [
    {
      id: "totalSessions",
      label: "Total Sessions",
      value: data.totalSessions,
      icon: <FaCalendarCheck className="text-blue-500 text-2xl" />,
    },
    {
      id: "present",
      label: "Present",
      value: data.present,
      icon: <FaCalendarCheck className="text-green-500 text-2xl" />,
    },
    {
      id: "absent",
      label: "Absent",
      value: data.absent,
      icon: <FaCalendarTimes className="text-red-500 text-2xl" />,
    },
    {
      id: "percentage",
      label: "Attendance %",
      value: `${data.percentage}%`,
      icon: <FaPercentage className="text-purple-500 text-2xl" />,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6 flex flex-col items-center justify-center text-center text-sm md:text-base"
        >
          {card.icon}
          <h2 className="mt-3 font-semibold">{card.label}</h2>
          <p className=" mt-1 font-bold">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
}