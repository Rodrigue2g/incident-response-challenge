# Citadelle Incident Response Challenge

Citadelle is a local, fictional cybersecurity exercise for instructor-led
incident-response sessions. Participants investigate several pieces of digital
evidence, recover clues, and use their findings to contain a simulated
banking incident.

The application runs locally and does not require paid external APIs. Docker
deployments use a small Ollama model for the Help Assistant and automatically
fall back to the deterministic local provider if the model is unavailable.

## Before the session

You will need Node.js 20 or later, npm, and Python 3.

```bash
npm install
npm run generate:challenges
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify the production build:

```bash
npm run build
npm start
```

## Configure the exercise

All challenge content is configured in:

```text
facilitator/challenge.env
```

After making changes, regenerate the student evidence:

```bash
npm run generate:challenges
```

This updates the image evidence, DNS log, website-source clues, Help Assistant
secret, fraud-analysis notebook, and final-password hash. Further configuration
notes are available in
[`facilitator/CHALLENGE_CONFIG.md`](facilitator/CHALLENGE_CONFIG.md).

## Running the session

Participants begin on the Citadelle website and move through a sequence of
image forensics, DNS analysis, source inspection, assistant testing, transaction
analysis, and incident containment.

Useful participant routes:

- `/locations` — offices and image evidence
- `/security` — DNS activity and network-log download
- `/help` — simulated Help Assistant
- `/documents` — public policies and document archive
- `/admin` — incident-containment interface

The student notebook is downloaded from the document archive. It can be opened
in Jupyter or uploaded to Google Colab.

## Instructor materials

The `facilitator/` directory contains the plain final password, completed
notebook, pristine evidence, and challenge configuration.

**Do not include `facilitator/` in material distributed to participants.**

The current application is intended for a supervised local session. It does not
yet track participant progress. Admin containment state is client-only and
resets when the page is refreshed.

## Resetting generated evidence

To restore the configured evidence and a clean student notebook, run:

```bash
npm run generate:challenges
```

The generator is deterministic for the seed in `facilitator/challenge.env`.

## Docker deployment

Generate the challenge assets before building the image:

```bash
npm run generate:challenges
docker compose up --build -d
```

The application is then available at `http://localhost:3000`.

The first Compose start also downloads `qwen2.5:0.5b` into the persistent
`ollama-models` volume. Override `OLLAMA_MODEL` in `.env` if the host has enough
resources for a larger model.

Running without Compose is not recommended — you lose the Ollama model and automatic fallback.

To run without Compose:

```bash
docker build -t citadelle-challenge .
docker run --name citadelle-challenge -p 3000:3000 citadelle-challenge
```

For participants on the same network, share:

```text
http://HOST_LAN_IP:3000
```

The host firewall must allow incoming TCP traffic on port 3000. The
`.dockerignore` file prevents the facilitator directory from being copied into
the image.

For an internet-facing deployment, place a reverse proxy in front of the
container and use a domain name with HTTPS. Keep port 3000 private to the host
when a reverse proxy is used.

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for a complete small-VPS deployment,
resource limits, HTTPS setup, and OpenClaw coexistence notes.
