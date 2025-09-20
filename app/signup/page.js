"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Loading from "../loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

export default function SignUp() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    if (role === "teacher" && selectedSubjects.length > 1) {
      setSelectedSubjects([]);
    }
  }, [role, selectedSubjects]);

  useEffect(() => {
    async function fetchSubjects() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/subjects`,
          {
            credentials: "include",
            method: "GET",
          }
        );
        const data = await res.json();
        if (data.status === "success") {
          setSubjects(data.subjects);
        }
      } catch (error) {
        toast.error("Error in fetching subjects");
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
    toast.error("Please select at least one subject!");
    return; // stop form submission
  }
    const payload = {
      firstName,
      lastName,
      gender,
      email,
      password,
      confirmPassword,
      role,
      subjects:selectedSubjects,
    };
   
    setApiLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
     
      if (res.ok) {
        toast.success(data.message);
        router.push("/signin");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Problem in Signing Up!");
    } finally {
      setApiLoading(false);
    }
    
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen py-8 md:p-8 max-w-7xl mx-auto flex">
      {/* Left Panel */}
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
          Create your account and start managing attendance easily.
        </motion.p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign up to get started
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)]"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)]"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
              />
            </div>

            {/* Subjects */}

            <div>
              <label className="block text-sm font-medium">Subjects</label>

              <div className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus-within:ring-2 focus-within:ring-[var(--btn-pmy)] relative">
                {/* Selected tags (show names, but we store IDs) */}
                <div className="flex flex-wrap gap">
                  {/* {selectedSubjects.length === 0 && (
                    <span className="text-sm text-gray-500">
                      No subjects selected
                    </span>
                  )} */}

                  {selectedSubjects.map((subjectId) => {
                    const subjectObj = subjects.find(
                      (s) => s._id === subjectId
                    );
                    return (
                      <span
                        key={subjectId}
                        className="flex items-center gap-2 bg-[var(--btn-pmy)] text-white px-2 py-1 rounded-full text-sm"
                      >
                        {subjectObj?.name ?? "Unknown"}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSubjects((prev) =>
                              prev.filter((id) => id !== subjectId)
                            )
                          }
                          className="ml-1 text-xs hover:text-red-300"
                          aria-label={`Remove ${subjectObj?.name ?? "subject"}`}
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>

                {/* Dropdown trigger */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="text-sm text-gray-500 dark:text-gray-400 w-full text-left"
                >
                  {role === "student"
                    ? "Select subjects (multiple allowed)"
                    : "Select one subject"}
                </button>

                {/* Dropdown list */}
                {dropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md z-10 max-h-40 overflow-y-auto">
                    {subjects.map((sub) => {
                      const isSelected = selectedSubjects.includes(sub._id);

                      return (
                        <div
                          key={sub._id}
                          onClick={() => {
                            if (role === "student") {
                              if (!isSelected) {
                                setSelectedSubjects((prev) => [
                                  ...prev,
                                  sub._id,
                                ]);
                              }
                            } else {
                              // teacher -> only one subject allowed
                              setSelectedSubjects([sub._id]);
                            }
                            setDropdownOpen(false);
                          }}
                          className={`px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isSelected ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                          role="button"
                          tabIndex={0}
                        >
                          <span>{sub.name}</span>
                          {isSelected && (
                            <span className="text-green-500 text-sm">✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {role === "student"
                  ? "You can select multiple subjects."
                  : "As a teacher, select only one subject."}
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white font-semibold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={apiLoading}
            >
              {apiLoading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Signing Up...
                </>
              ) : (
                <>
                  <MdOutlineFileUpload className="text-xl" />
                  Sign Up
                </>
              )}
            </motion.button>
          </form>

          {/* Links */}
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link href="/signin" className="hover:text-[var(--btn-pmy)]">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
