"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const flashImages = Array.from({ length: 14 }, (_, i) => `/images/flash/flash-${i + 1}.png`);

// Scatter positions for initial layout — spread across the page
const scatterPositions = [
  { x: 5, y: 2, rotate: -5, scale: 0.9 },
  { x: 55, y: 0, rotate: 3, scale: 0.85 },
  { x: 30, y: 5, rotate: -2, scale: 0.95 },
  { x: 70, y: 8, rotate: 6, scale: 0.8 },
  { x: 10, y: 22, rotate: 4, scale: 0.88 },
  { x: 45, y: 18, rotate: -6, scale: 0.92 },
  { x: 75, y: 20, rotate: 2, scale: 0.85 },
  { x: 20, y: 35, rotate: -3, scale: 0.9 },
  { x: 55, y: 32, rotate: 5, scale: 0.87 },
  { x: 5, y: 48, rotate: -4, scale: 0.93 },
  { x: 40, y: 45, rotate: 3, scale: 0.86 },
  { x: 70, y: 42, rotate: -5, scale: 0.9 },
  { x: 25, y: 58, rotate: 4, scale: 0.88 },
  { x: 60, y: 55, rotate: -2, scale: 0.92 },
];

function DraggableFlash({ src, index }: { src: string; index: number }) {
  const [zIndex, setZIndex] = useState(index);
  const pos = scatterPositions[index];

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: "clamp(140px, 22vw, 280px)",
        zIndex,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: pos.rotate * 2 }}
      animate={{ opacity: 1, scale: pos.scale, rotate: pos.rotate }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: pos.scale * 1.1, zIndex: 100 }}
      onDragStart={() => setZIndex(50 + index)}
      onDragEnd={() => setZIndex(20 + index)}
      whileHover={{ scale: pos.scale * 1.05 }}
    >
      <Image
        src={src}
        alt="Flash tattoo design"
        width={400}
        height={400}
        className="w-full h-auto pointer-events-none select-none"
        draggable={false}
        style={{ mixBlendMode: "screen" }}
      />
    </motion.div>
  );
}

export default function Flash() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-4">
        <motion.h1
          className="text-4xl md:text-5xl font-thin tracking-wide text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          flash
        </motion.h1>
        <motion.p
          className="text-xs text-white/30 tracking-widest mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          drag to rearrange
        </motion.p>
      </div>

      {/* Draggable flash designs */}
      <div className="relative z-[1]" style={{ height: "max(200vh, 1800px)" }}>
        {flashImages.map((src, i) => (
          <DraggableFlash key={i} src={src} index={i} />
        ))}
      </div>
    </div>
  );
}
