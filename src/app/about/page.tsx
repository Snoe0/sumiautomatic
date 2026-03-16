import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About — @sumiautomatic",
};

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Images */}
        <div className="flex flex-col gap-6">
          <ScrollReveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
              <Image
                src="/images/about/about-1.png"
                alt="Ayla Sumi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
              <Image
                src="/images/about/about-2.png"
                alt="Tattoo work"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Bio */}
        <div className="md:sticky md:top-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight mb-10 text-white">
              about
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-6 text-sm leading-relaxed tracking-wide">
              <div>
                <p className="font-medium text-base text-white">A. Sumi Park</p>
                <p className="text-white/40">Brooklyn, NYC</p>
                <p className="text-white/40">Tattoo Artist</p>
              </div>

              <p className="text-white/40">oct 2024 - present</p>

              <p className="text-white/70">
                I specialize in both signature flash and fully custom tattoo designs.
                I am always open to working in a variety of styles, so don&apos;t be afraid
                to reach out with any ideas you might have in mind.
              </p>

              <p className="text-white/70">
                When you book with me, you are a key part of designing your own tattoo.
                I want to make sure you leave with something you love.
              </p>

              <div className="pt-4">
                <Link
                  href="/book"
                  className="inline-block text-sm tracking-widest uppercase border border-white/30 px-8 py-3 text-white/80 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>

              <div className="pt-6">
                <a
                  href="https://instagram.com/sumiautomatic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-wide text-white/40 hover:text-white transition-colors"
                >
                  @sumiautomatic
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
