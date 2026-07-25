"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

type FormState = {
  name: string;
  subject: string;
  message: string;
};

const MAX_MSG_LEN = 1000;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};

    if (!form.name.trim())
      newErrors.name = "Name is required.";

    if (!form.subject.trim())
      newErrors.subject = "Subject is required.";

    if (!form.message.trim())
      newErrors.message = "Message is required.";
    else if (form.message.length > MAX_MSG_LEN)
      newErrors.message = `Message must be ${MAX_MSG_LEN} characters or fewer.`;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const recipient = "fodse@svce.ac.in";

    const subject = `FODSE Website | ${form.subject}`;

    const body = `Hello FODSE Team,

A visitor has contacted you through the FODSE website.

----------------------------------------

Full Name:
${form.name}

Subject:
${form.subject}

Message:

${form.message}

----------------------------------------

This message was sent through the FODSE website contact page.

You can simply click Reply to respond to the sender.`;

    const gmailComposeUrl =
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1` +
      `&to=${encodeURIComponent(recipient)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailComposeUrl, "_blank");

    setForm({
      name: "",
      subject: "",
      message: "",
    });

    setErrors({});
  };

  const inputBase =
    "w-full bg-background border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-faint focus:outline-none focus:ring-2 transition-all duration-200";

  const inputNormal =
    `${inputBase} border-border focus:border-accent/60 focus:ring-accent/10`;

  const inputError =
    `${inputBase} border-red-400/70 focus:border-red-400 focus:ring-red-400/10`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
        Send a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>

        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-text-muted mb-2 tracking-wide"
          >
            Full Name <span className="text-red-400">*</span>
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? inputError : inputNormal}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold text-text-muted mb-2 tracking-wide"
          >
            Subject <span className="text-red-400">*</span>
          </label>

          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            value={form.subject}
            onChange={handleChange}
            className={errors.subject ? inputError : inputNormal}
          />

          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="contact-message"
              className="block text-xs font-semibold text-text-muted tracking-wide"
            >
              Message <span className="text-red-400">*</span>
            </label>

            <span
              className={`text-xs tabular-nums ${
                form.message.length > MAX_MSG_LEN
                  ? "text-red-500 font-semibold"
                  : "text-text-faint"
              }`}
            >
              {form.message.length}/{MAX_MSG_LEN}
            </span>
          </div>

          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Tell us how we can help..."
            value={form.message}
            onChange={handleChange}
            className={`${errors.message ? inputError : inputNormal} resize-none`}
          />

          {errors.message && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25"
        >
          Continue with Gmail
          <Send size={16} />
        </button>

        <p className="text-xs text-center text-text-muted leading-relaxed">
          Clicking <strong>Continue with Gmail</strong> opens Gmail with your
          message pre-filled. Review it and click{" "}
          <strong>Send</strong> to deliver it to the FODSE team.
        </p>
      </form>
    </motion.div>
  );
}