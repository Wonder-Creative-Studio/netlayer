"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

const rotatingCopy = [
  "Powering 500+ enterprises across India",
  "99.9% uptime — that's 8.7 hours of downtime per year",
  "Your network. Your dashboard. Your control.",
  "Built for CIOs who don't wait on hold",
];

export default function Hero() {
  const [copyIndex, setCopyIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = rotatingCopy[copyIndex];
    let charIndex = 0;
    setDisplayText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCopyIndex((prev) => (prev + 1) % rotatingCopy.length);
        }, 2500);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [copyIndex]);

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.15 },
    }),
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden">
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
        {/* Left */}
        <div className="flex-1 max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-pill bg-elevated/60 border border-border-mid backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-status-up animate-pulse" />
            <span className="text-xs font-mono text-txt-muted">Network Status: All Circuits Operational</span>
          </motion.div>

          {/* Typing copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="h-6 mb-6 overflow-hidden"
          >
            <p className="text-sm font-mono text-txt-dim">
              {displayText}
              <span className={`inline-block w-[2px] h-4 ml-0.5 bg-accent-cyan align-middle ${isTyping ? "animate-pulse" : "opacity-0"}`} />
            </p>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-6 text-txt-primary">
            <div className="overflow-hidden">
              <motion.div variants={lineVariants} initial="hidden" animate="visible" custom={0}>
                The Infrastructure
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={lineVariants} initial="hidden" animate="visible" custom={1}>
                Behind Your
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={lineVariants} initial="hidden" animate="visible" custom={2}>
                <span className="gradient-text">Uptime.</span>
              </motion.div>
            </div>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="text-txt-muted text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Dedicated leased lines, MPLS & SD-WAN for enterprises that treat downtime as a four-letter word.
            99.9% SLA. Real-time monitoring. A portal your IT team will actually enjoy using.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-blue text-void font-semibold rounded-button btn-shine hover:bg-accent-blue-light hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-[2px] transition-all duration-300"
            >
              Check Feasibility
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/platform/customer-portal"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-txt-secondary font-medium border border-border-bright rounded-button hover:bg-elevated/40 hover:border-accent-blue/30 transition-all duration-300"
            >
              See the Platform
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right — Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden lg:flex flex-col gap-6"
        >
          {[
            { value: "99.9%", label: "Uptime SLA" },
            { value: "50+", label: "PoPs Across India" },
            { value: "<3ms", label: "PoP Latency" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.12 }}
              className="text-right animate-float"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <div className="font-display font-extrabold text-3xl text-txt-primary">{stat.value}</div>
              <div className="text-xs font-mono text-txt-dim uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-txt-dim uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-accent-blue to-transparent animate-pulse-line origin-top" />
      </motion.div>
    </section>
  );
}
