"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  badge?: string;
}

export default function PageHero({ eyebrow, title, titleAccent, description, badge }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-blue/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(56,136,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(56,136,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-pill bg-elevated/60 border border-border-mid backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent-blue" />
              <span className="text-xs font-mono text-txt-muted">{badge}</span>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">{eyebrow}</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-txt-primary leading-tight mb-6">
            {title}
            {titleAccent && <span className="gradient-text"> {titleAccent}</span>}
          </h1>

          <p className="text-txt-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
