"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

/* ─── Hub-and-Spoke Connection Diagram ─── */
function ConnectionHub() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const providers = [
    { name: "AWS", sub: "Direct Connect", color: "#FF9900", angle: -60 },
    { name: "Azure", sub: "ExpressRoute", color: "#0078D4", angle: -20 },
    { name: "GCP", sub: "Interconnect", color: "#4285F4", angle: 20 },
    { name: "Oracle", sub: "FastConnect", color: "#F80000", angle: 60 },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/[0.02] rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Multi-Cloud Fabric</span>
            <div className="w-8 h-[1px] bg-accent-blue" />
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-txt-primary">
            One fabric, <span className="gradient-text">every cloud</span>
          </h2>
        </motion.div>

        {/* Hub Diagram */}
        <div className="relative flex items-center justify-center min-h-[480px]">
          {/* Center Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-36 h-36 lg:w-44 lg:h-44 rounded-full border-2 border-accent-blue/40 bg-navy/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-accent-blue/10 border-dashed"
            />
            <div className="w-4 h-4 rounded-full bg-accent-blue mb-2 animate-pulse" />
            <span className="font-display font-bold text-sm text-txt-primary">Netlayer</span>
            <span className="font-mono text-[10px] text-accent-blue uppercase tracking-wider">Fabric</span>
          </motion.div>

          {/* Spokes to providers */}
          {providers.map((p, i) => {
            const radius = 180;
            const angleRad = (p.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius * 0.7;

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="absolute z-10"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {/* Animated dashed line from center */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    width: Math.abs(x) + 20,
                    height: Math.abs(y) + 20,
                    left: x > 0 ? -(Math.abs(x)) : 0,
                    top: y > 0 ? -(Math.abs(y)) : 0,
                    overflow: "visible",
                  }}
                >
                  <line
                    x1={x > 0 ? 0 : Math.abs(x)}
                    y1={y > 0 ? 0 : Math.abs(y)}
                    x2={x > 0 ? Math.abs(x) : 0}
                    y2={y > 0 ? Math.abs(y) : 0}
                    stroke={p.color}
                    strokeWidth="1"
                    strokeDasharray="6 4"
                    strokeOpacity="0.4"
                  >
                    <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
                  </line>
                </svg>
                {/* Provider Card */}
                <div className="w-28 lg:w-32 p-4 bg-navy/70 border border-border-dim rounded-card backdrop-blur-sm hover:border-border-bright transition-all duration-300 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ border: `1px solid ${p.color}30` }}>
                    <span className="font-display font-bold text-xs" style={{ color: p.color }}>{p.name}</span>
                  </div>
                  <span className="text-[9px] font-mono text-txt-dim uppercase tracking-wider">{p.sub}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Latency Comparison ─── */
function LatencyComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Performance</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Public internet vs <span className="gradient-text">Direct Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Public Internet */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 bg-navy/50 border border-status-down/20 rounded-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-status-down/60" />
              <h3 className="font-display font-bold text-lg text-txt-primary">Public Internet</h3>
            </div>
            <div className="space-y-5">
              {[
                { label: "Latency", value: "45-120ms", pct: 85 },
                { label: "Jitter", value: "8-25ms", pct: 70 },
                { label: "Packet Loss", value: "0.5-2%", pct: 60 },
              ].map((m, i) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-mono text-txt-dim uppercase">{m.label}</span>
                    <span className="text-sm font-mono text-status-down">{m.value}</span>
                  </div>
                  <div className="h-2 bg-deep rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${m.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
                      className="h-full bg-gradient-to-r from-status-down/40 to-status-down rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Direct Connect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 bg-navy/50 border border-status-up/20 rounded-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-status-up" />
              <h3 className="font-display font-bold text-lg text-txt-primary">Direct Connect</h3>
              <span className="ml-auto px-2 py-0.5 bg-status-up/10 border border-status-up/20 rounded-pill text-[10px] font-mono text-status-up uppercase">Recommended</span>
            </div>
            <div className="space-y-5">
              {[
                { label: "Latency", value: "<5ms", pct: 12 },
                { label: "Jitter", value: "<1ms", pct: 8 },
                { label: "Packet Loss", value: "0%", pct: 3 },
              ].map((m, i) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-mono text-txt-dim uppercase">{m.label}</span>
                    <span className="text-sm font-mono text-status-up">{m.value}</span>
                  </div>
                  <div className="h-2 bg-deep rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${m.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
                      className="h-full bg-gradient-to-r from-status-up/40 to-status-up rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Architecture Pipeline ─── */
function ArchitecturePipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const nodes = [
    { label: "Your DC", icon: "M5 6h18v16H5z M9 12h4 M9 16h10", sub: "On-premises" },
    { label: "Netlayer Edge", icon: "M14 3l10 4v7c0 5.5-4 10.5-10 12C8 24.5 4 19.5 4 14V7l10-4z", sub: "PoP location" },
    { label: "Cloud PoP", icon: "M8 20a6 6 0 0 1-.5-11A8 8 0 0 1 24 11a5 5 0 0 1 0 9H8z", sub: "Edge exchange" },
    { label: "Cloud VPC", icon: "M4 8h20v12H4z M8 12h4 M8 16h8", sub: "Your workloads" },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Architecture</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Data path <span className="gradient-text">visualised</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-8 lg:p-12 bg-navy/40 border border-border-dim rounded-card overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center gap-0 justify-between relative">
            {nodes.map((node, i) => (
              <div key={node.label} className="flex items-center flex-col lg:flex-row">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  className="flex flex-col items-center gap-3 p-5 bg-deep/80 border border-border-dim rounded-card w-36 text-center relative z-10"
                >
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" strokeLinecap="round" strokeLinejoin="round">
                    <path d={node.icon} />
                  </svg>
                  <span className="font-display font-bold text-sm text-txt-primary">{node.label}</span>
                  <span className="text-[9px] font-mono text-txt-dim uppercase tracking-wider">{node.sub}</span>
                </motion.div>

                {i < nodes.length - 1 && (
                  <div className="hidden lg:block w-16 xl:w-24 relative h-[2px]">
                    <div className="absolute inset-0 bg-border-dim" />
                    {/* Animated packet dot */}
                    <motion.div
                      className="absolute w-2 h-2 rounded-full bg-accent-cyan -top-[3px]"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-accent-cyan animate-ping opacity-40" />
                    </motion.div>
                  </div>
                )}
                {i < nodes.length - 1 && (
                  <div className="lg:hidden w-[2px] h-8 relative">
                    <div className="absolute inset-0 bg-border-dim" />
                    <motion.div
                      className="absolute w-2 h-2 rounded-full bg-accent-cyan -left-[3px]"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Latency labels */}
          <div className="hidden lg:flex justify-around mt-6 px-20">
            {["~1ms", "~2ms", "~1ms"].map((lat, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.2 }}
                className="text-[10px] font-mono text-accent-cyan/60"
              >
                {lat}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CloudConnectPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Cloud"
        titleAccent="Connect"
        description="Direct on-ramp to AWS, Azure and GCP. Private, low-latency connectivity that keeps your cloud traffic off the public internet."
        badge="Cloud Networking"
      />
      <ConnectionHub />
      <LatencyComparison />
      <ArchitecturePipeline />
      <CTABanner
        heading="Connect to your cloud"
        description="Provision a private cloud on-ramp in as little as 5 business days."
        ctaText="Get Connected →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
