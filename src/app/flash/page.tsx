import Image from "next/image";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import FlashSignup from "@/components/FlashSignup";

export const metadata: Metadata = {
  title: "Flash — @sumiautomatic",
};

const flashImages = Array.from({ length: 14 }, (_, i) => `/images/flash/flash-${i + 1}.png`);

export default function Flash() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <ScrollReveal>
        <h1 className="text-4xl md:text-5xl font-thin tracking-wide mb-16 text-white">
          flash
        </h1>
      </ScrollReveal>

      {/* Flash drop signup */}
      <ScrollReveal delay={0.1}>
        <div className="mb-20">
          <h2 className="text-lg font-thin tracking-wide text-white mb-3">
            flash drop
          </h2>
          <p className="text-sm text-white/40 tracking-wide mb-6 max-w-md">
            sign up with your email address to receive updates on new design releases.
          </p>
          <FlashSignup />
        </div>
      </ScrollReveal>

      {/* 3-column image grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flashImages.map((src, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="relative overflow-hidden bg-white/5 group">
              <Image
                src={src}
                alt="Flash tattoo design"
                width={600}
                height={600}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
