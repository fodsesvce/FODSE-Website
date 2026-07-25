"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Blog & Gallery", href: "/blog-gallery" },
  { label: "Contact", href: "/contact" },
];

// 🔥 Replace this with your WhatsApp Community Invite Link
const WHATSAPP_COMMUNITY_LINK =
  "https://chat.whatsapp.com/DqFKvQx7H5rBt2XNqlT66Q?s=cl&p=a&ilr=1";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
  if (mobileOpen) {
    const id = requestAnimationFrame(() => {
      setMobileOpen(false);
    });

    return () => cancelAnimationFrame(id);
  }
}, [pathname, mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}

          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9">
              <Image
                src="/logo.png"
                alt="FODSE Logo"
                width={36}
                height={36}
                priority
                className="object-contain w-auto h-auto"
              />
            </div>

            <span className="font-display font-bold text-lg text-text-primary tracking-tight">
              FODSE
            </span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? "text-text-primary font-semibold"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {link.label}

                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-surface-2 rounded-md -z-10 border border-border-subtle"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
  href={WHATSAPP_COMMUNITY_LINK}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-light rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
>
  Join FODSE
</Link>
          </div>

          {/* Mobile Menu Button */}

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-text-primary bg-surface font-semibold"
                        : "text-text-muted hover:text-text-secondary hover:bg-surface"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
  href={WHATSAPP_COMMUNITY_LINK}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-3 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-light transition-all duration-300"
>
  Join FODSE
</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}