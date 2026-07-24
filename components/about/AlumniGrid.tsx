"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

const alumni = [
  {
    name: "Mauriya Vijayaramachandran",
    degree: "BE. ECE, 2017–2021",
    badge: "Founder",
    current: "Currently pursuing PhD in AI at University of Erlangen Nuremberg, Germany",
  },
  {
    name: "Saurab",
    degree: "BE. EEE, 2018–2022",
    badge: null,
    current:
      "Currently pursuing MS in Business Analytics at Northeastern University, Boston",
  },
  {
    name: "Pradheepan",
    degree: "BTech IT, 2019–2022",
    badge: null,
    current: "Working Professional at Zoho",
  },
  {
    name: "Shruthi S",
    degree: "BE. CSE, 2018–2022",
    badge: null,
    current: "Currently pursuing MS at Warwick University, Canada",
  },
  {
    name: "Shruthi E",
    degree: "BE. ECE, 2018–2022",
    badge: null,
    current:
      "Currently pursuing MS in Business Analytics at University of Texas, Texas",
  },
  {
    name: "Uma Maheshwari D",
    degree: "BE. ECE, 2019–2023",
    badge: null,
    current:
      "Currently pursuing MS in Business Analytics at Northeastern University, Boston",
  },
  {
    name: "Swaeta L",
    degree: "BE. ECE, 2019–2023",
    badge: null,
    current: "Working Professional at Emerson Electric Co",
  },
  {
    name: "Shreya R",
    degree: "B.Tech IT, 2020–2024",
    badge: null,
    current: "Currently pursuing MBA in Big Data Analytics at Goa Institute of Management",
  },
  {
    name: "Mohanishwar",
    degree: "BE. EEE, 2020–2024",
    badge: null,
    current:
      "Business Development Executive, WelkinRim Technologies (IITM Incubated)",
  },
];

export default function AlumniGrid() {
  return (
    <section className="py-24 sm:py-32 border-b border-border bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Alumni
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary max-w-xl">
            Our Illustrious Alumni
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {alumni.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-surface border border-border rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center shrink-0">
                  <GraduationCap size={16} className="text-white" />
                </div>
                {person.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-accent/15 text-accent-light border border-accent/20 rounded-full">
                    {person.badge}
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
                {person.name}
              </h3>
              <p className="text-xs text-text-muted font-medium mb-4">{person.degree}</p>

              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-text-muted leading-relaxed">{person.current}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
