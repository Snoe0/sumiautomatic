import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero collage */}
      <div className="relative w-full max-w-5xl mx-auto" style={{ height: "80vh" }}>
        {/* Main centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-center">
            nyc tattoos
          </h1>
          <p className="text-lg md:text-xl tracking-widest mt-2 font-light">
            by ayla sumi
          </p>
        </div>

        {/* Collage images - overlapping asymmetric layout */}
        <div className="absolute top-[5%] left-[2%] w-[35%] md:w-[28%] z-[2] rotate-[-3deg]">
          <Image
            src="/images/home/hero-1.png"
            alt="Tattoo work"
            width={400}
            height={500}
            className="object-cover shadow-lg"
          />
        </div>

        <div className="absolute top-[8%] right-[5%] w-[30%] md:w-[24%] z-[3] rotate-[2deg]">
          <Image
            src="/images/home/hero-2.png"
            alt="Tattoo work"
            width={400}
            height={500}
            className="object-cover shadow-lg"
          />
        </div>

        <div className="absolute bottom-[10%] left-[10%] w-[32%] md:w-[26%] z-[4] rotate-[1deg]">
          <Image
            src="/images/home/hero-3.png"
            alt="Tattoo work"
            width={400}
            height={500}
            className="object-cover shadow-lg"
          />
        </div>

        <div className="absolute bottom-[5%] right-[2%] w-[34%] md:w-[27%] z-[5] rotate-[-2deg]">
          <Image
            src="/images/home/hero-4.png"
            alt="Tattoo work"
            width={400}
            height={500}
            className="object-cover shadow-lg"
          />
        </div>

        <div className="absolute top-[40%] left-[30%] w-[28%] md:w-[22%] z-[1] rotate-[3deg]">
          <Image
            src="/images/home/hero-5.png"
            alt="Tattoo work"
            width={400}
            height={500}
            className="object-cover shadow-lg"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 mb-16 text-center">
        <Link
          href="/book"
          className="inline-block text-sm tracking-widest uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
