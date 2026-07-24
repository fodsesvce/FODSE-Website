"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const contacts = [
  {
    role: "President",
    name: "ASWATH S",
    phone: "84381 03061",
    gradient: "from-blue-900 to-blue-700",
    initials: "AS",
  },
  {
    role: "Vice President",
    name: "HARISH S",
    phone: "93609 78060",
    gradient: "from-indigo-900 to-indigo-700",
    initials: "HS",
  },
  {
    role: "Chief Technical Officer",
    name: "YESESWINI S",
    phone: "95851 19687",
    gradient: "from-slate-800 to-blue-800",
    initials: "YS",
  },
];

export default function ContactCards() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
        Contact Us
      </h2>
      <div className="space-y-4">
        {contacts.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-5 card-hover"
          >
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}
            >
              <span className="font-display font-bold text-lg text-white/80">
                {c.initials}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-accent-light font-semibold mb-0.5">{c.role}</p>
              <h3 className="font-display font-bold text-text-primary text-lg">{c.name}</h3>
            </div>
            <a
              href={`tel:${c.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle hover:border-accent/40 bg-background text-sm text-text-muted hover:text-text-primary transition-all duration-200"
            >
              <Phone size={14} className="text-accent" />
              <span className="font-medium">{c.phone}</span>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
