"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GridBlock {
  src?: string;
  type: "image" | "heading" | "byline";
  desktopArea: string;
  mobileArea: string;
  z: number;
}

const blocks: GridBlock[] = [
  { src: "/images/home/hero-1.png", type: "image", desktopArea: "2/1/18/10", mobileArea: "1/1/5/5", z: 4 },
  { src: "/images/home/hero-2.png", type: "image", desktopArea: "2/11/13/17", mobileArea: "1/4/8/9", z: 5 },
  { src: "/images/home/hero-3.png", type: "image", desktopArea: "2/19/26/26", mobileArea: "9/1/16/5", z: 3 },
  { src: "/images/home/hero-4.png", type: "image", desktopArea: "20/1/34/9", mobileArea: "16/1/22/5", z: 6 },
  { src: "/images/home/hero-5.png", type: "image", desktopArea: "21/17/37/25", mobileArea: "16/5/22/9", z: 2 },
  { type: "heading", desktopArea: "12/11/18/26", mobileArea: "6/1/9/9", z: 8 },
  { type: "byline", desktopArea: "19/19/23/26", mobileArea: "8/5/10/9", z: 7 },
];

function FloatingImage({
  src,
  index,
  mouseX,
  mouseY,
}: {
  src: string;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 40, damping: 25 });
  const springY = useSpring(y, { stiffness: 40, damping: 25 });

  useEffect(() => {
    function updatePosition() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = Number(mouseX.get());
      const my = Number(mouseY.get());
      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 300;

      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 8;
        x.set((dx / dist) * force);
        y.set((dy / dist) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    }
    const u1 = mouseX.on("change", updatePosition);
    const u2 = mouseY.on("change", updatePosition);
    return () => { u1(); u2(); };
  }, [mouseX, mouseY, x, y]);

  const driftDuration = 8 + index * 1.5;

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden w-full h-full"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, y: [0, -3, 0, 3, 0] }}
      transition={{
        opacity: { duration: 0.8, delay: 0.2 + index * 0.15 },
        scale: { duration: 0.8, delay: 0.2 + index * 0.15 },
        y: { duration: driftDuration, repeat: Infinity, ease: "easeInOut", delay: 1 + index * 0.3 },
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={src}
        alt="Tattoo work"
        fill
        sizes="(max-width: 768px) 50vw, 40vw"
        className="object-cover"
        priority={index < 3}
      />
      <div className="absolute inset-0 bg-white/0 hover:bg-white/[0.03] transition-colors duration-300" />
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

  // Build CSS for grid areas
  const gridStyles = blocks.map((b, i) => `
    [data-block="${i}"] { grid-area: ${b.mobileArea}; z-index: ${b.z}; }
    @media (min-width: 768px) { [data-block="${i}"] { grid-area: ${b.desktopArea}; } }
  `).join("\n");

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: gridStyles }} />

      {/* Grid */}
      <div
        className="hero-grid relative z-[1] px-[6vw] md:px-[4vw] py-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(22, 6vh)",
          gap: "11px",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 768px) {
            .hero-grid {
              grid-template-columns: repeat(24, 1fr) !important;
              grid-template-rows: repeat(37, 2.5vh) !important;
            }
          }
        `}} />

        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <motion.div
                key={i}
                data-block={i}
                className="flex items-end justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-thin tracking-wide text-right text-white leading-[1.1]">
                  nyc
                  <br />
                  tattoos
                </h1>
              </motion.div>
            );
          }

          if (block.type === "byline") {
            return (
              <motion.div
                key={i}
                data-block={i}
                className="flex items-start justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <p className="text-lg md:text-2xl lg:text-3xl tracking-[0.35em] font-thin text-white/50 text-right">
                  by ayla sumi
                </p>
              </motion.div>
            );
          }

          if (block.src) {
            return (
              <div key={i} data-block={i} className="relative w-full h-full">
                <FloatingImage
                  src={block.src}
                  index={i}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
