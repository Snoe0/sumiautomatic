import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — @sumiautomatic",
};

const igImages = Array.from({ length: 7 }, (_, i) => `/images/portfolio/ig-${i + 1}.png`);

const freshImages = Array.from({ length: 8 }, (_, i) => {
  return `/images/portfolio/fresh-${i + 1}.jpeg`;
});

const healedImages = [
  "/images/portfolio/healed-1.png",
  "/images/portfolio/healed-2.png",
  "/images/portfolio/healed-3.png",
  "/images/portfolio/healed-4.jpeg",
  "/images/portfolio/healed-5.png",
  "/images/portfolio/healed-6.png",
  "/images/portfolio/healed-7.png",
  "/images/portfolio/healed-8.png",
  "/images/portfolio/healed-9.jpg",
  "/images/portfolio/healed-10.jpeg",
  "/images/portfolio/healed-11.png",
  "/images/portfolio/healed-12.png",
];

const extraImages = [
  "/images/portfolio/extra-1.png",
  "/images/portfolio/extra-2.png",
  "/images/portfolio/extra-3.jpeg",
  "/images/portfolio/extra-4.jpg",
  "/images/portfolio/extra-5.jpeg",
  "/images/portfolio/extra-6.png",
  "/images/portfolio/extra-7.jpeg",
  "/images/portfolio/extra-8.jpeg",
];

function ImageGrid({ images, columns = 3 }: { images: string[]; columns?: number }) {
  const colClass =
    columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : columns === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`grid ${colClass} gap-3`}>
      {images.map((src, i) => (
        <div key={i} className="aspect-square relative overflow-hidden bg-neutral-100">
          <Image
            src={src}
            alt="Tattoo work"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-16">Portfolio</h1>

      {/* Instagram Posts */}
      <section className="mb-20">
        <h2 className="text-sm tracking-widest uppercase mb-8 text-neutral-500">
          Instagram
        </h2>
        <ImageGrid images={igImages} columns={3} />
      </section>

      {/* Fresh Tattoos */}
      <section className="mb-20">
        <h2 className="text-sm tracking-widest uppercase mb-8 text-neutral-500">
          Fresh Tattoos
        </h2>
        <ImageGrid images={freshImages} columns={4} />
      </section>

      {/* Healed Tattoos */}
      <section className="mb-20">
        <h2 className="text-sm tracking-widest uppercase mb-8 text-neutral-500">
          Healed Tattoos
        </h2>
        <ImageGrid images={healedImages} columns={4} />
      </section>

      {/* More Work */}
      <section className="mb-20">
        <h2 className="text-sm tracking-widest uppercase mb-8 text-neutral-500">
          More Work
        </h2>
        <ImageGrid images={extraImages} columns={4} />
      </section>
    </div>
  );
}
