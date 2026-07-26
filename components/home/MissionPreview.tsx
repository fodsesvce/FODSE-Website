"use client";

import { motion } from "framer-motion";

export default function MissionPreview() {
  return (
    <section className="py-24 sm:py-32 border-t border-border bg-surface/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-6">
            Our Mission
          </p>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary leading-snug mb-8">
            "Turning Data into Insight,{" "}
            <span className="text-text-muted">One Idea at a Time.</span>"
          </blockquote>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-8" />
          <p className="text-text-muted text-lg leading-relaxed">
            What We Do - We host hands-on workshops, expert-led webinars,
            hackathons, and real-world case studies that go beyond textbooks.
            Whether you're just starting out or already building models, FODSE
            gives you a community, mentors, and the momentum to grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
