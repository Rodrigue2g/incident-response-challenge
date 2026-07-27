"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CitadelleLogo } from "./CitadelleLogo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Private Banking", href: "#private-banking" },
  { label: "Security Centre", href: "#security" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/98 backdrop-blur-sm shadow-lg shadow-navy-950/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <CitadelleLogo className="w-8 h-8 text-gold-500 group-hover:text-gold-400 transition-colors" />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-semibold text-white tracking-wide">
                CITADELLE
              </span>
              <span className="text-[10px] font-sans font-light text-gold-500 tracking-widest uppercase">
                Private Bank
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-sm font-sans font-light text-white/80 hover:text-white transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/online-banking"
              className="text-sm font-sans font-light text-white/70 hover:text-white transition-colors tracking-wide"
            >
              Sign In
            </Link>
            <Link
              href="/online-banking"
              className="text-sm font-sans font-medium px-5 py-2.5 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white transition-all duration-300 tracking-wide"
            >
              Online Banking
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-navy-900 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-sans font-light text-white/80 hover:text-white transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/online-banking"
            className="mt-2 text-sm font-sans font-medium px-5 py-3 border border-gold-500 text-gold-400 text-center tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            Online Banking
          </Link>
        </div>
      </div>
    </header>
  );
}
