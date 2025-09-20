"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { LuLayoutDashboard, LuNotebookPen, LuBadgeInfo } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import {
  navbarVariants,
  logoVariants,
  desktopLinksParentVariants,
  desktopLinkVariants,
  linkVariants,
  menuVariants,
} from "../_config/animation";
import { useAuth } from "@/helper/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useAuth();

  // 👇 derive authentication and role from user
  const authentication = !!user;
  const role = user?.data?.role;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <section className="my-6 mx-3">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className="bg-[var(--pmy)] text-[var(--text-pmy)] w-full z-50 max-w-7xl mx-auto h-20 rounded-xl relative shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] backdrop-blur-lg backdrop-opacity-65 border border-[var(--border)]/15"
      >
        <div className="w-full h-full px-4 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 font-bold cursor-pointer text-xl"
          >
            <motion.span
              variants={logoVariants}
              className="inline-flex items-center"
            >
              <Image
                src="/logo.png"
                alt="TrackAdemy Logo"
                width={100}
                height={100}
                priority
                className="w-10 h-10 object-contain"
              />
            </motion.span>
            <motion.span
              variants={logoVariants}
              className="bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text"
            >
              TrackAdmey
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <motion.div
            variants={desktopLinksParentVariants}
            className="hidden md:flex items-center gap-8 font-semibold"
          >
            <motion.div variants={desktopLinkVariants}>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 hover:text-[var(--text-sdy)] cursor-pointer hover:-translate-y-0.5 transition ease-in border-transparent hover:border-[var(--text-sdy)] border-2 p-1.75 rounded-xl"
              >
                <LuLayoutDashboard /> Dashboard
              </Link>
            </motion.div>

            {/* Attendance only for teacher */}
            {role === "teacher" && (
              <motion.div variants={desktopLinkVariants}>
                <Link
                  href="/attendance"
                  className="flex items-center gap-1.5 hover:text-[var(--text-sdy)] cursor-pointer hover:-translate-y-0.5 transition ease-in border-transparent hover:border-[var(--text-sdy)] border-2 p-1.75 rounded-xl"
                >
                  <LuNotebookPen /> Attendance
                </Link>
              </motion.div>
            )}

            <motion.div variants={desktopLinkVariants}>
              <Link
                href="/aboutus"
                className="flex items-center gap-1.5 hover:text-[var(--text-sdy)] cursor-pointer hover:-translate-y-0.5 transition ease-in border-transparent hover:border-[var(--text-sdy)] border-2 p-1.75 rounded-xl"
              >
                <LuBadgeInfo /> About Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Auth button */}
          <motion.div
            className="hidden md:flex items-center font-semibold"
            variants={desktopLinksParentVariants}
          >
            {authentication ? (
              <motion.div variants={desktopLinkVariants}>
                <Link
                  href="/myaccount"
                  className="flex items-center gap-1.5 hover:-translate-y-0.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"
                >
                  <FaUser />
                  {user?.data?.firstName}
                </Link>
              </motion.div>
            ) : (
              <motion.div variants={desktopLinkVariants}>
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 hover:-translate-y-0.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"
                >
                  <FaUser /> Sign In
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-[var(--text-pmy)]"
            aria-label="Toggle menu"
            type="button"
          >
            <motion.span
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="inline-block"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={menuRef}
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute w-[calc(100%-1.5rem)] mt-4 py-12 text-md bg-[var(--pmy)] shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] backdrop-blur-lg backdrop-opacity-85 border border-[var(--border)]/15 rounded-xl items-center font-semibold z-40 origin-top left-3"
            style={{ transformOrigin: "top center" }}
          >
            <div className="flex flex-col gap-10 items-center">
              <motion.div
                variants={linkVariants}
                style={{ width: "100%" }}
                className="flex justify-center"
              >
                {authentication ? (
                  <Link
                    href="/myaccount"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer"
                  >
                    <FaUser /> {user?.data?.firstName}
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 bg-[var(--btn-pmy)] hover:bg-[var(--btn-pmy)]/80 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer"
                  >
                    <FaUser /> Sign In
                  </Link>
                )}
              </motion.div>

              <motion.div variants={linkVariants}>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 hover:text-[var(--text-sdy)] cursor-pointer"
                >
                  <LuLayoutDashboard /> Dashboard
                </Link>
              </motion.div>

              {/* Attendance only for teacher */}
              {role === "teacher" && (
                <motion.div variants={linkVariants}>
                  <Link
                    href="/attendance"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 hover:text-[var(--text-sdy)] cursor-pointer"
                  >
                    <LuNotebookPen /> Attendance
                  </Link>
                </motion.div>
              )}

              <motion.div variants={linkVariants}>
                <Link
                  href="/aboutus"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 hover:text-[var(--text-sdy)] cursor-pointer"
                >
                  <LuBadgeInfo /> About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
