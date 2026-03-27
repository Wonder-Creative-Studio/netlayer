"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

/* ─── Animated Threat Dot ─── */
function ThreatDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-status-down"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
      style={{ left: `${Math.random() * 90 + 5}%`, top: `${Math.random() * 80 + 10}%` }}
    >
      <div className="absolute inset-0 rounded-full bg-status-down animate-ping opacity-40" />
    </motion.div>
  );
}

/* ─── Split Screen: Threat Monitor + Stats ─── */
function SplitThreatMonitor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [blockedCount, setBlockedCount] = useState(2413847);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setBlockedCount((c) => c + Math.floor(Math.random() * 12 + 1));
    }, 200);
    return () => clearInterval(interval);
  }, [inView]);

  const stats = [
    { label: "Threats Blocked Today", value: blockedCount.toLocaleString(), color: "text-status-down", mono: true },
    { label: "Mean Time to Detect", value: "<5 min", color: "text-status-warn", mono: false },
    { label: "SOC Uptime", value: "99.99%", color: "text-status-up", mono: false },
  ];

  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Live Protection</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Real-time <span className="gradient-text">threat neutralisation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border-dim rounded-card overflow-hidden">
          {/* Left: Threat Monitor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[360px] bg-deep/80 border-b lg:border-b-0 lg:border-r border-border-dim overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle, rgba(56,136,255,0.3) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />
            {/* Animated threat dots */}
            {Array.from({ length: 18 }).map((_, i) => (
              <ThreatDot key={i} delay={i * 0.4} />
            ))}
            {/* Shield center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-full border-2 border-accent-blue/30 flex items-center justify-center bg-navy/60 backdrop-blur-sm"
              >
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue">
                  <path d="M14 3l10 4v7c0 5.5-4 10.5-10 12C8 24.5 4 19.5 4 14V7l10-4z" />
                  <path d="M10 14l3 3 5-5" />
                </svg>
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-navy/80 border border-border-mid rounded-pill backdrop-blur-sm">
              <span className="text-[10px] font-mono text-status-up flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-status-up animate-pulse" />
                MONITORING ACTIVE
              </span>
            </div>
          </motion.div>

          {/* Right: Stats stacking vertically */}
          <div className="flex flex-col">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className={`flex-1 p-8 flex flex-col justify-center ${i < stats.length - 1 ? "border-b border-border-dim" : ""} bg-navy/30`}
              >
                <span className={`block font-display font-extrabold text-3xl lg:text-4xl ${stat.color} mb-1 ${stat.mono ? "font-mono tabular-nums" : ""}`}>
                  {stat.value}
                </span>
                <span className="text-txt-dim text-xs font-mono uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Horizontal Scrolling Defense Layers ─── */
function DefenseInDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const layers = [
    { name: "Perimeter", num: "01", items: ["Next-Gen Firewall", "WAF", "IPS/IDS"], color: "border-status-down/40", glow: "bg-status-down/5" },
    { name: "Network", num: "02", items: ["DDoS Scrubbing", "Micro-Segmentation", "DNS Security"], color: "border-status-warn/40", glow: "bg-status-warn/5" },
    { name: "Endpoint", num: "03", items: ["EDR", "Patch Management", "Device Posture"], color: "border-accent-cyan/40", glow: "bg-accent-cyan/5" },
    { name: "Identity", num: "04", items: ["MFA", "Zero Trust", "PAM"], color: "border-accent-blue/40", glow: "bg-accent-blue/5" },
    { name: "Data", num: "05", items: ["Encryption at Rest", "DLP", "Backup & Recovery"], color: "border-status-up/40", glow: "bg-status-up/5" },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Defence in Depth</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-2">
            Five layers of <span className="gradient-text">protection</span>
          </h2>
          <p className="text-txt-muted text-sm">Scroll to explore each security layer</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="overflow-x-auto pb-6 scrollbar-hide"
      >
        <div className="flex gap-5 px-6 lg:px-12 min-w-max">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className={`relative w-[280px] shrink-0 p-7 rounded-card border ${layer.color} ${layer.glow} backdrop-blur-sm`}
              style={{ marginTop: i * 12 }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-txt-dim">{layer.num}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-txt-dim">
                  <path d="M10 2l7 3v5c0 4-3 7.5-7 8.5C6 17.5 3 14 3 10V5l7-3z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-txt-primary mb-4">{layer.name}</h3>
              <div className="space-y-2">
                {layer.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent-blue" />
                    <span className="text-sm text-txt-muted">{item}</span>
                  </div>
                ))}
              </div>
              {i < layers.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-txt-dim">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 3l4 4-4 4" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Compliance Badges Masonry ─── */
function ComplianceBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const certs = [
    { name: "ISO 27001", desc: "Information Security Management", size: "large" },
    { name: "SOC 2 Type II", desc: "Service Organisation Controls", size: "small" },
    { name: "PCI-DSS", desc: "Payment Card Industry Standard", size: "small" },
    { name: "HIPAA", desc: "Health Data Protection", size: "medium" },
    { name: "GDPR", desc: "EU Data Privacy Regulation", size: "medium" },
    { name: "NIST CSF", desc: "Cybersecurity Framework", size: "large" },
  ];

  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Compliance</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Audit-ready from <span className="gradient-text">day one</span>
          </h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className={`break-inside-avoid p-6 bg-navy/50 border border-border-dim rounded-card hover:border-accent-blue/30 transition-all duration-300 group ${
                cert.size === "large" ? "py-12" : cert.size === "medium" ? "py-9" : "py-6"
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full border border-border-mid bg-elevated/60 flex items-center justify-center group-hover:border-accent-blue/40 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue">
                    <path d="M12 2l8 3v6c0 5-3 9-8 10.5C7 20 4 16 4 11V5l8-3z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-txt-primary text-center mb-1">{cert.name}</h3>
              <p className="text-txt-dim text-xs font-mono text-center uppercase tracking-wider">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ManagedSecurityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Managed"
        titleAccent="Security"
        description="Enterprise-grade protection without the enterprise-grade headcount. Our SOC watches your perimeter so you can focus on your business."
        badge="Security Services"
      />
      <SplitThreatMonitor />
      <DefenseInDepth />
      <ComplianceBadges />
      <CTABanner
        heading="Protect your enterprise"
        description="Get a security assessment and threat landscape report for your organisation."
        ctaText="Request Assessment →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
