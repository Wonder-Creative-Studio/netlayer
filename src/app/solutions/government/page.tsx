"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const securityLayers = [
  { label: "Physical Security", desc: "Biometric access, CCTV, mantrap entries", color: "var(--accent-blue)" },
  { label: "Network Security", desc: "Firewall, IDS/IPS, DDoS mitigation", color: "var(--accent-cyan)" },
  { label: "Application Security", desc: "WAF, API gateway, encryption in transit", color: "var(--accent-blue-light)" },
  { label: "Data Security", desc: "AES-256 at rest, key management, DLP", color: "var(--status-up)" },
];

const certifications = [
  { name: "CERT-IN", desc: "Indian Computer Emergency Response Team compliance for critical infrastructure", icon: "shield" },
  { name: "ISO 27001", desc: "International standard for information security management systems", icon: "shield" },
  { name: "SOC 2 Type II", desc: "Service organization controls for security, availability & confidentiality", icon: "shield" },
  { name: "STQC", desc: "Standardization Testing and Quality Certification for govt IT", icon: "shield" },
  { name: "MeitY", desc: "Ministry of Electronics & IT empanelment for cloud & network services", icon: "shield" },
  { name: "GIGW", desc: "Guidelines for Indian Government Websites compliance certified", icon: "shield" },
];

const deploymentModels = [
  {
    title: "Dedicated Infrastructure",
    desc: "Physically isolated network, compute, and storage resources exclusively for your department. Complete control over hardware lifecycle and data sovereignty.",
    features: ["Dedicated fiber rings", "Isolated switching fabric", "On-premises NOC option", "Custom security policies"],
    diagram: "dedicated",
  },
  {
    title: "Government Community Cloud",
    desc: "Shared infrastructure within a government-only tenant with logical isolation. Cost-efficient while maintaining compliance and security standards.",
    features: ["Multi-tenant isolation", "Shared compliance umbrella", "Elastic scaling", "Pay-per-use billing"],
    diagram: "community",
  },
];

const keyMetrics = [
  { value: 150, suffix: "+", label: "Govt Departments Served" },
  { value: 12, suffix: "", label: "Tier III+ Data Centers" },
  { value: 99.99, suffix: "%", label: "Uptime SLA" },
  { value: 15, suffix: "min", label: "Avg Response Time" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}{suffix}</>;
}

