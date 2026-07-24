"use client";

import { motion } from "framer-motion";
import { Wrench, Users, Globe, Lightbulb, Network } from "lucide-react";

const objectives = [
  {
    number: "01",
    icon: Wrench,
    title: "Skill Development",
    description:
      "Conduct regular workshops, bootcamps, and technical sessions on tools and concepts in Data Science, ML, and AI.",
  },
  {
    number: "02",
    icon: Users,
    title: "Mentorship",
    description:
      "Pair students with experienced mentors to guide them through projects, competitions, and research.",
  },
  {
    number: "03",
    icon: Globe,
    title: "Exposure",
    description:
      "Organize guest lectures and webinars featuring professionals and researchers from the data science industry.",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Encourage participation in hackathons and case-study challenges that solve real-world problems using data.",
  },
  {
    number: "05",
    icon: Network,
    title: "Community Building",
    description:
      "Foster a peer network where students can collaborate, discuss ideas, and grow together.",
  },
];

export default function Objectives() {
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
            Our Objectives
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary max-w-xl">
            What We Set Out to Do
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent hidden lg:block" />

          <div className="space-y-8">
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="lg:pl-20 relative"
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-0 w-12 h-12 rounded-full bg-surface border-2 border-accent/40 items-center justify-center z-10">
                  <obj.icon size={16} className="text-accent-light" />
                </div>

                <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8 card-hover">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-5xl font-bold text-border-subtle leading-none shrink-0 mt-1">
                      {obj.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                        {obj.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
