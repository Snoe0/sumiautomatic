"use client";

import { useEffect, useRef, useState } from "react";

interface DitherTextProps {
  text: string;
  className?: string;
  dotSize?: number;
  dotSpacing?: number;
  fontFamily?: string;
}

export default function DitherText({
  text,
  className = "",
  dotSize = 2.5,
  dotSpacing = 4,
  fontFamily = "Inter, sans-serif",
}: DitherTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = dimensions.width;
    const h = dimensions.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Draw text to offscreen canvas to sample
    const offscreen = document.createElement("canvas");
    offscreen.width = w * dpr;
    offscreen.height = h * dpr;
    const offCtx = offscreen.getContext("2d")!;
    offCtx.scale(dpr, dpr);

    // Compute font size from container
    const computedStyle = window.getComputedStyle(containerRef.current!);
    const fontSize = parseFloat(computedStyle.fontSize);

    offCtx.fillStyle = "#ffffff";
    offCtx.font = `${computedStyle.fontWeight} ${fontSize}px ${fontFamily}`;
    offCtx.textBaseline = "top";
    offCtx.textAlign = "center";
    offCtx.fillText(text, w / 2, 0);

    // Sample pixels and draw dithered dots
    const imageData = offCtx.getImageData(0, 0, w * dpr, h * dpr);
    const pixels = imageData.data;

    ctx.clearRect(0, 0, w, h);

    for (let y = 0; y < h; y += dotSpacing) {
      for (let x = 0; x < w; x += dotSpacing) {
        const px = Math.floor(x * dpr);
        const py = Math.floor(y * dpr);
        const i = (py * w * dpr + px) * 4;
        const alpha = pixels[i + 3] || 0;
        const brightness = (pixels[i] || 0) * (alpha / 255);

        if (brightness > 20) {
          const normalizedBrightness = brightness / 255;
          const radius = dotSize * normalizedBrightness;

          // Add subtle randomness for organic dither feel
          const jitterX = (Math.random() - 0.5) * 0.8;
          const jitterY = (Math.random() - 0.5) * 0.8;

          ctx.beginPath();
          ctx.arc(x + jitterX, y + jitterY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + normalizedBrightness * 0.4})`;
          ctx.fill();
        }
      }
    }
  }, [dimensions, text, dotSize, dotSpacing, fontFamily]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hidden text for sizing and accessibility */}
      <span className="invisible block" aria-hidden="true" style={{ fontFamily }}>
        {text}
      </span>
      <span className="sr-only">{text}</span>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