export default function GovernmentSolutions() {
  const secRef = useRef<HTMLDivElement>(null);
  const secInView = useInView(secRef, { once: true, margin: "-80px" });
  const certRef = useRef<HTMLDivElement>(null);
  const certInView = useInView(certRef, { once: true, margin: "-80px" });
  const deployRef = useRef<HTMLDivElement>(null);
  const deployInView = useInView(deployRef, { once: true, margin: "-80px" });
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Government Solutions"
        title="Secure, compliant connectivity for"
        titleAccent="public sector."
        description="Purpose-built network infrastructure meeting the stringent security, compliance, and availability requirements of government agencies and public sector organizations."
        badge="Sovereign Infrastructure"
      />

      {/* Security Architecture — concentric layers */}
      <section className="section-padding bg-void/80 relative overflow-hidden" ref={secRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/[0.02] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Defense in Depth</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-16">
            Security <span className="gradient-text">architecture</span>
          </h2>

          <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center">
            {securityLayers.map((layer, i) => {
              const size = 100 - i * 20;
              const delay = i * 0.3;
              return (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={secInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay }}
                  className="absolute flex items-center justify-center"
                  style={{ width: `${size}%`, height: `${size}%` }}
                >
                  <div
                    className="w-full h-full rounded-2xl border flex items-end justify-center pb-[8%] relative"
                    style={{ borderColor: `color-mix(in srgb, ${layer.color} 25%, transparent)`, background: `color-mix(in srgb, ${layer.color} 3%, transparent)` }}
                  >
                    {/* Pulse animation */}
                    <motion.div
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ boxShadow: `inset 0 0 30px color-mix(in srgb, ${layer.color} 8%, transparent)` }}
                    />
                    <div className="text-center relative z-10">
                      <span className="text-xs sm:text-sm font-display font-bold text-txt-primary block">{layer.label}</span>
                      <span className="text-[10px] sm:text-xs text-txt-dim font-mono hidden sm:block">{layer.desc}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {/* Center lock icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={secInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="relative z-20 w-16 h-16 rounded-full bg-elevated border border-accent-blue/30 flex items-center justify-center"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--accent-blue)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Grid — 3x2 certification cards */}
      <section className="section-padding" ref={certRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Compliance</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-12">
            Certifications & <span className="gradient-text">compliance</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 25 }}
                animate={certInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-6 rounded-card border border-[var(--border-dim)] bg-navy/40 hover:border-accent-blue/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-elevated/60 border border-accent-blue/20 flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-lg text-txt-primary">{cert.name}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-status-up/10 text-status-up rounded-pill border border-status-up/20 uppercase tracking-wider">
                        Compliant
                      </span>
                    </div>
                    <p className="text-sm text-txt-muted leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Models — side by side with diagrams */}
      <section className="section-padding relative" ref={deployRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/[0.02] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Deployment</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-12">
            Deployment <span className="gradient-text">models</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deploymentModels.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                animate={deployInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="relative p-8 rounded-card border border-[var(--border-dim)] bg-navy/40 overflow-hidden"
              >
                {/* Mini architecture diagram */}
                <div className="mb-6 p-4 rounded-lg bg-void/60 border border-[var(--border-dim)]">
                  <svg viewBox="0 0 200 80" fill="none" className="w-full h-auto">
                    {model.diagram === "dedicated" ? (
                      <>
                        {/* Single tenant box */}
                        <rect x="10" y="10" width="180" height="60" rx="6" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.3" />
                        <rect x="25" y="22" width="40" height="36" rx="4" fill="var(--accent-blue)" opacity="0.1" stroke="var(--accent-blue)" strokeWidth="0.5" />
                        <text x="45" y="44" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">Server</text>
                        <rect x="80" y="22" width="40" height="36" rx="4" fill="var(--accent-blue)" opacity="0.1" stroke="var(--accent-blue)" strokeWidth="0.5" />
                        <text x="100" y="44" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">Storage</text>
                        <rect x="135" y="22" width="40" height="36" rx="4" fill="var(--accent-blue)" opacity="0.1" stroke="var(--accent-blue)" strokeWidth="0.5" />
                        <text x="155" y="44" textAnchor="middle" fill="var(--txt-muted)" fontSize="6" fontFamily="var(--font-mono)">Network</text>
                        <line x1="65" y1="40" x2="80" y2="40" stroke="var(--accent-blue)" strokeWidth="0.5" />
                        <line x1="120" y1="40" x2="135" y2="40" stroke="var(--accent-blue)" strokeWidth="0.5" />
                        <text x="100" y="76" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Single Tenant</text>
                      </>
                    ) : (
                      <>
                        {/* Multi tenant */}
                        <rect x="10" y="10" width="180" height="60" rx="6" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.3" />
                        {[0, 1, 2].map((j) => (
                          <g key={j}>
                            <rect x={22 + j * 58} y="18" width="48" height="44" rx="4" fill={j === 0 ? "var(--accent-cyan)" : "var(--accent-blue)"} opacity="0.08" stroke={j === 0 ? "var(--accent-cyan)" : "var(--accent-blue)"} strokeWidth="0.5" />
                            <text x={46 + j * 58} y="44" textAnchor="middle" fill="var(--txt-muted)" fontSize="5" fontFamily="var(--font-mono)">Dept {j + 1}</text>
                          </g>
                        ))}
                        <text x="100" y="76" textAnchor="middle" fill="var(--txt-dim)" fontSize="5" fontFamily="var(--font-mono)">Govt Community</text>
                      </>
                    )}
                  </svg>
                </div>

                <h3 className="font-display font-bold text-xl text-txt-primary mb-3">{model.title}</h3>
                <p className="text-sm text-txt-muted leading-relaxed mb-5">{model.desc}</p>
                <div className="space-y-2">
                  {model.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-accent-blue flex-shrink-0">
                        <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-txt-muted">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="py-16 bg-void/90 border-y border-[var(--border-dim)] relative" ref={metricsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {keyMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-display font-extrabold text-3xl lg:text-4xl text-txt-primary block mb-2">
                  <AnimatedCounter target={m.value} suffix={m.suffix} inView={metricsInView} />
                </span>
                <span className="text-sm text-txt-dim font-mono">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Serving the public sector"
        description="Contact our government solutions team for a secure, compliant network design."
        ctaText="Request a Briefing →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
