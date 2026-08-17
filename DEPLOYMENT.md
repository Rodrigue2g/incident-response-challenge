# Deploying Citadelle on a small VPS

This deployment runs five containers:

- `citadelle-challenge`: the Next.js application;
- `citadelle-ollama`: the private local model server;
- `citadelle-ollama-model`: a one-shot container that downloads the configured
  model before the application starts;
- `citadelle-pwn`: the binary exploitation challenge, isolated on an internal network;
- `citadelle-pwn-gateway`: a socat proxy that exposes port 31337 to the host.

The default `qwen2.5:0.5b` model is selected for a 1-vCPU, 4-GB KVM VPS. It is
small and CPU-only responses can be slow. The deterministic chatbot takes over
automatically if Ollama fails or exceeds the request timeout.

## 1. Prepare the server

Use a current Ubuntu or Debian release. Install Git and Docker Engine with the
Compose plugin by following Docker's official instructions:

https://docs.docker.com/engine/install/ubuntu/

Confirm the installation:

```bash
docker --version
docker compose version
```

On a 4-GB server, check whether swap already exists:

```bash
swapon --show
free -h
```

If no swap is configured, adding 2–4 GB is strongly recommended before starting
Ollama. Do not create a second swap file if the VPS provider already configured
one.

## 2. Upload or clone the project

For a private local checkout, upload it without facilitator materials, the
working exploit, or local build environments:

```bash
ssh root@YOUR_VPS_IP "mkdir -p /srv/citadelle"
rsync -az \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='facilitator' \
  --exclude='pwn/exploit.py' \
  --exclude='pwn/exploit_auto.py' \
  --exclude='pwn/.venv' \
  ./ root@YOUR_VPS_IP:/srv/citadelle/
```

Alternatively, with git clone:

```bash
git clone https://github.com/Rodrigue2g/incident-response-challenge.git
cd citadelle
cp .env.example .env
```

The production `.env` should contain:

```dotenv
OLLAMA_MODEL=qwen2.5:0.5b
CITADELLE_BIND_IP=127.0.0.1
PUBLIC_APP_URL=https://challenge.example.com
PWN_BIND_IP=127.0.0.1
```

`CITADELLE_BIND_IP=127.0.0.1` keeps port 3000 private behind the reverse proxy.
`PUBLIC_APP_URL` is the public-facing URL placed in the incident-closure link
returned by the pwn container — set it to the domain participants will use.
`PWN_BIND_IP=127.0.0.1` keeps port 31337 private; open it only for a supervised
session and restrict TCP 31337 at the VPS or provider firewall.
Ollama is also bound only to `127.0.0.1:11434`; never expose port 11434 publicly.

## 3. Start the application and download the model

```bash
docker compose pull
docker compose up --build -d
```

The first start downloads the Ollama image and model. Check progress and status:

```bash
docker compose ps
docker compose logs ollama-model
docker compose logs --tail=100 citadelle
docker compose logs --tail=50 pwn
docker exec citadelle-ollama ollama list
curl http://127.0.0.1:3000/api/health
```

Test the model directly from the VPS:

```bash
curl http://127.0.0.1:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5:0.5b","stream":false,"messages":[{"role":"user","content":"Hello"}]}'
```

## 4. Add a domain and HTTPS

Create a DNS `A` record pointing your domain or subdomain to the VPS IPv4
address. Install Caddy using its official Debian/Ubuntu instructions:

https://caddyserver.com/docs/install

Replace `challenge.example.com` below with the real domain in `/etc/caddy/Caddyfile`:

```caddyfile
challenge.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

Validate and reload Caddy:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl status caddy
```

Caddy obtains and renews the HTTPS certificate automatically when the domain
resolves correctly and ports 80 and 443 are reachable.

Only SSH, HTTP, and HTTPS should be allowed through the VPS firewall by default.
Ports 3000, 11434, and 31337 should remain private. Open TCP 31337 at the
firewall only for sessions where participants need to reach the pwn challenge
from outside the VPS.

## 5. Operating alongside OpenClaw

OpenClaw and this project can coexist, but a 4-GB KVM VPS is tight:

- keep `qwen2.5:0.5b`;
- keep Ollama concurrency at one;
- avoid running another local model simultaneously;
- monitor `free -h`, `docker stats`, and disk usage;
- expect slower chatbot responses during OpenClaw activity.

Ollama is reachable from host-based OpenClaw at `http://127.0.0.1:11434`. If
OpenClaw itself runs inside Docker, connect its container to this Compose network
or configure a host-gateway address; do not publish Ollama to the internet.

## Updating and troubleshooting

```bash
git pull
docker compose up --build -d
docker compose logs --tail=200
```

If the VPS runs out of memory, check:

```bash
free -h
docker stats --no-stream
dmesg -T | grep -i -E "out of memory|killed process"
```

If necessary, stop the model while keeping the rule-based chatbot available:

```bash
docker compose stop ollama
```

The application catches model connection failures and falls back automatically.
