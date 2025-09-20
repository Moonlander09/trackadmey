"use client";

import { useAuth } from "@/helper/AuthContext";
import { motion } from "framer-motion";

export default function ProfileInfo() {
  const { user, apiLoading } = useAuth();

  if (apiLoading) return null;

  const profile = user?.data;
  const isStudent = profile?.role === "student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-8 border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--btn-pmy)]">
        Profile Information
      </h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[var(--text-sdy)]"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="font-medium text-[var(--text-pmy)]">First Name:</span>{" "}
          {profile?.firstName}
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="font-medium text-[var(--text-pmy)]">Last Name:</span>{" "}
          {profile?.lastName}
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="font-medium text-[var(--text-pmy)]">Gender:</span>{" "}
          {profile?.gender}
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="font-medium text-[var(--text-pmy)]">Email:</span>{" "}
          {profile?.email}
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="font-medium text-[var(--text-pmy)]">Role:</span>{" "}
          {profile?.role}
        </motion.p>

        {isStudent && (
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="sm:col-span-2"
          >
            <span className="font-medium text-[var(--text-pmy)]">Student ID:</span>{" "}
            {profile?.studentId}
          </motion.p>
        )}

        {profile?.subjects?.length > 0 && (
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="sm:col-span-2"
          >
            <span className="font-medium text-[var(--text-pmy)] block mb-2">Subjects:</span>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((sub) => (
                <span
                  key={sub._id}
                  className="px-3 py-1 text-sm bg-[var(--btn-sdy)]/10 text-[var(--btn-sdy)] font-medium rounded-lg"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}