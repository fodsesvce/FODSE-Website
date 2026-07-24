"use client";

import { motion } from "framer-motion";
import { Camera, Image as ImageIcon } from "lucide-react";

type GalleryItem = {
  id: number;
  caption: string;
  aspectRatio: string;
};

type Props = {
  gallery: GalleryItem[];
};

export default function GallerySection({ gallery }: Props) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Camera size={24} className="text-accent" />
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Gallery
            </h2>
          </div>
          <p className="text-text-muted text-sm">
            Moments captured from our events and activities.
          </p>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-5 space-y-5">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="break-inside-avoid group"
            >
              {/* Placeholder */}
              <div
                className={`relative w-full bg-surface border border-border rounded-2xl overflow-hidden ${
                  item.aspectRatio === "portrait"
                    ? "aspect-[3/4]"
                    : item.aspectRatio === "landscape"
                    ? "aspect-[4/3]"
                    : "aspect-square"
                }`}
              >
                {/* Gradient placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-accent-muted to-surface flex flex-col items-center justify-center">
                  <ImageIcon size={36} className="text-text-faint mb-3" />
                  <span className="text-xs text-text-faint font-medium">
                    Photo {item.id}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-xs p-4 font-medium leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-text-muted leading-snug px-1">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
