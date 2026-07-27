/* eslint-disable @next/next/no-img-element */
import PublicHeader from "@/components/PublicHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { sourceClueParts } from "@/lib/generated-challenge";

const locations = [
  {
    city: "London",
    country: "United Kingdom",
    image: "/img/london.jpeg",
    description: "A global financial centre where history and modern enterprise meet.",
  },
  {
    city: "Paris",
    country: "France",
    image: "/img/paris.jpg",
    description: "A city shaped by culture, commerce, and enduring European influence.",
  },
  {
    city: "New York",
    country: "United States",
    image: "/img/nyc.jpeg",
    description: "Fast-moving, ambitious, and connected to markets around the world.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    image: "/img/singapore.jpg",
    description: "A forward-looking gateway for finance and innovation across Asia.",
  },
  {
    city: "Hong Kong",
    country: "Hong Kong",
    image: "/img/hong-kong.jpg",
    description: "A distinctive harbour city linking established and emerging markets.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    image: "/img/dubai.jpg",
    description: "An international centre built on bold ideas and global connections.",
  },
];

export default function LocationsPage() {
  return (
    <main className="locations-page">
      <PublicHeader active="locations" />

      <section className="locations-hero">
        <p className="eyebrow">Our international presence</p>
        <h1>At home in the world’s leading cities.</h1>
        <p>
          Citadelle serves private clients through a small network of carefully
          chosen international offices.
        </p>
      </section>

      <section className="location-grid" aria-label="Citadelle locations">
        {locations.map((location, index) => (
          <article
            className="location-card"
            key={location.city}
            data-office-ledger={index === 0 ? sourceClueParts[0] : undefined}
          >
            <div className="location-image">
              <img
                alt={`${location.city}, ${location.country}`}
                src={location.image}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="location-copy">
              <p>{location.country}</p>
              <h2>{location.city}</h2>
              <div className="gold-rule" />
              <p>{location.description}</p>
            </div>
          </article>
        ))}
      </section>

      <span className="source-audit-fragment" aria-hidden="true" data-archive-note={sourceClueParts[1]} />
      <script
        type="application/json"
        id="regional-display-preferences"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ locale: "en-GB", retiredThemeValue: sourceClueParts[2] }) }}
      />

      <SiteFooter note="Private banking across borders · © 2026 Citadelle Private Bank" />
    </main>
  );
}
