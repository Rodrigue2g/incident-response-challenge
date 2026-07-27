const stats = [
  { value: "150+", label: "Years of excellence" },
  { value: "CHF 280bn", label: "Assets under management" },
  { value: "40", label: "Countries served" },
  { value: "98.9%", label: "Client retention rate" },
];

export default function StatsBar() {
  return (
    <section className="bg-navy-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 px-8 text-center">
              <div className="font-serif text-3xl lg:text-4xl font-light text-gold-400 mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-sans font-light text-white/40 tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
