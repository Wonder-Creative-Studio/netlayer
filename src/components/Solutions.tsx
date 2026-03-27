"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const solutions = [
  {
    title: "Internet Leased Line",
    desc: "Dedicated, symmetric bandwidth with guaranteed SLA. No sharing, no throttling.",
    tags: ["DEDICATED", "SYMMETRIC", "SLA"],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M4 16h24M16 4v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
    span: "col-span-12 sm:col-span-7",
  },
  {
    title: "MPLS VPN",
    desc: "Private multi-site connectivity with QoS and traffic engineering.",
    tags: ["PRIVATE", "MULTI-SITE", "QOS"],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M6 8h20M6 16h20M6 24h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="8" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="22" cy="16" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="24" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    span: "col-span-12 sm:col-span-5",
  },
  {
    title: "SD-WAN",
    desc: "Application-aware routing across hybrid networks with centralized orchestration.",
    tags: ["HYBRID", "APP-AWARE", "ORCHESTRATION"],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14v4h7M23 14v4h-7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    span: "col-span-12 sm:col-span-4",
  },
  {
    title: "Managed Security",
    desc: "Enterprise-grade firewall, DDoS mitigation, and threat monitoring — fully managed.",
    tags: ["FIREWALL", "DDOS", "MONITORING"],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 3l12 5v8c0 7-5 12-12 14C10 28 5 23 5 16V8l11-5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 16l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    span: "col-span-12 sm:col-span-4",
  },
  {
    title: "Cloud Connect",
    desc: "Direct on-ramp to AWS, Azure, and GCP with private peering for low-latency access.",
    tags: ["AWS", "AZURE", "GCP", "PEERING"],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M8 22c-3 0-5-2-5-5s2-5 5-5h1c1-3 4-6 8-6 5 0 8 3 8 7h1c2 0 4 2 4 4s-2 5-5 5H8z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    span: "col-span-12 sm:col-span-4",
  },
];

export default function Solutions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--cursor-x", `${x}px`);
    card.style.setProperty("--cursor-y", `${y}px`);
  }, []);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">What We Deliver</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-txt-primary leading-tight max-w-2xl">
            Connectivity products built for{" "}
            <span className="gradient-text">enterprises that don&apos;t compromise.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className={`${sol.span} card-glow group cursor-pointer`}
              onMouseMove={handleMouseMove}
            >
              <div className="relative h-full p-6 sm:p-8 bg-navy/50 border border-border-dim rounded-card hover:border-border-bright hover:-translate-y-1 transition-all duration-400 overflow-hidden">
                {/* Icon */}
                <div className="text-accent-blue mb-5 group-hover:text-accent-cyan transition-colors duration-300">
                  {sol.icon}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-txt-primary mb-2 group-hover:text-accent-blue-light transition-colors">
                  {sol.title}
                </h3>

                {/* Desc */}
                <p className="text-txt-muted text-sm leading-relaxed mb-5">{sol.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {sol.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-txt-dim border border-border-dim rounded-badge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
