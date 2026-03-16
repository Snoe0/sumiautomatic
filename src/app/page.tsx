"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
  Layout matched to the reference screenshot of sumiautomatic.com:
  - 3 images across the top (left tall, center-top, right)
  - "nyc tattoos" large text center-right, "by ayla sumi" below
  - 2 images bottom (left tall, right side motorcycle + grass)
  All tightly packed and overlapping on a black background.
*/

interface Block {
  type: "image" | "heading" | "byline";
  src?: string;
  // Percentage-based positioning relative to viewport
  top: string;
  left: string;
  width: string;
  height: string;
  z: number;
}

const blocks: Block[] = [
  // Top-left: tall tattoo image (arabic + flower)
  { type: "image", src: "/images/home/hero-1.png", top: "0", left: "0", width: "28%", height: "58%", z: 4 },
  // Top-center: "wish you were here" stomach tattoo
  { type: "image", src: "/images/home/hero-2.png", top: "0", left: "26%", width: "30%", height: "35%", z: 5 },
  // Top-right: cherry blossom — extends to right edge
  { type: "image", src: "/images/home/hero-3.png", top: "0", left: "54%", width: "46%", height: "55%", z: 3 },
  // Bottom-left: moon tattoo — taller
  { type: "image", src: "/images/home/hero-4.png", top: "55%", left: "0", width: "28%", height: "45%", z: 6 },
  // Bottom-right: motorcycle + shoe — shifted right, extends to edge
  { type: "image", src: "/images/home/hero-5.png", top: "50%", left: "56%", width: "34%", height: "44%", z: 2 },
  // "nyc tattoos" — center area matching reference
  { type: "heading", top: "34%", left: "28%", width: "50%", height: "22%", z: 8 },
  // "by ayla sumi" — below heading, right-aligned
  { type: "byline", top: "53%", left: "42%", width: "30%", height: "8%", z: 7 },
];

function FloatingImage({
  src,
  index,
  mouseX,
  mouseY,
  style,
}: {
  src: string;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 40, damping: 25 });
  const springY = useSpring(y, { stiffness: 40, damping: 25 });

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = Number(mouseX.get());
      const my = Number(mouseY.get());
      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 300 && dist > 0) {
        const force = (1 - dist / 300) * 6;
        x.set((dx / dist) * force);
        y.set((dy / dist) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    }
    const u1 = mouseX.on("change", update);
    const u2 = mouseY.on("change", update);
    return () => { u1(); u2(); };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      ref={ref}
      className="absolute overflow-hidden"
      style={{ ...style, x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.8, delay: 0.1 + index * 0.12 },
        scale: { duration: 0.8, delay: 0.1 + index * 0.12 },
      }}
    >
      <Image
        src={src}
        alt="Tattoo work"
        fill
        sizes="(max-width: 768px) 50vw, 40vw"
        className="object-cover"
        priority={index < 3}
      />
    </motion.div>
  );
}

export default function Home() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function onMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: "calc(100vh - 64px)" }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content container */}
      <div className="relative w-full h-full z-[1]">
        {blocks.map((block, i) => {
          const posStyle: React.CSSProperties = {
            top: block.top,
            left: block.left,
            width: block.width,
            height: block.height,
            zIndex: block.z,
          };

          if (block.type === "image" && block.src) {
            return (
              <FloatingImage
                key={i}
                src={block.src}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
                style={posStyle}
              />
            );
          }

          if (block.type === "heading") {
            return (
              <motion.div
                key={i}
                className="absolute flex items-center justify-start"
                style={posStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <h1 className="text-[8vw] md:text-[6.5vw] font-thin tracking-wide text-white leading-[1]">
                  nyc tattoos
                </h1>
              </motion.div>
            );
          }

          if (block.type === "byline") {
            return (
              <motion.div
                key={i}
                className="absolute flex items-start justify-start"
                style={posStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <p className="text-[2.5vw] md:text-[1.8vw] tracking-[0.25em] font-thin text-white/60">
                  by ayla sumi
                </p>
              </motion.div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
