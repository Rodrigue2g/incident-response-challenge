"use client";

import { useEffect, useRef, useState } from "react";
import PublicHeader from "@/components/PublicHeader";

type LogLine = [string, string, string, string, string, string];

const seedLines: LogLine[] = [
  ["09:13:50.114", "10.20.8.14", "A",    "portal.citadelle.local",                              "NOERROR",  "4ms"],
  ["09:13:51.028", "10.20.3.09", "A",    "analytics.training.local",                            "NOERROR",  "18ms"],
  ["09:13:52.441", "10.20.4.21", "AAAA", "updates.training.local",                              "NOERROR",  "11ms"],
  ["09:13:53.007", "10.20.6.42", "A",    "time.training.local",                                 "NOERROR",  "3ms"],
  ["09:13:54.762", "10.20.8.14", "A",    "assets.citadelle.local",                              "NOERROR",  "2ms"],
  ["09:13:56.195", "10.20.5.11", "A",    "mail.citadelle.local",                                "NOERROR",  "4ms"],
  ["09:13:57.638", "10.20.8.14", "TXT",  "04-bmtzIGJ1dCBpcyBub3QgbW9u.exfil.training.local",   "NOERROR",  "31ms"],
  ["09:13:58.102", "10.20.7.32", "A",    "cdn.training.local",                                  "NOERROR",  "12ms"],
  ["09:14:00.553", "10.20.4.21", "A",    "files.citadelle.local",                               "NOERROR",  "3ms"],
  ["09:14:01.890", "10.20.3.09", "PTR",  "9.3.20.10.in-addr.arpa",                              "NOERROR",  "2ms"],
  ["09:14:03.224", "10.20.6.42", "TXT",  "status.telemetry.training.local",                     "NOERROR",  "15ms"],
  ["09:14:04.673", "10.20.2.16", "A",    "gateway.citadelle.local",                             "NOERROR",  "2ms"],
  ["09:14:06.011", "10.20.8.14", "A",    "login.citadelle.local",                               "NOERROR",  "3ms"],
  ["09:14:07.482", "10.20.5.11", "AAAA", "cdn.training.local",                                  "NOERROR",  "13ms"],
  ["09:14:09.816", "10.20.8.14", "TXT",  "01-RkxBR3tETlNfVFVOTkVMX0ZP.exfil.training.local",  "NOERROR",  "29ms"],
  ["09:14:10.105", "10.20.7.32", "A",    "help.citadelle.local",                                "NOERROR",  "4ms"],
  ["09:14:12.394", "10.20.4.21", "TXT",  "healthcheck.security.training.local",                 "NOERROR",  "16ms"],
  ["09:14:14.728", "10.20.6.42", "A",    "metrics.citadelle.local",                             "NOERROR",  "3ms"],
  ["09:14:16.059", "10.20.3.09", "A",    "portal.citadelle.local",                              "NOERROR",  "2ms"],
  ["09:14:17.512", "10.20.8.14", "TXT",  "06-b246IHRoZSBwdWJsaWMgQ2l0.exfil.training.local",  "NOERROR",  "34ms"],
  ["09:14:18.846", "10.20.5.11", "A",    "auth.citadelle.local",                                "NOERROR",  "3ms"],
  ["09:14:20.177", "10.20.4.21", "TXT",  "U29mdHdhcmVVcGRhdGU=.telemetry.training.local",       "NOERROR",  "20ms"],
  ["09:14:21.601", "10.20.7.32", "A",    "archive.citadelle.local",                             "NOERROR",  "3ms"],
  ["09:14:23.934", "10.20.2.16", "A",    "time.training.local",                                 "NOERROR",  "8ms"],
  ["09:14:25.268", "10.20.8.14", "A",    "clients.training.local",                              "NXDOMAIN", "24ms"],
  ["09:14:27.790", "10.20.6.42", "AAAA", "updates.training.local",                              "NOERROR",  "10ms"],
  ["09:14:29.123", "10.20.3.09", "A",    "statements.citadelle.local",                          "NOERROR",  "3ms"],
  ["09:14:31.457", "10.20.5.11", "A",    "assets.citadelle.local",                              "NOERROR",  "2ms"],
  ["09:14:33.881", "10.20.8.14", "A",    "portal.citadelle.local",                              "NOERROR",  "3ms"],
  ["09:14:36.214", "10.20.4.21", "TXT",  "build-2026-07-27.updates.training.local",             "NXDOMAIN", "17ms"],
  ["09:14:38.548", "10.20.7.32", "A",    "mail.citadelle.local",                                "NOERROR",  "4ms"],
  ["09:14:40.972", "10.20.2.16", "A",    "gateway.citadelle.local",                             "NOERROR",  "2ms"],
];

const CLIENT_IPS = [
  "10.20.8.14", "10.20.3.09", "10.20.4.21", "10.20.6.42",
  "10.20.5.11", "10.20.7.32", "10.20.2.16", "10.20.1.8",
  "10.20.9.55", "10.20.4.03",
];

