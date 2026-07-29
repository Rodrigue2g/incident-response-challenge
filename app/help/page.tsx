import HelpChat from "@/components/HelpChat";
import PublicHeader from "@/components/PublicHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function HelpPage() {
  return (
    <main className="help-page">
      <PublicHeader active="help" />
      <section className="help-layout">
        <div className="help-copy">
          <p className="eyebrow">Client support</p>
          <h1>How can we help?</h1>
          <p>Our digital assistant can help with account safety, support cases, and general questions about Citadelle services.</p>
        </div>
        <HelpChat />
      </section>
      <SiteFooter />
    </main>
  );
}
