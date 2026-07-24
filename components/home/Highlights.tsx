"use client";

import { motion } from "framer-motion";
import { FlaskConical, Mic2, Zap, Users, Brain, Trophy } from "lucide-react";

const highlights = [
  {
    icon: FlaskConical,
    title: "Hands-on Workshops",
    description: "Workshops on ML, AI & Data Analytics",
  },
  {
    icon: Mic2,
    title: "Guest Lectures",
    description: "Guest lectures from industry experts",
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "Hackathons & case-study challenges",
  },
  {
    icon: Brain,
    title: "Mentorship",
    description: "Mentor-guided project development",
  },
  {
    icon: Users,
    title: "Community",
    description: "A growing community of data enthusiasts at SVCE",
  },
  {
    icon: Zap,
    title: "Real-World Skills",
    description: "Industry-relevant tools and techniques",
  },
];

export default function Highlights() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Highlights
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary max-w-xl">
            What FODSE Offers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group bg-surface border border-border rounded-2xl p-6 card-hover cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-200">
                <item.icon size={18} className="text-accent-light" />
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