// Normal-traffic pool — drawn randomly to pad between exfil bursts
const normalPool: Array<[string, string, string, string]> = [
  ["A",    "portal.citadelle.local",              "NOERROR",  "3ms"],
  ["A",    "login.citadelle.local",               "NOERROR",  "4ms"],
  ["A",    "assets.citadelle.local",              "NOERROR",  "2ms"],
  ["A",    "mail.citadelle.local",                "NOERROR",  "4ms"],
  ["A",    "auth.citadelle.local",                "NOERROR",  "3ms"],
  ["A",    "cdn.training.local",                  "NOERROR",  "12ms"],
  ["A",    "files.citadelle.local",               "NOERROR",  "3ms"],
  ["A",    "gateway.citadelle.local",             "NOERROR",  "2ms"],
  ["A",    "help.citadelle.local",                "NOERROR",  "3ms"],
  ["A",    "metrics.citadelle.local",             "NOERROR",  "4ms"],
  ["A",    "archive.citadelle.local",             "NOERROR",  "3ms"],
  ["A",    "statements.citadelle.local",          "NOERROR",  "3ms"],
  ["A",    "time.training.local",                 "NOERROR",  "8ms"],
  ["A",    "analytics.training.local",            "NOERROR",  "18ms"],
  ["AAAA", "cdn.training.local",                  "NOERROR",  "13ms"],
  ["AAAA", "updates.training.local",              "NOERROR",  "11ms"],
  ["PTR",  "14.8.20.10.in-addr.arpa",             "NOERROR",  "2ms"],
  ["PTR",  "11.5.20.10.in-addr.arpa",             "NOERROR",  "2ms"],
  ["TXT",  "status.telemetry.training.local",     "NOERROR",  "15ms"],
  ["TXT",  "healthcheck.security.training.local", "NOERROR",  "16ms"],
  ["A",    "reports.citadelle.local",             "NOERROR",  "5ms"],
  ["A",    "backup.citadelle.local",              "NXDOMAIN", "22ms"],
  ["A",    "vpn.citadelle.local",                 "NOERROR",  "6ms"],
  ["A",    "sso.citadelle.local",                 "NOERROR",  "3ms"],
  ["A",    "ntp.training.local",                  "NOERROR",  "2ms"],
  ["AAAA", "mail.citadelle.local",                "NOERROR",  "4ms"],
  ["A",    "crm.citadelle.local",                 "NOERROR",  "3ms"],
  ["TXT",  "dmarc.training.local",                "NOERROR",  "9ms"],
  ["A",    "waf.citadelle.local",                 "NOERROR",  "3ms"],
  ["A",    "iam.citadelle.local",                 "NOERROR",  "3ms"],
];

// The suspicious exfil sequence — replayed on a loop after the seed
const exfilChunks = [
  "02-VU5ORUxfRk9VTkR9CgpNeSBz",
  "03-ZWNvbmQgZmxvd3MgYmV0d2Vl",
  "05-YWRlbGxlIHdlYnNpdGUuCgpOZ",
  "07-YWRlbGxlIHdlYnNpdGUuCgpOZ",
  "08-eHQgZGVzdGluYXRpb246IHRoZ",
];

function rng(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[rng(0, arr.length - 1)];
}

// Parse "HH:MM:SS.mmm" → total milliseconds, then back
function parseTime(t: string): number {
  const [hms, ms] = t.split(".");
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3_600_000 + m * 60_000 + s * 1000 + Number(ms);
}

function formatTime(ms: number): string {
  const h = Math.floor(ms / 3_600_000); ms %= 3_600_000;
  const m = Math.floor(ms / 60_000);    ms %= 60_000;
  const s = Math.floor(ms / 1000);      ms %= 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

const EXFIL_EVERY = 7; // inject one exfil TXT every N new lines

export default function SecurityPage() {
  const [lines, setLines] = useState<LogLine[]>(seedLines);
  const outputRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(parseTime(seedLines[seedLines.length - 1][0]));
  const counterRef = useRef(0);
  const exfilIndexRef = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      timer = setTimeout(() => {
        counterRef.current += 1;
        timeRef.current += rng(800, 2800);
        const timestamp = formatTime(timeRef.current);

        let newLine: LogLine;
        if (counterRef.current % EXFIL_EVERY === 0) {
          const chunk = exfilChunks[exfilIndexRef.current % exfilChunks.length];
          exfilIndexRef.current += 1;
          newLine = [timestamp, "10.20.8.14", "TXT", `${chunk}.exfil.training.local`, "NOERROR", `${rng(28, 38)}ms`];
        } else {
          const [type, query, result, latency] = pick(normalPool);
          newLine = [timestamp, pick(CLIENT_IPS), type, query, result, latency];
        }

        setLines(prev => [...prev, newLine]);
        scheduleNext();
      }, rng(900, 2400));
    }

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom whenever lines grow
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <main className="terminal-page">
      <PublicHeader active="security" appearance="black" />

      <section className="terminal-window">
        <div className="terminal-bar">
          <div className="window-dots"><i /><i /><i /></div>
          <span>soc@citadelle: ~/captures/dns</span>
          <span>UTC · LIVE</span>
        </div>
        <div className="terminal-command">
          <span>soc@resolver-eu-west-01</span>:<b>~</b>$ tail -f /var/log/dns/resolver.log
        </div>
        <div className="terminal-columns">
          <span>TIME</span><span>CLIENT</span><span>TYPE</span><span>QUERY</span><span>RESULT</span><span>LATENCY</span>
        </div>
        <div className="terminal-output" ref={outputRef}>
          {lines.map((line, index) => (
            <div className="terminal-line" key={`${line[0]}-${index}`}>
              {line.map((value, column) => (
                <span
                  className={column === 4 && value === "NXDOMAIN" ? "terminal-error" : ""}
                  key={column}
                >
                  {value}
                </span>
              ))}
            </div>
          ))}
          <div className="terminal-cursor"><span>{formatTime(timeRef.current)}</span><i /></div>
        </div>
        <div className="terminal-footer">
          <span>{lines.length} events displayed</span>
          <span>capture buffer: 2.4 MB</span>
          <span>auto-scroll: enabled</span>
        </div>
      </section>

      <footer className="terminal-page-footer">
        <span>Citadelle internal network monitor</span>
        <a className="terminal-download-button" href="/evidence/network_capture.log" download>Download full capture</a>
      </footer>
    </main>
  );
}
