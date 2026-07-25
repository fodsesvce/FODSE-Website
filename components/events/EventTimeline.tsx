"use client";

import { motion } from "framer-motion";
import { Calendar, Users2, Sparkles } from "lucide-react";

type Event = {
  id: number;
  title: string;
  timeline: string | null;
  collaborators: string | null;
  description: string;
  highlights: string[];
};

type Props = {
  events: Event[];
};

// Header gradient swatches (vibrant, unique per card)
const cardGradients = [
  "from-indigo-600 via-indigo-900 to-purple-900",
  "from-purple-600 via-violet-900 to-indigo-900",
  "from-cyan-600 via-indigo-950 to-purple-950",
  "from-fuchsia-600 via-purple-900 to-rose-900",
  "from-blue-600 via-blue-950 to-indigo-950",
  "from-violet-600 via-purple-900 to-fuchsia-900",
  "from-emerald-600 via-teal-900 to-cyan-950",
  "from-rose-600 via-rose-950 to-indigo-950",
];

export default function EventTimeline({ events }: Props) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => {
            const gradient = cardGradients[i % cardGradients.length];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative h-[440px] rounded-3xl overflow-hidden bg-surface border border-border transition-all duration-500 cursor-pointer shadow-md hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(37,99,235,0.18)] hover:border-accent"
              >
                {/* 1. Header Visual (Representing Event Image) */}
                <div className={`relative h-[220px] w-full bg-gradient-to-br ${gradient} flex items-center justify-center p-6 border-b border-border overflow-hidden`}>
                  {/* Decorative grid lines */}
                  <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]" />
                  {/* Glowing core */}
                  <div className="absolute w-32 h-32 rounded-full bg-white/10 filter blur-xl animate-pulse" />
                  {/* Event ID badge */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    EVENT {String(event.id).padStart(2, "0")}
                  </div>
                  {/* Title inside card cover */}
                  <h3 className="relative z-10 font-display text-2xl font-extrabold text-white text-center tracking-tight leading-snug drop-shadow-md px-4">
                    {event.title}
                  </h3>
                </div>

                {/* 2. Core Information (Visible by Default) */}
                <div className="p-6 flex flex-col justify-between h-[220px] bg-surface transition-colors duration-300">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent-light uppercase tracking-wider">
                      <Sparkles size={12} />
                      <span>{event.collaborators ? "Collaboration" : "Internal Event"}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-text-primary line-clamp-2 leading-snug group-hover:text-accent-light transition-colors duration-200">
                      {event.title}
                    </h4>
                  </div>
                  {/* Date & Bottom Footer */}
                  <div className="border-t border-border-subtle pt-4 flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-accent-light" />
                      <span>{event.timeline || "Self-Paced / Archive"}</span>
                    </div>
                    {event.collaborators && (
                      <div className="flex items-center gap-1 text-text-faint">
                        <Users2 size={13} />
                        <span className="line-clamp-1 max-w-[100px]">Partnered</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Premium Hover Overlay — Light Theme */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-20
                  bg-gradient-to-b from-white via-[#F8FAFF] to-[#EFF6FF]
                  border border-[#DBEAFE]
                  shadow-[0_12px_40px_rgba(37,99,235,0.12)]
                  rounded-3xl
                ">
                  {/* Top glossy highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: '#2563EB' }}>
                        Event Overview
                      </span>
                      <h3 className="font-display text-lg font-extrabold leading-tight mt-1" style={{ color: '#111827' }}>
                        {event.title}
                      </h3>
                    </div>

                    <p
                      className="text-xs leading-[1.75] line-clamp-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium"
                      style={{ color: '#374151' }}
                    >
                      {event.description}
                    </p>

                    {event.highlights.length > 0 && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                        <span
                          className="text-[10px] font-extrabold tracking-widest uppercase block mb-1.5"
                          style={{ color: '#2563EB' }}
                        >
                          Key Outcome
                        </span>
                        <p className="text-xs font-semibold leading-relaxed flex items-start gap-1.5" style={{ color: '#059669' }}>
                          <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#059669' }} />
                          {event.highlights[0]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
  {event.collaborators && (
    <p
      className="text-[10px] leading-relaxed italic border-t border-[#DBEAFE] pt-3 font-medium"
      style={{ color: "#475569" }}
    >
      {event.collaborators}
    </p>
  )}
</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
