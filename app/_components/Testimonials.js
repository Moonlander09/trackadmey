"use client";

import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    role: "Student",
    icon: <FaUserGraduate className="text-4xl" />,
    quote: "This platform makes attendance effortless and smart.",
  },
  {
    id: 2,
    role: "Teacher",
    icon: <FaChalkboardTeacher className="text-4xl" />,
    quote: "Finally, a simple way to track students effectively.",
  },
  {
    id: 3,
    role: "Student",
    icon: <FaUserGraduate className="text-4xl" />,
    quote: "I love how smooth and intuitive it feels to use.",
  },
  {
    id: 4,
    role: "Teacher",
    icon: <FaChalkboardTeacher className="text-4xl" />,
    quote: "This saves me hours every week. Highly recommend!",
  },
];

export default function TestimonialSlider() {
  // duplicate for smooth looping
  const track = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold bg-gradient-to-r text-center from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-transparent bg-clip-text"
        >
          What Our Users Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 mb-8 text-[var(--text-sdy)] dark:text-gray-300 text-center"
        >
          Hear from students and teachers who love TrackAdmey.
        </motion.p>

        {/* Marquee wrapper */}
        <div className="group py-10 relative overflow-hidden rounded-xl">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent z-20" />

          {/* Track */}
          <div className="testimonial-track group-hover:[animation-play-state:paused]">
            {track.map((t, i) => (
              <motion.div
                key={`${t.id}-${i}`}
                className="
                  shrink-0 min-w-[300px] max-w-sm 
                  bg-[var(--sdy)] border rounded-xl 
                  border-[var(--border)]/60 
                  shadow-sm p-6 
                  flex flex-col items-center text-center
                "
                whileHover={{
                  scale: 1.06,
                  y: -6,
                  boxShadow: "0 7px 10px rgba(0,0,0,0.18)",
                  borderColor: "var(--btn-pmy)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div
                  className="
                    grid place-items-center h-16 w-16 rounded-full 
                    bg-[color:var(--try)]/40
                  "
                  style={{ color: "var(--btn-pmy)" }}
                >
                  {t.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[var(--text-pmy)]">
                  {t.role}
                </h3>
                <p className="mt-3 text-[var(--text-sdy)] italic">
                  “{t.quote}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
