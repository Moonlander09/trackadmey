"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarCheck,
  FaCalendarTimes,
  FaUsers,
  FaPercent,
  FaBookOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { fetchDashboardData } from "@/helper/StudentAPI";
import Loading from "../Loading";

export default function DashboardHome() {
  // Date range state
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // API data state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const urlAPI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/student/dashboard`;

  // Run API when page loads or date range changes
  useEffect(() => {
    if (!startDate && !endDate) {
      // no range → fetch default (full dashboard)
      fetchDashboardData(setData, setLoading, urlAPI);
      return;
    }

    if (startDate && endDate) {
      const from = startDate.toISOString().split("T")[0];
      const to = endDate.toISOString().split("T")[0];
      fetchDashboardData(setData, setLoading, urlAPI, from, to);
    }
  }, [startDate, endDate, urlAPI]);

  const overallCards = data
    ? [
        {
          id: "total",
          label: "Total Sessions",
          value: data.overall.total,
          icon: <FaUsers className="text-[var(--btn-pmy)] text-2xl" />,
        },
        {
          id: "present",
          label: "Present",
          value: data.overall.present,
          icon: <FaCalendarCheck className="text-[var(--present)] text-2xl" />,
        },
        {
          id: "absent",
          label: "Absent",
          value: data.overall.absent,
          icon: <FaCalendarTimes className="text-[var(--absent)] text-2xl" />,
        },
        {
          id: "percentage",
          label: "Attendance %",
          value: `${data.overall.percentage}%`,
          icon: <FaPercent className="text-purple-500 text-2xl" />,
        },
      ]
    : [];

  const hasData = data && data.overall.total > 0;

  if(loading){
    return <Loading/>
  }

  return (
    <div>
      {/* Date Range Picker */}
      <div className="mb-6 text-center">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          isClearable={true}
          placeholderText="Select date range"
          wrapperClassName="w-full"
          className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
        />
      </div>


      {!loading && hasData ? (
        <>
          {/* Overall Stats */}
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

          {/* Subject-wise stats */}
          <div className="mb-8">
            <h2 className="text-xl text-center sm:text-left text-[var(--btn-pmy)] font-semibold mb-4">
              Subjects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.subjects.map((subj, index) => (
                <motion.div
                  key={subj.subjectId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-5 transition"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaBookOpen className="text-indigo-500" />
                    {subj.subjectName}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-[var(--btn-pmy)]" />
                      <span>Total: {subj.total}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-[var(--present)]" />
                      <span>Present: {subj.present}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTimesCircle className="text-[var(--absent)]" />
                      <span>Absent: {subj.absent}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPercent
                        className={
                          parseFloat(subj.percentage) < 50
                            ? "text-[var(--absent)]"
                            : "text-[var(--present)]"
                        }
                      />
                      <span>Percentage: {subj.percentage}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Low attendance */}
          {data.lowAttendance.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl text-center sm:text-left text-[var(--btn-pmy)] font-semibold mb-4">
                Low Attendance Warning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {data.lowAttendance.map((subj, index) => (
                  <motion.div
                    key={subj.subjectId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-300 shadow-lg p-5 transition"
                  >
                    <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                      <FaExclamationTriangle className="text-[--absent]" />{" "}
                      {subj.subjectName}
                    </h3>
                    <div className="grid grid-cols-2 gap-4  text-sm text-red-800">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-[var(--btn-pmy)]" />
                        <span>Total: {subj.total}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-[var(--present)]" />
                        <span>Present: {subj.present}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaTimesCircle className="text-[var(--absent)]" />
                        <span>Absent: {subj.absent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPercent className="text-[var(--absent)]" />
                        <span>Percentage: {subj.percentage}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        !loading && (
          // If no data
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-lg p-8 text-center max-w-md">
              <h2 className="text-2xl font-bold  mb-2">
                No Attendance Data Found
              </h2>
              <p>
                It looks like your dashboard hasn’t been created yet. Once
                attendance records are added, you’ll see your stats here.
              </p>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}
