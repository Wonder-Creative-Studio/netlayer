"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTABanner from "@/components/CTABanner";

const features = [
  {
    title: "Dedicated Bandwidth",
    description:
      "Guaranteed throughput with no contention from other users. Your bandwidth is exclusively reserved end-to-end.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <path d="M14 8v6l4 2" />
        <path d="M4 14h3M21 14h3" />
      </svg>
    ),
  },
  {
    title: "Symmetric Upload/Download",
    description:
      "Equal upload and download speeds ensure smooth bi-directional data flow for VoIP, video conferencing and cloud apps.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v20M8 8l6-4 6 4M8 20l6 4 6-4" />
      </svg>
    ),
  },
  {
    title: "99.9% SLA",
    description:
      "Carrier-grade uptime backed by contractual SLAs with proactive monitoring and service credits.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3l3.5 7 7.5 1-5.5 5 1.5 7.5L14 20l-7 3.5 1.5-7.5L3 11l7.5-1z" />
      </svg>
    ),
  },
  {
    title: "24/7 NOC Support",
    description:
      "Round-the-clock Network Operations Centre with dedicated engineers monitoring your circuit in real time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="20" height="14" rx="2" />
        <path d="M10 24h8M14 20v4" />
        <circle cx="14" cy="13" r="3" />
      </svg>
    ),
  },
  {
    title: "Scalable (100Mbps–10Gbps)",
    description:
      "Start at 100 Mbps and scale seamlessly to 10 Gbps without replacing hardware or re-provisioning circuits.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 24l6-8 4 4 6-10 4 6" />
        <path d="M20 6h4v4" />
      </svg>
    ),
  },
  {
    title: "Last Mile Fiber",
    description:
      "End-to-end fiber connectivity from our backbone to your premises, eliminating copper bottlenecks.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14h6l2-4 4 8 2-4h6" />
      </svg>
    ),
  },
];

const tiers = [
  { bandwidth: "100 Mbps", upload: "100 Mbps", sla: "99.9%", ideal: "Small offices, branches" },
  { bandwidth: "250 Mbps", upload: "250 Mbps", sla: "99.9%", ideal: "Mid-size enterprise" },
  { bandwidth: "500 Mbps", upload: "500 Mbps", sla: "99.95%", ideal: "Data-heavy operations" },
  { bandwidth: "1 Gbps", upload: "1 Gbps", sla: "99.95%", ideal: "Large enterprise, DC" },
  { bandwidth: "10 Gbps", upload: "10 Gbps", sla: "99.99%", ideal: "Hyperscale, CDN PoPs" },
];

const useCases = [
  {
    title: "Enterprise HQ",
    description: "Central office connectivity for large organisations needing predictable, dedicated performance for mission-critical applications.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M10 10h4M18 10h4M10 16h4M18 16h4M10 22h12" />
      </svg>
    ),
  },
  {
    title: "Data Centre Interconnect",
    description: "High-capacity, low-latency links between data centres for replication, backup and disaster recovery workflows.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="10" height="8" rx="1" />
        <rect x="18" y="6" width="10" height="8" rx="1" />
        <rect x="4" y="18" width="10" height="8" rx="1" />
        <rect x="18" y="18" width="10" height="8" rx="1" />
        <path d="M14 10h4M14 22h4M9 14v4M23 14v4" />
      </svg>
    ),
  },
  {
    title: "SaaS & Cloud Workloads",
    description: "Symmetric bandwidth eliminates upload bottlenecks for cloud-first businesses running SaaS, VoIP and video.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22a6 6 0 0 1-.5-12A8 8 0 0 1 24 12a5 5 0 0 1 0 10H8z" />
        <path d="M12 18l4-4 4 4" />
      </svg>
    ),
  },
];

function SpecsTable() {
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
              Bandwidth Tiers
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Choose your <span className="gradient-text">capacity</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border-mid">
                <th className="text-left py-4 px-4 text-xs font-mono text-txt-dim uppercase tracking-wider">Bandwidth</th>
                <th className="text-left py-4 px-4 text-xs font-mono text-txt-dim uppercase tracking-wider">Upload</th>
                <th className="text-left py-4 px-4 text-xs font-mono text-txt-dim uppercase tracking-wider">SLA</th>
                <th className="text-left py-4 px-4 text-xs font-mono text-txt-dim uppercase tracking-wider">Ideal For</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <motion.tr
                  key={tier.bandwidth}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  className="border-b border-border-dim hover:bg-navy/40 transition-colors"
                >
                  <td className="py-4 px-4 font-mono text-sm text-accent-blue font-semibold">{tier.bandwidth}</td>
                  <td className="py-4 px-4 font-mono text-sm text-txt-secondary">{tier.upload}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-pill border border-border-mid bg-elevated/40 text-[10px] font-mono uppercase text-status-up">
                      {tier.sla}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-txt-muted">{tier.ideal}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-accent-blue/[0.02] rounded-full blur-[120px]" />
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
              Use Cases
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Built for <span className="gradient-text">demanding workloads</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="relative p-8 bg-navy/50 border border-border-dim rounded-card hover:border-border-bright transition-all duration-300 group"
            >
              <div className="text-accent-blue mb-5 group-hover:text-accent-cyan transition-colors">{uc.icon}</div>
              <h3 className="font-display font-bold text-lg text-txt-primary mb-3">{uc.title}</h3>
              <p className="text-txt-muted text-sm leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function InternetLeasedLinePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Internet"
        titleAccent="Leased Line"
        description="Dedicated symmetric bandwidth that's yours and yours alone. Enterprise-grade connectivity with guaranteed performance, zero contention and end-to-end SLA."
        badge="Dedicated Circuit"
      />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FeatureGrid features={features} columns={3} />
        </div>
      </section>

      <SpecsTable />
      <UseCases />

      <CTABanner
        heading="Get a dedicated leased line quote"
        description="We'll survey your site and deliver a proposal within 48 hours."
        ctaText="Request a Quote →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
