"use client";

import { motion } from "framer-motion";
import { FaUserCheck, FaShieldAlt, FaBolt } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaUserCheck className="text-4xl text-[var(--btn-pmy)]" />,
      title: "Smart Attendance",
      desc: "Track and manage attendance in real-time with zero hassle.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-[var(--btn-pmy)]" />,
      title: "Secure & Reliable",
      desc: "Your data is protected with enterprise-grade security.",
    },
    {
      icon: <FaBolt className="text-4xl text-[var(--btn-pmy)]" />,
      title: "Easy Integration",
      desc: "Works seamlessly with your workflow and devices.",
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text"
        >
          Why Choose Us?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Smart attendance and tracking that’s fast, reliable, and built for
          you.
        </motion.p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.04,
                rotate: [0, 2, -2, 2, -2, 0],
                transition: { duration: 0.35 },
              }}
              whileTap={{ scale: 0.97 }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
