"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const loadingTexts = [
  "Initializing...",
  "Loading Assets...",
  "Preparing Experience...",
  "Almost Ready...",
];

export default function SplashScreen() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) =>
        prev < loadingTexts.length - 1 ? prev + 1 : prev
      );
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: {
          duration: 0.65,
          ease: "easeInOut",
        },
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute left-20 top-24 h-48 w-48 rounded-full bg-sky-400/10 blur-[90px] animate-float-slow" />

        <div className="absolute right-20 bottom-20 h-56 w-56 rounded-full bg-indigo-400/10 blur-[110px] animate-float-medium" />

      </div>

      {/* Center Content */}

      <div className="relative flex h-full items-center justify-center">

        <div className="flex flex-col items-center">

          {/* Logo + Text */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-5"
style={{ alignItems: "center" }}
          >
            {/* Logo */}

            {/* Logo */}

<motion.div
  animate={{
    scale: [1, 1.05, 1],
  }}
  transition={{
    repeat: Infinity,
    duration: 2.5,
    ease: "easeInOut",
  }}
  className="relative flex h-[82px] w-[82px] items-center justify-center splash-float flex-shrink-0"
>
  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl splash-logo-glow" />

  <Image
    src="/logo.png"
    alt="FODSE"
    width={82}
    height={82}
    priority
    className="relative block"
  />
</motion.div>

            {/* Text */}

            <div className="flex flex-col justify-center">

              <motion.h1
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                }}
                className="font-display splash-gradient-text text-5xl font-bold tracking-tight"
              >
                FODSE
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="mt-1 text-sm tracking-wide text-slate-500"
              >
                Forum of Data Science Engineers
              </motion.p>

            </div>

          </motion.div>

          {/* Loading Bar */}

          <div className="mt-12 w-[330px]">

            <div className="relative h-[7px] overflow-hidden rounded-full bg-slate-200">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 2.8,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600"
              />

              {/* Shimmer */}

              <motion.div
                animate={{
                  x: ["-120%", "250%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "linear",
                }}
                className="absolute top-0 h-full w-20 bg-white/40 blur-sm"
              />

            </div>

            <motion.p
              key={textIndex}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="mt-4 text-center text-sm font-medium text-slate-500"
            >
              {loadingTexts[textIndex]}
            </motion.p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}