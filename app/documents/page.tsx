import type { Metadata } from "next";
import PublicHeader from "@/components/PublicHeader";
import { CitadelleLogo } from "@/components/CitadelleLogo";

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
    code: "CKI-2026",
    title: "Cookie policy",
    description: "Information about essential cookies and local browser storage.",
    href: "#cookies",
    type: "Policy",
  },
  {
    code: "REG-2026",
    title: "Regulatory information",
    description: "Important information about our fictional banking environment.",
    href: "#regulatory",
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
          <p className="document-number">PRI-2026 · Effective 1 July 2026</p>
          <h2>Privacy policy</h2>
          <p>
            Citadelle uses personal information only where needed to provide
            services, maintain security, meet legal obligations, and improve this
            training environment. Information is retained only for as long as its
            stated purpose requires.
          </p>
          <p>
            This website is a fictional educational system. Do not enter real
            account details, passwords, or other personal banking information.
          </p>
        </article>
        <article id="cookies">
          <p className="document-number">CKI-2026 · Effective 1 July 2026</p>
          <h2>Cookie policy</h2>
          <p>
            Citadelle uses only essential browser capabilities required for the
            exercise, such as local session and progress storage. No advertising
            cookies or cross-site tracking technologies are used.
          </p>
          <p>
            Clearing site data may remove locally stored exercise progress and
            return the experience to its initial state.
          </p>
        </article>
        <article id="regulatory">
          <p className="document-number">REG-2026 · Published 1 July 2026</p>
          <h2>Regulatory information</h2>
          <p>
            Citadelle Private Bank, its offices, clients, transactions, and
            security incidents are fictional. This environment is provided solely
            for supervised cybersecurity education.
          </p>
          <p>
            Nothing on this site constitutes banking, investment, legal, or
            financial advice.
          </p>
        </article>
      </section>

      <footer className="documents-footer">
        <div className="wordmark">
          <span className="brand-mark"><CitadelleLogo /></span>
          <span>Citadelle</span>
        </div>
        <p>Corporate information and disclosures</p>
        <p>© 2026 Citadelle Private Bank</p>
      </footer>
    </main>
  );
}
