import Image from "next/image";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Book — @sumiautomatic",
};

export default function Book() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: form */}
        <div>
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight mb-2 text-white">
              book
            </h1>
            <p className="text-sm text-white/40 tracking-wide mb-10">
              a consultation with me
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>

        {/* Right: image */}
        <ScrollReveal delay={0.2}>
          <div className="relative aspect-[3/4] overflow-hidden bg-white/5 md:sticky md:top-24">
            <Image
              src="/images/book/book-1.png"
              alt="Tattoo work"
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
