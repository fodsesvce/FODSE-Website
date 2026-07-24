"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section className="py-24 sm:py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              How FODSE Began
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 space-y-6"
          >
            <p className="text-text-muted text-lg leading-relaxed">
              The Forum of Data Science Engineers (FODSE) was founded on{" "}
              <span className="text-text-secondary font-medium">6th December 2020</span>,
              born out of a collaborative initiative between IETE and AIT, SVCE. It
              began with a simple observation — data science was rapidly emerging as
              one of the most transformative fields of our time, yet there was no
              single space on campus where students could explore it together.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              A group of students who had already begun working in the field saw its
              potential and set out to build that space — a forum where anyone curious
              about data, algorithms, and intelligent systems could learn, experiment,
              and grow under proper mentorship.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Today, FODSE stands as a thriving community for students passionate about{" "}
              <span className="text-text-secondary font-medium">
                Data Science, Data Analytics, Machine Learning, Artificial Intelligence,
                and Statistics.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
