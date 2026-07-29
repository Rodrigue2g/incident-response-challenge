import type { Metadata } from "next";
import PublicHeader from "@/components/PublicHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Document Library — Citadelle",
  description: "Policies, notices, and public documents from Citadelle.",
};

const documents = [
  {
    code: "PRI-2026",
    title: "Privacy policy",
    description: "How Citadelle collects, uses, and protects personal information.",
    href: "#privacy",
    type: "Policy",
  },
  {
    code: "TER-2026",
    title: "Terms of use",
    description: "Rules and conditions for using this educational environment.",
    href: "#terms",
    type: "Terms",
  },
  {
    code: "CKI-2026",
    title: "Cookie notice",
    description: "Information about the strictly necessary session cookies.",
    href: "#cookies",
    type: "Notice",
  },
  {
    code: "OPS-FA-07",
    title: "Transaction review appendix",
    description: "Supporting workbook for the July transaction-risk review.",
    href: "/evidence/fraud_analysis.ipynb",
    type: "Operational",
    download: "citadelle_transaction_review.ipynb",
  },
];

function DocumentIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40">
      <path d="M10 4.5h14l6 6V35.5H10z" />
      <path d="M24 4.5v7h6M15 19h10M15 24h10M15 29h7" />
    </svg>
  );
}

export default function DocumentsPage() {
  return (
    <main className="documents-page">
      <PublicHeader active="documents" />

      <section className="documents-hero">
        <p className="eyebrow">Corporate information</p>
        <h1>Document library</h1>
        <p>
          Browse Citadelle policies, regulatory notices, and materials published
          for authorised review.
        </p>
      </section>

      <section className="documents-library" aria-labelledby="library-heading">
        <div className="documents-heading">
          <div>
            <p className="eyebrow">Latest publications</p>
            <h2 id="library-heading">Public documents</h2>
          </div>
          <p>Four documents · Updated July 2026</p>
        </div>

        <div className="policy-grid">
          {documents.map((document) => (
            <a
              className="policy-card"
              download={document.download}
              href={document.href}
              key={document.code}
            >
              <div className="policy-icon"><DocumentIcon /></div>
              <div className="document-meta">
                <span>{document.type}</span>
                <span>{document.code}</span>
              </div>
              <h3>{document.title}</h3>
              <p>{document.description}</p>
              <span className="policy-link">
                {document.download ? "Download document" : "Read document"}
                <b aria-hidden="true">→</b>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="legal-documents" aria-label="Policy documents">
        <article id="privacy">
          <p className="document-number">PRI-2026 · Effective 29 July 2026</p>
          <h2>Privacy policy</h2>
          <p>
            Citadelle is a fictional website created solely for cybersecurity
            education. It does not provide banking services and does not collect
            or retain personal data.
          </p>
          <h3>Information we do not collect</h3>
          <p>
            The site has no customer accounts, mailing lists, contact forms,
            payment facilities, advertising systems, analytics tools, tracking
            pixels, or behavioural profiling. It does not ask for names, email
            addresses, telephone numbers, payment information, or genuine bank
            credentials.
          </p>
          <h3>Exercise inputs</h3>
          <p>
            Text entered into the simulated Help Assistant and challenge forms is
            processed only to produce an immediate response. The application
            does not save those messages to a database or use them for analytics,
            advertising, model training, or identification.
          </p>
          <h3>Technical operation</h3>
          <p>
            Network requests must be processed temporarily for the site to
            function. The application does not create user profiles from those
            requests or retain them as part of the exercise. Infrastructure
            providers may process limited technical information when delivering
            network traffic under their own terms.
          </p>
          <h3>Your responsibilities</h3>
          <p>
            Do not enter real personal information, passwords, financial
            information, or confidential material. All names, accounts,
            transactions, credentials, offices, and incidents presented by the
            exercise are fictional.
          </p>
          <h3>Changes to this policy</h3>
          <p>
            This policy may be updated if the educational site’s functionality
            changes. The effective date above identifies the current version.
          </p>
        </article>
        <article id="terms">
          <p className="document-number">TER-2026 · Effective 29 July 2026</p>
          <h2>Terms of use</h2>
          <p>
            By using this site, you acknowledge that Citadelle is a fictional,
            educational cybersecurity environment. It is not a bank, financial
            institution, security provider, or professional advisory service.
          </p>
          <h3>Permitted use</h3>
          <p>
            You may inspect, test, and interact with the challenges intentionally
            made available through this environment. Challenge activity must
            remain within the supplied website, evidence files, chatbot, and
            designated training services.
          </p>
          <h3>Prohibited use</h3>
          <p>
            You must not use the exercise as authority to attack unrelated
            systems, other users, hosting infrastructure, third-party services,
            or resources outside the defined challenge. Do not attempt denial of
            service, destructive activity, persistence, or access to real data.
          </p>
          <h3>Educational content</h3>
          <p>
            The site may intentionally contain simulated vulnerabilities,
            fabricated records, misleading interface elements, and fictional
            security incidents. These are provided only for learning and must
            not be interpreted as real banking information or operational
            security guidance.
          </p>
          <h3>Availability and warranties</h3>
          <p>
            The environment is provided as-is and may be changed, reset,
            interrupted, or withdrawn without notice. No guarantee is made that
            the site will always be available, error-free, secure, or suitable
            for a particular purpose.
          </p>
          <h3>Liability</h3>
          <p>
            To the extent permitted by law, the operators are not responsible
            for losses arising from reliance on fictional content, loss of
            exercise progress, service interruption, or use of the environment
            outside its intended educational scope. Nothing in these terms
            excludes liability that cannot lawfully be excluded.
          </p>
          <h3>Changes to these terms</h3>
          <p>
            These terms may be revised as the exercise evolves. Continued use
            after a revision means that the current terms apply.
          </p>
        </article>
        <article id="cookies">
          <p className="document-number">CKI-2026 · Effective 29 July 2026</p>
          <h2>Cookie notice</h2>
          <p>
            Citadelle uses only strictly necessary, first-party cookies to
            operate temporary administrator and challenge-completion sessions.
            These cookies contain signed technical values, not names, contact
            details, or advertising identifiers.
          </p>
          <p>
            No advertising, analytics, social-media, or cross-site tracking
            cookies are used. Session cookies expire automatically, and you may
            remove them sooner by clearing this site’s browser data. Doing so
            may reset exercise progress or sign you out.
          </p>
        </article>
      </section>

      <SiteFooter note="Corporate information and disclosures · © 2026 Citadelle Private Bank" />
    </main>
  );
}
