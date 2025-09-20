"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";


export default function Hero() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Track Smarter, <br /> Not Harder
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your all-in-one platform for smart attendance and tracking.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >

           <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 hover:-translate-y-0.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"
                >
                  Get Started
                  <MdOutlineStart />
                </Link>
            <Link
                  href="/aboutus"
                  className="flex items-center gap-1.5 hover:-translate-y-0.5 border-2 border-[var(--btn-sdy)] hover:bg-[var(--btn-sdy)] hover:text-white text-[var(--btn-sdy)] font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"
                >
                 
                  Learn More
                  <IoIosArrowForward/>
                </Link>
          </motion.div>
        </motion.div>

        {/* Right Content (Image / Illustration) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex-1 flex justify-center mt-10 md:mt-0"
        >
          <Image
            src="/hero2.png"
            alt="Hero Illustration"
            width={500}
            height={500}
            className="w-[500px] md:w-[700px] h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}