import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-navy-900 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle gradient radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(196,149,42,0.08),transparent)]" />

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
            <div className="gold-divider" />
            <span className="text-xs font-sans font-light text-gold-500 tracking-widest uppercase">
              Est. 1872 — Geneva
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-5xl lg:text-7xl font-light text-white leading-[1.1] mb-6 animate-fade-in-up animation-delay-200"
            style={{ opacity: 0 }}
          >
            Where Security
            <br />
            <em className="font-light italic text-gold-400">Meets</em>{" "}
            Excellence.
          </h1>

          {/* Subline */}
          <p
            className="font-sans text-base lg:text-lg font-light text-white/60 leading-relaxed max-w-xl mb-12 animate-fade-in-up animation-delay-400"
            style={{ opacity: 0 }}
          >
            For over 150 years, Citadelle Private Bank has safeguarded the wealth and
            trust of private clients and institutions across 40 countries.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600"
            style={{ opacity: 0 }}
          >
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white text-sm font-sans font-medium tracking-wide transition-all duration-300"
            >
              Discover Our Services
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/50 text-white/80 hover:text-white text-sm font-sans font-light tracking-wide transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-white tracking-widest uppercase font-sans">
            Scroll
          </span>
          <div className="w-px h-10 bg-white/50 animate-pulse" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  );
}
