import Image from "next/image";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import InstagramGrid from "@/components/InstagramGrid";
import { fetchInstagramPosts } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Portfolio — @sumiautomatic",
};

const freshImages = Array.from({ length: 8 }, (_, i) => `/images/portfolio/fresh-${i + 1}.jpeg`);

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
        <ScrollReveal key={i} delay={i * 0.05}>
          <div className="aspect-square relative overflow-hidden bg-white/5 group">
            <Image
              src={src}
              alt="Tattoo work"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export default async function Portfolio() {
  const instagramPosts = await fetchInstagramPosts(12);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <ScrollReveal>
        <h1 className="text-4xl md:text-5xl font-thin tracking-wide mb-16 text-white">
          portfolio
        </h1>
      </ScrollReveal>

      {/* Instagram Posts — live feed or fallback */}
      <section className="mb-20">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-sm tracking-widest uppercase text-white/40">
              Instagram
            </h2>
            <a
              href="https://instagram.com/sumiautomatic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/50 transition-colors"
            >
              @sumiautomatic
            </a>
          </div>
        </ScrollReveal>
        <InstagramGrid posts={instagramPosts} />
      </section>

      {/* Fresh Tattoos */}
      <section className="mb-20">
        <ScrollReveal>
          <h2 className="text-sm tracking-widest uppercase mb-8 text-white/40">
            Fresh Tattoos
          </h2>
        </ScrollReveal>
        <ImageGrid images={freshImages} columns={4} />
      </section>

      {/* Healed Tattoos */}
      <section className="mb-20">
        <ScrollReveal>
          <h2 className="text-sm tracking-widest uppercase mb-8 text-white/40">
            Healed Tattoos
          </h2>
        </ScrollReveal>
        <ImageGrid images={healedImages} columns={4} />
      </section>

      {/* More Work */}
      <section className="mb-20">
        <ScrollReveal>
          <h2 className="text-sm tracking-widest uppercase mb-8 text-white/40">
            More Work
          </h2>
        </ScrollReveal>
        <ImageGrid images={extraImages} columns={4} />
      </section>
    </div>
  );
}
