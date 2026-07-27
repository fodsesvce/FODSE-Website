"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "7+", label: "Years Active" },
  { value: "8+", label: "Events Hosted" },
  { value: "200+", label: "Members Mentored" },
  { value: "9+", label: "Alumni Network" },
];

export default function AboutPreview() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
              About FODSE
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-tight mb-6">
              What Drives Us
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              To cultivate a culture of data-driven thinking on campus - equipping
              students with the skills, mentorship, and platform they need to turn
              curiosity into capability, and ideas into impact.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              We host hands-on workshops, expert-led webinars, hackathons, and
              real-world case studies that go beyond textbooks. Whether you're just
              starting out or already building models, FODSE gives you a community,
              mentors, and the momentum to grow.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-semibold text-sm transition-colors duration-200"
            >
              Read our full story
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-surface border border-border rounded-2xl p-8 card-hover"
              >
                <div className="font-display text-4xl font-bold text-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
