"use client";

import { useAuth } from "@/helper/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaUsers,
  FaCalendarCheck,
  FaCalendarTimes,
} from "react-icons/fa";
import Loading from "../Loading";

export default function DashboardHome() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState(null);
  const { user } = useAuth();


  useEffect(() => {
    // Check if the user object and the subjects array are available.
    if (user?.data?.subjects?.length > 0) {
      const firstSubjectId = user.data.subjects[0]._id;
      setSubjectId(firstSubjectId);
    }
  }, [user]);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/teacher/${subjectId}/dashboard`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();
        if (result.status === "success") {
          setData(result.data);
        } 
      } catch (error) {
        toast.error("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    }
    if (subjectId) {
      fetchDashboardData();
    }
  }, [subjectId]);

  const cards = [
    {
      id: "subject",
      label: "Subject",
      value: data.subject,
      icon: <FaBookOpen className="text-[var(--btn-pmy)] text-2xl" />,
    },
    {
      id: "totalSessions",
      label: "Total Sessions",
      value: data.totalSessions,
      icon: <FaCalendarCheck className="text-[var(--present)] text-2xl" />,
    },
    {
      id: "totalStudents",
      label: "Total Students",
      value: data.totalStudents,
      icon: <FaUsers className="text-purple-500 text-2xl" />,
    },
    {
      id: "todaySession",
      label: "Today’s Session",
      value: data.todaySession ? "Available" : "Not Created",
      icon: data.todaySession ? (
        <FaCalendarCheck className="text-[var(--present)] text-2xl" />
      ) : (
        <FaCalendarTimes className="text-[var(--absent)] text-2xl" />
      ),
    },
  ];

  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      {/* Cards grid */}
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
            <p className="mt-1 font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA if todaySession is null */}
      {!data.todaySession && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-4"
        ><p className="text-[var(--text-sdy)] text-center">You haven&#39;t created an attendance session for today yet. Get started now to mark student attendance.</p>
          <Link href='/attendance' className="flex items-center gap-1.5 hover:-translate-y-0.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"><FaCalendarCheck/> Create Attendance</Link>
        </motion.div>
      )}
    </div>
  );
}
