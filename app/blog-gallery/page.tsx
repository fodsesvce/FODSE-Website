import type { Metadata } from "next";
import ArticlesSection from "@/components/blog-gallery/ArticlesSection";
import GallerySection from "@/components/blog-gallery/GallerySection";
import { blogData } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog & Gallery",
  description:
    "Read technical articles by FODSE members and explore photo highlights from our events.",
};

export default function BlogGalleryPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Blog & Gallery
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
            {blogData.headline}
          </h1>
          <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
            {blogData.subheading}
          </p>
        </div>
      </div>

      <ArticlesSection articles={blogData.articles} />
      <GallerySection gallery={blogData.gallery} />
    </>
  );
}
