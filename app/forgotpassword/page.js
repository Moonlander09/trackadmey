"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";

export default function ForgotPassword() {
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    console.log(email)
    setLoading(true);
    try{

    }catch(error){

    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="py-8 md:p-8 max-w-7xl mx-auto ">
      <div className ="flex min-h-[600px]">

      {/* Left Panel (branding, hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white p-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold"
        >
          TrackAdemy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-4 text-lg text-white/90 max-w-md text-center"
        >
          Reset your password by entering your registered email.
        </motion.p>
      </div>

      {/* Right Panel (form) */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your email to receive reset instructions
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input
               id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white font-semibold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Sending...
                </>
              ) : (
                <>
                  <MdLockReset className="text-xl" />
                  Send Forgot Password
                </>
              )}
            </motion.button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
            Remember your password?{" "}
            <Link href="/signin" className="hover:text-[var(--btn-pmy)]">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
                  </div>
    </section>
  );
}
