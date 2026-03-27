"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const services = [
  { name: "Internet Leased Line", status: "Operational", uptime: "99.99%", bars: [1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "MPLS VPN", status: "Operational", uptime: "99.98%", bars: [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "SD-WAN Overlay", status: "Operational", uptime: "99.97%", bars: [1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "Managed DNS", status: "Operational", uptime: "100%", bars: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "Customer Portal", status: "Operational", uptime: "99.95%", bars: [1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1] },
  { name: "REST API", status: "Operational", uptime: "99.99%", bars: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "Billing System", status: "Operational", uptime: "99.99%", bars: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "Support & Ticketing", status: "Operational", uptime: "99.98%", bars: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1] },
];

const incidents = [
  { title: "Elevated latency on Mumbai PoP", date: "Mar 12, 2026", duration: "42 min", impact: "Minor", status: "Resolved", description: "Brief latency spike affecting Mumbai region circuits. Root cause: upstream provider maintenance." },
  { title: "Portal login intermittent failures", date: "Feb 28, 2026", duration: "18 min", impact: "Minor", status: "Resolved", description: "Authentication service experienced brief timeout. Automatic failover to backup resolved the issue." },
  { title: "DNS resolution delay", date: "Feb 15, 2026", duration: "8 min", impact: "Minimal", status: "Resolved", description: "Managed DNS experienced brief delays in resolution. Resolved by clearing cache and restarting resolvers." },
  { title: "Scheduled maintenance — Backbone upgrade", date: "Jan 30, 2026", duration: "4 hrs", impact: "Planned", status: "Completed", description: "Backbone capacity upgrade from 10G to 40G on Delhi-Mumbai corridor. Zero downtime achieved." },
];

export default function NetworkStatusPage() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerInView = useInView(bannerRef, { once: true, margin: "-80px" });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const incidentRef = useRef<HTMLDivElement>(null);
  const incidentInView = useInView(incidentRef, { once: true, margin: "-80px" });
  const subRef = useRef<HTMLDivElement>(null);
  const subInView = useInView(subRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Platform"
        title="Network"
        titleAccent="Status"
        description="Live infrastructure health at a glance. Real-time monitoring across all Netlayer services and points of presence."
        badge="Live Status"
      />

      {/* Pulsing operational banner */}
      <section className="py-8" ref={bannerRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={bannerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative bg-status-up/[0.06] border border-status-up/20 rounded-2xl p-8 sm:p-10 text-center overflow-hidden"
          >
            {/* Animated pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 rounded-full border border-status-up/10 animate-ping" style={{ animationDuration: "3s" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-status-up/5 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
            </div>

            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-status-up/30 animate-ping" />
                <span className="relative block w-5 h-5 rounded-full bg-status-up shadow-lg shadow-status-up/40" />
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-status-up">All Systems Operational</h2>
              <p className="text-txt-dim text-sm font-mono">Last updated: just now</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service rows with sparkline bars */}
      <section className="py-12 lg:py-20" ref={servicesRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Service Health</span>
          </div>

          <div className="space-y-[2px] bg-navy/30 border border-border-dim rounded-2xl overflow-hidden">
            {services.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center justify-between px-6 py-4 bg-void/40 hover:bg-elevated/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-up/40" style={{ animationDuration: "2s" }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status-up" />
                  </span>
                  <span className="text-sm text-txt-secondary truncate">{svc.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-txt-dim hidden sm:block">{svc.uptime}</span>
                  {/* 30-day bar chart */}
                  <div className="hidden md:flex items-end gap-[2px] h-5 w-[120px]">
                    {svc.bars.map((v, j) => (
                      <div key={j} className={`flex-1 rounded-[1px] transition-colors ${v === 1 ? "bg-status-up/50 hover:bg-status-up" : "bg-status-warn/60 hover:bg-status-warn"}`} style={{ height: `${v * 100}%` }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-status-up hidden sm:block">{svc.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident timeline */}
      <section className="py-12 lg:py-20" ref={incidentRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Incident History</span>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-border-dim" />

            <div className="space-y-8">
              {incidents.map((inc, i) => {
                const impactColors: Record<string, string> = {
                  Minor: "bg-status-warn/10 text-status-warn border-status-warn/20",
                  Minimal: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
                  Planned: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
                };
                return (
                  <motion.div
                    key={inc.title}
                    initial={{ opacity: 0, x: -15 }}
                    animate={incidentInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[12px] top-1.5 w-4 h-4 rounded-full bg-void border-2 border-status-up z-10" />
                    <div className="bg-navy/40 border border-border-dim rounded-xl p-5 hover:border-border-mid transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-sm text-txt-primary">{inc.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${impactColors[inc.impact] || "bg-elevated text-txt-dim border-border-dim"}`}>{inc.impact}</span>
                          <span className="text-[10px] font-mono text-status-up">{inc.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-txt-muted leading-relaxed mb-2">{inc.description}</p>
                      <div className="flex items-center gap-4 text-[10px] font-mono text-txt-dim">
                        <span>{inc.date}</span>
                        <span>Duration: {inc.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe card */}
      <section className="py-12 lg:py-20" ref={subRef}>
        <div className="max-w-xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={subInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-navy/50 border border-border-dim rounded-2xl p-8 text-center"
          >
            <svg className="w-10 h-10 mx-auto mb-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
            <h3 className="font-display font-bold text-lg text-txt-primary mb-2">Subscribe to Updates</h3>
            <p className="text-sm text-txt-muted mb-6">Get notified of any service disruptions via email or webhook.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-4 py-3 bg-deep border border-border-dim rounded-xl text-sm text-txt-secondary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue/50 transition-colors"
              />
              <button className="px-6 py-3 bg-accent-blue text-void font-semibold rounded-xl text-sm hover:bg-accent-blue-light transition-all">Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Need details on an incident?"
        description="Our NOC team is available 24/7 to answer questions about service health."
        ctaText="Contact NOC →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
