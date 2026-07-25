"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Camera, ArrowRight } from "lucide-react";

type GalleryItem = {
  id: number;
  slug: string;
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
      <div className="max-w-[1650px] mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Camera className="text-accent" size={24} />

            <h2 className="font-display text-3xl font-bold text-text-primary">
              Gallery
            </h2>
          </div>

          <p className="text-text-muted">
            Moments captured from our events and activities.
          </p>
        </motion.div>

        {/* Four cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

          {gallery.map((item, i) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
              }}
            >
              <Link
  href={`/gallery/${item.slug}`}
  className="group block"
>
                <div
                  className="
                  rounded-3xl
                  border
                  border-blue-100
                  bg-white
                  p-4
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                  hover:border-blue-200
                "
                >
                  {/* Image */}

                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="25vw"
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* Content */}

                  <div className="pt-6">

                    <h3
  className="
    text-2xl
    font-bold
    text-slate-800
    mb-3
    group-hover:text-blue-600
    transition-colors
    min-h-[64px]
    flex
    items-start
  "
>
  {item.title}
</h3>

                    <p
  className="
    text-slate-500
    leading-7
    text-[15px]
    line-clamp-3
    min-h-[90px]
  "
>

                      {item.caption}

                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-blue-600 font-semibold">

                        View Gallery

                      </span>

                      <ArrowRight
                        size={18}
                        className="
                          text-blue-600
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />

                    </div>

                  </div>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}