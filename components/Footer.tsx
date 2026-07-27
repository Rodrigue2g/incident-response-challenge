import { CitadelleLogo } from "./CitadelleLogo";

const footerLinks = {
  Services: ["Private Banking", "Wealth Management", "Corporate Solutions", "Estate Planning"],
  "Client Portal": ["Online Banking", "Mobile App", "Security Centre", "Statements"],
  Company: ["About Us", "Leadership", "Careers", "Press Room"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Regulatory Information"],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <CitadelleLogo className="w-7 h-7 text-gold-500" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base font-semibold text-white tracking-wide">
                  CITADELLE
                </span>
                <span className="text-[9px] font-sans font-light text-gold-500 tracking-widest uppercase">
                  Private Bank
                </span>
              </div>
            </div>
            <p className="font-sans text-xs font-light text-white/35 leading-relaxed">
              Private banking and wealth management since 1872. Geneva.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-sans font-medium text-white/40 tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs font-sans font-light text-white/50 hover:text-white/80 transition-colors tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-sans font-light text-white/25 tracking-wide">
            © 2026 Citadelle Private Bank SA. All rights reserved. Regulated by FINMA.
            This is a fictional entity for educational purposes only.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-sans font-light text-white/25 hover:text-white/50 transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
