"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CTABannerProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CTABanner({
  heading = "Ready to get started?",
  description = "Check feasibility at your location in under 24 hours.",
  ctaText = "Check Feasibility →",
  ctaHref = "/contact",
}: CTABannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-blue/[0.05] rounded-full blur-[100px]" />
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-txt-primary mb-4">
            {heading}
          </h2>
          <p className="text-txt-muted text-base sm:text-lg mb-8">{description}</p>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-blue text-void font-semibold rounded-button btn-shine hover:bg-accent-blue-light hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-[1px] transition-all duration-300"
          >
            {ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
