"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const useCaseTabs = [
  {
    id: "telemedicine",
    label: "Telemedicine",
    desc: "Enable real-time video consultations between specialists and rural clinics with guaranteed sub-5ms latency links. Support HD video, screen sharing, and remote diagnostic tools simultaneously without quality degradation.",
    metrics: [
      { value: "<5ms", label: "Latency" },
      { value: "99.99%", label: "Uptime" },
      { value: "4K", label: "Video Support" },
    ],
    diagram: (
      <svg viewBox="0 0 300 80" fill="none" className="w-full h-auto">
        {/* Doctor */}
        <rect x="10" y="15" width="60" height="50" rx="6" fill="var(--accent-blue)" opacity="0.08" stroke="var(--accent-blue)" strokeWidth="0.8" />
        <text x="40" y="38" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">Specialist</text>
        <text x="40" y="50" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Hospital</text>
        {/* Connection */}
        <line x1="70" y1="40" x2="120" y2="40" stroke="var(--accent-blue)" strokeWidth="0.8" strokeDasharray="3 2" />
        {/* Network */}
        <rect x="120" y="20" width="60" height="40" rx="20" fill="var(--accent-cyan)" opacity="0.06" stroke="var(--accent-cyan)" strokeWidth="0.8" />
        <text x="150" y="44" textAnchor="middle" fill="var(--accent-cyan)" fontSize="6" fontFamily="var(--font-mono)">Netlayer</text>
        {/* Connection */}
        <line x1="180" y1="40" x2="230" y2="40" stroke="var(--accent-blue)" strokeWidth="0.8" strokeDasharray="3 2" />
        {/* Patient */}
        <rect x="230" y="15" width="60" height="50" rx="6" fill="var(--accent-blue)" opacity="0.08" stroke="var(--accent-blue)" strokeWidth="0.8" />
        <text x="260" y="38" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">Patient</text>
        <text x="260" y="50" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Rural Clinic</text>
      </svg>
    ),
  },
  {
    id: "pacs",
    label: "PACS & Imaging",
    desc: "Transfer large DICOM files between radiology departments and cloud PACS with dedicated high-throughput circuits. A single CT scan can be 500MB+ — our network handles hundreds of these daily without congestion.",
    metrics: [
      { value: "1 Gbps+", label: "Throughput" },
      { value: "500MB", label: "Per CT Scan" },
      { value: "0%", label: "Packet Loss" },
    ],
    diagram: (
      <svg viewBox="0 0 300 80" fill="none" className="w-full h-auto">
        {/* Scanner */}
        <rect x="10" y="15" width="55" height="50" rx="6" fill="var(--accent-blue)" opacity="0.08" stroke="var(--accent-blue)" strokeWidth="0.8" />
        <text x="37" y="38" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">CT/MRI</text>
        <text x="37" y="50" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Scanner</text>
        {/* Arrow */}
        <line x1="65" y1="40" x2="95" y2="40" stroke="var(--accent-blue)" strokeWidth="0.8" />
        <polygon points="93,37 99,40 93,43" fill="var(--accent-blue)" opacity="0.6" />
        {/* PACS Server */}
        <rect x="100" y="15" width="55" height="50" rx="6" fill="var(--accent-cyan)" opacity="0.08" stroke="var(--accent-cyan)" strokeWidth="0.8" />
        <text x="127" y="38" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">PACS</text>
        <text x="127" y="50" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Server</text>
        {/* Arrow */}
        <line x1="155" y1="40" x2="185" y2="40" stroke="var(--accent-cyan)" strokeWidth="0.8" />
        <polygon points="183,37 189,40 183,43" fill="var(--accent-cyan)" opacity="0.6" />
        {/* Cloud */}
        <rect x="190" y="15" width="55" height="50" rx="6" fill="var(--status-up)" opacity="0.06" stroke="var(--status-up)" strokeWidth="0.8" />
        <text x="217" y="38" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">Cloud</text>
        <text x="217" y="50" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Archive</text>
        {/* View */}
        <line x1="245" y1="40" x2="275" y2="40" stroke="var(--status-up)" strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="275" y="25" width="20" height="30" rx="3" fill="var(--accent-blue)" opacity="0.05" stroke="var(--accent-blue)" strokeWidth="0.5" />
        <text x="285" y="44" textAnchor="middle" fill="var(--txt-dim)" fontSize="4" fontFamily="var(--font-mono)">View</text>
      </svg>
    ),
  },
  {
    id: "emr",
    label: "EMR & HIS",
    desc: "Unify patient records, billing, pharmacy, and lab systems across hospital chains with QoS-prioritized traffic. Guaranteed bandwidth allocation ensures EMR queries never compete with bulk transfers.",
    metrics: [
      { value: "99.95%", label: "Uptime SLA" },
      { value: "<2ms", label: "DB Latency" },
      { value: "QoS", label: "Traffic Priority" },
    ],
    diagram: (
      <svg viewBox="0 0 300 80" fill="none" className="w-full h-auto">
        {/* Multiple sources */}
        {["OPD", "Lab", "Pharmacy"].map((s, j) => (
          <g key={s}>
            <rect x="10" y={5 + j * 25} width="45" height="20" rx="4" fill="var(--accent-blue)" opacity="0.08" stroke="var(--accent-blue)" strokeWidth="0.5" />
            <text x="32" y={18 + j * 25} textAnchor="middle" fill="var(--txt-muted)" fontSize="5" fontFamily="var(--font-mono)">{s}</text>
            <line x1="55" y1={15 + j * 25} x2="90" y2="40" stroke="var(--accent-blue)" strokeWidth="0.4" opacity="0.5" />
          </g>
        ))}
        {/* Central HIS */}
        <rect x="85" y="20" width="60" height="40" rx="6" fill="var(--accent-cyan)" opacity="0.1" stroke="var(--accent-cyan)" strokeWidth="0.8" />
        <text x="115" y="38" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">HIS</text>
        <text x="115" y="50" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Central</text>
        {/* Connection to branches */}
        <line x1="145" y1="40" x2="175" y2="40" stroke="var(--accent-cyan)" strokeWidth="0.8" />
        {/* MPLS */}
        <rect x="175" y="20" width="50" height="40" rx="20" fill="var(--accent-blue)" opacity="0.05" stroke="var(--accent-blue)" strokeWidth="0.8" />
        <text x="200" y="44" textAnchor="middle" fill="var(--accent-blue)" fontSize="5" fontFamily="var(--font-mono)">MPLS</text>
        {/* Branches */}
        <line x1="225" y1="30" x2="255" y2="15" stroke="var(--accent-blue)" strokeWidth="0.4" opacity="0.5" />
        <line x1="225" y1="40" x2="255" y2="40" stroke="var(--accent-blue)" strokeWidth="0.4" opacity="0.5" />
        <line x1="225" y1="50" x2="255" y2="65" stroke="var(--accent-blue)" strokeWidth="0.4" opacity="0.5" />
        {["Branch A", "Branch B", "Branch C"].map((b, j) => (
          <g key={b}>
            <rect x="255" y={5 + j * 25} width="40" height="18" rx="3" fill="var(--status-up)" opacity="0.06" stroke="var(--status-up)" strokeWidth="0.4" />
            <text x="275" y={17 + j * 25} textAnchor="middle" fill="var(--txt-dim)" fontSize="4.5" fontFamily="var(--font-mono)">{b}</text>
          </g>
        ))}
      </svg>
    ),
  },
];

