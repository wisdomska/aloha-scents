"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  l: number;
  m: number;
  r: number;
}

/** Faint gold mist drifting from the hero bottle. `emitRef` nudges extra particles. */
export function useMist() {
  const mistRef = useRef<HTMLCanvasElement>(null);
  const emitRef = useRef<((bias: number) => void) | null>(null);

  useEffect(() => {
    const c = mistRef.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const P: Particle[] = [];
    let raf = 0;
    let vis = true;
    let t = 0;
    const size = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, r.width * dpr);
      c.height = Math.max(1, r.height * dpr);
    };
    size();
    const emit = (n: number, bias = 0) => {
      for (let i = 0; i < n && P.length < 140; i++)
        P.push({
          x: c.width * 0.36 + (Math.random() - 0.5) * 12 * dpr,
          y: c.height * 0.64,
          vx: (Math.random() * 0.5 + 0.08 + bias) * dpr,
          vy: -(Math.random() * 0.6 + 0.2) * dpr,
          l: 0,
          m: 140 + Math.random() * 100,
          r: (0.8 + Math.random() * 2) * dpr,
        });
    };
    const loop = () => {
      t++;
      if (t % 9 === 0) emit(1);
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i];
        p.l++;
        p.x += p.vx + Math.sin((p.l + i * 7) * 0.04) * 0.18 * dpr;
        p.y += p.vy;
        p.vx *= 0.996;
        p.vy *= 0.994;
        const k = p.l / p.m;
        if (k >= 1) {
          P.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(201,154,91,${(Math.sin(k * Math.PI) * 0.42).toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r * (1 + k * 1.6), 0, 6.283);
        ctx.fill();
      }
      raf = vis ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      if (vis && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(c);
    window.addEventListener("resize", size);
    emitRef.current = (bias) => emit(2, bias);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
      emitRef.current = null;
    };
  }, []);

  return { mistRef, emitRef };
}
