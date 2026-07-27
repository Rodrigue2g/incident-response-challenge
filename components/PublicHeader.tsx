"use client";

import Link from "next/link";
import { useState } from "react";
import { CitadelleLogo } from "./CitadelleLogo";

type PublicRoute = "home" | "locations" | "security" | "documents" | "help";

const links: { label: string; href: string; route: PublicRoute }[] = [
  { label: "Home", href: "/", route: "home" },
  { label: "Locations", href: "/locations", route: "locations" },
  { label: "Security", href: "/security", route: "security" },
  { label: "Documents", href: "/documents", route: "documents" },
  { label: "Help", href: "/help", route: "help" },
];

export default function PublicHeader({
  active,
  appearance = "navy",
}: {
  active: PublicRoute;
  appearance?: "navy" | "black";
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`public-header public-header-${appearance}`}>
      <div className="public-header-inner">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
          <span className="brand-mark"><CitadelleLogo /></span>
          <span>Citadelle <b>Private Bank</b></span>
        </Link>

        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="public-menu-button"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <i /><i /><i />
        </button>

        <nav aria-label="Main navigation" className={open ? "menu-open" : ""}>
          {links.map((link) => (
            <Link
              aria-current={active === link.route ? "page" : undefined}
              className={active === link.route ? "current-link" : undefined}
              href={link.href}
              key={link.route}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-button" href="/admin" onClick={() => setOpen(false)}>
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
