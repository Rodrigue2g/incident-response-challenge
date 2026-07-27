const services = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Private Banking",
    subtitle: "Bespoke wealth solutions",
    description:
      "Dedicated relationship managers craft personalised strategies for your unique financial circumstances, goals, and legacy.",
    link: "#private-banking",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Wealth Management",
    subtitle: "Grow and preserve capital",
    description:
      "Multi-asset investment strategies built around your horizon and values, with full transparency on performance and risk.",
    link: "#services",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: "Corporate Solutions",
    subtitle: "Institutional-grade services",
    description:
      "Treasury management, trade finance, and structured lending solutions for companies navigating complex global markets.",
    link: "#services",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    title: "Estate Planning",
    subtitle: "Protect your legacy",
    description:
      "Cross-border succession planning, fiduciary services, and philanthropic structuring to ensure your wealth endures.",
    link: "#services",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="gold-divider" />
              <span className="text-xs font-sans font-light text-gold-500 tracking-widest uppercase">
                What We Offer
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-navy-900 leading-tight">
              Services built around
              <br />
              <em className="italic text-navy-700">your</em> ambitions.
            </h2>
          </div>
          <p className="font-sans text-sm font-light text-navy-900/60 leading-relaxed max-w-sm lg:text-right">
            Every service we provide is shaped by a single commitment — to put
            your interests at the centre of every decision.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy-900/10">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.link}
              className="group bg-cream-50 p-8 flex flex-col gap-6 hover:bg-navy-900 transition-colors duration-500"
            >
              <div className="text-gold-500 group-hover:text-gold-400 transition-colors">
                {service.icon}
              </div>
              <div>
                <div className="text-[10px] font-sans font-light text-navy-900/40 group-hover:text-white/40 tracking-widest uppercase mb-2 transition-colors">
                  {service.subtitle}
                </div>
                <h3 className="font-serif text-xl font-medium text-navy-900 group-hover:text-white mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-sm font-light text-navy-900/60 group-hover:text-white/60 leading-relaxed transition-colors">
                  {service.description}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-2 text-gold-500 group-hover:text-gold-400 text-xs font-sans tracking-wide transition-colors">
                Learn more
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
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
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
