"use client";

import TeacherDashboard from "../_components/teacherDashboard/TeacherDashboard";
import StudentDashboard from "../_components/studentDashboard/StudentDashboard";
import { useAuth } from "@/helper/AuthContext";
import Link from "next/link";
import {motion} from "framer-motion";
import { LuLayoutDashboard } from "react-icons/lu";
import Loading from "../loading";

export default function DashboardPage() {
  const { user, apiLoading } = useAuth();

  if (apiLoading) return <Loading />;

  // If user is not logged in
  if (!user) {
    return (
      <main className="py-8 md:p-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }} className=" flex flex-col items-center ">
          <h1 className="text-3xl font-bold mb-2 md:mb-6 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] bg-clip-text text-transparent">
            Welcome to Dashboard
          </h1>
          <p className="p-2 mx-2 mb-8 text-[var(--text-sdy)]">
            Please sign in to access your personalized dashboard and track your academic progress.
          </p>
          <Link
            href="/signin"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          ><LuLayoutDashboard/>
            Access Dashboard
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="py-8 md:p-8 max-w-7xl mx-auto">
      {user.data.role === "teacher" ? (
        <>
          <h1 className="text-3xl font-bold mb-2 md:mb-6 text-center bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] bg-clip-text text-transparent">
            Teacher Dashboard
          </h1>
          <p className="p-2 mx-2 mb-8 text-[var(--text-sdy)]">
            This dashboard provides a visual summary of your subject, including
            attendance records and student performance data. Track your
            students&#39; progress easily with these interactive tools.
          </p>
          <TeacherDashboard />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2 md:mb-6 text-center bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="p-2 mx-2 mb-8 text-[var(--text-sdy)]">
            This is your personal dashboard to help you stay organized and on
            track. Here, you can check your attendance record, view your
            performance across different subjects, and see a summary of your
            academic progress. Let&#39;s make it a successful day!
          </p>
          <StudentDashboard />
        </>
      )}
    </main>
  );
}