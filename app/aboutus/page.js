"use client";

import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdAssignment } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";

const steps = [
  {
    title: "Sign In",
    subtitle: "Secure Access",
    description: "Log in to TrackAdemy to start managing attendance seamlessly.",
    icon: <FaUserCircle size={36} />,
  },
  {
    title: "Dashboard",
    subtitle: "Quick Overview",
    description: "Access your personalized dashboard for students or teachers.",
    icon: <MdDashboard size={36} />,
  },
  {
    title: "Mark Attendance",
    subtitle: "One Click",
    description: "Easily record daily attendance with smart tracking tools.",
    icon: <MdAssignment size={36} />,
  },
  {
    title: "Reports & Summary",
    subtitle: "Stay Informed",
    description: "Get instant analytics with attendance summaries and percentages.",
    icon: <AiOutlineBarChart size={36} />,
  },
];

/* Motion variants */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutUs() {
  return (
    <section className="pt-16 pb-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero / Intro */}
        <motion.h1
          initial={{ opacity: 0, y: -28, scale: 0.995 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text"
        >
          About TrackAdemy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          TrackAdemy is built to simplify attendance tracking for students and teachers with a
          smart, intuitive, and efficient platform.
        </motion.p>

        {/* optional thin divider */}
        <div className="mt-8 w-3/5 mx-auto h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        {/* Cards grid (staggered on scroll) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                rotate: 2,
                boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="p-6 bg-white dark:bg-gray-800 border-2 border-transparent rounded-xl shadow-sm cursor-pointer"
              style={{ borderColor: "transparent" }}
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-lg bg-[color:var(--try)]/40 text-[var(--btn-pmy)] mb-4">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold">{step.title}</h3>
              <h4 className="text-sm text-[var(--text-sdy)] font-medium mt-1">
                {step.subtitle}
              </h4>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}