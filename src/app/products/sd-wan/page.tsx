"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTABanner from "@/components/CTABanner";

const features = [
  {
    title: "Application Awareness",
    description:
      "Deep packet inspection identifies 3,000+ applications in real time and routes each across the optimal path.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="20" height="20" rx="4" />
        <circle cx="10" cy="10" r="2" />
        <circle cx="18" cy="10" r="2" />
        <circle cx="10" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M12 10h4M10 12v4M18 12v4M12 18h4" />
      </svg>
    ),
  },
  {
    title: "Zero-Touch Provisioning",
    description:
      "Ship a box to any branch — it auto-configures from the central orchestrator. No on-site engineer needed.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="18" height="12" rx="2" />
        <path d="M14 4v4M10 4h8" />
        <path d="M11 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Hybrid WAN",
    description:
      "Blend MPLS, broadband and LTE into a single overlay. Get MPLS-like performance at broadband economics.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h20" />
        <path d="M7 20V10l7-6 7 6v10" />
        <path d="M4 20l3-4M24 20l-3-4" />
        <rect x="11" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    title: "Centralized Control",
    description:
      "Single-pane orchestrator gives you real-time visibility, policy management and analytics across every edge.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="4" />
        <path d="M14 4v6M14 18v6M4 14h6M18 14h6" />
        <path d="M7 7l4.5 4.5M16.5 16.5L21 21M7 21l4.5-4.5M16.5 11.5L21 7" />
      </svg>
    ),
  },
  {
    title: "Auto Failover",
    description:
      "Sub-second failover between links keeps business running even when a primary circuit goes down.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14h8l2-6 4 12 2-6h4" />
      </svg>
    ),
  },
  {
    title: "Cloud-First",
    description:
      "Direct breakout to SaaS and IaaS from the branch — no back-hauling traffic through the data centre.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20a6 6 0 0 1-.5-11A8 8 0 0 1 24 11a5 5 0 0 1 0 9H8z" />
        <path d="M14 15v5M11 18l3 2 3-2" />
      </svg>
    ),
  },
];

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { num: "01", title: "Assess", desc: "We audit your current WAN, map applications and define SLA targets." },
    { num: "02", title: "Design", desc: "Our architects build an overlay topology blending MPLS, broadband and LTE." },
    { num: "03", title: "Deploy", desc: "Zero-touch CPE ships to each site — configuration is pushed from the cloud." },
    { num: "04", title: "Optimise", desc: "AI-driven analytics continuously re-route traffic for peak performance." },
  ];

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[400px] bg-accent-cyan/[0.02] rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
              How It Works
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            From legacy WAN to <span className="gradient-text">software-defined</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-full h-[1px] bg-gradient-to-r from-border-mid to-transparent translate-x-1/2" />
              )}
              <div className="relative p-6 bg-navy/50 border border-border-dim rounded-card hover:border-border-bright transition-all duration-300">
                <span className="block font-mono text-3xl font-bold text-accent-blue/20 mb-3">{step.num}</span>
                <h3 className="font-display font-bold text-base text-txt-primary mb-2">{step.title}</h3>
                <p className="text-txt-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverlayDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
              Architecture
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Overlay <span className="gradient-text">architecture</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative p-8 sm:p-12 bg-navy/50 border border-border-dim rounded-card overflow-hidden"
        >
          {/* Orchestrator layer */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-elevated/60 border border-accent-blue/20 rounded-pill">
              <div className="w-3 h-3 rounded-full bg-accent-blue animate-pulse" />
              <span className="font-mono text-xs text-accent-blue uppercase tracking-wider">Central Orchestrator</span>
            </div>
          </div>

          {/* Connection lines */}
          <div className="relative flex items-center justify-center mb-10">
            <div className="absolute w-[80%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
            <div className="flex gap-4">
              {["MPLS", "Broadband", "LTE/5G"].map((label) => (
                <span key={label} className="relative z-10 px-3 py-1.5 bg-deep border border-border-mid rounded-pill text-[10px] font-mono text-txt-muted uppercase">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Edge layer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["HQ", "Branch A", "Branch B", "Cloud"].map((site) => (
              <div key={site} className="flex flex-col items-center gap-2 p-4 bg-deep/60 border border-border-dim rounded-card">
                <div className="w-10 h-10 rounded-full bg-elevated border border-border-mid flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-txt-muted">
                    <rect x="2" y="4" width="12" height="8" rx="1" />
                    <path d="M5 8h6" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-txt-dim uppercase">{site}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function SdWanPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="SD-WAN"
        titleAccent=""
        description="Application-aware routing with centralized orchestration. Transform your WAN from rigid and expensive to agile and intelligent."
        badge="Software-Defined"
      />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FeatureGrid features={features} columns={3} />
        </div>
      </section>

      <HowItWorks />
      <OverlayDiagram />

      <CTABanner
        heading="Modernise your WAN"
        description="Book a demo of our SD-WAN orchestrator and see application-level analytics in action."
        ctaText="Book a Demo →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
