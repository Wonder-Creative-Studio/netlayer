"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const whyCards = [
  {
    stat: "7 Days",
    title: "Rapid Deployment",
    desc: "Go live in as few as 7 working days. We handle feasibility, provisioning, and installation end-to-end.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    stat: "60%",
    title: "Cost Savings",
    desc: "Enterprise-grade connectivity at SME-friendly pricing. No hidden costs, no bandwidth sharing, no surprises.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    stat: "99.9%",
    title: "Uptime Guarantee",
    desc: "SLA-backed reliability with proactive monitoring and rapid incident response from our dedicated NOC.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const tiers = [
  {
    name: "Starter",
    bandwidth: "10 Mbps",
    price: "₹15,000/mo",
    features: ["Symmetric ILL", "99.5% uptime SLA", "Portal access", "Email support", "Monthly billing"],
    highlighted: false,
  },
  {
    name: "Growth",
    bandwidth: "50 Mbps",
    price: "₹45,000/mo",
    features: ["Symmetric ILL", "99.9% uptime SLA", "Portal + API access", "Priority support", "Flexible billing", "Cloud peering"],
    highlighted: true,
  },
  {
    name: "Scale",
    bandwidth: "100+ Mbps",
    price: "Custom",
    features: ["Dedicated bandwidth", "99.95% uptime SLA", "Full API suite", "Named account manager", "Custom terms", "Multi-site ready"],
    highlighted: false,
  },
];

const milestones = [
  { speed: "10 Mbps", label: "Launch", x: 10, y: 75 },
  { speed: "50 Mbps", label: "Traction", x: 35, y: 55 },
  { speed: "100 Mbps", label: "Growth", x: 60, y: 35 },
  { speed: "1 Gbps", label: "Scale", x: 85, y: 15 },
];

