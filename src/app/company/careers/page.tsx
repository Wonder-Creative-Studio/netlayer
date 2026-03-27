"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const cultureCards = [
  { title: "Remote-First", desc: "Work from anywhere in India. We care about outcomes, not office seats.", size: "row-span-2" },
  { title: "Ownership Culture", desc: "You own your domain. Ship features, make decisions, see your impact directly.", size: "" },
  { title: "Continuous Learning", desc: "Annual learning budget, conference sponsorships, and internal tech talks.", size: "" },
];

const departments = ["All", "Engineering", "Operations", "Sales", "Product", "Customer Success"];

const positions = [
  { title: "Senior Network Engineer", dept: "Engineering", loc: "Mumbai / Remote", type: "Full-time", desc: "Design and implement network architecture across our backbone. Experience with BGP, MPLS, and SR required. You will work directly with the NOC team to ensure 99.99% uptime." },
  { title: "Platform Engineer (Go/K8s)", dept: "Engineering", loc: "Bangalore / Remote", type: "Full-time", desc: "Build the platform that powers our customer portal and API. Deep knowledge of Go, Kubernetes, and distributed systems." },
  { title: "NOC Analyst", dept: "Operations", loc: "Mumbai", type: "Full-time", desc: "Monitor and manage network operations 24/7. Triage incidents, coordinate with field teams, and ensure SLA compliance." },
  { title: "Enterprise Account Executive", dept: "Sales", loc: "Delhi / Mumbai", type: "Full-time", desc: "Drive enterprise sales across India. Build relationships with CIOs and IT leaders. Quota-carrying role with competitive comp." },
  { title: "Product Designer", dept: "Product", loc: "Remote", type: "Full-time", desc: "Design intuitive interfaces for complex network management tools. Work closely with engineering to ship pixel-perfect experiences." },
  { title: "Customer Success Manager", dept: "Customer Success", loc: "Bangalore / Remote", type: "Full-time", desc: "Be the trusted advisor for our enterprise customers. Drive adoption, retention, and expansion across your portfolio." },
];

const deptColors: Record<string, string> = {
  Engineering: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  Operations: "bg-status-warn/10 text-status-warn border-status-warn/20",
  Sales: "bg-status-up/10 text-status-up border-status-up/20",
  Product: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  "Customer Success": "bg-accent-blue-light/10 text-accent-blue-light border-accent-blue-light/20",
};

const benefits = [
  { title: "Health Insurance", desc: "Comprehensive medical coverage for you and your family.", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
  { title: "Learning Budget", desc: "Annual allowance for courses, certifications, and conferences.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" },
  { title: "Flexible Hours", desc: "Core collaboration hours with flexibility around your schedule.", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Equipment Stipend", desc: "Top-tier hardware and home office setup allowance.", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
  { title: "Stock Options", desc: "ESOPs that let you share in the company's growth.", icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" },
  { title: "Wellness Program", desc: "Mental health support, gym memberships, and wellness days.", icon: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" },
];

export default function CareersPage() {
  const [deptFilter, setDeptFilter] = useState("All");
  const [expandedPos, setExpandedPos] = useState<number | null>(null);

  const cultureRef = useRef<HTMLDivElement>(null);
  const cultureInView = useInView(cultureRef, { once: true, margin: "-80px" });
  const posRef = useRef<HTMLDivElement>(null);
  const posInView = useInView(posRef, { once: true, margin: "-80px" });
  const benefitRef = useRef<HTMLDivElement>(null);
  const benefitInView = useInView(benefitRef, { once: true, margin: "-80px" });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

  const filteredPositions = deptFilter === "All" ? positions : positions.filter((p) => p.dept === deptFilter);

  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Build the infrastructure that powers"
        titleAccent="India's enterprises."
        description="Join a team of engineers, operators, and builders who are redefining how businesses connect. We're growing fast and looking for people who want to make an outsized impact."
        badge="Join Us"
      />

      {/* Culture — asymmetric layout */}
      <section className="py-16 lg:py-24" ref={cultureRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cultureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Culture</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              How we <span className="gradient-text">work</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-rows-2">
            {cultureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-2xl border border-border-dim ${card.size} ${i === 0 ? "bg-gradient-to-br from-accent-blue/[0.08] to-navy/50" : "bg-navy/50"}`}
              >
                <div className="p-8 h-full flex flex-col justify-end">
                  {i === 0 && (
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent-blue/5 rounded-full blur-[60px]" />
                  )}
                  <h3 className="font-display font-bold text-xl text-txt-primary mb-2 relative">{card.title}</h3>
                  <p className="text-txt-muted text-sm leading-relaxed relative">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions — filterable expandable */}
      <section className="py-16 lg:py-24 bg-deep/20" ref={posRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={posInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Open Positions</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-6">
              Find your <span className="gradient-text">role</span>
            </h2>

            {/* Department filter pills */}
            <div className="flex flex-wrap gap-2">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setDeptFilter(d)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                    deptFilter === d ? "bg-accent-blue text-void" : "bg-navy/50 text-txt-dim border border-border-dim hover:border-border-mid"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-3">
            {filteredPositions.map((pos, i) => {
              const isExpanded = expandedPos === i;
              return (
                <motion.div
                  key={pos.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={posInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="border border-border-dim rounded-xl overflow-hidden bg-navy/30"
                >
                  <button
                    onClick={() => setExpandedPos(isExpanded ? null : i)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-elevated/10 transition-colors text-left gap-3"
                  >
                    <div>
                      <h3 className="font-display font-bold text-base text-txt-primary">{pos.title}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${deptColors[pos.dept] || "bg-elevated text-txt-dim border-border-dim"}`}>{pos.dept}</span>
                        <span className="text-xs text-txt-dim">{pos.loc}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] font-mono text-txt-dim border border-border-dim px-2.5 py-1 rounded-full">{pos.type}</span>
                      <svg className={`w-4 h-4 text-txt-dim transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border-dim p-5">
                          <p className="text-sm text-txt-muted leading-relaxed mb-5">{pos.desc}</p>
                          <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-void font-semibold rounded-xl text-sm hover:bg-accent-blue-light transition-all">
                            Apply Now
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {filteredPositions.length === 0 && (
              <div className="p-10 text-center text-txt-dim text-sm border border-border-dim rounded-xl bg-navy/20">No open positions in this department right now.</div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24" ref={benefitRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Benefits</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              Perks of the <span className="gradient-text">team</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group p-6 bg-navy/50 border border-border-dim rounded-2xl hover:border-accent-blue/30 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-elevated/80 border border-accent-blue/20 flex items-center justify-center mb-4 text-accent-blue group-hover:text-accent-cyan group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={b.icon} /></svg>
                </div>
                <h3 className="font-display font-bold text-base text-txt-primary mb-1">{b.title}</h3>
                <p className="text-txt-muted text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee quote */}
      <section className="py-16 lg:py-24" ref={quoteRef}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <svg className="w-10 h-10 mx-auto mb-6 text-accent-blue/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" /></svg>
            <p className="font-display text-xl sm:text-2xl text-txt-primary leading-relaxed italic mb-6">
              &ldquo;I joined Netlayer because I wanted to build infrastructure that matters. Two years in, I&apos;ve shipped more impactful work here than in my entire previous career.&rdquo;
            </p>
            <div>
              <p className="font-display font-bold text-txt-primary">Meera Krishnan</p>
              <p className="text-sm text-txt-dim">Staff Engineer, Platform Team</p>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Don't see your role?"
        description="Send us your resume and tell us how you want to contribute."
        ctaText="Send Your Resume →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
