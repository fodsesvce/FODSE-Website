import type { Metadata } from "next";
import TeamTabs from "@/components/team/TeamTabs";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the passionate students behind FODSE — the 2026–2027 core team driving innovation at SVCE's Data Science Club.",
};

export default function TeamPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Team
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
            Meet the Minds Behind FODSE (2026–2027)
          </h1>
          <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
            Our core team consists of passionate students dedicated to driving
            innovation, organizing impactful events, and fostering a community of
            tech enthusiasts.
          </p>
        </div>
      </div>

      <TeamTabs />
    </>
  );
}
