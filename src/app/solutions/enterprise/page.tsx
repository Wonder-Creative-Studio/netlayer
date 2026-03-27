"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const stats = [
  { value: "99.95%", label: "Uptime SLA", sub: "Guaranteed by contract" },
  { value: "500+", label: "Enterprise Clients", sub: "Across 18 states" },
  { value: "<2ms", label: "Avg Latency", sub: "On MPLS backbone" },
  { value: "24/7", label: "NOC Monitoring", sub: "Proactive alerting" },
];

const pipeline = [
  { title: "Assess", desc: "Audit existing infra & map dependencies" },
  { title: "Design", desc: "Custom topology & redundancy planning" },
  { title: "Provision", desc: "Dedicated circuits & CPE deployment" },
  { title: "Deploy", desc: "End-to-end testing & go-live" },
  { title: "Monitor", desc: "24/7 NOC with proactive optimization" },
];

const clientNames = [
  "Tata Group", "Infosys", "Wipro", "HCL Tech", "L&T", "Bajaj Finserv",
  "Godrej", "Mahindra", "Adani", "Reliance Industries", "HDFC Bank", "ICICI",
  "Kotak", "SBI", "Bharti Airtel", "Tech Mahindra", "Mindtree", "Mphasis",
];

const stackLayers = [
  {
    title: "Network Layer",
    items: ["Multi-site MPLS with full-mesh & hub-spoke topologies", "Dedicated ILL with symmetric bandwidth", "SD-WAN overlay for hybrid architectures", "BGP peering with 40+ ISPs & cloud providers"],
  },
  {
    title: "Security Layer",
    items: ["Next-gen firewall with IDS/IPS", "DDoS mitigation up to 1 Tbps", "IPSec & MACsec encryption on all circuits", "Zero-trust network segmentation"],
  },
  {
    title: "Monitoring Layer",
    items: ["Real-time SNMP & NetFlow telemetry", "AI-driven anomaly detection", "Custom dashboards & SLA reporting", "Automated escalation workflows"],
  },
  {
    title: "Support Layer",
    items: ["Dedicated account engineering team", "Quarterly business reviews", "Change management & maintenance windows", "4-hour hardware replacement SLA"],
  },
];

export default function EnterpriseSolutions() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const pipeRef = useRef<HTMLDivElement>(null);
  const pipeInView = useInView(pipeRef, { once: true, margin: "-80px" });
  const marqueeRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackInView = useInView(stackRef, { once: true, margin: "-80px" });

  const [openLayer, setOpenLayer] = useState(0);

  return (
    <PageShell>
      <PageHero
        eyebrow="Enterprise Solutions"
        title="Connectivity infrastructure built for"
        titleAccent="scale."
        description="From multi-site MPLS networks to dedicated bandwidth with 99.95% uptime SLAs. Netlayer delivers the connectivity backbone that enterprises depend on."
        badge="Enterprise-Grade"
      />

      {/* By the Numbers — asymmetric stat grid */}
      <section className="section-padding" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Performance</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-12">
            By the <span className="gradient-text">numbers</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((s, i) => {
              const isLarge = i < 2;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`relative overflow-hidden rounded-card border border-[var(--border-dim)] bg-navy/60 backdrop-blur-sm ${isLarge ? "lg:col-span-1 p-8 lg:p-10" : "p-6 lg:p-8"}`}
                >
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60 + i * 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(${45 + i * 30}deg, var(--accent-blue) 0px, var(--accent-blue) 1px, transparent 1px, transparent ${20 + i * 5}px)`,
                      }}
                    />
                  </div>
                  <div className="relative">
                    <span className={`font-display font-extrabold text-txt-primary block mb-2 ${isLarge ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl"}`}>
                      {s.value}
                    </span>
                    <span className="font-display font-bold text-sm text-txt-secondary block mb-1">{s.label}</span>
                    <span className="text-xs text-txt-dim font-mono">{s.sub}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Deploy — horizontal pipeline */}
      <section className="section-padding relative overflow-hidden" ref={pipeRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-blue/[0.02] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Process</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-14">
            How we <span className="gradient-text">deploy</span>
          </h2>

          {/* Pipeline */}
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={pipeInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-accent-blue/20 via-accent-blue/60 to-accent-blue/20 origin-left"
              />
              {/* Animated dot traveling the line */}
              <motion.div
                animate={pipeInView ? { x: ["0%", "100%"] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_var(--accent-blue)]"
              />
            </div>

            {pipeline.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={pipeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center flex-1"
              >
                {/* Diamond shape */}
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rotate-45 rounded-lg border-2 border-accent-blue/40 bg-navy/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-accent-blue">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute inset-0 rotate-45 rounded-lg border border-accent-blue/30"
                  />
                </div>
                <h3 className="font-display font-bold text-sm text-txt-primary mb-1">{step.title}</h3>
                <p className="text-xs text-txt-muted max-w-[140px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos — 2-row staggered marquee */}
      <section className="py-16 relative overflow-hidden border-y border-[var(--border-dim)]" ref={marqueeRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
          <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
            Trusted by industry leaders
          </span>
        </div>
        <div className="space-y-4">
          {[0, 1].map((row) => (
            <div key={row} className="relative overflow-hidden">
              <motion.div
                animate={{ x: row === 0 ? [0, -1200] : [-1200, 0] }}
                transition={{ duration: row === 0 ? 40 : 45, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 whitespace-nowrap"
              >
                {[...clientNames, ...clientNames].map((name, i) => (
                  <div
                    key={`${row}-${i}`}
                    className="inline-flex items-center px-6 py-3 rounded-card border border-[var(--border-dim)] bg-navy/40"
                  >
                    <span className="font-display font-semibold text-sm text-txt-dim">{name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack Overview — vertical accordion */}
      <section className="section-padding" ref={stackRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Architecture</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-12">
            Full stack <span className="gradient-text">overview</span>
          </h2>

          <div className="space-y-3 max-w-3xl">
            {stackLayers.map((layer, i) => {
              const isOpen = openLayer === i;
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={stackInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-[var(--border-dim)] rounded-card overflow-hidden bg-navy/40"
                >
                  <button
                    onClick={() => setOpenLayer(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-elevated/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${isOpen ? "bg-accent-blue/10 border-accent-blue/40" : "bg-elevated/50 border-[var(--border-dim)]"}`}>
                        <span className="font-mono text-xs font-bold text-accent-blue">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <span className="font-display font-bold text-txt-primary">{layer.title}</span>
                    </div>
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-txt-dim"
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-12 space-y-3">
                        {layer.items.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-blue mt-0.5 flex-shrink-0">
                              <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm text-txt-muted">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Let's architect your network"
        description="Talk to our enterprise solutions team for a custom network design."
        ctaText="Schedule a Consultation →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
