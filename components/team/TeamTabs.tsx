"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamData } from "@/lib/data/team";
import MemberCard from "./MemberCard";

const tabs = [
  { id: "officeBearers", label: "Office Bearers" },
  { id: "mentors", label: "Mentors" },
  { id: "tech", label: "Tech Team" },
  { id: "design", label: "Design Team" },
  { id: "content", label: "Content Team" },
  { id: "marketing", label: "Marketing Team" },
  { id: "sponsorship", label: "Sponsorship Team" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const NAV_HEIGHT = 72;
const MAIN_NAV_HEIGHT = 80;

export default function TeamTabs() {
  const [activeTab, setActiveTab] =
    useState<TabId>("officeBearers");

  const [isSticky, setIsSticky] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const navRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  /* ----------------------------------------------------------- */
  /* Sticky Navigation                                            */
  /* ----------------------------------------------------------- */

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: `-${MAIN_NAV_HEIGHT}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  /* ----------------------------------------------------------- */
  /* Scroll To Content                                            */
  /* ----------------------------------------------------------- */

  const scrollToContent = useCallback(() => {
    if (!contentRef.current) return;

    const offset =
      MAIN_NAV_HEIGHT +
      NAV_HEIGHT +
      24;

    const top =
      contentRef.current.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, []);

  /* ----------------------------------------------------------- */
  /* Horizontal Nav Auto Scroll                                   */
  /* ----------------------------------------------------------- */

  useEffect(() => {
    if (!navRef.current) return;

    const activeButton =
      navRef.current.querySelector(
        '[data-active="true"]'
      ) as HTMLButtonElement | null;

    activeButton?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab]);

  /* ----------------------------------------------------------- */
  /* Tab Click                                                    */
  /* ----------------------------------------------------------- */

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);

    if (window.innerWidth >= 768) {
      requestAnimationFrame(scrollToContent);
    }
  };

  /* ----------------------------------------------------------- */
  /* Team Data                                                    */
  /* ----------------------------------------------------------- */

  const getActiveContent = () => {
    if (activeTab === "officeBearers") {
      return {
        name: "Office Bearers",
        description:
          "Leading the club, defining objectives, and coordinating college wide operations.",
        members: teamData.officeBearers,
        lead: undefined,
        executives: undefined,
      };
    }

    if (activeTab === "mentors") {
      return {
        name: "Mentors",
        description:
          "Our mentors are experienced senior students who guide, support, and mentor FODSE members through technical learning, projects, events, and career development.",
        members: teamData.mentors,
        lead: undefined,
        executives: undefined,
      };
    }

    const team = teamData.teams.find(
      (t) => t.id === activeTab
    );

    if (!team) return null;

    return {
      name: team.name,

      description:
        team.id === "sponsorship"
          ? "FODSE's core sponsorship team members responsible for building partnerships, managing sponsors, and securing collaborations for club events and initiatives."
          : `FODSE's core ${team.name.toLowerCase()} members driving initiatives and operations.`,

      members: undefined,

      lead: team.lead,

      executives: team.executives,
    };
  };

    const content = getActiveContent();

  const execCount =
    content?.executives?.length ?? 0;

  const totalCards = content?.members
    ? content.members.length
    : execCount + (content?.lead ? 1 : 0);

  const colClass =
    totalCards === 5
      ? "xl:grid-cols-5"
      : "xl:grid-cols-4";

  /* ----------------------------------------------------------- */
  /* Navigation                                                   */
  /* ----------------------------------------------------------- */

  const navBar = (
    <div
      ref={navRef}
      className="
        flex
        items-center
        gap-2
        p-1.5
        bg-white
        rounded-full
        overflow-x-auto
        scroll-smooth
        shadow-sm
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
          className={`relative flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
            activeTab === tab.id
              ? "text-white"
              : "text-blue-900/70 hover:text-blue-900 hover:bg-blue-50/50"
          }`}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="team-tab-active-bg"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.5,
              }}
            />
          )}

          <span className="relative z-10">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );

    return (
    <div className="bg-background-alt">

      {/* Sticky detector */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* Navigation */}
      <div
        className={`z-50 transition-all duration-300 ${
          isSticky
            ? "fixed left-0 right-0 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-md"
            : "relative"
        }`}
        style={{
          top: isSticky ? "64px" : undefined,
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6"
          style={{
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
        >
          {navBar}
        </div>
      </div>

      {/* Spacer so content doesn't jump when nav becomes fixed */}
      {isSticky && (
        <div
          style={{
            height: NAV_HEIGHT + 28,
          }}
        />
      )}

      {/* Content */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12 pb-20"
      >
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
              {/* Heading */}
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

              {/* Members */}
              {content.members ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${colClass}`}
                  style={{ gap: "32px" }}
                >
                  {content.members.map((member, index) => (
                    <MemberCard
                      key={member.slug}
                      member={member}
                      index={index}
                    />
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

                      <MemberCard
                        member={content.lead}
                        index={0}
                      />
                    </div>
                  )}

                  {content.executives?.map((member, index) => {
  const showLeadBadge =
    member.role.toLowerCase().includes("editorial lead");

  return (
    <div key={member.slug} className="relative">
      {showLeadBadge && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
          Lead
        </div>
      )}

      <MemberCard
        member={member}
        index={index + 1}
      />
    </div>
  );
})}
                </div>
              )}
            </motion.div>
          )}
                  </AnimatePresence>
      </div>
    </div>
  );
}
