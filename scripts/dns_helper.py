#!/usr/bin/env python3
"""
Citadelle Challenge 2 — DNS tunnel decoder (beginner starter script).

Usage:
    python3 scripts/dns_helper.py

What it does:
  1. Reads public/evidence/network_capture.log
  2. Finds all TXT records sent to the suspicious domain
  3. Sorts them by their numeric prefix (01-, 02-, …)
  4. Joins the Base64 fragments and decodes the hidden message
"""

from __future__ import annotations

import base64
import re
from pathlib import Path

LOG_FILE = Path(__file__).resolve().parents[1] / "public" / "evidence" / "network_capture.log"
TUNNEL_DOMAIN = "exfil.training.local"

# ── read the log ──────────────────────────────────────────────────────────────

if not LOG_FILE.exists():
    print(f"Log file not found: {LOG_FILE}")
    raise SystemExit(1)

lines = LOG_FILE.read_text(encoding="utf-8").splitlines()

# ── extract tunnel fragments ──────────────────────────────────────────────────

fragments: dict[int, str] = {}

for line in lines:
    if TUNNEL_DOMAIN not in line:
        continue
    if "TXT" not in line:
        continue
    # Pattern: <seq>-<base64fragment>.exfil.training.local
    match = re.search(
        r"(\d+)-([A-Za-z0-9+/=]+)\." + re.escape(TUNNEL_DOMAIN),
        line,
    )
    if match:
        seq = int(match.group(1))
        frag = match.group(2)
        fragments[seq] = frag

# ── assemble and decode ───────────────────────────────────────────────────────

if not fragments:
    print("No tunnel fragments found.")
    print(f"Check that {LOG_FILE} exists and contains TXT records for {TUNNEL_DOMAIN}.")
    raise SystemExit(1)

print(f"Found {len(fragments)} fragment(s): {sorted(fragments)}\n")

ordered_b64 = "".join(fragments[k] for k in sorted(fragments))

try:
    payload = base64.b64decode(ordered_b64).decode("utf-8")
except Exception as exc:
    print(f"Decode error: {exc}")
    raise SystemExit(1)

print("=" * 60)
print("Decoded DNS tunnel payload:")
print("=" * 60)
print(payload)
print("=" * 60)
