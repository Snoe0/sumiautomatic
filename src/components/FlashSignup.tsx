"use client";

import { useState, FormEvent } from "react";

export default function FlashSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // For now just show thank you — can wire to webhook/mailchimp later
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return <p className="text-sm text-white/60">thank you!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm">
      <input
        type="email"
        required
        placeholder="email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border-b border-white/20 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent"
      />
      <button
        type="submit"
        className="text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white/30"
      >
        sign up
      </button>
    </form>
  );
}
