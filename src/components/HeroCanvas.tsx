"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
}

interface LightStreak {
  progress: number;
  speed: number;
  points: { x: number; y: number }[];
  hue: number;
  opacity: number;
  width: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Use device pixel ratio for sharpness but cap at 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    // Reduce particle count for performance — max 45
    const particleCount = Math.min(45, Math.floor((w * h) / 30000));
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return { x, y, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, baseX: x, baseY: y, size: Math.random() * 1.8 + 0.5 };
    });

    const createStreak = (): LightStreak => {
      const sx = Math.random() * w * 0.3;
      const sy = Math.random() * h;
      const ex = w * 0.7 + Math.random() * w * 0.3;
      const ey = Math.random() * h;
      return {
        progress: 0,
        speed: 0.002 + Math.random() * 0.002,
        points: [
          { x: sx, y: sy },
          { x: sx + (ex - sx) * 0.33 + (Math.random() - 0.5) * 180, y: sy + (ey - sy) * 0.33 + (Math.random() - 0.5) * 180 },
          { x: sx + (ex - sx) * 0.66 + (Math.random() - 0.5) * 180, y: sy + (ey - sy) * 0.66 + (Math.random() - 0.5) * 180 },
          { x: ex, y: ey },
        ],
        hue: 210 + Math.random() * 20,
        opacity: 0.06 + Math.random() * 0.08,
        width: 1 + Math.random() * 1.5,
      };
    };

    const streaks: LightStreak[] = Array.from({ length: 3 }, createStreak);

    // Pre-render static grid to offscreen canvas
    const gridCanvas = document.createElement("canvas");
    gridCanvas.width = w * dpr;
    gridCanvas.height = h * dpr;
    const gridCtx = gridCanvas.getContext("2d");
    if (gridCtx) {
      gridCtx.scale(dpr, dpr);
      gridCtx.strokeStyle = "rgba(56, 136, 255, 0.015)";
      gridCtx.lineWidth = 0.5;
      gridCtx.beginPath();
      for (let x = 0; x < w; x += 80) { gridCtx.moveTo(x, 0); gridCtx.lineTo(x, h); }
      for (let y = 0; y < h; y += 80) { gridCtx.moveTo(0, y); gridCtx.lineTo(w, y); }
      gridCtx.stroke();
    }

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * newDpr;
      canvas.height = h * newDpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(newDpr, 0, 0, newDpr, 0, 0);
      // Rebuild grid
      gridCanvas.width = w * newDpr;
      gridCanvas.height = h * newDpr;
      if (gridCtx) {
        gridCtx.setTransform(newDpr, 0, 0, newDpr, 0, 0);
        gridCtx.strokeStyle = "rgba(56, 136, 255, 0.015)";
        gridCtx.lineWidth = 0.5;
        gridCtx.beginPath();
        for (let x = 0; x < w; x += 80) { gridCtx.moveTo(x, 0); gridCtx.lineTo(x, h); }
        for (let y = 0; y < h; y += 80) { gridCtx.moveTo(0, y); gridCtx.lineTo(w, y); }
        gridCtx.stroke();
      }
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Pause when not visible (IntersectionObserver)
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const bezier = (t: number, p: { x: number; y: number }[]) => {
      const u = 1 - t;
      return {
        x: u * u * u * p[0].x + 3 * u * u * t * p[1].x + 3 * u * t * t * p[2].x + t * t * t * p[3].x,
        y: u * u * u * p[0].y + 3 * u * u * t * p[1].y + 3 * u * t * t * p[2].y + t * t * t * p[3].y,
      };
    };

    // Throttle to ~30fps for performance
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30;

    const draw = (time: number) => {
      animFrameRef.current = requestAnimationFrame(draw);

      if (!visibleRef.current) return;

      const delta = time - lastTime;
      if (delta < FRAME_INTERVAL) return;
      lastTime = time - (delta % FRAME_INTERVAL);

      // Background fill instead of clearRect (no alpha canvas)
      ctx.fillStyle = "#010306";
      ctx.fillRect(0, 0, w, h);

      // Gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#010306");
      bg.addColorStop(0.5, "#030810");
      bg.addColorStop(1, "#061220");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Grid (pre-rendered)
      ctx.drawImage(gridCanvas, 0, 0, w, h);

      // Radial glows (simplified — only 2 fills)
      const p1 = 0.5 + Math.sin(time * 0.0005) * 0.2;
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.45);
      g1.addColorStop(0, `rgba(56, 136, 255, ${(0.035 * p1).toFixed(3)})`);
      g1.addColorStop(1, "rgba(56, 136, 255, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.8, h * 0.6, 0, w * 0.8, h * 0.6, w * 0.4);
      g2.addColorStop(0, `rgba(0, 212, 255, ${(0.025 * p1).toFixed(3)})`);
      g2.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Light streaks — NO shadowBlur for performance
      for (const s of streaks) {
        s.progress += s.speed;
        if (s.progress > 1.5) Object.assign(s, createStreak());

        ctx.beginPath();
        ctx.strokeStyle = `hsla(${s.hue}, 80%, 65%, ${s.opacity})`;
        ctx.lineWidth = s.width;
        const steps = 30; // Reduced from 60
        const start = Math.max(0, s.progress - 0.4);
        const end = Math.min(1, s.progress);
        for (let i = 0; i <= steps; i++) {
          const t = start + (end - start) * (i / steps);
          const pt = bezier(t, s.points);
          if (i === 0) { ctx.moveTo(pt.x, pt.y); } else { ctx.lineTo(pt.x, pt.y); }
        }
        ctx.stroke();
      }

      // Particles — batch similar draws
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const repelRadiusSq = 180 * 180;
        if (distSq < repelRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / 180) * 0.12;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx += (p.baseX - p.x) * 0.003;
        p.vy += (p.baseY - p.y) * 0.003;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw particles in single batch
      ctx.fillStyle = "rgba(56, 136, 255, 0.4)";
      ctx.beginPath();
      for (const p of particles) {
        ctx.moveTo(p.x + p.size, p.y);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      ctx.fill();

      // Connection lines — batch into single path, use distSq to avoid sqrt
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 136, 255, 0.04)";
      ctx.lineWidth = 0.5;
      const connDist = 130;
      const connDistSq = connDist * connDist;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < connDistSq) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
