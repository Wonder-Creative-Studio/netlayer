"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

/* ─── Media Type Selector with Tab Content ─── */
function MediaSelector() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const media = [
    {
      tab: "Fiber",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14h6l2-4 4 8 2-4h6" />
          <circle cx="4" cy="14" r="1.5" fill="currentColor" />
          <circle cx="24" cy="14" r="1.5" fill="currentColor" />
        </svg>
      ),
      speed: "Up to 100 Gbps",
      range: "Unlimited distance",
      deployment: "4-6 weeks",
      ideal: "Maximum capacity, mission-critical applications, data centre interconnects, long-term infrastructure.",
      diagram: (
        <svg viewBox="0 0 400 80" className="w-full h-20">
          <rect x="10" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-txt-dim" />
          <text x="40" y="44" textAnchor="middle" className="fill-txt-dim text-[8px] font-mono">Building</text>
          {/* Fiber line */}
          <line x1="70" y1="40" x2="280" y2="40" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
            <animate attributeName="stroke-dasharray" values="0,400;400,0" dur="2s" fill="freeze" />
          </line>
          <line x1="85" y1="45" x2="265" y2="45" stroke="currentColor" strokeWidth="1" className="text-accent-blue/30" strokeDasharray="3 3" />
          <text x="175" y="60" textAnchor="middle" className="fill-accent-blue text-[7px] font-mono">SINGLE-MODE FIBER</text>
          <rect x="280" y="15" width="80" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-blue" />
          <text x="320" y="38" textAnchor="middle" className="fill-accent-blue text-[7px] font-mono">Netlayer</text>
          <text x="320" y="48" textAnchor="middle" className="fill-accent-blue text-[7px] font-mono">PoP</text>
        </svg>
      ),
    },
    {
      tab: "Wireless",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17a10 10 0 0 1 14 0" />
          <path d="M10 20a6 6 0 0 1 8 0" />
          <path d="M4 14a14 14 0 0 1 20 0" />
          <circle cx="14" cy="23" r="1.5" fill="currentColor" />
        </svg>
      ),
      speed: "Up to 1 Gbps",
      range: "Up to 10 km",
      deployment: "7-14 days",
      ideal: "Rapid deployment, temporary connectivity, locations where fiber is not feasible, construction sites.",
      diagram: (
        <svg viewBox="0 0 400 80" className="w-full h-20">
          <rect x="10" y="25" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-txt-dim" />
          <text x="40" y="49" textAnchor="middle" className="fill-txt-dim text-[8px] font-mono">Rooftop</text>
          <line x1="40" y1="25" x2="40" y2="12" stroke="currentColor" strokeWidth="1" className="text-txt-dim" />
          <circle cx="40" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-cyan" />
          {/* Wireless signal */}
          <path d="M80,20 Q200,-10 320,20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-cyan" strokeDasharray="4 3">
            <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
          </path>
          <text x="200" y="10" textAnchor="middle" className="fill-accent-cyan text-[7px] font-mono">POINT-TO-POINT</text>
          <rect x="300" y="25" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-cyan" />
          <text x="330" y="42" textAnchor="middle" className="fill-accent-cyan text-[7px] font-mono">Netlayer</text>
          <text x="330" y="52" textAnchor="middle" className="fill-accent-cyan text-[7px] font-mono">Tower</text>
          <line x1="330" y1="25" x2="330" y2="12" stroke="currentColor" strokeWidth="1" className="text-accent-cyan" />
          <circle cx="330" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-cyan" />
        </svg>
      ),
    },
    {
      tab: "Microwave",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 24l6-18h8l6 18" />
          <path d="M8 18h12" />
          <path d="M10 12h8" />
          <circle cx="14" cy="8" r="2" />
        </svg>
      ),
      speed: "Up to 2 Gbps",
      range: "Up to 40 km",
      deployment: "2-4 weeks",
      ideal: "Longer distances, interference-free licensed spectrum, enterprise-grade wireless, rural or hard-to-reach areas.",
      diagram: (
        <svg viewBox="0 0 400 80" className="w-full h-20">
          <polygon points="30,65 40,15 50,65" fill="none" stroke="currentColor" strokeWidth="1" className="text-txt-dim" />
          <text x="40" y="75" textAnchor="middle" className="fill-txt-dim text-[7px] font-mono">Site Tower</text>
          <circle cx="40" cy="13" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-status-warn" />
          {/* Microwave beam */}
          <line x1="55" y1="15" x2="315" y2="15" stroke="currentColor" strokeWidth="2" className="text-status-warn">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </line>
          <text x="185" y="30" textAnchor="middle" className="fill-status-warn text-[7px] font-mono">LICENSED MICROWAVE</text>
          <polygon points="320,65 330,15 340,65" fill="none" stroke="currentColor" strokeWidth="1" className="text-status-warn" />
          <text x="330" y="75" textAnchor="middle" className="fill-status-warn text-[7px] font-mono">Netlayer</text>
          <circle cx="330" cy="13" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-status-warn" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Media Options</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
            Choose your <span className="gradient-text">last mile</span>
          </h2>
        </motion.div>

        {/* Tab Headers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-0"
        >
          {media.map((m, i) => (
            <button
              key={m.tab}
              onClick={() => setActive(i)}
              className={`relative p-5 lg:p-7 rounded-t-card border transition-all duration-300 text-left ${
                active === i
                  ? "bg-navy/70 border-border-bright border-b-transparent z-10"
                  : "bg-deep/40 border-border-dim hover:border-border-mid"
              }`}
            >
              <div className={`mb-3 transition-colors ${active === i ? "text-accent-blue" : "text-txt-dim"}`}>
                {m.icon}
              </div>
              <span className={`font-display font-bold text-lg block ${active === i ? "text-txt-primary" : "text-txt-muted"}`}>
                {m.tab}
              </span>
              <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider">{m.speed}</span>
              {active === i && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-accent-blue rounded-full"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-8 lg:p-10 bg-navy/70 border border-border-bright border-t-0 rounded-b-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Speed", value: media[active].speed },
                    { label: "Range", value: media[active].range },
                    { label: "Deploy", value: media[active].deployment },
                  ].map((s) => (
                    <div key={s.label} className="p-3 bg-deep/60 border border-border-dim rounded-card text-center">
                      <span className="block text-[9px] font-mono text-txt-dim uppercase tracking-wider mb-1">{s.label}</span>
                      <span className="block font-display font-bold text-sm text-txt-primary">{s.value}</span>
                    </div>
                  ))}
                </div>
                <h4 className="font-display font-bold text-sm text-txt-primary mb-2">Ideal Use Case</h4>
                <p className="text-txt-muted text-sm leading-relaxed">{media[active].ideal}</p>
              </div>
              <div className="flex items-center p-6 bg-deep/40 border border-border-dim rounded-card">
                {media[active].diagram}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Vertical Deployment Timeline ─── */
function DeploymentTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      title: "Feasibility",
      desc: "We assess your location, check infrastructure availability, and recommend the best last-mile technology.",
      time: "24-48 hours",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h3V8h2v4h3l-4 4z",
    },
    {
      title: "Site Survey",
      desc: "On-ground engineers survey cable routes, line-of-sight angles, power availability and structural readiness.",
      time: "3-5 days",
      icon: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
    },
    {
      title: "Design",
      desc: "Detailed engineering design covering path calculations, equipment specs, permits and project timeline.",
      time: "1-2 weeks",
      icon: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    },
    {
      title: "Build",
      desc: "Physical infrastructure deployment: fiber trenching, antenna mounting, equipment installation and cabling.",
      time: "1-4 weeks",
      icon: "M22 2L13 11M22 2l-7 20-4-9-9-4 20-7z",
    },
    {
      title: "Test",
      desc: "Comprehensive end-to-end testing: bandwidth validation, latency checks, failover testing and burn-in period.",
      time: "2-3 days",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Handoff",
      desc: "Service goes live with monitoring enabled. Documentation, credentials and support contacts provided.",
      time: "Day 1",
      icon: "M5 3l14 9-14 9V3z",
    },
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[800px] bg-accent-blue/[0.02] rounded-full blur-[150px]" />
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Deployment</span>
            <div className="w-8 h-[1px] bg-accent-blue" />
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-txt-primary">
            From survey to <span className="gradient-text">go-live</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Glowing center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="w-full bg-gradient-to-b from-accent-blue via-accent-blue/50 to-accent-blue/10"
            />
            <div className="absolute inset-0 w-[6px] -left-[2px] bg-accent-blue/10 blur-sm" />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  className={`relative flex items-center gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"}`}>
                    <div className={`p-6 bg-navy/50 border border-border-dim rounded-card hover:border-accent-blue/30 transition-all duration-300 ${isLeft ? "lg:ml-auto" : "lg:mr-auto"} max-w-sm`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                        <div className="w-9 h-9 rounded-full bg-elevated/80 border border-border-mid flex items-center justify-center shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" strokeLinecap="round" strokeLinejoin="round">
                            <path d={step.icon} />
                          </svg>
                        </div>
                        <h3 className="font-display font-bold text-base text-txt-primary">{step.title}</h3>
                      </div>
                      <p className="text-txt-muted text-sm leading-relaxed mb-3">{step.desc}</p>
                      <span className="inline-block px-2.5 py-1 bg-elevated/50 border border-border-mid rounded-pill text-[10px] font-mono text-accent-cyan uppercase tracking-wider">
                        {step.time}
                      </span>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent-blue bg-void z-10 hidden lg:block">
                    <div className="absolute inset-0 rounded-full bg-accent-blue/20 animate-ping" />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Coverage Map Teaser ─── */
function CoverageTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative p-[1px] rounded-card overflow-hidden"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/40 via-accent-cyan/20 to-accent-blue/10 rounded-card" />

          <div className="relative bg-navy/90 backdrop-blur-sm rounded-card p-10 lg:p-14 text-center">
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-card">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "radial-gradient(circle, rgba(56,136,255,0.5) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-elevated/60 border border-accent-blue/20 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 24s8-5.5 8-12a8 8 0 10-16 0c0 6.5 8 12 8 12z" />
                  <circle cx="14" cy="12" r="3" />
                </svg>
              </div>

              <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-txt-primary mb-3">
                Check if we can reach <span className="gradient-text">your location</span>
              </h3>
              <p className="text-txt-muted text-sm lg:text-base mb-8 max-w-md mx-auto">
                Enter your address and we will recommend the fastest, most reliable path to connectivity within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                <div className="flex-1 w-full relative">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-dim">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter your building address..."
                    className="w-full py-3.5 pl-11 pr-4 bg-deep/80 border border-border-mid rounded-button text-sm text-txt-secondary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue/50 transition-colors font-body"
                    readOnly
                  />
                </div>
                <a
                  href="/contact"
                  className="shrink-0 px-6 py-3.5 bg-accent-blue text-void font-semibold rounded-button btn-shine hover:bg-accent-blue-light hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-[1px] transition-all duration-300 text-sm whitespace-nowrap"
                >
                  Check Feasibility
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LastMilePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Last Mile"
        titleAccent="Connectivity"
        description="The critical first step to enterprise-grade connectivity. We bring fiber, wireless and microwave options to your doorstep."
        badge="Access Network"
      />
      <MediaSelector />
      <DeploymentTimeline />
      <CoverageTeaser />
      <CTABanner
        heading="Check last-mile feasibility"
        description="Enter your address and we'll recommend the fastest path to connectivity."
        ctaText="Check Feasibility →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
