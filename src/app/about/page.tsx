import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About — @sumiautomatic",
};

export default function About() {
  return (
    <div>
      {/* Hero: image with large overlaid "about" text */}
      <section className="relative w-full flex items-center justify-center py-12 md:py-20 overflow-hidden">
        {/* Centered image */}
        <div className="relative w-[55%] md:w-[40%] aspect-[3/4] mx-auto z-[1]">
          <Image
            src="/images/about/about-1.png"
            alt="Ayla Sumi"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Large "about" text overlaid */}
        <h1
          className="absolute bottom-[5%] md:bottom-[8%] left-0 z-[2] text-[22vw] md:text-[18vw] font-normal leading-[0.85] text-white/80 pointer-events-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          about
        </h1>
      </section>

      {/* Bio section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Second image */}
          <ScrollReveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
              <Image
                src="/images/about/about-2.png"
                alt="Tattoo work"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div>
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
                    book now
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
    </div>
  );
}
