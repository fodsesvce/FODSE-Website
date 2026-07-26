"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamData } from "@/lib/data/team";
import MemberCard from "./MemberCard";

const tabs = [
  { id: "officeBearers", label: "Office Bearers"  },
  { id: "mentors",       label: "Mentors"         },
  { id: "tech",          label: "Tech Team"        },
  { id: "design",        label: "Design Team"      },
  { id: "content",       label: "Content Team"     },
  { id: "marketing",     label: "Marketing Team"   },
  { id: "sponsorship",   label: "Sponsorship Team" },
] as const;

type TabId = (typeof tabs)[number]["id"];

// Height of team nav bar (kept in sync with the rendered div)
const NAV_HEIGHT = 72; // px
const MAIN_NAV_HEIGHT = 80; // px  (h-20 in Navbar.tsx)

export default function TeamTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("officeBearers");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const navSentinelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to detect when the nav sentinel scrolls above the main navbar
  useEffect(() => {
    const sentinel = navSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNavSticky(!entry.isIntersecting),
      { rootMargin: `-${MAIN_NAV_HEIGHT}px 0px 0px 0px`, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const scrollToContent = useCallback(() => {
    if (!contentRef.current) return;
    const offset = MAIN_NAV_HEIGHT + NAV_HEIGHT + 24; // 24px breathing room
    const top =
      contentRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const handleTabClick = (id: TabId) => {
  setActiveTab(id);

  // Keep existing desktop behaviour
  if (window.innerWidth >= 768) {
    requestAnimationFrame(scrollToContent);
  }
  };

  useEffect(() => {
  if (!navScrollRef.current) return;

  const activeButton = navScrollRef.current.querySelector(
    "[data-active='true']"
  ) as HTMLButtonElement | null;

  activeButton?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}, [activeTab]);

  // ─── Data ───────────────────────────────────────────────────────────────
  const getActiveContent = () => {
    if (activeTab === "officeBearers") {
      return {
        name: "Office Bearers",
        description: "Leading the club, defining objectives, and coordinating college wide operations.",
        members: teamData.officeBearers,
        lead: undefined, executives: undefined,
      };
    }
    if (activeTab === "mentors") {
      return {
        name: "Mentors",
        description: "Our mentors are experienced senior students who guide, support, and mentor FODSE members through technical learning, projects, events, and career development.",
        members: teamData.mentors,
        lead: undefined, executives: undefined,
      };
    }
    const team = teamData.teams.find((t) => t.id === activeTab);
    if (team) {
      let desc = `FODSE's core ${team.name.toLowerCase()} members driving initiatives and operations.`;
      if (team.id === "sponsorship") {
        desc = "FODSE's core sponsorship team members responsible for building partnerships, managing sponsors, and securing collaborations for club events and initiatives.";
      }
      return {
        name: team.name,
        description: desc,
        members: undefined,
        lead: team.lead,
        executives: team.executives,
      };
    }
    return null;
  };

  const content     = getActiveContent();
  const execCount   = content?.executives?.length ?? 0;
  const totalCards  = content?.members
    ? content.members.length
    : execCount + (content?.lead ? 1 : 0);
  const colClass    = totalCards === 5 ? "xl:grid-cols-5" : "xl:grid-cols-4";

  const navPill = (fixed = false) => (
  <div
    ref={fixed ? undefined : navScrollRef}
    className="
      flex
      items-center
      gap-2
      p-1.5
      bg-white
      rounded-full
      overflow-x-auto
      scroll-smooth
    "
    style={{
      scrollbarWidth: "none",
      WebkitOverflowScrolling: "touch",
    } as React.CSSProperties}
  >
    {tabs.map((tab) => (
      <button
        key={tab.id}
        data-active={activeTab === tab.id}
        onClick={() => handleTabClick(tab.id)}
        className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
          activeTab === tab.id
            ? "text-white"
            : "text-blue-900/70 hover:text-blue-900 hover:bg-blue-50/50"
        }`}
      >
        {activeTab === tab.id && (
          <motion.span
            layoutId="team-tab-active-bg"
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md"
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.5,
            }}
          />
        )}

        <span className="relative z-10">{tab.label}</span>
      </button>
    ))}
  </div>
);

  return (
    <div className="bg-background-alt">

      {/*
        ── INLINE NAV (always visible in normal document flow) ──────────────
        This version is always rendered in-flow. When it scrolls off screen,
        the FIXED clone below takes over visually.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sentinel: when this div scrolls above the main navbar, isNavSticky = true */}
        <div ref={navSentinelRef} style={{ height: "1px" }} />

        {/* Inline nav occupies space in normal flow so content is never pushed under it */}
        <div
          style={{ height: `${NAV_HEIGHT}px` }}
          className="flex items-center"
          aria-hidden={isNavSticky}
        >
          {!isNavSticky && navPill(false)}
        </div>
      </div>

      {/*
        ── FIXED CLONE (takes over when inline nav scrolls out of view) ─────
        Uses position:fixed so it's completely outside the transform context
        of PageTransition — sticky was broken by the Framer Motion transform.
      */}
      {isNavSticky && (
        <div
          className="fixed z-50 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-blue-100/50 shadow-[0_2px_20px_rgba(59,130,246,0.1)]"
          style={{
  top: "64px",
}}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ paddingTop: "14px", paddingBottom: "14px" }}>
            {navPill(true)}
          </div>
        </div>
      )}

      {/* ── CONTENT AREA ────────────────────────────────────────────────────
          72px top padding guarantees the heading + first card row start
          well below the fixed nav bar at all scroll depths.
      */}
      <div
  className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12 pb-20"
>
        {/* Scroll anchor for scrollToContent() */}
        <div ref={contentRef} />

        <AnimatePresence mode="wait">
          {content && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {/* Heading + description */}
              <div style={{ marginBottom: "40px" }}>
                <h2 className="font-display text-3xl font-extrabold text-text-primary tracking-tight">
                  {content.name}
                </h2>
                <p
                  className="text-sm text-text-muted max-w-2xl leading-relaxed"
                  style={{ marginTop: "12px" }}
                >
                  {content.description}
                </p>
              </div>

              {/* Cards */}
              {content.members ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${colClass}`}
                  style={{ gap: "32px" }}
                >
                  {content.members.map((member, i) => (
                    <MemberCard key={member.slug} member={member} index={i} />
                  ))}
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${colClass}`}
                  style={{ gap: "32px" }}
                >
                  {content.lead && (
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                        Lead
                      </div>
                      <MemberCard member={content.lead} index={0} />
                    </div>
                  )}
                  {content.executives?.map((member, i) => (
                    <MemberCard key={member.slug} member={member} index={i + 1} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
