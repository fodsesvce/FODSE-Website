"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string;
  caption: string;
  image: string;
  aspectRatio: string;
};

type Props = {
  gallery: GalleryItem[];
};

export default function GallerySection({ gallery }: Props) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
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

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
              }}
              className="group"
            >
              {/* Image Card */}
              <div
                className={`relative bg-surface border border-border rounded-2xl overflow-hidden flex items-center justify-center p-2 transition-all duration-300 hover:shadow-xl ${
                  item.aspectRatio === "portrait"
                    ? "aspect-[3/4]"
                    : item.aspectRatio === "landscape"
                    ? "aspect-[4/3]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw,
                         (max-width:1024px) 50vw,
                         25vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {item.title}
                    </h3>

                    <p className="text-white/90 text-xs leading-relaxed line-clamp-3">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <figcaption className="mt-4 px-1">
                <h3 className="font-semibold text-text-primary text-base mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed">
                  {item.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}