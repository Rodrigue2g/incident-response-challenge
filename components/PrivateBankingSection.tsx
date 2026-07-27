export default function PrivateBankingSection() {
  return (
    <section id="private-banking" className="py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-navy-800 relative overflow-hidden">
              {/* Abstract architectural lines */}
              <div className="absolute inset-0 flex items-end justify-center p-8">
                <div className="w-full space-y-3">
                  {[100, 80, 90, 70, 85, 60, 75].map((w, i) => (
                    <div
                      key={i}
                      className="h-px bg-gradient-to-r from-gold-500/60 to-transparent"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-navy-700/30 to-transparent" />
              {/* Corner ornament */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-gold-500/40" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-gold-500/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gold-500/40 font-serif text-6xl font-light italic mb-2">
                    CPB
                  </div>
                  <div className="text-white/10 text-[10px] font-sans tracking-widest uppercase">
                    Citadelle Private Banking
                  </div>
                </div>
              </div>
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -right-6 bg-gold-500 p-6 hidden lg:block">
              <div className="font-serif text-3xl font-light text-white">
                1,200+
              </div>
              <div className="text-xs font-sans font-light text-white/80 tracking-wide mt-1">
                Private clients worldwide
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-divider" />
              <span className="text-xs font-sans font-light text-gold-500 tracking-widest uppercase">
                Private Banking
              </span>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
              A relationship built
              <br />
              on <em className="italic text-gold-400">trust</em>.
            </h2>

            <p className="font-sans text-sm font-light text-white/60 leading-relaxed mb-8">
              Our private banking model is founded on a simple idea: every
              client deserves a dedicated advisor who understands not just their
              portfolio, but their life. We take a long view, because lasting
              wealth is built over generations, not quarters.
            </p>

            <div className="space-y-5 mb-10">
              {[
                "Dedicated senior relationship manager",
                "24/7 secure digital access",
                "Consolidated multi-currency reporting",
                "Tailored credit and lending solutions",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <div className="w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
                  <span className="text-sm font-sans font-light text-white/70">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 text-sm font-sans font-medium text-gold-400 hover:text-gold-300 tracking-wide transition-colors group"
            >
              Schedule a confidential consultation
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
