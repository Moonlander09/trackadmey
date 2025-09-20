"use client";

import { useAuth } from "@/helper/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {  FaSpinner } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const{fetchUser}=useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
    
      if (res.ok) {
        toast.success(data.message);
        await fetchUser();
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 md:p-8 max-w-7xl mx-auto ">
      <div className="flex min-h-[600px]">

      {/* Left Side (hidden on small screens) */}
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
          Manage student attendance with ease, insights, and simplicity.
        </motion.p>
      </div>

      {/* Right Side (Form) */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                placeholder="••••••••"
                />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white font-semibold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                              <>
                                <FaSpinner className="animate-spin text-xl" />
                                Signing In...
                              </>
                            ) : (
                              <>
                                <FiLogIn className="text-xl" />
                                Sign In
                              </>
                            )}
            </motion.button>
          </form>

          {/* Links */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/signup" className="hover:text-[var(--btn-pmy)]">
              Don’t have an account? Sign up
            </Link>
            <Link
              href="/forgotpassword"
              className="hover:text-[var(--btn-pmy)]"
              >
              Forgot password?
            </Link>
          </div>
        </motion.div>
      </div>
              </div>
    </section>
  );
}