export default function SmeSolutions() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  const tiersRef = useRef<HTMLDivElement>(null);
  const tiersInView = useInView(tiersRef, { once: true, margin: "-80px" });
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyInView = useInView(journeyRef, { once: true, margin: "-80px" });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="SME & Startup Solutions"
        title="Scale-ready connectivity that grows"
        titleAccent="with you."
        description="Affordable, enterprise-grade Internet Leased Lines with flexible contracts and rapid deployment. Built for ambitious businesses that refuse to compromise."
        badge="Scale-Ready"
      />

      {/* Why SMEs Choose Netlayer — staggered cards */}
      <section className="section-padding" ref={cardsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Why Us</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-14">
            Why SMEs choose <span className="gradient-text">Netlayer</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyCards.map((card, i) => {
              const offsets = ["md:mt-0", "md:mt-12", "md:mt-6"];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.18 }}
                  className={`relative ${offsets[i]}`}
                >
                  <div className="relative p-8 lg:p-10 rounded-card border border-[var(--border-dim)] bg-navy/50 hover:border-accent-blue/30 transition-all duration-500 group overflow-hidden">
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-elevated/60 border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-6">
                        {card.icon}
                      </div>
                      <span className="font-display font-extrabold text-3xl lg:text-4xl text-accent-blue block mb-3">{card.stat}</span>
                      <h3 className="font-display font-bold text-lg text-txt-primary mb-3">{card.title}</h3>
                      <p className="text-sm text-txt-muted leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing — overlapping card deck */}
      <section className="section-padding relative" ref={tiersRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-blue/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Plans</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-14">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>

          <div className="relative flex flex-col items-center gap-0">
            {tiers.map((tier, i) => {
              const zIndex = tier.highlighted ? 30 : 20 - i * 5;
              const marginTop = i === 0 ? 0 : -16;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={tiersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  style={{ zIndex, marginTop: i > 0 ? marginTop : 0 }}
                  className={`w-full max-w-2xl relative rounded-card border p-8 lg:p-10 transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-elevated/90 border-accent-blue/40 shadow-[0_0_40px_-10px_var(--accent-blue)] scale-[1.03]"
                      : "bg-navy/60 border-[var(--border-dim)] hover:border-[var(--border-mid)]"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 right-8">
                      <span className="px-4 py-1.5 text-xs font-mono bg-accent-blue text-void rounded-pill font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-txt-primary">{tier.name}</h3>
                      <p className="text-txt-dim text-sm font-mono">{tier.bandwidth}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-extrabold text-2xl text-txt-primary">{tier.price}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {tier.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-surface/50 border border-[var(--border-dim)] text-xs text-txt-muted">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-status-up">
                          <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href="/contact"
                      className={`inline-block px-6 py-2.5 rounded-button font-semibold text-sm transition-all duration-300 ${
                        tier.highlighted
                          ? "bg-accent-blue text-void hover:bg-accent-blue-light hover:shadow-lg hover:shadow-accent-blue/20"
                          : "border border-[var(--border-mid)] text-txt-secondary hover:border-accent-blue/40 hover:text-txt-primary"
                      }`}
                    >
                      {tier.highlighted ? "Get Started →" : "Learn More →"}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Growth Journey — SVG path visualization */}
      <section className="section-padding relative" ref={journeyRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Journey</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-14">
            Your growth <span className="gradient-text">journey</span>
          </h2>

          <div className="relative w-full aspect-[3/1] min-h-[250px]">
            <svg viewBox="0 0 100 90" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Curved path */}
              <motion.path
                d="M 8 78 C 25 78, 30 58, 35 55 C 40 52, 55 38, 60 35 C 65 32, 80 18, 88 15"
                stroke="url(#journey-grad)"
                strokeWidth="0.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={journeyInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Glow path */}
              <motion.path
                d="M 8 78 C 25 78, 30 58, 35 55 C 40 52, 55 38, 60 35 C 65 32, 80 18, 88 15"
                stroke="url(#journey-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.15"
                initial={{ pathLength: 0 }}
                animate={journeyInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="journey-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent-cyan)" />
                </linearGradient>
              </defs>

              {/* Milestones */}
              {milestones.map((m, i) => {
                const circleRadius = 1.5 + i * 1.2;
                return (
                  <motion.g
                    key={m.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={journeyInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.4 }}
                  >
                    <circle cx={m.x} cy={m.y} r={circleRadius} fill="var(--accent-blue)" opacity="0.2" />
                    <circle cx={m.x} cy={m.y} r={circleRadius * 0.6} fill="var(--accent-blue)" />
                    {/* Pulse */}
                    <motion.circle
                      cx={m.x} cy={m.y} r={circleRadius}
                      fill="none" stroke="var(--accent-blue)" strokeWidth="0.3"
                      animate={{ r: [circleRadius, circleRadius + 3], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <text x={m.x} y={m.y - circleRadius - 3} textAnchor="middle" fill="var(--txt-primary)" fontSize="3" fontFamily="var(--font-display)" fontWeight="700">
                      {m.speed}
                    </text>
                    <text x={m.x} y={m.y + circleRadius + 5} textAnchor="middle" fill="var(--txt-dim)" fontSize="2.5" fontFamily="var(--font-mono)">
                      {m.label}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding" ref={quoteRef}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative p-10 lg:p-16 rounded-card border border-[var(--border-dim)] bg-navy/40 text-center"
          >
            {/* Oversized quote marks */}
            <span className="absolute top-4 left-6 font-display text-[120px] leading-none text-accent-blue/[0.08] select-none">&ldquo;</span>
            <span className="absolute bottom-4 right-6 font-display text-[120px] leading-none text-accent-blue/[0.08] select-none">&rdquo;</span>

            <div className="relative">
              <p className="font-display text-lg lg:text-xl text-txt-primary leading-relaxed mb-8 max-w-2xl mx-auto">
                Netlayer gave us enterprise-grade connectivity at a price that didn&apos;t break our seed budget. We scaled from 10 Mbps to 100 Mbps without a single migration headache.
              </p>
              <div>
                <span className="font-display font-bold text-txt-primary block">Arjun Mehta</span>
                <span className="text-sm text-txt-dim font-mono">CTO, FinStack Technologies</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Not sure which plan fits?"
        description="Our team will recommend the right bandwidth and plan based on your needs."
        ctaText="Talk to Sales →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
