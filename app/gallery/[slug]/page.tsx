import { notFound } from "next/navigation";
import EventGallery from "@/components/blog-gallery/EventGallery";
import { galleryEvents } from "@/lib/data/gallery-events";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GalleryEventPage({ params }: Props) {
  const { slug } = await params;

  const event = galleryEvents.find(
    (item) => item.slug === slug
  );

  if (!event) {
    notFound();
  }

  return <EventGallery event={event} />;
}