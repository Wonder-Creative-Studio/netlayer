"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const partnerTiers = [
  {
    id: "tech",
    title: "Technology Partners",
    subtitle: "Infrastructure and hardware vendors powering our backbone",
    partners: [
      { name: "Cisco", desc: "Core routing and switching across all PoPs" },
      { name: "Juniper", desc: "Edge routing and security appliances" },
      { name: "Nokia", desc: "Optical transport and IP backbone" },
      { name: "Ciena", desc: "WDM and coherent optics platform" },
      { name: "Fortinet", desc: "Next-gen firewall and SASE integration" },
      { name: "Palo Alto", desc: "Advanced threat prevention and SD-WAN" },
    ],
  },
  {
    id: "channel",
    title: "Channel Partners",
    subtitle: "Resellers and integrators extending our reach nationwide",
    partners: [
      { name: "NetConnect", desc: "Pan-India enterprise reseller network" },
      { name: "CloudBridge SI", desc: "Cloud migration and hybrid connectivity" },
      { name: "InfraVision", desc: "Data center and colocation partnerships" },
      { name: "SecureNet", desc: "Managed security services overlay" },
      { name: "TechStar", desc: "SMB-focused connectivity solutions" },
      { name: "DataPath", desc: "Multi-cloud networking specialist" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Partners",
    subtitle: "Hyperscale providers with direct peering and optimized routes",
    partners: [
      { name: "AWS", desc: "Direct Connect with multiple locations" },
      { name: "Microsoft Azure", desc: "ExpressRoute peering across India" },
      { name: "Google Cloud", desc: "Partner Interconnect availability" },
      { name: "Oracle Cloud", desc: "FastConnect direct peering" },
      { name: "IBM Cloud", desc: "Direct Link connectivity" },
      { name: "DigitalOcean", desc: "Private networking integration" },
    ],
  },
];

const becomePartnerBenefits = [
  { num: "01", title: "Revenue Share", desc: "Competitive commission structure with recurring revenue on every deal you bring." },
  { num: "02", title: "Technical Enablement", desc: "Pre-sales engineering support, training programs, and certification paths." },
  { num: "03", title: "Co-Marketing", desc: "Joint go-to-market campaigns, events, co-branded content, and lead sharing." },
  { num: "04", title: "Dedicated Support", desc: "Partner account manager with priority escalation and SLA commitments." },
];

export default function PartnersPage() {
  const [activeTier, setActiveTier] = useState("tech");
  const tiersRef = useRef<HTMLDivElement>(null);
  const tiersInView = useInView(tiersRef, { once: true, margin: "-80px" });
  const benefitRef = useRef<HTMLDivElement>(null);
  const benefitInView = useInView(benefitRef, { once: true, margin: "-80px" });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const activeTierData = partnerTiers.find((t) => t.id === activeTier)!;

  return (
    <PageShell>
      <PageHero
        eyebrow="Strategic Partners"
        title="We work with the best to deliver"
        titleAccent="the best."
        description="Netlayer's partner ecosystem brings together leading technology vendors, channel partners, and cloud providers to deliver world-class connectivity solutions."
        badge="Partner Ecosystem"
      />

      {/* Horizontal accordion — 3 tiers */}
      <section className="py-16 lg:py-24" ref={tiersRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tiersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Ecosystem</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              Our partner <span className="gradient-text">ecosystem</span>
            </h2>
          </motion.div>

          {/* Tier tabs + content */}
          <div className="flex flex-col lg:flex-row gap-4 min-h-[400px]">
            {/* Accordion tabs */}
            <div className="flex lg:flex-col gap-2 shrink-0 lg:w-64">
              {partnerTiers.map((tier) => {
                const isActive = activeTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setActiveTier(tier.id)}
                    className={`text-left px-5 py-4 rounded-xl border transition-all duration-300 flex-1 lg:flex-none ${
                      isActive
                        ? "bg-accent-blue/[0.06] border-accent-blue/30 shadow-lg shadow-accent-blue/5"
                        : "bg-navy/30 border-border-dim hover:border-border-mid"
                    }`}
                  >
                    <h3 className={`font-display font-bold text-sm ${isActive ? "text-accent-blue" : "text-txt-secondary"} transition-colors`}>
                      {tier.title}
                    </h3>
                    <p className="text-[10px] text-txt-dim mt-0.5 hidden lg:block">{tier.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* Expanded content */}
            <div className="flex-1 bg-navy/20 border border-border-dim rounded-2xl p-6 sm:p-8 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTier}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display font-bold text-xl text-txt-primary mb-1">{activeTierData.title}</h3>
                  <p className="text-sm text-txt-muted mb-6">{activeTierData.subtitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeTierData.partners.map((p, i) => (
                      <motion.div
                        key={p.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="group p-4 bg-deep/50 border border-border-dim rounded-xl hover:border-accent-blue/30 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-elevated/80 border border-border-dim flex items-center justify-center mb-3 group-hover:border-accent-blue/30 transition-colors">
                          <span className="font-mono text-xs text-txt-muted font-bold">{p.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-txt-primary group-hover:text-accent-blue-light transition-colors">{p.name}</h4>
                        <p className="text-[11px] text-txt-dim mt-1 leading-relaxed">{p.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner — staggered grid with connecting elements */}
      <section className="py-16 lg:py-24" ref={benefitRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Why Partner With Us</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              Partnership <span className="gradient-text">benefits</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Dotted connecting line */}
            <div className="hidden lg:block absolute left-[28px] top-8 bottom-8 w-0 border-l-2 border-dashed border-border-dim" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {becomePartnerBenefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={benefitInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group flex items-start gap-5"
                >
                  {/* Numbered circle */}
                  <div className="w-14 h-14 shrink-0 rounded-full bg-navy/50 border-2 border-border-dim flex items-center justify-center group-hover:border-accent-blue/50 group-hover:shadow-lg group-hover:shadow-accent-blue/10 transition-all duration-500 relative z-10">
                    <span className="font-mono text-lg font-bold text-txt-dim group-hover:text-accent-blue transition-colors">{b.num}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display font-bold text-lg text-txt-primary mb-1 group-hover:text-accent-blue-light transition-colors">{b.title}</h3>
                    <p className="text-txt-muted text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Program application form */}
      <section className="py-16 lg:py-24" ref={formRef}>
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-navy/50 border border-border-dim rounded-2xl p-8 sm:p-10">
              <div className="text-center mb-8">
                <h3 className="font-display font-extrabold text-2xl text-txt-primary mb-2">Become a Partner</h3>
                <p className="text-sm text-txt-muted">Join the Netlayer partner ecosystem and grow your business with enterprise connectivity.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-deep border border-border-dim rounded-xl text-sm text-txt-secondary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Partner Type</label>
                  <select className="w-full px-4 py-3 bg-deep border border-border-dim rounded-xl text-sm text-txt-secondary focus:outline-none focus:border-accent-blue/50 transition-colors appearance-none cursor-pointer">
                    <option>Technology Partner</option>
                    <option>Channel Partner</option>
                    <option>Cloud Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your company and how you'd like to partner..."
                    className="w-full px-4 py-3 bg-deep border border-border-dim rounded-xl text-sm text-txt-secondary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                  />
                </div>
                <button className="w-full px-6 py-3.5 bg-accent-blue text-void font-semibold rounded-xl text-sm hover:bg-accent-blue-light hover:shadow-xl hover:shadow-accent-blue/20 transition-all">
                  Submit Application
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Questions about partnerships?"
        description="Our partnerships team is ready to discuss how we can work together."
        ctaText="Contact Partnerships Team →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
