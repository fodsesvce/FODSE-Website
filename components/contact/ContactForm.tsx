"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MSG_LEN = 1000;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ─── Frontend Validation ────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim())                     newErrors.name    = "Name is required.";
    if (!form.email.trim())                    newErrors.email   = "Email is required.";
    else if (!EMAIL_REGEX.test(form.email))    newErrors.email   = "Enter a valid email address.";
    if (!form.subject.trim())                  newErrors.subject = "Subject is required.";
    if (!form.message.trim())                  newErrors.message = "Message is required.";
    else if (form.message.length > MAX_MSG_LEN) newErrors.message = `Message must be ${MAX_MSG_LEN} characters or fewer.`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setApiError(data.error ?? "Unable to send your message. Please try again later.");
        setStatus("error");
      }
    } catch {
      setApiError("Unable to send your message. Please try again later.");
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-background border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-faint focus:outline-none focus:ring-2 transition-all duration-200";
  const inputNormal = `${inputBase} border-border focus:border-accent/60 focus:ring-accent/10`;
  const inputError  = `${inputBase} border-red-400/70 focus:border-red-400 focus:ring-red-400/10`;

  // ─── Success screen ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full text-center gap-5 py-24"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center"
        >
          <CheckCircle size={36} className="text-green-500" />
        </motion.div>
        <div>
          <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
            Message Sent!
          </h3>
          <p className="text-text-muted max-w-sm leading-relaxed">
            ✅ Your message has been sent successfully. Our team will contact you soon.
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-2 text-sm text-accent hover:text-accent-light underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

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

      {/* API error banner */}
      <AnimatePresence>
        {status === "error" && apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
            <span>❌ {apiError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-semibold text-text-muted mb-2 tracking-wide"
            >
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={status === "loading"}
              className={errors.name ? inputError : inputNormal}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-semibold text-text-muted mb-2 tracking-wide"
            >
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={status === "loading"}
              className={errors.email ? inputError : inputNormal}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
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
            type="text"
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            disabled={status === "loading"}
            className={errors.subject ? inputError : inputNormal}
          />
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>
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
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us how we can help..."
            disabled={status === "loading"}
            className={`${errors.message ? inputError : inputNormal} resize-none`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="contact-submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send size={15} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
