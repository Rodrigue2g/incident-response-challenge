"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CitadelleLogo } from "@/components/CitadelleLogo";
import { FireworksCanvas } from "@/components/FireworksCanvas";

const CASE_ID = "IR-2026-0727";

const trustedSessions = [
  ["T. Nakamura", "Managed macOS · Chrome 126", "10.20.4.18", "London, GB", "09:44", "2"],
  ["P. Leclerc", "Managed Windows · Edge 125", "10.20.7.34", "Paris, FR", "09:41", "3"],
  ["Security console", "Managed service identity", "10.20.1.6", "London, GB", "09:39", "1"],
  ["M. Okafor", "Managed Windows · Chrome 126", "10.20.4.27", "London, GB", "09:36", "4"],
  ["S. Al-Mansoori", "Managed macOS · Safari 17", "10.32.8.41", "Dubai, AE", "09:34", "6"],
  ["A. Wong", "Managed Windows · Edge 125", "10.44.2.16", "Hong Kong, HK", "09:31", "5"],
  ["R. Bennett", "Managed macOS · Chrome 126", "10.18.6.22", "New York, US", "09:27", "3"],
  ["L. Moreau", "Managed Windows · Edge 125", "10.20.7.19", "Paris, FR", "09:23", "7"],
  ["D. Chen", "Managed macOS · Chrome 126", "10.44.2.31", "Hong Kong, HK", "09:19", "2"],
  ["N. Patel", "Managed Windows · Chrome 126", "10.20.4.52", "London, GB", "09:16", "4"],
  ["J. Ferreira", "Managed macOS · Safari 17", "10.18.6.39", "New York, US", "09:12", "5"],
  ["K. Tan", "Managed Windows · Edge 125", "10.51.3.14", "Singapore, SG", "09:08", "3"],
  ["E. Dubois", "Managed macOS · Chrome 126", "10.20.7.45", "Paris, FR", "09:04", "6"],
  ["H. Rahman", "Managed Windows · Edge 125", "10.32.8.29", "Dubai, AE", "08:59", "4"],
  ["C. Miller", "Managed Windows · Chrome 126", "10.18.6.47", "New York, US", "08:54", "2"],
  ["F. Lim", "Managed macOS · Safari 17", "10.51.3.28", "Singapore, SG", "08:49", "5"],
  ["G. Laurent", "Managed Windows · Edge 125", "10.20.7.58", "Paris, FR", "08:43", "3"],
  ["I. Hughes", "Managed macOS · Chrome 126", "10.20.4.66", "London, GB", "08:38", "4"],
  ["R. Sharma", "Managed Windows · Chrome 126", "10.51.3.37", "Singapore, SG", "08:32", "6"],
  ["V. Rossi", "Managed macOS · Safari 17", "10.20.7.62", "Paris, FR", "08:27", "2"],
  ["Y. Park", "Managed Windows · Edge 125", "10.44.2.54", "Hong Kong, HK", "08:21", "5"],
  ["B. Wilson", "Managed Windows · Chrome 126", "10.18.6.53", "New York, US", "08:16", "3"],
  ["O. Haddad", "Managed macOS · Chrome 126", "10.32.8.56", "Dubai, AE", "08:09", "4"],
  ["C. Ng", "Managed Windows · Edge 125", "10.51.3.49", "Singapore, SG", "08:03", "2"],
  ["A. Martin", "Managed macOS · Safari 17", "10.20.4.79", "London, GB", "07:57", "5"],
  ["S. Cohen", "Managed Windows · Chrome 126", "10.18.6.71", "New York, US", "07:51", "3"],
] as const;

