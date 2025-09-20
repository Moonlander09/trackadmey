"use client";
import { motion } from "framer-motion";

export default function SummaryMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-12 flex justify-center"
    >
      <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-lg p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold  mb-2">No summary data available</h2>
        <p>Your attendance has not been registered yet.</p>
      </div>
    </motion.div>
  );
}
