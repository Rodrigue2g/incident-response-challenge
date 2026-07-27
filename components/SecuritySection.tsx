const pillars = [
  {
    number: "01",
    title: "Zero-Trust Architecture",
    description:
      "Every access request is continuously verified. No user, device, or session is trusted by default — inside or outside our network.",
  },
  {
    number: "02",
    title: "End-to-End Encryption",
    description:
      "All data in transit and at rest is encrypted with AES-256. Your communications and financial records remain private at all times.",
  },
  {
    number: "03",
    title: "Real-Time Fraud Detection",
    description:
      "Our anomaly-detection systems monitor transactions continuously, flagging unusual patterns within milliseconds.",
  },
  {
    number: "04",
    title: "Regulatory Compliance",
    description:
      "We adhere to FINMA, GDPR, and international AML frameworks. Independent audits are conducted annually by third-party assessors.",
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-divider" />
            <span className="text-xs font-sans font-light text-gold-500 tracking-widest uppercase">
              Security Centre
            </span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-navy-900 leading-tight mb-5">
            Your security is our
            <br />
            <em className="italic">first</em> priority.
          </h2>
          <p className="font-sans text-sm font-light text-navy-900/60 leading-relaxed">
            Banking requires absolute confidence. Our multi-layered security
            infrastructure is engineered to protect your assets, data, and
            privacy — in every interaction, on every device.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-navy-900/10">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="bg-cream-100 p-10 group hover:bg-cream-50 transition-colors">
              <div className="font-serif text-5xl font-light text-navy-900/10 mb-4 group-hover:text-gold-500/20 transition-colors">
                {pillar.number}
              </div>
              <h3 className="font-serif text-xl font-medium text-navy-900 mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm font-light text-navy-900/60 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-10 border-t border-navy-900/10">
          <div>
            <p className="font-serif text-xl font-light text-navy-900 mb-1">
              Report a security concern
            </p>
            <p className="font-sans text-sm font-light text-navy-900/50">
              Our security team is available 24 hours a day, 7 days a week.
            </p>
          </div>
          <a
            href="mailto:security@citadelle-bank.local"
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-navy-900/30 hover:border-navy-900 text-sm font-sans font-medium text-navy-900 tracking-wide transition-all duration-300 group"
          >
            Contact Security
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
    </section>
  );
}
