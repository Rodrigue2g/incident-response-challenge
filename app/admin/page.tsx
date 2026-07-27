"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CitadelleLogo } from "@/components/CitadelleLogo";

const suspiciousSession = {
  name: "Unknown administrator",
  detail: "185.220.101.14 · Bucharest, RO · 18 min ago",
};

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [selected, setSelected] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [contained, setContained] = useState(false);

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSignedIn(true);
  }

  if (!signedIn) {
    return (
      <main className="admin-login">
        <section className="login-panel">
          <Link className="wordmark" href="/">
            <span className="brand-mark"><CitadelleLogo /></span><span>Citadelle</span>
          </Link>
          <form className="login-card" onSubmit={login}>
            <p className="eyebrow">Secure administration</p>
            <h1>Welcome back.</h1>
            <p>Sign in to review system activity and manage active access.</p>
            <div className="field">
              <label htmlFor="username">Administrator ID</label>
              <input id="username" name="username" defaultValue="administrator" autoComplete="username" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter password" autoComplete="current-password" />
            </div>
            <button className="login-submit" type="submit">Sign in</button>
            <p className="training-note">Training mode: password validation is currently disabled.</p>
          </form>
          <p className="login-footer">Citadelle Private Bank · Internal systems · Authorised personnel only</p>
        </section>
        <aside className="login-visual">
          <div className="north-star" aria-hidden="true">✦</div>
          <h2>Keep the bank moving.</h2>
          <p>Monitor access, investigate unusual activity, and protect Citadelle’s systems.</p>
        </aside>
      </main>
    );
  }

  return (
    <main className="admin-shell admin-layout">
      <aside className="sidebar">
        <div className="wordmark"><span className="brand-mark"><CitadelleLogo /></span><span>Citadelle <b>Admin</b></span></div>
        <div className="side-nav">
          <button className="active">Overview</button>
          <button>Sessions</button>
          <button>Accounts</button>
          <button>Audit log</button>
        </div>
        <div className="side-nav sign-out">
          <button onClick={() => setSignedIn(false)}>Sign out</button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-top">
          <div><h1>Security overview</h1><p>Review and contain the current incident.</p></div>
          <span className="status-pill">{contained ? "Contained" : "Active incident"}</span>
        </header>

        <div className="metric-grid">
          <div className="metric"><span>Active sessions</span><strong>{revoked ? "2" : "3"}</strong></div>
          <div className="metric"><span>Security alerts</span><strong>{contained ? "0" : "2"}</strong></div>
          <div className="metric"><span>Last password change</span><strong>18m</strong></div>
        </div>

        <div className="dashboard-grid">
          <section className="panel">
            <div className="panel-heading"><h2>Active administrator sessions</h2><span className="status-pill">1 unusual</span></div>
            {!revoked && (
              <div className={`session ${selected ? "selected" : ""}`}>
                <span className="session-dot" />
                <div><strong>{suspiciousSession.name}</strong><small>{suspiciousSession.detail}</small></div>
                <button onClick={() => setSelected(true)}>{selected ? "Selected" : "Investigate"}</button>
              </div>
            )}
            <div className="session">
              <span className="session-dot" />
              <div><strong>M. Okafor</strong><small>10.20.4.18 · London office · 4 min ago</small></div>
              <button>Details</button>
            </div>
            <div className="session">
              <span className="session-dot" />
              <div><strong>Security console</strong><small>10.20.1.6 · London office · Now</small></div>
              <button>Details</button>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading"><h2>Containment</h2></div>
            <div className="checklist">
              <div className={`check-item ${selected ? "done" : ""}`}><span className="check-icon">{selected && "✓"}</span>Identify suspicious session</div>
              <div className={`check-item ${revoked ? "done" : ""}`}><span className="check-icon">{revoked && "✓"}</span>Revoke session access</div>
              <div className={`check-item ${accountDisabled ? "done" : ""}`}><span className="check-icon">{accountDisabled && "✓"}</span>Disable intruder account</div>
            </div>
            {!revoked && <button className="contain-button" disabled={!selected} onClick={() => setRevoked(true)}>Revoke selected session</button>}
            {revoked && !accountDisabled && <button className="contain-button" onClick={() => setAccountDisabled(true)}>Disable intruder account</button>}
            {accountDisabled && !contained && <button className="contain-button" onClick={() => setContained(true)}>Confirm containment</button>}
            {contained && <div className="contained">ATTACK CONTAINED<br />CITADELLE SECURED</div>}
          </section>
        </div>
      </section>
    </main>
  );
}
