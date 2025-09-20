"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useParams();



  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resetpassword/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirmPassword }),  
      });

      const data = await res.json();

      if(data.status === "success"){
        toast.success(data.message);
        router.push('/signin');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-8 md:p-8 max-w-7xl mx-auto ">
      <div className="flex min-h-[600px]">
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
            Set a new password for your account.
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
              Reset Password
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Enter your new password below
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmpassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white font-semibold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    Updating...
                  </>
                ) : (
                  <>
                    <MdLockReset className="text-xl" />
                    Update Password
                  </>
                )}
              </motion.button>
            </form>

            {/* Back to Sign In */}
            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
              Go back to{" "}
              <Link
                href="/signin"
                className="hover:text-[var(--btn-pmy)] font-bold"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
