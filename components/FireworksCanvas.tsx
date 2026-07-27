"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; color: string; size: number;
};

type Rocket = {
  x: number; y: number;
  vy: number; targetY: number;
  color: string;
  trail: { x: number; y: number }[];
};

const COLORS = [
  "#c9a45c", "#e8c980", "#ffd700",
  "#ffffff", "#dce6f5",
  "#6b9fd4", "#4a7cbf",
  "#f0e6c0",
];

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctxEl = canvasEl.getContext("2d");
    if (!ctxEl) return;

    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let frame = 0;
    let raf: number;

    function explode(x: number, y: number, color: string) {
      const count = 90 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 7;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          alpha: 1,
          color: Math.random() > 0.45 ? color : COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 1.5 + Math.random() * 2.5,
        });
      }
    }

    function launch() {
      rockets.push({
        x: canvas.width * (0.1 + Math.random() * 0.8),
        y: canvas.height + 10,
        vy: -(13 + Math.random() * 9),
        targetY: canvas.height * (0.08 + Math.random() * 0.42),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
      });
    }

    // Opening volley
    for (let i = 0; i < 5; i++) setTimeout(launch, i * 150);

    function tick() {
      ctx.fillStyle = "rgba(3, 8, 22, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (frame % 24 === 0) launch();

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 14) r.trail.shift();
        r.y += r.vy;
        r.vy += 0.32;

        r.trail.forEach((pt, ti) => {
          ctx.globalAlpha = (ti / r.trail.length) * 0.65;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.alpha -= 0.013;

        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frame++;
      raf = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}
