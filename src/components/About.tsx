"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function NetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const nodes = Array.from({ length: 20 }, () => ({
      x: 40 + Math.random() * (w - 80),
      y: 40 + Math.random() * (h - 80),
      size: 2 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.015,
    }));

    const labels = [
      { text: "Mumbai PoP — 12ms", x: w * 0.2, y: h * 0.25, status: "green" },
      { text: "Bangalore — 8ms", x: w * 0.7, y: h * 0.4, status: "green" },
      { text: "Chennai — 15ms", x: w * 0.5, y: h * 0.7, status: "green" },
      { text: "Delhi — 10ms", x: w * 0.4, y: h * 0.15, status: "amber" },
    ];

    const packets = Array.from({ length: 5 }, () => ({
      fromIdx: Math.floor(Math.random() * nodes.length),
      toIdx: Math.floor(Math.random() * nodes.length),
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.008,
    }));

    let lastTime = 0;

    const draw = (time: number) => {
      animRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current) return;
      if (time - lastTime < 33) return; // ~30fps
      lastTime = time;

      ctx.clearRect(0, 0, w, h);

      // Batched connections
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 136, 255, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < 14400) { // 120^2
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
      }
      ctx.stroke();

      // Batched nodes
      for (const node of nodes) {
        node.pulse += node.speed;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 136, 255, ${(0.5 + Math.sin(node.pulse) * 0.3).toFixed(2)})`;
        ctx.fill();
      }

      // Data packets — no shadowBlur
      ctx.fillStyle = "rgba(0, 212, 255, 0.9)";
      ctx.beginPath();
      for (const pkt of packets) {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) {
          pkt.progress = 0;
          pkt.fromIdx = Math.floor(Math.random() * nodes.length);
          pkt.toIdx = Math.floor(Math.random() * nodes.length);
        }
        const from = nodes[pkt.fromIdx];
        const to = nodes[pkt.toIdx];
        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;
        ctx.moveTo(px + 1.5, py);
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      }
      ctx.fill();

      // Labels
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      for (let i = 0; i < labels.length; i++) {
        const lbl = labels[i];
        const floatY = Math.sin(time * 0.001 + i * 1.5) * 4;

        ctx.save();
        ctx.translate(lbl.x, lbl.y + floatY);

        ctx.fillStyle = "rgba(6, 18, 32, 0.85)";
        const pillW = 140;
        const pillH = 24;
        ctx.beginPath();
        ctx.roundRect(-pillW / 2, -pillH / 2, pillW, pillH, 12);
        ctx.fill();
        ctx.strokeStyle = "rgba(56, 136, 255, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-pillW / 2 + 12, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = lbl.status === "green" ? "#00e676" : "#ffc040";
        ctx.fill();

        ctx.fillStyle = "rgba(192, 208, 232, 0.8)";
        ctx.fillText(lbl.text, -pillW / 2 + 20, 3.5);
        ctx.restore();
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); observer.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />;
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="block font-display font-extrabold text-3xl lg:text-4xl text-txt-primary tabular-nums">
      {count}
      <span className="text-accent-blue-light text-lg lg:text-2xl">{suffix}</span>
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
                Enterprise Connectivity
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-txt-primary leading-tight mb-6">
              Your business runs on bandwidth.{" "}
              <span className="gradient-text">We make sure it never stops.</span>
            </h2>

            <p className="text-txt-muted text-base sm:text-lg leading-relaxed mb-10">
              Most ISPs sell you a pipe and disappear.{" "}
              <strong className="text-txt-secondary">Netlayer is different.</strong> We deliver dedicated, symmetric
              connectivity with real-time visibility into every circuit, every metric, every SLA — through a
              platform your IT team actually wants to use.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { value: 195, suffix: "+", label: "Cities" },
                { value: 10, suffix: " Gbps", label: "Max BW" },
                { value: 500, suffix: "+", label: "Enterprise Clients" },
              ].map((m) => (
                <div key={m.label} className="overflow-hidden">
                  <Counter target={m.value} suffix={m.suffix} />
                  <div className="text-[10px] sm:text-xs font-mono text-txt-dim uppercase tracking-widest mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Network Viz */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square lg:aspect-[4/3] rounded-card bg-navy/40 border border-border-dim overflow-hidden"
          >
            <NetworkViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
