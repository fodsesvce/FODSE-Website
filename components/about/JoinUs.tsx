"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const whyJoin = [
  "Learn from workshops and expert sessions",
  "Participate in hackathons and competitions",
  "Build real-world projects with peers",
  "Improve technical and communication skills",
  "Network with seniors, alumni, and industry professionals",
  "Take up leadership and organizing roles",
];

const howToJoin = [
  "Register through the official recruitment form when registrations open.",
  "Attend the recruitment process, which may include an interview or assessment based on the role you apply for.",
  "Get selected and receive confirmation from the FODSE team.",
  "Begin your journey by contributing to events, projects, and club activities.",
];

export default function JoinUs() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Join Us
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary max-w-xl">
            Why Join FODSE?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Why join */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-2xl p-8"
          >
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Benefits of Joining
            </h3>
            <ul className="space-y-3.5">
              {whyJoin.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who can join + how */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-8"
          >
            <h3 className="font-display text-xl font-bold text-text-primary mb-3">
              Who Can Join?
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Membership is open to all enthusiastic students who are eager to learn,
              innovate, and contribute to the data science community.
            </p>
            <h4 className="font-display text-base font-semibold text-text-secondary mb-4">
              How to Join
            </h4>
            <ol className="space-y-3.5">
              {howToJoin.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-text-muted text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25"
          >
            Contact Us to Join
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
