"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

export default function MapEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-text-secondary text-sm">
            Sri Venkateswara College of Engineering
          </h3>
        </div>
        <a
          href="https://maps.google.com/?q=Sri+Venkateswara+College+of+Engineering+Sriperumbudur"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors"
        >
          Open in Maps
          <ExternalLink size={11} />
        </a>
      </div>

      <div className="rounded-2xl overflow-hidden border border-border bg-surface">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d79.97!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f57bc2ff7fa1%3A0x4e51ce88da3b6f92!2sSri%20Venkateswara%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SVCE Campus Map"
          className="grayscale opacity-80"
        />
      </div>

      <p className="text-xs text-text-faint mt-3 flex items-center gap-1.5">
        <MapPin size={11} />
        Pennalur, Sriperumbudur, Tamil Nadu 602117
      </p>
    </motion.div>
  );
}
