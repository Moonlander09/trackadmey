"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import AttendanceCards from "./AttendanceCards";
import AttendanceChart from "./AttendanceChart";
import AttendanceTable from "./AttendanceTable";
import { useAuth } from "@/helper/AuthContext";
import Link from "next/link";
import { FaCalendarPlus } from "react-icons/fa";
import Loading from "../../Loading";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.data?.subjects?.length > 0) {
      setSubjectId(user.data.subjects[0]._id);
    } else if (user) {
      setLoading(false);
      setMessage("You are not assigned to any subjects.");
    }
  }, [user]);

  useEffect(() => {
    const formatDateForAPI = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    async function fetchAttendanceData() {
      setLoading(true);
      setData(null);
      setMessage("");

      const formattedDate = formatDateForAPI(selectedDate);
      const urlAPI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/teacher/${subjectId}?date=${formattedDate}`;

      try {
        const res = await fetch(urlAPI, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (result.status === "success") {
          if (result.data) {
            setData(result.data);
          } else if (result.message) {
            setMessage(result.message);
          }
        } else {
          setMessage(result.message || "Could not retrieve attendance data.");
          toast.error(result.message || "An error occurred.");
        }
      } catch (error) {
        setMessage("An unexpected network error occurred.");
        toast.error("An unexpected network error occurred.");
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) {
      fetchAttendanceData();
    }
  }, [subjectId, selectedDate]);

  // Helper function to check if the selected date is today.
  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isToday = isSameDay(selectedDate, new Date());
  // Helper to check if date is Sunday
  const isSunday = (date) => date.getDay() === 0;

  if (loading) {
    return <Loading/>;
  }

  // View for when no attendance data is found
  if (!data) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select date range"
            wrapperClassName="w-full"
            className="mt-1 min-w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
            maxDate={new Date()}
          />
        </div>

        <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-12 flex flex-col gap-6 items-center">

          <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-lg p-8 text-center max-w-md">

           <h2 className="text-2xl font-bold  mb-2">No Attendance data available</h2>
          <p>
            {`${message} - ${selectedDate.toLocaleDateString()}.`}
          </p>
          </div>

          {isToday && !isSunday(selectedDate) && (
            <div>
              <Link
                href="/attendance"
                className="flex justify-center items-center gap-1.5 hover:-translate-y-0.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"
              >
                <FaCalendarPlus /> Take Attendance
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Main view when attendance data exists
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select date range"
          wrapperClassName="w-full"
          className="mt-1 min-w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
          maxDate={new Date()}
        />
      </div>

      <AttendanceCards
        totalStudents={data.totalStudents}
        totalPresent={data.totalPresent}
        totalAbsent={data.totalAbsent}
        percentagePresent={data.percentagePresent}
        date={data.date}
      />

      <AttendanceChart
        totalPresent={data.totalPresent}
        totalAbsent={data.totalAbsent}
      />

      <AttendanceTable attendanceList={data.attendanceList} />
    </div>
  );
};

export default Attendance;
