"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import type { TeamMember } from "@/lib/data/team";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getGradient(name: string): string {
  const gradients = [
    "from-indigo-900 to-indigo-600",
    "from-purple-900 to-purple-600",
    "from-indigo-950 to-purple-900",
    "from-slate-900 to-indigo-800",
    "from-purple-950 to-indigo-900",
  ];

  return gradients[name.charCodeAt(0) % gradients.length];
}

type Props = {
  member: TeamMember;
  index: number;
};

export default function MemberCard({ member, index }: Props) {
  const initials = getInitials(member.name);
  const gradient = getGradient(member.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="
        group
        flex
        flex-col
        h-full
        overflow-hidden
        rounded-2xl
        border border-border
        bg-surface
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)]
      "
    >
      {/* ---------- IMAGE ---------- */}

      <div className="relative w-full h-[360px] overflow-hidden border-b border-border">
        <Image
          src={member.image}
          alt={member.name}
          fill
          priority={index < 4}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className="
            object-cover
            object-center
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Fallback gradient */}
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <span className="font-display text-4xl font-bold text-white/90">
            {initials}
          </span>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}

      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="mb-1 font-display text-base font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-accent-light">
            {member.name}
          </h3>

          <p className="mb-2 text-xs font-semibold text-accent">
            {member.role}
          </p>

          <p className="text-xs font-medium text-text-muted">
            {member.department} · {member.year}
          </p>
        </div>

        {member.socials && (
          <div className="mt-auto flex items-center gap-3 border-t border-border-subtle pt-4">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 items-center justify-center text-text-muted transition-colors duration-300 hover:text-accent-light"
                aria-label={`${member.name} LinkedIn`}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
            )}

            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 items-center justify-center text-text-muted transition-colors duration-300 hover:text-accent-light"
                aria-label={`${member.name} GitHub`}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            )}

            {member.socials.email && (
              <a
                href={member.socials.email}
                className="flex h-5 w-5 items-center justify-center text-text-muted transition-colors duration-300 hover:text-accent-light"
                aria-label={`${member.name} Email`}
              >
                <Mail size={15} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}