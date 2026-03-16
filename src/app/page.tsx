"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  { src: "/images/home/hero-1.png", top: "5%", left: "2%", width: "28%", rotate: -3, z: 2 },
  { src: "/images/home/hero-2.png", top: "8%", right: "5%", width: "24%", rotate: 2, z: 3 },
  { src: "/images/home/hero-3.png", bottom: "12%", left: "8%", width: "26%", rotate: 1, z: 4 },
  { src: "/images/home/hero-4.png", bottom: "5%", right: "2%", width: "27%", rotate: -2, z: 5 },
  { src: "/images/home/hero-5.png", top: "38%", left: "30%", width: "22%", rotate: 3, z: 1 },
];

// Drift keyframes for each image
const driftVariants = [
  { y: [0, -12, 0, 8, 0], duration: 7 },
  { y: [0, 10, 0, -8, 0], duration: 8.5 },
  { y: [0, -8, 0, 14, 0], duration: 6.5 },
  { y: [0, 12, 0, -10, 0], duration: 9 },
  { y: [0, -10, 0, 6, 0], duration: 7.5 },
];

function FloatingImage({
  src,
  style,
  rotate,
  index,
  mouseX,
  mouseY,
}: {
  src: string;
  style: React.CSSProperties;
  rotate: number;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
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
      const maxDist = 250;

      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 25;
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
  }, [mouseX, mouseY, x, y]);

  const drift = driftVariants[index];

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        ...style,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: drift.y,
      }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.15 },
        scale: { duration: 0.6, delay: index * 0.15 },
        y: {
          duration: drift.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        },
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="relative overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        style={{ transform: `rotate(${rotate}deg)` }}
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
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero collage */}
      <div className="relative w-full max-w-5xl mx-auto" style={{ height: "80vh" }}>
        {/* Center text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-end justify-center z-10 pointer-events-none pr-6 md:pr-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-extralight tracking-tight text-right text-white leading-[0.9]">
            nyc
            <br />
            tattoos
          </h1>
          <p className="text-lg md:text-xl tracking-[0.3em] mt-4 font-extralight text-white/50 text-right">
            by ayla sumi
          </p>
        </motion.div>

        {/* Floating images */}
        {images.map((img, i) => {
          const style: React.CSSProperties = {
            width: img.width,
            zIndex: img.z,
          };
          if (img.top) style.top = img.top;
          if (img.bottom) style.bottom = img.bottom;
          if (img.left) style.left = img.left;
          if (img.right) style.right = img.right;

          return (
            <FloatingImage
              key={i}
              src={img.src}
              style={style}
              rotate={img.rotate}
              index={i}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-12 mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <Link
          href="/book"
          className="inline-block text-sm tracking-widest uppercase border border-white/30 px-8 py-3 text-white/80 hover:bg-white hover:text-black transition-all duration-300"
        >
          Book Now
        </Link>
      </motion.div>
    </section>
  );
}
