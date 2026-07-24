import type { Metadata } from "next";
import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the FODSE team. Contact our President, Vice President, or CTO directly or send us a message through the form.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Contact
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
            Let's Connect
          </h1>
          <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
            Reach out to the FODSE leadership team or send us a message through the
            form below. We're always excited to meet new members.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact cards + map */}
            <div className="space-y-8">
              <ContactCards />
              <MapEmbed />
            </div>

            {/* Right: Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