function TrustedSessionRow({ session }: { session: (typeof trustedSessions)[number] }) {
  const [name, device, ip, location, started, risk] = session;
  return (
    <tr className="a-row">
      <td><div className="a-identity"><span className="a-dot" /><div><strong>{name}</strong><code>{device}</code></div></div></td>
      <td><code>{ip}</code></td>
      <td>{location}</td>
      <td>{started} UTC</td>
      <td><span className="a-risk a-risk-low">{risk}</span></td>
      <td><span className="a-trusted">Trusted</span></td>
    </tr>
  );
}

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selected, setSelected] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [contained, setContained] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { authenticated?: boolean }) => setSignedIn(d.authenticated === true))
      .catch(() => setSignedIn(false))
      .finally(() => setCheckingSession(false));
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setSigningIn(true);
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
      });
      const data = (await res.json()) as { authenticated?: boolean; error?: string };
      if (!res.ok || !data.authenticated) { setLoginError(data.error || "Sign-in failed."); return; }
      setSignedIn(true);
    } catch {
      setLoginError("The administration service is unavailable.");
    } finally {
      setSigningIn(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" }).catch(() => undefined);
    setSignedIn(false);
    setSelected(false); setRevoked(false); setAccountDisabled(false); setContained(false);
  }

  if (checkingSession) return <main className="a-loading" />;

  /* ── LOGIN ────────────────────────────────────────────────── */
  if (!signedIn) {
    return (
      <main className="admin-login">
        <section className="login-panel">
          <Link className="wordmark" href="/">
            <span className="brand-mark"><CitadelleLogo /></span>
            <span>Citadelle <b>Private Bank</b></span>
          </Link>
          <form className="login-card" onSubmit={login}>
            <p className="eyebrow">Secure administration</p>
            <h1>Welcome back.</h1>
            <p>Sign in to review system activity and manage active access.</p>
            <div className="field">
              <label htmlFor="username">Administrator ID</label>
              <input id="username" name="username" autoComplete="username" placeholder="administrator" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter password" autoComplete="current-password" required />
            </div>
            {loginError && <p className="login-error" role="alert">{loginError}</p>}
            <button className="login-submit" type="submit" disabled={signingIn}>
              {signingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="login-footer">Citadelle Private Bank · Internal systems · Authorised personnel only</p>
        </section>
        <aside className="login-visual">
          <div className="north-star" aria-hidden="true">✦</div>
          <h2>Keep the bank moving.</h2>
          <p>Monitor access, investigate unusual activity, and protect Citadelle's systems.</p>
        </aside>
      </main>
    );
  }

  /* ── CONTAINMENT SUCCESS ─────────────────────────────────── */
  if (contained) {
    return (
      <main className="containment-success">
        <FireworksCanvas />
        <section className="success-content" aria-live="polite">
          <div className="success-seal"><CitadelleLogo /></div>
          <p className="success-kicker">Containment confirmed</p>
          <h1>Citadelle secured.</h1>
          <p className="success-lead">The unauthorised session was revoked and the compromised account was disabled.</p>
          <p className="success-time">Completed at 09:48 UTC · {CASE_ID}</p>
          <div className="success-actions">
            <button onClick={signOut}>Sign out</button>
            <Link href="/">Return to website</Link>
          </div>
        </section>
      </main>
    );
  }

  /* ── DASHBOARD ───────────────────────────────────────────── */
  return (
    <main className="a-shell a-layout">

      {/* Sidebar */}
      <aside className="a-sidebar">
        <div className="a-sidebar-brand">
          <span className="a-brand-mark"><CitadelleLogo /></span>
          <div>
            <span className="a-brand-name">Citadelle</span>
            <span className="a-brand-sub">Security Platform</span>
          </div>
        </div>

        <nav className="a-nav">
          <span className="a-nav-label">Operations</span>
          <button className="a-nav-btn active">Dashboard</button>
          <button className="a-nav-btn">Sessions</button>
          <button className="a-nav-btn">Accounts</button>
          <button className="a-nav-btn">Alerts <span className="a-nav-badge">2</span></button>
          <span className="a-nav-label">Management</span>
          <button className="a-nav-btn">Audit log</button>
          <button className="a-nav-btn">Reports</button>
          <button className="a-nav-btn">Settings</button>
        </nav>

        <div className="a-sidebar-footer">
          <div className="a-user">
            <span className="a-user-avatar">JB</span>
            <div>
              <span className="a-user-name">J. Beaumont</span>
              <span className="a-user-role">Senior Analyst</span>
            </div>
          </div>
          <button className="a-signout" onClick={signOut}>Sign out</button>
        </div>
      </aside>

      {/* Main area */}
      <div className="a-main">

        {/* Top bar */}
        <div className="a-topbar">
          <div className="a-breadcrumb">
            Security Operations
            <span className="a-sep">›</span> Incident Response
            <span className="a-sep">›</span> <strong>{CASE_ID}</strong>
          </div>
          <div className="a-topbar-right">
            <span className="a-clock">09:48:23 UTC</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="a-metrics">
          <div className="a-metric">
            <span className="a-metric-label">Active sessions</span>
            <strong className="a-metric-value">{revoked ? "26" : "27"}</strong>
            <span className={`a-metric-tag ${revoked ? "" : "a-tag-warn"}`}>{revoked ? "No anomaly" : "1 anomalous"}</span>
          </div>
          <div className="a-metric">
            <span className="a-metric-label">Open alerts</span>
            <strong className={`a-metric-value ${contained ? "" : "a-val-danger"}`}>{contained ? "0" : "2"}</strong>
            <span className="a-metric-tag a-tag-danger">Critical priority</span>
          </div>
          <div className="a-metric">
            <span className="a-metric-label">Session risk score</span>
            <strong className="a-metric-value a-val-danger">97</strong>
            <span className="a-metric-tag a-tag-danger">svc-admin-recovery</span>
          </div>
          <div className="a-metric">
            <span className="a-metric-label">Events today</span>
            <strong className="a-metric-value">847</strong>
            <span className="a-metric-tag">+12 % vs yesterday</span>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="a-grid">

          {/* Sessions */}
          <section className="a-panel">
            <div className="a-panel-head">
              <div>
                <h2>Privileged sessions</h2>
                <span className="a-panel-sub">Administrator access · real-time</span>
              </div>
              <div className="a-panel-actions">
                <button className="a-btn-ghost">Filter</button>
                <button className="a-btn-ghost">Export</button>
              </div>
            </div>

            <table className="a-table">
              <thead>
                <tr>
                  <th>Identity / Device</th>
                  <th>Source IP</th>
                  <th>Location</th>
                  <th>Started</th>
                  <th>Risk</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {trustedSessions.slice(0, 18).map((session) => (
                  <TrustedSessionRow key={session[0]} session={session} />
                ))}
                {!revoked && (
                  <>
                    <tr className={`a-row a-row-danger ${selected ? "a-row-selected" : ""}`}>
                      <td>
                        <div className="a-identity">
                          <span className="a-dot a-dot-danger" />
                          <div>
                            <strong>svc-admin-recovery</strong>
                            <code>Unmanaged Linux · curl/7.88.1</code>
                          </div>
                        </div>
                      </td>
                      <td><code>185.220.101.14</code></td>
                      <td>Bucharest, RO</td>
                      <td>09:11 UTC</td>
                      <td><span className="a-risk a-risk-high">97</span></td>
                      <td>
                        <button className="a-row-btn a-row-btn-danger" onClick={() => setSelected(true)}>
                          {selected ? "Under review" : "Review"}
                        </button>
                      </td>
                    </tr>
                    {selected && (
                      <tr className="a-evidence-row">
                        <td colSpan={6}>
                          <div className="a-evidence">
                            <div><span>Failed logins</span><strong>9</strong></div>
                            <div><span>Device trust</span><strong>8 / 100</strong></div>
                            <div><span>Geo anomaly</span><strong>Yes</strong></div>
                            <div><span>Previous IP range</span><strong>10.20.4.0/24</strong></div>
                            <div><span>Last known login</span><strong>2026-07-21</strong></div>
                            <div><span>Privilege level</span><strong>Root</strong></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}
                {trustedSessions.slice(18).map((session) => (
                  <TrustedSessionRow key={session[0]} session={session} />
                ))}
              </tbody>
            </table>
          </section>

          {/* Containment */}
          <section className="a-panel a-contain-panel">
            <div className="a-panel-head">
              <div>
                <h2>Containment</h2>
                <span className="a-panel-sub">{CASE_ID}</span>
              </div>
              <span className={`a-status-pill ${contained ? "a-pill-ok" : "a-pill-warn"}`}>
                {contained ? "Contained" : "In progress"}
              </span>
            </div>

            <div className="a-steps">
              <div className={`a-step ${selected ? "a-step-done" : ""}`}>
                <span className="a-step-num">{selected ? "✓" : "1"}</span>
                <div>
                  <strong>Review session</strong>
                  <p>Confirm the anomalous administrator session</p>
                </div>
              </div>
              <div className={`a-step ${revoked ? "a-step-done" : ""}`}>
                <span className="a-step-num">{revoked ? "✓" : "2"}</span>
                <div>
                  <strong>Revoke access</strong>
                  <p>Terminate the active privileged session</p>
                </div>
              </div>
              <div className={`a-step ${accountDisabled ? "a-step-done" : ""}`}>
                <span className="a-step-num">{accountDisabled ? "✓" : "3"}</span>
                <div>
                  <strong>Disable account</strong>
                  <p>Lock svc-admin-recovery permanently</p>
                </div>
              </div>
            </div>

            {!revoked && (
              <button className="a-action-btn" disabled={!selected} onClick={() => setRevoked(true)}>
                Revoke selected session
              </button>
            )}
            {revoked && !accountDisabled && (
              <button className="a-action-btn" onClick={() => setAccountDisabled(true)}>
                Disable svc-admin-recovery
              </button>
            )}
            {accountDisabled && (
              <button className="a-action-btn a-action-confirm" onClick={() => setContained(true)}>
                Confirm incident containment
              </button>
            )}

            <p className="a-policy-note">
              Actions logged under IR policy POL-SEC-012. Senior analyst approval required for account termination.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
