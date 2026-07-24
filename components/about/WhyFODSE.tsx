"use client";

import { motion } from "framer-motion";
import { TrendingUp, Lightbulb, BarChart2, Layers } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "A Field of the Future",
    description:
      "Data Science is one of the fastest-growing career domains today, opening doors across industries — from healthcare to finance to technology.",
  },
  {
    icon: Lightbulb,
    title: "Built on Real Experience",
    description:
      "FODSE was founded by students who were already working in the field and understood firsthand what it takes to break into it — and wanted to make that path easier for others.",
  },
  {
    icon: BarChart2,
    title: "Raising the Bar",
    description:
      "We're committed to elevating the quality of data science work happening on campus, and making the field more visible and accessible to every student at SVCE.",
  },
  {
    icon: Layers,
    title: "One Community, Many Interests",
    description:
      "From analytics to big data to machine learning, FODSE serves as the single focal point for students across the spectrum of data-driven disciplines.",
  },
];

export default function WhyFODSE() {
  return (
    <section className="py-24 sm:py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Why FODSE?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary max-w-xl">
            Reasons to Be Part of This
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-surface border border-border rounded-2xl p-8 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-200">
                <reason.icon size={18} className="text-accent-light" />
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                {reason.title}
              </h3>
              <p className="text-text-muted leading-relaxed text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
