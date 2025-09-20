"use client";
import React, { useEffect, useState } from "react";
import SummaryCharts from "./SummaryCharts";
import StudentTable from "./StudentTable";
import DistributionChart from "./DistributionChart";
import { useAuth } from "@/helper/AuthContext";
import { FaBookOpen, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Loading from "../../Loading";

const Summary = () => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/teacher/${subjectId}/summary`,
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
  ];

  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" space-y-6">
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
      {data.totalSessions === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-lg p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold  mb-2">
              No summary data available
            </h2>
            <p>You haven&#39;t created any session yet for this subject.</p>
          </div>
        </motion.div>
      ) : (
        <>
          <SummaryCharts students={data.students} />
          <DistributionChart students={data.students} />
          <StudentTable students={data.students} />
        </>
      )}
    </div>
  );
};

export default Summary;
