"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface p-12 md:p-16 text-center"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Join Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6 max-w-2xl mx-auto leading-tight">
            Ready to Start Your Data Science Journey?
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Membership is open to all enthusiastic students who are eager to learn,
            innovate, and contribute to the data science community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border-subtle bg-background hover:bg-surface text-text-secondary font-semibold rounded-xl transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
