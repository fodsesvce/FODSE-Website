"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Event = {
  slug: string;
  title: string;
  description: string;
  images: string[];
};

type Props = {
  event: Event;
};

export default function EventGallery({ event }: Props) {
  return (
    <main className="min-h-screen bg-background-alt">
      {/* ---------------- HERO ---------------- */}

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog-gallery"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Gallery
            </Link>
          </motion.div>

          <motion.h1
            className="mt-10 text-5xl md:text-6xl font-bold font-display text-text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.6,
            }}
          >
            {event.title}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-3xl text-lg leading-8 text-text-muted"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
          >
            {event.description}
          </motion.p>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {event.images.map((image, index) => (
              <motion.div
                key={image}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 50,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                }}
                className="group"
              >
                <div
                  className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    rounded-3xl
                    shadow-lg
                    transition-all
                    duration-500
                    group-hover:shadow-2xl
                  "
                >
                  <Image
                    src={image}
                    alt={`${event.title} ${index + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw,
                           (max-width:1200px) 50vw,
                           25vw"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* Dark overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/10
                      transition-all
                      duration-500
                    "
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </main>
  );
}