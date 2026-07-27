const milestones = [
  { year: "1872", event: "Founded in Geneva by Henri Moreau-Lacroix" },
  { year: "1924", event: "Expanded to London and Zurich" },
  { year: "1968", event: "Pioneered cross-border wealth management" },
  { year: "2001", event: "Launched secure online banking platform" },
  { year: "2019", event: "Achieved carbon-neutral operations" },
  { year: "2024", event: "Introduced AI-assisted portfolio monitoring" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-divider" />
              <span className="text-xs font-sans font-light text-gold-500 tracking-widest uppercase">
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl font-light text-navy-900 leading-tight mb-6">
              More than a bank.
              <br />
              A <em className="italic text-navy-700">legacy</em>.
            </h2>

            <div className="space-y-5 text-sm font-sans font-light text-navy-900/65 leading-relaxed">
              <p>
                Citadelle Private Bank was born from a conviction that private wealth
                deserves private care. Henri Moreau-Lacroix, a Swiss financier
                with roots in Geneva&apos;s merchant families, opened our first
                office in 1872 with a single client book and an enduring
                philosophy: discretion, diligence, and trust.
              </p>
              <p>
                Over fifteen decades, we have navigated wars, recessions,
                technological revolutions, and shifting regulatory landscapes —
                always placing our clients&apos; long-term interests above
                short-term market pressures.
              </p>
              <p>
                Today, Citadelle Private Bank manages assets for more than 1,200 private
                families, family offices, and institutions across 40 countries.
                We remain privately held, independent, and answerable only to
                our clients.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="font-serif text-3xl font-light text-navy-900">
                  AA+
                </div>
                <div className="text-xs font-sans font-light text-navy-900/40 tracking-widest uppercase mt-1">
                  Credit Rating
                </div>
              </div>
              <div className="w-px h-10 bg-navy-900/10" />
              <div>
                <div className="font-serif text-3xl font-light text-navy-900">
                  Top 5
                </div>
                <div className="text-xs font-sans font-light text-navy-900/40 tracking-widest uppercase mt-1">
                  European Private Banks
                </div>
              </div>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-navy-900/10" />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative pl-8 pb-8 last:pb-0">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gold-500 -translate-x-[3px]" />
                  <div className="text-xs font-sans font-light text-gold-500 tracking-widest mb-1">
                    {m.year}
                  </div>
                  <div className="font-sans text-sm font-light text-navy-900/75">
                    {m.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
