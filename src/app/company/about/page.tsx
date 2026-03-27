"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const timeline = [
  { year: "2018", title: "Founded", desc: "Netlayer was born from a simple idea: enterprises deserve transparent, reliable connectivity they can actually control." },
  { year: "2020", title: "National Backbone", desc: "Expanded fiber backbone across 12 cities with redundant ring topology and carrier-neutral DC presence." },
  { year: "2022", title: "500+ Customers", desc: "Crossed 500 enterprise customers, launched managed SD-WAN, and opened 24/7 NOC operations." },
  { year: "2024", title: "Platform Launch", desc: "Launched the Netlayer Platform with real-time observability, self-service provisioning, and API-first management." },
  { year: "2025", title: "40G Backbone", desc: "Upgraded backbone to 40 Gbps capacity, expanded to 50+ PoPs, and launched partner ecosystem." },
];

const values = [
  { num: "01", title: "Reliability", desc: "We engineer for five nines. Every circuit, every path, every failover is designed to keep your business running.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { num: "02", title: "Transparency", desc: "No hidden costs, no opaque SLAs. You see exactly what you get -- real-time metrics, honest billing, and clear communication.", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { num: "03", title: "Innovation", desc: "We invest in R&D to stay ahead of traffic growth, security threats, and evolving enterprise connectivity needs.", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
  { num: "04", title: "Customer-First", desc: "Every decision starts with the customer. Dedicated account teams, proactive support, and infrastructure that adapts.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
];

const team = [
  { name: "Vikram Rao", title: "Co-founder & CEO", initials: "VR", gradient: "from-accent-blue to-accent-cyan" },
  { name: "Ananya Iyer", title: "Co-founder & CTO", initials: "AI", gradient: "from-accent-cyan to-status-up" },
  { name: "Rajesh Patel", title: "VP Engineering", initials: "RP", gradient: "from-status-up to-accent-blue" },
  { name: "Sneha Nair", title: "VP Operations", initials: "SN", gradient: "from-accent-blue-dark to-accent-blue-light" },
];

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const tlRef = useRef<HTMLDivElement>(null);
  const tlInView = useInView(tlRef, { once: true, margin: "-80px" });
  const valRef = useRef<HTMLDivElement>(null);
  const valInView = useInView(valRef, { once: true, margin: "-80px" });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="About Netlayer"
        title="The enterprise connectivity company that gives you"
        titleAccent="control."
        description="We build the network infrastructure that enterprises depend on. Transparent, resilient, and designed for the way modern businesses operate."
      />

      {/* Mission — full-width quote */}
      <section className="py-16 lg:py-24" ref={missionRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative pl-8 lg:pl-12"
          >
            {/* Gradient left border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-blue-dark" />

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Our Mission</span>
            </div>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-txt-primary leading-snug">
              To give every enterprise in India{" "}
              <span className="gradient-text">complete visibility and control</span>{" "}
              over their connectivity infrastructure.
            </p>
            <p className="text-txt-muted text-base sm:text-lg mt-6 leading-relaxed max-w-3xl">
              We believe that network infrastructure should be as observable, programmable, and transparent as any other part of the modern tech stack. That conviction drives everything we build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline — horizontal with alternating cards */}
      <section className="py-16 lg:py-24 overflow-hidden" ref={tlRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tlInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Our Journey</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              From startup to <span className="gradient-text">national scale</span>
            </h2>
          </motion.div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-[2px] bg-border-dim -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
              {timeline.map((item, i) => {
                const isAbove = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: isAbove ? -30 : 30 }}
                    animate={tlInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className={`relative flex flex-col ${isAbove ? "md:flex-col" : "md:flex-col-reverse"}`}
                  >
                    {/* Card */}
                    <div className={`bg-navy/50 border border-border-dim rounded-xl p-4 hover:border-accent-blue/30 transition-all duration-300 ${isAbove ? "md:mb-8" : "md:mt-8"}`}>
                      <span className="font-mono text-sm text-accent-blue font-bold">{item.year}</span>
                      <h3 className="font-display font-bold text-base text-txt-primary mt-1">{item.title}</h3>
                      <p className="text-txt-muted text-xs leading-relaxed mt-1">{item.desc}</p>
                    </div>

                    {/* Dot on line */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-void border-2 border-accent-blue" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values — 2x2 with numbered cards */}
      <section className="py-16 lg:py-24" ref={valRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Our Values</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              What we <span className="gradient-text">stand for</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                animate={valInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 bg-navy/50 border border-border-dim rounded-2xl hover:border-accent-blue/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-blue/5 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="font-display font-extrabold text-4xl text-border-dim group-hover:text-accent-blue/30 transition-colors duration-500">{v.num}</span>
                  <div className="flex-1">
                    <div className="w-10 h-10 rounded-xl bg-elevated/80 border border-accent-blue/20 flex items-center justify-center mb-4 text-accent-blue group-hover:text-accent-cyan group-hover:border-accent-blue/40 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={v.icon} /></svg>
                    </div>
                    <h3 className="font-display font-bold text-lg text-txt-primary mb-2 group-hover:text-accent-blue-light transition-colors">{v.title}</h3>
                    <p className="text-txt-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24" ref={teamRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Our Team</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              The people behind the <span className="gradient-text">network</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 25 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group text-center p-8 bg-navy/50 border border-border-dim rounded-2xl hover:border-border-bright transition-all duration-300"
              >
                {/* Gradient avatar */}
                <div className={`w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <span className="font-display font-bold text-xl text-void">{m.initials}</span>
                </div>
                <h3 className="font-display font-bold text-base text-txt-primary mb-1">{m.name}</h3>
                <p className="text-txt-dim text-sm mb-3">{m.title}</p>
                {/* LinkedIn icon */}
                <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-elevated/60 border border-border-dim text-txt-dim hover:text-accent-blue hover:border-accent-blue/30 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want to learn more?"
        description="Get in touch with our team to discuss how Netlayer can power your business."
        ctaText="Contact Us →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
