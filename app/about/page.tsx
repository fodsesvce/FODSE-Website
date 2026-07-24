import type { Metadata } from "next";
import OurStory from "@/components/about/OurStory";
import VisionMission from "@/components/about/VisionMission";
import Objectives from "@/components/about/Objectives";
import WhyFODSE from "@/components/about/WhyFODSE";
import AlumniGrid from "@/components/about/AlumniGrid";
import JoinUs from "@/components/about/JoinUs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the story, vision, mission, and objectives of FODSE — the Forum of Data Science Engineers at SVCE.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            About
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight">
            About FODSE
          </h1>
        </div>
      </div>
      <OurStory />
      <VisionMission />
      <Objectives />
      <WhyFODSE />
      <AlumniGrid />
      <JoinUs />
    </>
  );
}
