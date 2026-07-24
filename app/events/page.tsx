import type { Metadata } from "next";
import EventTimeline from "@/components/events/EventTimeline";
import { eventsData } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore all events hosted by FODSE — from hackathons and workshops to mentorship programs and inaugural ceremonies.",
};

export default function EventsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Events
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
            {eventsData.headline}
          </h1>
          <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
            {eventsData.subheading}
          </p>
        </div>
      </div>

      <EventTimeline events={eventsData.events} />
    </>
  );
}
