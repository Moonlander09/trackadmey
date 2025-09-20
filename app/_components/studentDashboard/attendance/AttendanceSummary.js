"use client";

import { motion } from "framer-motion";
import AttendanceCard from "./AttendanceCard";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function AttendanceSummary({ data, loading }) {

  // i created this loading skeleton cards to make seamless integration when data is loading
  if (loading) {
    // Show skeleton placeholders while waiting
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-gray-100 animate-pulse h-32 flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full mb-3"></div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-12 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Normal cards when data is ready
  const cards = [
    {
      id: "total",
      label: "Total Sessions",
      value: data.total,
      icon: <FaCalendarAlt className="text-[var(--btn-pmy)] text-2xl" />,
    },
    {
      id: "present",
      label: "Present",
      value: data.present,
      icon: <FaCheckCircle className="text-[var(--present)] text-2xl" />,
    },
    {
      id: "absent",
      label: "Absent",
      value: data.absent,
      icon: <FaTimesCircle className="text-[var(--absent)] text-2xl" />,
    },
    {
      id: "percentage",
      label: "Percentage",
      value: `${data.percentage}%`,
      icon: <FaCheckCircle className="text-purple-500 text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AttendanceCard {...card} />
        </motion.div>
      ))}
    </div>
  );
}