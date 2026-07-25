"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const MAX_MSG_LEN = 1000;

const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/fodse@svce.ac.in";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatus(null);

    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.length > MAX_MSG_LEN) {
      newErrors.message = `Message must be ${MAX_MSG_LEN} characters or fewer.`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setStatus(null);

    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);

      // FormSubmit Settings
      formData.append("_subject", `FODSE Website | ${form.subject}`);
      formData.append("_captcha", "false");
      formData.append("_template", "table");
      formData.append("_replyto", form.email);

      // Honeypot spam protection
      formData.append("_honey", "");

      const response = await fetch(
        FORMSUBMIT_ENDPOINT,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully.",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

    const inputBase =
    "w-full bg-background border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-faint focus:outline-none focus:ring-2 transition-all duration-200";

  const inputNormal = `${inputBase} border-border focus:border-accent/60 focus:ring-accent/10`;

  const inputError = `${inputBase} border-red-400/70 focus:border-red-400 focus:ring-red-400/10`;

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

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
        autoComplete="on"
      >
        {/* FormSubmit Hidden Fields */}
        <input
          type="hidden"
          name="_subject"
          value={`FODSE Website | ${form.subject}`}
        />

        <input
          type="hidden"
          name="_captcha"
          value="false"
        />

        <input
          type="hidden"
          name="_template"
          value="table"
        />

        <input
          type="hidden"
          name="_replyto"
          value={form.email}
        />

        {/* Honeypot */}
        <input
          type="text"
          name="_honey"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

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
            required
            autoComplete="name"
            placeholder="Your full name"
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

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-text-muted mb-2 tracking-wide"
          >
            Email Address <span className="text-red-400">*</span>
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? inputError : inputNormal}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.email}
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
            required
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
            required
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

        {/* Status Message */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border px-4 py-3 text-sm font-medium ${
              status.type === "success"
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {status.message}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-white font-semibold transition-all duration-200 ${
            loading
              ? "cursor-not-allowed bg-gray-500"
              : "bg-accent hover:bg-accent-light shadow-lg shadow-accent/25 hover:shadow-xl"
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>

                <p className="text-xs text-center text-text-muted leading-relaxed">
          Your message will be securely delivered to the FODSE team. We'll
          respond to the email address you provide as soon as possible.
        </p>
      </form>
    </motion.div>
  );
}