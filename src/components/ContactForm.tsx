"use client";

import { useState, FormEvent } from "react";

const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL || "";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const content = [
      `**New Booking Request**`,
      `**Name:** ${formData.name}`,
      `**Email:** ${formData.email}`,
      `**Interest:** ${formData.interest}`,
      formData.message ? `**Message:** ${formData.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", interest: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-light text-white">Thank you!</p>
        <p className="text-sm text-white/40 mt-2">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm tracking-wide mb-2 text-white/70">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors bg-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm tracking-wide mb-2 text-white/70">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors bg-transparent"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm tracking-wide mb-2 text-white/70">
          Interest <span className="text-red-400">*</span>
        </label>
        <select
          id="interest"
          required
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="w-full border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors bg-transparent appearance-none"
        >
          <option value="" className="bg-[#0a0a0a]">Select one...</option>
          <option value="Flash" className="bg-[#0a0a0a]">Flash</option>
          <option value="Custom" className="bg-[#0a0a0a]">Custom</option>
          <option value="Other" className="bg-[#0a0a0a]">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm tracking-wide mb-2 text-white/70">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors bg-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="text-sm tracking-widest uppercase border border-white/30 px-8 py-3 text-white/80 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
