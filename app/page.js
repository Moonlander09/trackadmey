"use client";
import { motion } from "framer-motion";
import Hero from "./_components/Hero";

import Testimonials from "./_components/Testimonials";
import Features from "./_components/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features/>
      <Testimonials />
    </>
  );
}
