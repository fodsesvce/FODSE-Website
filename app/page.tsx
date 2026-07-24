import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import MissionPreview from "@/components/home/MissionPreview";
import Highlights from "@/components/home/Highlights";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "FODSE — Forum of Data Science Engineers | SVCE",
  description:
    "FODSE is SVCE's premier community for students driven by curiosity in Data Science, Machine Learning, Artificial Intelligence, and Analytics.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <MissionPreview />
      <Highlights />
      <CTA />
    </>
  );
}
