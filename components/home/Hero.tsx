"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div
        className="gradient-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface text-xs text-text-muted mb-8 font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Sri Venkateswara College of Engineering
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-[1.05] tracking-tight mb-6"
        >
          Forum of{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">
              Data Science
            </span>
          </span>
          <br />
          Engineers
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-display font-semibold text-text-secondary mb-4 tracking-tight"
        >
          Where Data Meets Discovery
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-10"
        >
          FODSE is SVCE's premier community for students driven by curiosity in Data
          Science, Machine Learning, Artificial Intelligence, and Analytics. We bring
          together learners, builders, and thinkers who believe data isn't just
          numbers - it's the language of tomorrow's decisions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-accent/25"
          >
            Explore FODSE
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle bg-surface hover:bg-surface-2 text-text-secondary font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            View Events
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-faint"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
