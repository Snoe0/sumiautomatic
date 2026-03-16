import Image from "next/image";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Book — @sumiautomatic",
};

export default function Book() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: form */}
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
            book
          </h1>
          <p className="text-sm text-neutral-500 tracking-wide mb-10">
            a consultation with me
          </p>

          <ContactForm />
        </div>

        {/* Right: image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 md:sticky md:top-24">
          <Image
            src="/images/book/book-1.png"
            alt="Tattoo work"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
