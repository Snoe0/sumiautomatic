import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Flash — @sumiautomatic",
};

const flashImages = [
  "/images/portfolio/ig-1.png",
  "/images/portfolio/ig-2.png",
  "/images/portfolio/ig-3.png",
  "/images/portfolio/ig-4.png",
  "/images/portfolio/ig-5.png",
  "/images/portfolio/ig-6.png",
  "/images/portfolio/ig-7.png",
];

export default function Flash() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <ScrollReveal>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight mb-4 text-white">
          flash
        </h1>
        <p className="text-sm text-white/40 tracking-wide mb-16">
          ready-to-go designs — first come, first served
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flashImages.map((src, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="relative overflow-hidden bg-white/5 group">
              <Image
                src={src}
                alt="Flash tattoo design"
                width={800}
                height={800}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 text-center">
          <p className="text-sm text-white/40 mb-6">
            interested in a flash piece? get in touch
          </p>
          <Link
            href="/book"
            className="inline-block text-sm tracking-widest uppercase border border-white/30 px-8 py-3 text-white/80 hover:bg-white hover:text-black transition-all duration-300"
          >
            book now
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
