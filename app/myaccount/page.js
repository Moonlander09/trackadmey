"use client";

import { motion } from "framer-motion";
import ProfileDashboard from "../_components/profile/ProfileDashboard";


export default function ProfilePage() {

  return (
    <main className="py-8 md:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl mb-6 md:mb-12 font-bold bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] bg-clip-text text-transparent text-center">
          My Profile
        </h1>

        <ProfileDashboard/>
      </motion.div>
    </main>
  );
}
