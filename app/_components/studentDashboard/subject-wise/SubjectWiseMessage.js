"use client";

import { motion } from "framer-motion";

export default function SubjectWiseMessage({ subject }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-12 flex justify-center"
    >
      <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-lg p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold  mb-2">
          No attendance data available yet for {subject}.
        </h2>
        <p>Please check back once attendance is recorded.</p>
      </div>
    </motion.div>
  );
}
