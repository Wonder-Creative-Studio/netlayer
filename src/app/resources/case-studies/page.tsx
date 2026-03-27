"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const featured = {
  company: "Leading BFSI Enterprise",
  industry: "Banking & Financial Services",
  challenge: "A top-10 Indian bank needed to connect 200+ branches with sub-5ms latency for real-time transaction processing, replacing an aging MPLS network that was costing 3x market rates.",
  solution: "Netlayer deployed a hybrid MPLS + SD-WAN overlay across all branches with dual-homed connectivity at the Mumbai and Delhi data centres, complete with 24/7 NOC monitoring.",
  results: [
    { metric: "60%", label: "Cost Reduction" },
    { metric: "2.1ms", label: "Avg Latency" },
    { metric: "99.99%", label: "Uptime Achieved" },
    { metric: "45 days", label: "Full Deployment" },
  ],
};

const caseStudies = [
  {
    industry: "Healthcare",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    company: "Multi-specialty Hospital Chain",
    challenge: "Needed HIPAA-grade secure connectivity between 15 hospitals for telemedicine and PACS imaging data transfer with zero downtime tolerance.",
    results: [
      { metric: "99.999%", label: "Uptime" },
      { metric: "80%", label: "Faster Imaging" },
    ],
  },
  {
    industry: "Manufacturing",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M20.25 4.5l-9.92 9.92m0 0a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0 0L8.25 9.67M14 3v4.5m3.5-1.5L15 8.5m5 .5H15.5" />
      </svg>
    ),
    company: "Automotive Parts Manufacturer",
    challenge: "Required reliable WAN connectivity between 8 factory floors and HQ for real-time ERP and IoT sensor data, operating in remote industrial zones.",
    results: [
      { metric: "40%", label: "Cost Savings" },
      { metric: "12", label: "Sites Connected" },
    ],
  },
  {
    industry: "E-commerce",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    company: "D2C Fashion Brand",
    challenge: "Scaling from 1 to 5 fulfilment centres across India while maintaining sub-3ms latency to cloud-hosted inventory management and payment gateways.",
    results: [
      { metric: "1.8ms", label: "Avg Latency" },
      { metric: "3x", label: "Throughput Gain" },
    ],
  },
];

export default function CaseStudiesPage() {
  const featRef = useRef<HTMLDivElement>(null);
  const featInView = useInView(featRef, { once: true, margin: "-80px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title="Case"
        titleAccent="Studies"
        description="How enterprises transformed their connectivity. Real stories of network modernisation, cost optimisation, and performance breakthroughs."
        badge="Success Stories"
      />

      {/* Featured Case Study */}
      <section className="section-padding" ref={featRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Featured</span>
            </div>

            <div className="bg-navy/50 border border-border-dim rounded-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Content */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <span className="px-2.5 py-1 rounded-pill text-[10px] font-mono bg-accent-blue/10 text-accent-blue mb-4 inline-block">
                    {featured.industry}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-txt-primary mb-3">
                    {featured.company}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-xs font-mono text-txt-dim uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-sm text-txt-muted leading-relaxed">{featured.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-txt-dim uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-sm text-txt-muted leading-relaxed">{featured.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="bg-deep/50 border-t lg:border-t-0 lg:border-l border-border-dim p-6 sm:p-8 lg:p-10 flex items-center">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    {featured.results.map((r, i) => (
                      <motion.div
                        key={r.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={featInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="text-center"
                      >
                        <p className="font-display font-extrabold text-2xl sm:text-3xl gradient-text">{r.metric}</p>
                        <p className="text-xs text-txt-dim mt-1 font-mono uppercase tracking-wider">{r.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="section-padding" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">More Stories</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-txt-primary">
              Across <span className="gradient-text">industries</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.industry}
                initial={{ opacity: 0, y: 25 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full flex flex-col bg-navy/50 border border-border-dim rounded-card p-6 hover:border-border-bright hover:-translate-y-1 transition-all duration-300">
                  <div className="text-accent-blue mb-4 group-hover:text-accent-cyan transition-colors">{cs.icon}</div>
                  <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider">{cs.industry}</span>
                  <h3 className="font-display font-bold text-base text-txt-primary mt-2 mb-3 group-hover:text-accent-blue-light transition-colors">
                    {cs.company}
                  </h3>
                  <p className="text-sm text-txt-muted leading-relaxed mb-5 flex-1">{cs.challenge}</p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-dim/50">
                    {cs.results.map((r) => (
                      <div key={r.label}>
                        <p className="font-display font-extrabold text-lg gradient-text">{r.metric}</p>
                        <p className="text-[10px] text-txt-dim font-mono uppercase tracking-wider">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want similar results?"
        description="Talk to our solutions team about transforming your network infrastructure."
        ctaText="Get in Touch &rarr;"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
