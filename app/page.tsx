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
          <p className="eyebrow">Private banking</p>
          <h1>Protecting what matters most.</h1>
          <p className="hero-intro">
            Discreet, independent, and built on four decades of trust. We serve
            private clients who expect more than a transaction.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#services">Our services <Arrow /></a>
            <Link className="text-link" href="/security">Security centre <Arrow /></Link>
          </div>
        </div>

        <div className="hero-stats" aria-hidden="true">
          <div className="hero-stat">
            <strong>1984</strong>
            <span>Year founded</span>
          </div>
          <div className="hero-stat">
            <strong>6</strong>
            <span>International offices</span>
          </div>
          <div className="hero-stat">
            <strong>100%</strong>
            <span>Independently owned</span>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading">
          <p className="eyebrow">What we offer</p>
          <h2>Expertise tailored to your circumstances.</h2>
        </div>
        <div className="service-grid">
          <article>
            <span>01</span>
            <h3>Wealth management</h3>
            <p>Bespoke strategies for preserving and growing long-term wealth across generations.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Private accounts</h3>
            <p>Dedicated relationship managers, discreet service, and accounts that fit your life.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Family office</h3>
            <p>Consolidated oversight of complex family assets, succession, and philanthropy.</p>
          </article>
        </div>
      </section>

      <section className="security-callout" id="security">
        <div>
          <p className="eyebrow">Security</p>
          <h2>Monitored around the clock.</h2>
        </div>
        <p>Our security operations team monitors for unusual activity 24 hours a day. If something looks wrong, contact us immediately.</p>
        <Link className="light-button" href="/security">Visit security centre <Arrow /></Link>
      </section>

      <footer id="help">
        <div className="wordmark">
          <span className="brand-mark"><CitadelleLogo /></span>
          <span>Citadelle <b>Private Bank</b></span>
        </div>
        <p>Fictional bank · Educational environment</p>
        <p>© 2026 Citadelle Private Bank</p>
      </footer>

      <div className="site-notice">
        <p className="site-notice-label">Security notice</p>
        <p dangerouslySetInnerHTML={{ __html:
          "A third-party audit of this website identified content present in the page source that" +
          " was not intended for public release. Our web team is working to resolve this. If you" +
          " have discovered anything, please report it to our" +
          " <!-- TODO: rm [CVE-2891] — My third is the answer to six multiplied by seven. -->" +
          " <a href=\"mailto:security@citadelle.local?subject=Use%20browser%20inspector%20to%20find%20out%20more\">security team</a>."
        }} />
      </div>
    </main>
  );
}
