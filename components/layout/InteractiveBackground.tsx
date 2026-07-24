"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Light-theme-only configuration per page
interface PageConfig {
  blob1: string;
  blob2: string;
  blob3: string;
  glow: string;
  particleDensity: number;
  particleSpeed: number;
}

const pageConfigs: Record<string, PageConfig> = {
  "/": {
    blob1: "rgba(37, 99, 235, 0.22)",   // blue-600
    blob2: "rgba(99, 102, 241, 0.18)",  // indigo-500
    blob3: "rgba(56, 189, 248, 0.18)",  // sky-400
    glow:  "rgba(37, 99, 235, 0.18)",
    particleDensity: 1.0,
    particleSpeed: 0.6,
  },
  "/about": {
    blob1: "rgba(37, 99, 235, 0.14)",
    blob2: "rgba(99, 102, 241, 0.12)",
    blob3: "rgba(56, 189, 248, 0.10)",
    glow:  "rgba(37, 99, 235, 0.10)",
    particleDensity: 0.4,
    particleSpeed: 0.3,
  },
  "/team": {
    blob1: "rgba(37, 99, 235, 0.16)",
    blob2: "rgba(167, 139, 250, 0.16)",
    blob3: "rgba(96, 165, 250, 0.14)",
    glow:  "rgba(99, 102, 241, 0.12)",
    particleDensity: 0.6,
    particleSpeed: 0.4,
  },
  "/events": {
    blob1: "rgba(14, 165, 233, 0.22)",
    blob2: "rgba(37, 99, 235, 0.20)",
    blob3: "rgba(6, 182, 212, 0.18)",
    glow:  "rgba(6, 182, 212, 0.16)",
    particleDensity: 1.2,
    particleSpeed: 0.8,
  },
  "/blog-gallery": {
    blob1: "rgba(37, 99, 235, 0.11)",
    blob2: "rgba(99, 102, 241, 0.09)",
    blob3: "rgba(56, 189, 248, 0.09)",
    glow:  "rgba(37, 99, 235, 0.07)",
    particleDensity: 0.3,
    particleSpeed: 0.2,
  },
  "/contact": {
    blob1: "rgba(37, 99, 235, 0.14)",
    blob2: "rgba(99, 102, 241, 0.12)",
    blob3: "rgba(56, 189, 248, 0.10)",
    glow:  "rgba(37, 99, 235, 0.10)",
    particleDensity: 0.5,
    particleSpeed: 0.35,
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

interface FlowPath {
  p0x: number; p0y: number;
  p1x: number; p1y: number;
  p2x: number; p2y: number;
  p3x: number; p3y: number;
  alpha: number;
}

export default function InteractiveBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const glossRef = useRef<HTMLDivElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseCoords = useRef({ x: -9999, y: -9999, currentX: -9999, currentY: -9999 });
  const scrollCoords = useRef({ y: 0, currentY: 0 });
  const frameRef = useRef<number>(0);

  const config = pageConfigs[pathname] || pageConfigs["/"];

  // 1. Reduced motion + mobile detection
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // 2. Mouse & scroll tracking
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };
    const handleScroll = () => { scrollCoords.current.y = window.scrollY; };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion, isMobile]);

  // 3. Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let flowPaths: FlowPath[] = [];
    let dotGridOffset = { x: 0, y: 0 };
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    const initElements = () => {
      particles = [];
      flowPaths = [];

      // Ambient particles — light blue, softly pulsing
      const particleCount = isMobile ? 8 : Math.floor(34 * config.particleDensity);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35 * config.particleSpeed,
          vy: (Math.random() - 0.5) * 0.35 * config.particleSpeed,
          radius: Math.random() * 2.5 + 1.0,
          alpha: Math.random() * 0.38 + 0.12,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.012,
        });
      }

      // Bezier data-flow curves (neural connection paths)
      if (!isMobile) {
        for (let i = 0; i < 7; i++) {
          flowPaths.push({
            p0x: Math.random() * canvas.width,
            p0y: Math.random() * canvas.height,
            p1x: Math.random() * canvas.width,
            p1y: Math.random() * canvas.height,
            p2x: Math.random() * canvas.width,
            p2y: Math.random() * canvas.height,
            p3x: Math.random() * canvas.width,
            p3y: Math.random() * canvas.height,
            alpha: 0.05 + Math.random() * 0.04,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // LERP mouse for smooth inertia
      const mouse = mouseCoords.current;
      mouse.currentX += (mouse.x - mouse.currentX) * 0.075;
      mouse.currentY += (mouse.y - mouse.currentY) * 0.075;

      // LERP scroll
      const scroll = scrollCoords.current;
      scroll.currentY += (scroll.y - scroll.currentY) * 0.1;

      // ── DOM Layer Updates ────────────────────────────────────────────────

      // Cursor glossy glow position
      if (cursorGlowRef.current && !reducedMotion && !isMobile && mouse.x > -999) {
        cursorGlowRef.current.style.transform =
          `translate3d(${mouse.currentX - 450}px, ${mouse.currentY - 450}px, 0)`;
      }

      // Diagonal gloss sheen parallax
      if (glossRef.current && !reducedMotion && !isMobile) {
        const xOff = ((mouse.currentX / Math.max(window.innerWidth, 1)) - 0.5) * 20;
        const yOff = ((mouse.currentY / Math.max(window.innerHeight, 1)) - 0.5) * 12;
        glossRef.current.style.transform = `translate3d(${xOff}px, ${yOff}px, 0)`;
      }

      // Aurora blobs parallax
      if (!reducedMotion && !isMobile) {
        const ps = 22;
        const scrollOff = scroll.currentY * 0.12;
        const xOff = ((mouse.currentX / Math.max(window.innerWidth, 1)) - 0.5) * ps;
        const yOff = ((mouse.currentY / Math.max(window.innerHeight, 1)) - 0.5) * ps - scrollOff;
        if (blob1Ref.current) blob1Ref.current.style.transform = `translate3d(${xOff * 0.7}px, ${yOff * 0.7}px, 0)`;
        if (blob2Ref.current) blob2Ref.current.style.transform = `translate3d(${xOff * -0.45}px, ${yOff * 0.55}px, 0)`;
        if (blob3Ref.current) blob3Ref.current.style.transform = `translate3d(${xOff * 0.25}px, ${yOff * -0.35}px, 0)`;
      }

      // Dot grid parallax
      if (!reducedMotion && !isMobile) {
        dotGridOffset.x = ((mouse.currentX / Math.max(window.innerWidth, 1)) - 0.5) * 8;
        dotGridOffset.y = ((mouse.currentY / Math.max(window.innerHeight, 1)) - 0.5) * 8 - scroll.currentY * 0.06;
      }

      // ── Canvas Drawing ──────────────────────────────────────────────────

      // 1. Dot Matrix Grid — AI-inspired pattern (~7% opacity)
      if (!isMobile) {
        const dotSpacing = 48;
        const baseDotRadius = 1.4;
        const baseDotAlpha = 0.07;
        const startX = (dotGridOffset.x % dotSpacing) - dotSpacing;
        const startY = (dotGridOffset.y % dotSpacing) - dotSpacing;

        for (let gx = startX; gx < canvas.width + dotSpacing; gx += dotSpacing) {
          for (let gy = startY; gy < canvas.height + dotSpacing; gy += dotSpacing) {
            let r = baseDotRadius;
            let a = baseDotAlpha;
            if (mouse.x > -999) {
              const dx = mouse.currentX - gx;
              const dy = mouse.currentY - gy;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < 260) {
                const proximity = 1 - d / 260;
                r = baseDotRadius + proximity * 2.2;
                a = baseDotAlpha + proximity * 0.18;
              }
            }
            ctx.beginPath();
            ctx.arc(gx, gy, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${a})`;
            ctx.fill();
          }
        }
      }

      // 2. Bezier Data-Flow Curves — organic neural paths
      if (!isMobile) {
        flowPaths.forEach((path, i) => {
          const t2 = time * 0.3 + i * 1.8;
          const cp1x = path.p1x + Math.sin(t2 * 0.7) * 70;
          const cp1y = path.p1y + Math.cos(t2 * 0.5) * 50;
          const cp2x = path.p2x + Math.cos(t2 * 0.6) * 60;
          const cp2y = path.p2y + Math.sin(t2 * 0.8) * 45;

          // Brighten curve near cursor
          let pathAlpha = path.alpha;
          if (mouse.x > -999) {
            const midX = (path.p0x + path.p3x) / 2;
            const midY = (path.p0y + path.p3y) / 2;
            const dist = Math.sqrt((mouse.currentX - midX) ** 2 + (mouse.currentY - midY) ** 2);
            if (dist < 400) pathAlpha = Math.min(0.18, path.alpha + (1 - dist / 400) * 0.10);
          }

          ctx.beginPath();
          ctx.moveTo(path.p0x, path.p0y);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, path.p3x, path.p3y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${pathAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      }

      // 3. Ambient Floating Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        const pulsedAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        let drawX = p.x;
        let drawY = p.y;

        if (!reducedMotion && !isMobile && mouse.x > -999) {
          const dx = mouse.currentX - p.x;
          const dy = mouse.currentY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 280 && dist > 0) {
            const force = (280 - dist) / 280;
            drawX -= (dx / dist) * force * 12 * (p.radius / 2.5);
            drawY -= (dy / dist) * force * 12 * (p.radius / 2.5);
          }
          drawY -= scroll.currentY * 0.1 * (p.radius / 2);
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = `rgba(37, 99, 235, ${pulsedAlpha * 0.4})`;
        ctx.fillStyle = `rgba(37, 99, 235, ${pulsedAlpha * 1.1})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      frameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [config, reducedMotion, isMobile]);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden bg-background"
      style={{ zIndex: -20 }}
    >
      {/* ── LAYER 1: Dual Animated Mesh Gradients (premium depth) ── */}
      <div
        className="absolute inset-0 animate-float-slow"
        style={{
          background: "radial-gradient(ellipse 160% 90% at 15% -15%, #DBEAFE 0%, #EFF6FF 30%, #F8FAFF 55%, #FFFFFF 75%, #EDE9FE 100%)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0 animate-float-medium"
        style={{
          background: "radial-gradient(ellipse 120% 70% at 85% 110%, #E0F2FE 0%, #EEF9FF 35%, transparent 65%)",
          willChange: "transform",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── LAYER 2: Aurora Floating Blobs ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={blob1Ref}
          className="absolute rounded-full animate-float-slow"
          style={{
            width: isMobile ? "90vw" : "62vw",
            height: isMobile ? "90vw" : "62vw",
            background: `radial-gradient(circle, ${config.blob1} 0%, transparent 68%)`,
            filter: "blur(85px)",
            top: "-20%",
            left: "-15%",
            willChange: "transform",
          }}
        />
        <div
          ref={blob2Ref}
          className="absolute rounded-full animate-float-medium"
          style={{
            width: isMobile ? "80vw" : "55vw",
            height: isMobile ? "80vw" : "55vw",
            background: `radial-gradient(circle, ${config.blob2} 0%, transparent 68%)`,
            filter: "blur(90px)",
            bottom: "0%",
            right: "-12%",
            willChange: "transform",
          }}
        />
        {!isMobile && (
          <div
            ref={blob3Ref}
            className="absolute rounded-full animate-float-fast"
            style={{
              width: "44vw",
              height: "44vw",
              background: `radial-gradient(circle, ${config.blob3} 0%, transparent 68%)`,
              filter: "blur(80px)",
              top: "28%",
              left: "32%",
              willChange: "transform",
            }}
          />
        )}
      </div>

      {/* ── LAYER 3: Diagonal Glass Sheen ── */}
      <div
        ref={glossRef}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(219,234,254,0.25) 100%)",
          willChange: "transform",
        }}
      />

      {/* ── LAYER 4: AI Tech Pattern + Ambient Particles Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* ── LAYER 5: Cursor Glossy Reflection (glass light effect) ── */}
      {!isMobile && !reducedMotion && (
        <div
          ref={cursorGlowRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "900px",
            height: "900px",
            background: `radial-gradient(circle at center,
              rgba(255,255,255,0.75) 0%,
              rgba(219,234,254,0.60) 15%,
              ${config.glow} 32%,
              rgba(219,234,254,0.25) 52%,
              rgba(239,246,255,0.10) 68%,
              transparent 78%)`,
            filter: "blur(28px)",
            transform: "translate3d(-9999px, -9999px, 0)",
            willChange: "transform",
            opacity: 0.9,
          }}
        />
      )}

      {/* ── LAYER 6: Bottom section gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(239,246,255,0.4), transparent)",
        }}
      />
    </div>
  );
}
