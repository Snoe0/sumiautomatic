import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — @sumiautomatic",
};

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Images */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            <Image
              src="/images/about/about-1.png"
              alt="Ayla Sumi"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            <Image
              src="/images/about/about-2.png"
              alt="Tattoo work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:sticky md:top-24">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-10">
            about
          </h1>

          <div className="space-y-6 text-sm leading-relaxed tracking-wide">
            <div>
              <p className="font-medium text-base">A. Sumi Park</p>
              <p className="text-neutral-500">Brooklyn, NYC</p>
              <p className="text-neutral-500">Tattoo Artist</p>
            </div>

            <p className="text-neutral-500">oct 2024 - present</p>

            <p>
              I specialize in both signature flash and fully custom tattoo designs.
              I am always open to working in a variety of styles, so don&apos;t be afraid
              to reach out with any ideas you might have in mind.
            </p>

            <p>
              When you book with me, you are a key part of designing your own tattoo.
              I want to make sure you leave with something you love.
            </p>

            <div className="pt-4">
              <Link
                href="/book"
                className="inline-block text-sm tracking-widest uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
              >
                Book Now
              </Link>
            </div>

            <div className="pt-6">
              <a
                href="https://instagram.com/sumiautomatic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide text-neutral-500 hover:text-black transition-colors"
              >
                @sumiautomatic
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
