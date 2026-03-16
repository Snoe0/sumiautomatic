"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const featuredImages = [
  "/images/home/hero-1.png",
  "/images/home/hero-2.png",
  "/images/home/hero-3.png",
  "/images/home/hero-4.png",
  "/images/home/hero-5.png",
  "/images/portfolio/fresh-1.jpeg",
  "/images/portfolio/fresh-3.jpeg",
  "/images/portfolio/fresh-5.jpeg",
];

function MarqueeRow({ direction = "left", speed = 30 }: { direction?: "left" | "right"; speed?: number }) {
  const text = "nyc tattoos";
  // Repeat enough times to fill well beyond viewport
  const repeated = Array(12).fill(text).join(" \u00A0\u00A0\u00A0 ");

  return (
    <div className="overflow-hidden whitespace-nowrap py-2">
      <motion.div
        className="inline-block text-[8vw] md:text-[6vw] font-normal text-white/[0.07] leading-none select-none"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hero section */}
      <section className="relative z-[1] min-h-screen flex flex-col justify-center">
        {/* Marquee rows behind content */}
        <div className="absolute inset-0 flex flex-col justify-center gap-0 z-0 overflow-hidden">
          <MarqueeRow direction="left" speed={35} />
          <MarqueeRow direction="right" speed={40} />
          <MarqueeRow direction="left" speed={30} />
          <MarqueeRow direction="right" speed={38} />
          <MarqueeRow direction="left" speed={33} />
          <MarqueeRow direction="right" speed={42} />
          <MarqueeRow direction="left" speed={36} />
        </div>

        {/* Featured works grid */}
        <div className="relative z-[1] px-6 md:px-12 py-20">
          {/* Title */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-[12vw] md:text-[8vw] font-normal text-white leading-[0.95]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              nyc tattoos
            </h1>
            <p
              className="text-[3.5vw] md:text-[1.8vw] font-normal text-white/50 mt-4 tracking-[0.08em]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              by ayla sumi
            </p>
          </motion.div>

          {/* Image grid — asymmetric masonry-like */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {featuredImages.map((src, i) => {
              // Alternate tall and wide images
              const isTall = i % 3 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative overflow-hidden bg-white/5 ${
                    isTall ? "row-span-2" : ""
                  }`}
                  style={{ aspectRatio: isTall ? "3/5" : "4/3" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={src}
                    alt="Featured tattoo work"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    priority={i < 4}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link
              href="/book"
              className="inline-block text-sm tracking-widest uppercase border border-white/30 px-8 py-3 text-white/80 hover:bg-white hover:text-black transition-all duration-300"
            >
              book now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Second section — more marquee rows with different opacity */}
      <section className="relative z-[1] py-20 overflow-hidden">
        <div className="flex flex-col gap-0">
          <MarqueeRow direction="right" speed={28} />
          <MarqueeRow direction="left" speed={34} />
          <MarqueeRow direction="right" speed={31} />
        </div>

        {/* Portfolio teaser */}
        <div className="relative z-[1] max-w-6xl mx-auto px-6 md:px-12 mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/portfolio"
              className="text-sm tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors"
            >
              view full portfolio →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
