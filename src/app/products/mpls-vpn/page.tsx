"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTABanner from "@/components/CTABanner";

const features = [
  {
    title: "Private Network",
    description:
      "Traffic never traverses the public internet. Fully isolated Layer 3 VPN with per-customer VRFs for maximum security.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10" width="18" height="12" rx="2" />
        <path d="M9 10V7a5 5 0 0 1 10 0v3" />
        <circle cx="14" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "QoS Traffic Engineering",
    description:
      "Prioritise voice, video and critical applications with granular Class of Service policies across every node.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h4v4H4zM10 14h4v10h-4zM16 8h4v16h-4zM22 4h4v20h-4z" />
      </svg>
    ),
  },
  {
    title: "Multi-site Mesh",
    description:
      "Connect dozens of branches, data centres and cloud zones in a fully meshed or hub-spoke topology.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="6" r="3" />
        <circle cx="6" cy="22" r="3" />
        <circle cx="22" cy="22" r="3" />
        <path d="M14 9v4M8.5 20L12 15M19.5 20L16 15" />
        <path d="M9 22h10" />
      </svg>
    ),
  },
  {
    title: "Class of Service",
    description:
      "Up to 6 CoS queues with DSCP marking, allowing fine-grained traffic shaping across real-time, interactive and bulk classes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h20M4 12h14M4 18h8M4 24h20" />
        <circle cx="24" cy="12" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Managed CPE",
    description:
      "We deploy, configure and maintain customer-premises equipment so your team can focus on business outcomes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="22" height="12" rx="2" />
        <circle cx="8" cy="14" r="1.5" />
        <circle cx="14" cy="14" r="1.5" />
        <path d="M19 12v4M21 12v4" />
        <path d="M8 20v3M20 20v3" />
      </svg>
    ),
  },
  {
    title: "Pan-India Reach",
    description:
      "Leverage our backbone spanning 1,200+ cities and 50+ PoPs to connect every branch, campus and remote site nationwide.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <ellipse cx="14" cy="14" rx="5" ry="10" />
        <path d="M4 14h20M6 8h16M6 20h16" />
      </svg>
    ),
  },
];

function TopologyDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-blue/[0.02] rounded-full blur-[120px]" />
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
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
              Network Topology
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Flexible <span className="gradient-text">topologies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hub & Spoke */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative p-8 bg-navy/50 border border-border-dim rounded-card overflow-hidden group hover:border-border-bright transition-all duration-300"
          >
            <h3 className="font-display font-bold text-lg text-txt-primary mb-2">Hub &amp; Spoke</h3>
            <p className="text-txt-muted text-sm mb-8">Central hub connects to all branch offices. Cost-effective for centralised architectures.</p>
            <div className="relative h-56 flex items-center justify-center">
              {/* Hub */}
              <div className="absolute w-16 h-16 rounded-full bg-accent-blue/10 border-2 border-accent-blue flex items-center justify-center z-10">
                <span className="text-[10px] font-mono text-accent-blue uppercase">Hub</span>
              </div>
              {/* Spokes */}
              {[
                { x: -90, y: -70, label: "BR-1" },
                { x: 90, y: -70, label: "BR-2" },
                { x: -110, y: 30, label: "BR-3" },
                { x: 110, y: 30, label: "BR-4" },
                { x: 0, y: 90, label: "DC" },
              ].map((node) => (
                <div key={node.label}>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-140 -100 280 200">
                    <line
                      x1="0" y1="0" x2={node.x} y2={node.y}
                      stroke="rgba(56,136,255,0.2)" strokeWidth="1" strokeDasharray="4 4"
                    />
                  </svg>
                  <div
                    className="absolute w-10 h-10 rounded-full bg-elevated border border-border-mid flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${node.x}px - 20px)`,
                      top: `calc(50% + ${node.y}px - 20px)`,
                    }}
                  >
                    <span className="text-[8px] font-mono text-txt-muted">{node.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Full Mesh */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-8 bg-navy/50 border border-border-dim rounded-card overflow-hidden group hover:border-border-bright transition-all duration-300"
          >
            <h3 className="font-display font-bold text-lg text-txt-primary mb-2">Full Mesh</h3>
            <p className="text-txt-muted text-sm mb-8">Every site connects to every other site. Maximum redundancy and lowest inter-site latency.</p>
            <div className="relative h-56 flex items-center justify-center">
              {(() => {
                const nodes = [
                  { x: 0, y: -80, label: "DC-1" },
                  { x: 85, y: -25, label: "DC-2" },
                  { x: 52, y: 65, label: "BR-1" },
                  { x: -52, y: 65, label: "BR-2" },
                  { x: -85, y: -25, label: "BR-3" },
                ];
                const lines: React.ReactNode[] = [];
                for (let a = 0; a < nodes.length; a++) {
                  for (let b = a + 1; b < nodes.length; b++) {
                    lines.push(
                      <line
                        key={`${a}-${b}`}
                        x1={nodes[a].x} y1={nodes[a].y}
                        x2={nodes[b].x} y2={nodes[b].y}
                        stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="4 4"
                      />
                    );
                  }
                }
                return (
                  <>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-120 -100 240 200">
                      {lines}
                    </svg>
                    {nodes.map((node) => (
                      <div
                        key={node.label}
                        className="absolute w-11 h-11 rounded-full bg-elevated border border-accent-cyan/30 flex items-center justify-center"
                        style={{
                          left: `calc(50% + ${node.x}px - 22px)`,
                          top: `calc(50% + ${node.y}px - 22px)`,
                        }}
                      >
                        <span className="text-[8px] font-mono text-accent-cyan">{node.label}</span>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function MplsVpnPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="MPLS"
        titleAccent="VPN"
        description="Private multi-site connectivity with enterprise-grade QoS. Build a secure, high-performance WAN across every branch, data centre and cloud zone."
        badge="Private WAN"
      />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FeatureGrid features={features} columns={3} />
        </div>
      </section>

      <TopologyDiagram />

      <CTABanner
        heading="Design your private network"
        description="Our solution architects will map your topology and deliver a proposal in 48 hours."
        ctaText="Get a Network Design →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
