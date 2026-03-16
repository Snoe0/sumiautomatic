"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HeroImage {
  src: string;
  // Final spread positions
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  rotate: number;
  z: number;
}

const images: HeroImage[] = [
  { src: "/images/home/hero-1.png", top: "5%", left: "0%", width: "26%", rotate: -2, z: 2 },
  { src: "/images/home/hero-2.png", top: "3%", left: "24%", width: "22%", rotate: 1.5, z: 3 },
  { src: "/images/home/hero-3.png", bottom: "10%", left: "0%", width: "24%", rotate: 0.5, z: 4 },
  { src: "/images/home/hero-4.png", bottom: "8%", left: "22%", width: "25%", rotate: -1.5, z: 5 },
  { src: "/images/home/hero-5.png", top: "30%", left: "12%", width: "20%", rotate: 2, z: 1 },
];

// Subtle drift after spread
const driftVariants = [
  { y: [0, -4, 0, 3, 0], duration: 8 },
  { y: [0, 3, 0, -3, 0], duration: 9.5 },
  { y: [0, -3, 0, 5, 0], duration: 7.5 },
  { y: [0, 4, 0, -4, 0], duration: 10 },
  { y: [0, -3, 0, 2, 0], duration: 8.5 },
];

// Starting stacked position (center of left half)
const STACK_LEFT = "12%";
const STACK_TOP = "30%";

function FloatingImage({
  src,
  finalStyle,
  rotate,
  index,
  mouseX,
  mouseY,
  hasSpread,
}: {
  src: string;
  finalStyle: React.CSSProperties;
  rotate: number;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  hasSpread: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!hasSpread) return;

    function updatePosition() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mx = Number(mouseX.get());
      const my = Number(mouseY.get());
      const dx = centerX - mx;
      const dy = centerY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 200;

      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 10;
        x.set((dx / dist) * force);
        y.set((dy / dist) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    const unsub1 = mouseX.on("change", updatePosition);
    const unsub2 = mouseY.on("change", updatePosition);
    return () => {
      unsub1();
      unsub2();
    };
  }, [mouseX, mouseY, x, y, hasSpread]);

  const drift = driftVariants[index];

  // Stacked: all images at same center position, stacked by z-index, slight random rotation
  const stackedRotation = (index - 2) * 3; // -6, -3, 0, 3, 6

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        width: finalStyle.width,
        zIndex: finalStyle.zIndex,
        x: springX,
        y: springY,
      }}
      initial={{
        top: STACK_TOP,
        left: STACK_LEFT,
        opacity: 0,
        scale: 0.9,
        rotate: stackedRotation,
      }}
      animate={
        hasSpread
          ? {
              top: finalStyle.top ?? "auto",
              bottom: finalStyle.bottom ?? "auto",
              left: finalStyle.left ?? "auto",
              right: finalStyle.right ?? "auto",
              opacity: 1,
              scale: 1,
              rotate: rotate,
              y: drift.y,
            }
          : {
              top: STACK_TOP,
              left: STACK_LEFT,
              opacity: 1,
              scale: 1,
              rotate: stackedRotation,
            }
      }
      transition={
        hasSpread
          ? {
              top: { duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
              bottom: { duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
              left: { duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
              right: { duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.4, delay: index * 0.08 },
              y: {
                duration: drift.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5 + index * 0.3,
              },
            }
          : {
              opacity: { duration: 0.5, delay: index * 0.1 },
              scale: { duration: 0.5, delay: index * 0.1 },
            }
      }
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="relative overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        <Image
          src={src}
          alt="Tattoo work"
          width={500}
          height={625}
          className="object-cover"
          priority={index < 3}
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [mounted, setMounted] = useState(false);
  const [hasSpread, setHasSpread] = useState(false);

  useEffect(() => {
    setMounted(true);
    function onMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", onMouseMove);

    // Trigger spread after initial stack appears
    const timer = setTimeout(() => setHasSpread(true), 800);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Hero collage */}
        <div className="relative w-full max-w-5xl mx-auto z-[1]" style={{ height: "80vh" }}>
          {/* Title text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-end justify-center z-10 pointer-events-none pr-6 md:pr-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-thin tracking-wide text-right text-white leading-[1.1]">
              nyc
              <br />
              tattoos
            </h1>
            <p className="text-2xl md:text-3xl tracking-[0.35em] mt-8 font-thin text-white/50 text-right">
              by ayla sumi
            </p>
          </motion.div>

          {/* Floating images */}
          {images.map((img, i) => {
            const finalStyle: React.CSSProperties = {
              width: img.width,
              zIndex: img.z,
            };
            if (img.top) finalStyle.top = img.top;
            if (img.bottom) finalStyle.bottom = img.bottom;
            if (img.left) finalStyle.left = img.left;
            if (img.right) finalStyle.right = img.right;

            return (
              <FloatingImage
                key={i}
                src={img.src}
                finalStyle={finalStyle}
                rotate={img.rotate}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
                hasSpread={hasSpread}
              />
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <Link
            href="/book"
            className="inline-block text-sm tracking-widest uppercase border border-white/30 px-8 py-3 text-white/80 hover:bg-white hover:text-black transition-all duration-300"
          >
            book now
          </Link>
        </motion.div>
      </section>

      {/* Scroll gallery section */}
      <ScrollGallery />
    </>
  );
}

function ScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const galleryImages = [
    "/images/portfolio/fresh-1.jpeg",
    "/images/portfolio/fresh-2.jpeg",
    "/images/portfolio/fresh-3.jpeg",
    "/images/portfolio/fresh-4.jpeg",
    "/images/portfolio/fresh-5.jpeg",
    "/images/portfolio/fresh-6.jpeg",
    "/images/portfolio/fresh-7.jpeg",
    "/images/portfolio/fresh-8.jpeg",
  ];

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Progress: 0 when section enters viewport, 1 when it leaves
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Dot grid continues */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 mb-12 relative z-[1]">
        <motion.p
          className="text-sm tracking-widest uppercase text-white/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          recent work
        </motion.p>
      </div>

      {/* Horizontal scroll strip driven by vertical scroll */}
      <div className="relative z-[1] overflow-hidden">
        <motion.div
          className="flex gap-4 px-6"
          style={{
            x: `${-scrollProgress * 60}%`,
          }}
        >
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] relative overflow-hidden bg-white/5"
            >
              <Image
                src={src}
                alt="Tattoo work"
                fill
                sizes="350px"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
