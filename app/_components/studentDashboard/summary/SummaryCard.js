"use client";

import { FaCalendarCheck, FaCalendarTimes, FaPercent, FaUsers } from "react-icons/fa";
import {motion} from "framer-motion";

export default function SummaryCard({ overall }) {
  const overallCards = 
       [
          {
            id: "total",
            label: "Total Sessions",
            value: overall.total,
            icon: <FaUsers className="text-[var(--btn-pmy)] text-2xl" />,
          },
          {
            id: "present",
            label: "Present",
            value: overall.present,
            icon: <FaCalendarCheck className="text-[var(--present)] text-2xl" />,
          },
          {
            id: "absent",
            label: "Absent",
            value: overall.absent,
            icon: <FaCalendarTimes className="text-[var(--absent)] text-2xl" />,
          },
          {
            id: "percentage",
            label: "Attendance %",
            value: `${overall.percentage}%`,
            icon: <FaPercent className="text-purple-500 text-2xl" />,
          },
        ]
      ;
  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overallCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-4 md:p-6 flex flex-col items-center justify-center text-center text-sm md:text-base"
              >
                {card.icon}
                <h2 className="mt-3 font-semibold">{card.label}</h2>
                <p className=" mt-1  font-bold">{card.value}</p>
              </motion.div>
            ))}
          </div>
  );
}