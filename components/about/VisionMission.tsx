"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

const missionPoints = [
  "To provide structured mentorship and guidance for students working on Data Science and AI/ML projects",
  "To bridge the gap between classroom learning and industry-relevant skills",
  "To create accessible opportunities — through workshops, webinars, and hands-on events — for students at every skill level",
  "To build a strong, collaborative community of data enthusiasts within SVCE",
];

export default function VisionMission() {
  return (
    <section className="py-24 sm:py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-2xl p-8 lg:p-10 card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center mb-6">
              <Eye size={20} className="text-accent-light" />
            </div>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-text-muted leading-relaxed">
              To be the definitive hub at SVCE for data-driven innovation — a place
              where students don't just learn concepts, but apply them to solve real
              problems, build real projects, and shape real careers.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-8 lg:p-10 card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center mb-6">
              <Target size={20} className="text-accent-light" />
            </div>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-4">
              Our Mission
            </h3>
            <ul className="space-y-3">
              {missionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-text-muted text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
