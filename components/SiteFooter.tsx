import Link from "next/link";
import { CitadelleLogo } from "./CitadelleLogo";

export function SiteFooter({ note }: { note?: string }) {
  return (
    <div className="site-footer-bar">
      <footer>
        <div className="wordmark">
          <span className="brand-mark"><CitadelleLogo /></span>
          <span>Citadelle <b>Private Bank</b></span>
        </div>
        <div className="footer-right">
          <nav className="footer-links" aria-label="Legal">
            <Link href="/documents#privacy">Privacy policy</Link>
            <Link href="/documents#cookies">Cookie policy</Link>
            <Link href="/documents#terms">Terms of use</Link>
          </nav>
          <p>{note ?? "© 2026 Citadelle Private Bank"}</p>
        </div>
      </footer>
    </div>
  );
}
