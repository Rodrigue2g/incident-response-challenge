#!/usr/bin/env python3
"""
Reset the student fraud_analysis.ipynb to its unfinished (blank) state.

Usage:
    python3 scripts/reset_notebook.py

This re-runs the challenge generator, which overwrites only the student
notebook at public/evidence/fraud_analysis.ipynb. All other challenge
assets are also regenerated from facilitator/challenge.env.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATOR = ROOT / "scripts" / "generate_challenges.py"
STUDENT_NB = ROOT / "public" / "evidence" / "fraud_analysis.ipynb"

print("Restoring student notebook …")
result = subprocess.run(
    [sys.executable, str(GENERATOR)],
    capture_output=True,
    text=True,
    cwd=str(ROOT),
)

if result.returncode != 0:
    print("Generator failed:")
    print(result.stderr)
    raise SystemExit(1)

print(result.stdout.strip())
print(f"\nStudent notebook restored → {STUDENT_NB.relative_to(ROOT)}")
print("Facilitator copy updated → facilitator/fraud_analysis_completed.ipynb")
