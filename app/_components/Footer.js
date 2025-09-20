"use client";
import { motion } from "framer-motion";
import { SiPivotaltracker } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="py-10 mt-16 from-[var(--grd-pmy)]/35 to-[var(--grd-sdy)]/35 bg-gradient-to-r">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Brand / About */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-1.5 font-bold text-xl"
        >
          <span className="inline-flex items-center">
            <SiPivotaltracker
              style={{ color: "var(--btn-pmy)" }}
              className="text-2xl"
            />
          </span>

          <span className="bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text">
            TrackAdmey
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-3 text-sm text-[var(--text-sdy)] max-w-md mx-auto"
        >
          Smarter attendance, seamless tracking — built for students and
          teachers.
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-[var(--text-sdy)]/25 pt-6 text-center text-sm ">
        © {new Date().getFullYear()} TrackAdemy. All rights reserved.
      </div>
    </footer>
  );
}