const complianceBadges = [
  { name: "HIPAA", desc: "Health Insurance Portability and Accountability Act compliance for patient data" },
  { name: "DISHA", desc: "Digital Information Security in Healthcare Act — India-specific healthcare data protection" },
  { name: "ISO 27799", desc: "Health informatics security management for healthcare organizations" },
  { name: "NABH", desc: "National Accreditation Board for Hospitals — infrastructure quality standards" },
  { name: "HL7 FHIR", desc: "Interoperability standards for healthcare data exchange and integration" },
  { name: "CERT-IN", desc: "Indian Computer Emergency Response Team — critical infrastructure compliance" },
];

const pipelineStages = [
  { label: "Hospital", icon: "building" },
  { label: "Encrypted Tunnel", icon: "lock" },
  { label: "Data Center", icon: "server" },
  { label: "Cloud Backup", icon: "cloud" },
];

export default function HealthcareSolutions() {
  const [activeTab, setActiveTab] = useState(0);
  const infraRef = useRef<HTMLDivElement>(null);
  const infraInView = useInView(infraRef, { once: true, margin: "-80px" });
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsInView = useInView(tabsRef, { once: true, margin: "-80px" });
  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "-80px" });
  const flowRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Healthcare Solutions"
        title="Reliable connectivity for"
        titleAccent="critical care."
        description="Purpose-built network infrastructure for hospitals, clinics, and healthcare chains. Low latency, high availability, and compliance-ready by design."
        badge="Healthcare Networks"
      />

      {/* Critical Infrastructure — split section */}
      <section className="section-padding" ref={infraRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={infraInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                  {/* Building 1 — top */}
                  <g>
                    <rect x="75" y="20" width="50" height="45" rx="6" fill="var(--accent-blue)" opacity="0.08" stroke="var(--accent-blue)" strokeWidth="1" />
                    <text x="100" y="40" textAnchor="middle" fill="var(--txt-muted)" fontSize="7" fontFamily="var(--font-mono)">Main</text>
                    <text x="100" y="52" textAnchor="middle" fill="var(--txt-dim)" fontSize="6" fontFamily="var(--font-mono)">Hospital</text>
                    {/* Cross icon */}
                    <line x1="95" y1="28" x2="105" y2="28" stroke="var(--accent-blue)" strokeWidth="1.5" />
                    <line x1="100" y1="23" x2="100" y2="33" stroke="var(--accent-blue)" strokeWidth="1.5" />
                  </g>
                  {/* Building 2 — bottom left */}
                  <g>
                    <rect x="15" y="120" width="50" height="45" rx="6" fill="var(--accent-cyan)" opacity="0.08" stroke="var(--accent-cyan)" strokeWidth="1" />
                    <text x="40" y="140" textAnchor="middle" fill="var(--txt-muted)" fontSize="7" fontFamily="var(--font-mono)">Clinic</text>
                    <text x="40" y="152" textAnchor="middle" fill="var(--txt-dim)" fontSize="6" fontFamily="var(--font-mono)">Branch A</text>
                    <line x1="35" y1="128" x2="45" y2="128" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                    <line x1="40" y1="123" x2="40" y2="133" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                  </g>
                  {/* Building 3 — bottom right */}
                  <g>
                    <rect x="135" y="120" width="50" height="45" rx="6" fill="var(--status-up)" opacity="0.06" stroke="var(--status-up)" strokeWidth="1" />
                    <text x="160" y="140" textAnchor="middle" fill="var(--txt-muted)" fontSize="7" fontFamily="var(--font-mono)">Diag</text>
                    <text x="160" y="152" textAnchor="middle" fill="var(--txt-dim)" fontSize="6" fontFamily="var(--font-mono)">Lab</text>
                    <line x1="155" y1="128" x2="165" y2="128" stroke="var(--status-up)" strokeWidth="1.5" />
                    <line x1="160" y1="123" x2="160" y2="133" stroke="var(--status-up)" strokeWidth="1.5" />
                  </g>
                  {/* Connection lines */}
                  <motion.line x1="85" y1="65" x2="50" y2="120" stroke="var(--accent-blue)" strokeWidth="0.8" strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={infraInView ? { pathLength: 1, opacity: 0.5 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.line x1="115" y1="65" x2="150" y2="120" stroke="var(--accent-blue)" strokeWidth="0.8" strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={infraInView ? { pathLength: 1, opacity: 0.5 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                  <motion.line x1="65" y1="142" x2="135" y2="142" stroke="var(--accent-blue)" strokeWidth="0.8" strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={infraInView ? { pathLength: 1, opacity: 0.5 } : {}}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                  {/* Animated dots on connections */}
                  {infraInView && (
                    <>
                      <motion.circle r="2.5" fill="var(--accent-blue)"
                        animate={{ cx: [85, 50], cy: [65, 120], opacity: [1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.circle r="2.5" fill="var(--accent-cyan)"
                        animate={{ cx: [115, 150], cy: [65, 120], opacity: [1, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.circle r="2.5" fill="var(--status-up)"
                        animate={{ cx: [65, 135], cy: [142, 142], opacity: [1, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </>
                  )}
                </svg>
              </div>
            </motion.div>

            {/* Right — text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={infraInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-accent-blue" />
                <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Multi-Site</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-6">
                Critical <span className="gradient-text">infrastructure</span>
              </h2>
              <p className="text-txt-muted leading-relaxed mb-6">
                Connect your main hospital, satellite clinics, diagnostic labs, and pharmacies on a unified, secure network backbone. Dual-path fiber with automatic failover ensures critical care systems stay connected — even during infrastructure outages.
              </p>
              <div className="space-y-3">
                {["Dual-path fiber with auto failover", "Private MPLS backbone across all sites", "QoS-prioritized clinical traffic", "Sub-5ms latency for real-time apps"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-blue flex-shrink-0">
                      <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-txt-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases — tabs */}
      <section className="section-padding relative" ref={tabsRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-accent-cyan/[0.02] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Use Cases</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-10">
            Built for healthcare <span className="gradient-text">workflows</span>
          </h2>

          {/* Tab buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tabsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex gap-2 mb-8"
          >
            {useCaseTabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-button text-sm font-semibold transition-all duration-300 ${
                  activeTab === i
                    ? "bg-accent-blue text-void shadow-lg shadow-accent-blue/20"
                    : "bg-navy/50 border border-[var(--border-dim)] text-txt-muted hover:text-txt-primary hover:border-[var(--border-mid)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-card border border-[var(--border-dim)] bg-navy/40 p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display font-bold text-xl text-txt-primary mb-4">{useCaseTabs[activeTab].label}</h3>
                <p className="text-sm text-txt-muted leading-relaxed mb-6">{useCaseTabs[activeTab].desc}</p>
                <div className="flex gap-6">
                  {useCaseTabs[activeTab].metrics.map((m) => (
                    <div key={m.label}>
                      <span className="font-display font-extrabold text-lg text-accent-blue block">{m.value}</span>
                      <span className="text-xs text-txt-dim font-mono">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full p-4 rounded-lg bg-void/60 border border-[var(--border-dim)]">
                  {useCaseTabs[activeTab].diagram}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance — horizontal scroll medical ID cards */}
      <section className="section-padding" ref={compRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Compliance</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-10">
            Compliance & <span className="gradient-text">security</span>
          </h2>
        </div>
        <div className="relative overflow-x-auto pb-4 scrollbar-hide">
          <motion.div
            initial={{ opacity: 0 }}
            animate={compInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex gap-4 px-6 lg:px-12 min-w-max"
          >
            {complianceBadges.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, x: 20 }}
                animate={compInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-64 flex-shrink-0 rounded-card border border-[var(--border-dim)] bg-navy/40 overflow-hidden hover:border-accent-blue/30 transition-colors duration-300"
              >
                {/* ID card header */}
                <div className="px-5 py-3 bg-elevated/40 border-b border-[var(--border-dim)] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-accent-blue">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <span className="font-display font-bold text-txt-primary">{badge.name}</span>
                  <span className="ml-auto px-2 py-0.5 text-[9px] font-mono bg-status-up/10 text-status-up rounded-pill border border-status-up/20">
                    VERIFIED
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-txt-muted leading-relaxed">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Patient Data Flow */}
      <section className="section-padding relative" ref={flowRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Data Flow</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-12">
            Patient data <span className="gradient-text">pipeline</span>
          </h2>

          <div className="relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 relative">
              {/* Connecting line */}
              <div className="hidden sm:block absolute top-1/2 left-[12%] right-[12%] h-[2px] -translate-y-1/2 bg-gradient-to-r from-accent-blue/10 via-accent-blue/30 to-accent-cyan/30">
                {/* Animated traveling dots */}
                {flowInView && [0, 1, 2].map((d) => (
                  <motion.div
                    key={d}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_6px_var(--accent-blue)]"
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: d * 1 }}
                  />
                ))}
              </div>

              {pipelineStages.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={flowInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-navy/80 border border-[var(--border-dim)] flex items-center justify-center mb-3 backdrop-blur-sm">
                    {stage.icon === "building" && (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    )}
                    {stage.icon === "lock" && (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-cyan">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    )}
                    {stage.icon === "server" && (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                      </svg>
                    )}
                    {stage.icon === "cloud" && (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-status-up">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                      </svg>
                    )}
                  </div>
                  <span className="font-display font-bold text-sm text-txt-primary text-center">{stage.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Connect your healthcare network"
        description="Talk to our healthcare solutions team for a compliant, resilient connectivity design."
        ctaText="Request a Consultation →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
