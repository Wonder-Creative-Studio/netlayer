"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const advantages = [
  {
    num: "01",
    title: "Live Circuit Monitoring",
    desc: "Latency, jitter, packet loss — per circuit, in real-time. Not in a monthly PDF that arrives three weeks late.",
  },
  {
    num: "02",
    title: "Auto-Incident Detection",
    desc: "Circuit goes down? A ticket is created automatically with full diagnostic data — before your team notices.",
  },
  {
    num: "03",
    title: "Self-Service Billing",
    desc: "Download GST invoices, pay online. Your finance team never chases an account manager again.",
  },
  {
    num: "04",
    title: "Installation Transparency",
    desc: "Track every new connection from feasibility to go-live. Know exactly where your order stands.",
  },
  {
    num: "05",
    title: "SLA Prediction",
    desc: "AI early warning when your monthly SLA is at risk. We fix it before you're affected.",
  },
  {
    num: "06",
    title: "Enterprise API",
    desc: "Pull circuit status and usage into your own NOC via REST APIs.",
  },
];

export default function Advantage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--cursor-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--cursor-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">The Netlayer Advantage</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-txt-primary leading-tight max-w-2xl">
            Six reasons your IT team will{" "}
            <span className="gradient-text">actually thank you.</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 px-6 lg:px-12 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="card-glow flex-shrink-0 w-[320px] sm:w-[360px] snap-start"
              onMouseMove={handleMouseMove}
            >
              <div className="relative h-full p-6 sm:p-8 bg-navy/50 border border-border-dim rounded-card hover:border-border-bright hover:-translate-y-1 transition-all duration-400 overflow-hidden group">
                {/* Large faded number */}
                <span className="absolute -top-4 -right-2 font-display font-extrabold text-[120px] leading-none text-txt-primary/[0.02] select-none pointer-events-none group-hover:text-txt-primary/[0.04] transition-colors duration-700">
                  {adv.num}
                </span>

                {/* Number */}
                <span className="text-xs font-mono text-accent-blue mb-4 block">{adv.num}</span>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-txt-primary mb-3 group-hover:text-accent-blue-light transition-colors">
                  {adv.title}
                </h3>

                {/* Desc */}
                <p className="text-txt-muted text-sm leading-relaxed">{adv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-void to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-void to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
