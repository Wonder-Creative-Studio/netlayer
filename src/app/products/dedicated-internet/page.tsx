"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

/* ─── Mock Analytics Dashboard ─── */
function AnalyticsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Dashboard</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Your network at a <span className="gradient-text">glance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bandwidth Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 bg-navy/50 border border-border-dim rounded-card col-span-1"
          >
            <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider block mb-4">Bandwidth Utilisation</span>
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-deep" />
                <motion.circle
                  cx="60" cy="60" r="50" fill="none" strokeWidth="8" strokeLinecap="round"
                  className="text-accent-blue"
                  stroke="currentColor"
                  strokeDasharray={2 * Math.PI * 50}
                  initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                  animate={inView ? { strokeDashoffset: 2 * Math.PI * 50 * (1 - 0.72) } : {}}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-extrabold text-2xl text-txt-primary">72%</span>
                <span className="text-[9px] font-mono text-txt-dim">720 Mbps</span>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-mono text-txt-dim">
              <span>Committed: 1 Gbps</span>
              <span>Burst: 2 Gbps</span>
            </div>
          </motion.div>

          {/* Traffic Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-6 bg-navy/50 border border-border-dim rounded-card col-span-1 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider">Traffic (24h)</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[9px] font-mono text-accent-blue"><span className="w-2 h-[2px] bg-accent-blue" />Inbound</span>
                <span className="flex items-center gap-1 text-[9px] font-mono text-accent-cyan"><span className="w-2 h-[2px] bg-accent-cyan" />Outbound</span>
              </div>
            </div>
            <svg viewBox="0 0 400 120" className="w-full h-28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="inFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(56,136,255)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(56,136,255)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="outFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(0,200,200)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(0,200,200)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Inbound area */}
              <motion.path
                d="M0,80 C30,70 60,50 100,55 C140,60 170,30 200,35 C230,40 260,20 300,25 C340,30 370,45 400,40 L400,120 L0,120 Z"
                fill="url(#inFill)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M0,80 C30,70 60,50 100,55 C140,60 170,30 200,35 C230,40 260,20 300,25 C340,30 370,45 400,40"
                fill="none" stroke="rgb(56,136,255)" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.4 }}
              />
              {/* Outbound area */}
              <motion.path
                d="M0,90 C30,85 60,75 100,78 C140,80 170,65 200,68 C230,70 260,55 300,60 C340,65 370,70 400,65 L400,120 L0,120 Z"
                fill="url(#outFill)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.path
                d="M0,90 C30,85 60,75 100,78 C140,80 170,65 200,68 C230,70 260,55 300,60 C340,65 370,70 400,65"
                fill="none" stroke="rgb(0,200,200)" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
            </svg>
            <div className="flex justify-between mt-2 text-[9px] font-mono text-txt-dim">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
            </div>
          </motion.div>

          {/* BGP Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="p-6 bg-navy/50 border border-border-dim rounded-card"
          >
            <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider block mb-4">BGP Sessions</span>
            <div className="space-y-3">
              {[
                { peer: "Upstream A", asn: "AS64512", status: "Established", color: "bg-status-up" },
                { peer: "Upstream B", asn: "AS64513", status: "Established", color: "bg-status-up" },
                { peer: "IXP Peer", asn: "AS64514", status: "Established", color: "bg-status-up" },
                { peer: "Backup", asn: "AS64515", status: "Idle", color: "bg-txt-dim" },
              ].map((s, i) => (
                <motion.div
                  key={s.peer}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.color} ${s.status === "Established" ? "animate-pulse" : ""}`} />
                    <span className="text-xs text-txt-secondary">{s.peer}</span>
                  </div>
                  <span className="text-[9px] font-mono text-txt-dim">{s.asn}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border-dim flex items-center gap-2">
              <span className="text-[9px] font-mono text-txt-dim">Prefixes:</span>
              <span className="text-xs font-mono text-accent-blue">847,234</span>
            </div>
          </motion.div>
        </div>

        {/* Top Destinations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 p-6 bg-navy/50 border border-border-dim rounded-card"
        >
          <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider block mb-4">Top Destinations</span>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-dim">
                  <th className="pb-2 text-[10px] font-mono text-txt-dim uppercase tracking-wider font-normal">Destination</th>
                  <th className="pb-2 text-[10px] font-mono text-txt-dim uppercase tracking-wider font-normal text-right">Traffic</th>
                  <th className="pb-2 text-[10px] font-mono text-txt-dim uppercase tracking-wider font-normal text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dest: "cdn.cloudflare.com", traffic: "142 GB", share: 28 },
                  { dest: "ap-south-1.aws.com", traffic: "98 GB", share: 19 },
                  { dest: "blob.azure.net", traffic: "76 GB", share: 15 },
                  { dest: "storage.googleapis.com", traffic: "51 GB", share: 10 },
                ].map((row, i) => (
                  <motion.tr
                    key={row.dest}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="border-b border-border-dim/50"
                  >
                    <td className="py-2.5 text-sm font-mono text-txt-secondary">{row.dest}</td>
                    <td className="py-2.5 text-sm font-mono text-txt-muted text-right">{row.traffic}</td>
                    <td className="py-2.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-deep rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${row.share}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                            className="h-full bg-accent-blue/60 rounded-full"
                          />
                        </div>
                        <span className="text-xs font-mono text-txt-dim w-8">{row.share}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 95th Percentile Billing Visualization ─── */
function BillingVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const samples = [35, 42, 55, 48, 62, 38, 71, 45, 52, 88, 44, 58, 95, 40, 55, 47, 63, 50, 72, 41, 59, 46, 67, 53, 78, 42, 56, 85, 48, 61];
  const sorted = [...samples].sort((a, b) => a - b);
  const p95Index = Math.floor(sorted.length * 0.95);
  const p95Value = sorted[p95Index];

  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-accent-blue/[0.02] rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Billing</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            How <span className="gradient-text">95th percentile</span> billing works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 p-8 bg-navy/50 border border-border-dim rounded-card overflow-hidden">
            <div className="flex items-end gap-[3px] h-48 relative">
              {samples.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.03 }}
                  className={`flex-1 rounded-t-sm transition-colors duration-300 ${h >= p95Value ? "bg-status-warn/70" : "bg-accent-blue/30"}`}
                />
              ))}
              {/* 95th percentile line */}
              <motion.div
                className="absolute left-0 right-0"
                style={{ bottom: `${p95Value}%` }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="w-full border-t-2 border-dashed border-status-up/60" />
                <span className="absolute -top-5 right-0 text-[10px] font-mono text-status-up px-2 py-0.5 bg-navy/80 rounded">95th percentile = billed rate</span>
              </motion.div>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-[10px] font-mono text-txt-dim">Day 1</span>
              <span className="text-[10px] font-mono text-txt-dim">Day 30</span>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-dim">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-txt-dim"><span className="w-3 h-2 rounded-sm bg-accent-blue/30" />Normal</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-txt-dim"><span className="w-3 h-2 rounded-sm bg-status-warn/70" />Top 5% (discarded)</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-txt-dim"><span className="w-3 h-[2px] border-t border-dashed border-status-up/60" />Billed rate</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {[
              { step: "01", title: "We sample every 5 minutes", desc: "8,640 data points collected across the billing period." },
              { step: "02", title: "Sort all samples", desc: "Every sample is ranked from lowest to highest utilisation." },
              { step: "03", title: "Discard top 5%", desc: "The highest 432 samples are thrown away, absorbing your spikes." },
              { step: "04", title: "Bill at the 95th", desc: "You are billed on the highest remaining sample. Fair and predictable." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-elevated border border-border-mid flex items-center justify-center">
                  <span className="text-[10px] font-mono text-accent-blue">{s.step}</span>
                </div>
                <div>
                  <span className="block font-display font-bold text-sm text-txt-primary">{s.title}</span>
                  <span className="text-txt-muted text-xs">{s.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Feature Comparison Table ─── */
function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const rows = [
    { feature: "Guaranteed Bandwidth", ded: true, shared: false, broad: false },
    { feature: "BGP Support", ded: true, shared: false, broad: false },
    { feature: "SLA with Credits", ded: true, shared: true, broad: false },
    { feature: "Static IP Addresses", ded: true, shared: true, broad: false },
    { feature: "Burstable Capacity", ded: true, shared: false, broad: false },
    { feature: "99.99% Uptime", ded: true, shared: false, broad: false },
    { feature: "IPv6 Native", ded: true, shared: true, broad: false },
    { feature: "24/7 NOC Support", ded: true, shared: true, broad: false },
    { feature: "Uncontended", ded: true, shared: false, broad: false },
    { feature: "Low Cost", ded: false, shared: true, broad: true },
  ];

  const Check = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto"><path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-status-up" /></svg>
  );
  const Cross = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto"><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-txt-dim" /></svg>
  );

  return (
    <section className="py-20 lg:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Comparison</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Why go <span className="gradient-text">dedicated</span>?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="text-left pb-4 text-[10px] font-mono text-txt-dim uppercase tracking-wider font-normal w-1/2">Feature</th>
                <th className="pb-4 text-center w-1/6">
                  <div className="px-3 py-2 bg-accent-blue/10 border border-accent-blue/20 rounded-card">
                    <span className="block font-display font-bold text-sm text-accent-blue">Dedicated</span>
                    <span className="text-[9px] font-mono text-txt-dim">Netlayer DIA</span>
                  </div>
                </th>
                <th className="pb-4 text-center w-1/6">
                  <div className="px-3 py-2">
                    <span className="block font-display font-bold text-sm text-txt-muted">Shared</span>
                    <span className="text-[9px] font-mono text-txt-dim">Business ISP</span>
                  </div>
                </th>
                <th className="pb-4 text-center w-1/6">
                  <div className="px-3 py-2">
                    <span className="block font-display font-bold text-sm text-txt-muted">Broadband</span>
                    <span className="text-[9px] font-mono text-txt-dim">Consumer</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="border-t border-border-dim/50"
                >
                  <td className="py-3 text-sm text-txt-secondary">{row.feature}</td>
                  <td className="py-3 text-center bg-accent-blue/[0.03]">{row.ded ? <Check /> : <Cross />}</td>
                  <td className="py-3 text-center">{row.shared ? <Check /> : <Cross />}</td>
                  <td className="py-3 text-center">{row.broad ? <Check /> : <Cross />}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

export default function DedicatedInternetPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Dedicated"
        titleAccent="Internet Access"
        description="Premium, uncontended internet for enterprises. Guaranteed bandwidth, full routing control and burstable capacity when you need it."
        badge="Internet Access"
      />
      <AnalyticsDashboard />
      <BillingVisualization />
      <ComparisonTable />
      <CTABanner
        heading="Get dedicated internet"
        description="Uncontended bandwidth with SLA guarantees — check feasibility at your location."
        ctaText="Check Feasibility →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
