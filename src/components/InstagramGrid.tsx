"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { InstagramPost } from "@/lib/instagram";

// Static fallback images (used when no Instagram token is configured)
const fallbackImages = Array.from({ length: 7 }, (_, i) => `/images/portfolio/ig-${i + 1}.png`);

export default function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  const hasLivePosts = posts.length > 0;

  if (!hasLivePosts) {
    // Fallback to static images
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fallbackImages.map((src, i) => (
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {posts.map((post, i) => {
        const imageUrl =
          post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

        if (!imageUrl) return null;

        return (
          <ScrollReveal key={post.id} delay={i * 0.05}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-square relative overflow-hidden bg-white/5 group"
            >
              <Image
                src={imageUrl}
                alt={post.caption?.slice(0, 100) || "Instagram post"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
            </a>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
