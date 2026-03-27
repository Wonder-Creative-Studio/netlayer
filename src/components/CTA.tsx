"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-blue/[0.06] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-accent-cyan/[0.03] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Get Started</span>
            <div className="w-8 h-[1px] bg-accent-blue" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-txt-primary leading-tight mb-4">
            Ready to see what Tier-1 connectivity{" "}
            <span className="gradient-text">actually looks like?</span>
          </h2>

          <p className="text-txt-muted text-base sm:text-lg mb-10 max-w-lg mx-auto">
            Check feasibility at your location in under 24 hours. No contracts, no commitments.
          </p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          >
            <input
              type="email"
              placeholder="Enter your work email"
              className="flex-1 px-4 py-3.5 bg-navy/60 border border-border-mid rounded-button text-sm text-txt-primary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-blue-400/30 transition-all"
            />
            <button className="px-6 py-3.5 bg-accent-blue text-void font-semibold text-sm rounded-button btn-shine hover:bg-accent-blue-light hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-[1px] transition-all duration-300 whitespace-nowrap">
              Check Feasibility
              <span className="ml-1.5">→</span>
            </button>
          </motion.div>

          <p className="text-xs font-mono text-txt-dim">
            Free feasibility check · No commitment · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
