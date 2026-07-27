import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import { CitadelleLogo } from "@/components/CitadelleLogo";

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

export default function Home() {
  return (
    <main className="public-page">
      <PublicHeader active="home" />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Banking made clear</p>
          <h1>Move forward with confidence.</h1>
          <p className="hero-intro">
            Simple everyday banking, thoughtful support, and security that works
            quietly in the background.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#services">Explore accounts <Arrow /></a>
            <Link className="text-link" href="/security">How we protect you <Arrow /></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="north-star">✦</div>
          <p>Independent since 1984</p>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading">
          <p className="eyebrow">What we do</p>
          <h2>Everything you need. Nothing you don’t.</h2>
        </div>
        <div className="service-grid">
          <article><span>01</span><h3>Everyday accounts</h3><p>Clear fees, instant updates, and simple tools for daily money.</p></article>
          <article><span>02</span><h3>Savings</h3><p>Flexible ways to build towards the things that matter to you.</p></article>
          <article><span>03</span><h3>Business banking</h3><p>Practical support and straightforward tools for growing teams.</p></article>
        </div>
      </section>

      <section className="security-callout" id="security">
        <div>
          <p className="eyebrow">Security centre</p>
          <h2>Your money is watched around the clock.</h2>
        </div>
        <p>Our team monitors unusual activity 24/7. If something looks wrong, contact us immediately.</p>
        <Link className="light-button" href="/security">Visit security centre <Arrow /></Link>
      </section>

      <footer id="help">
          <div className="wordmark"><span className="brand-mark"><CitadelleLogo /></span><span>Citadelle</span></div>
        <p>Fictional bank · Educational environment</p>
        <p>© 2026 Citadelle Private Bank</p>
      </footer>
    </main>
  );
}
