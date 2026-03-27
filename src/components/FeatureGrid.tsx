"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureGrid({ features, columns = 3 }: { features: Feature[]; columns?: 2 | 3 | 4 }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--cursor-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--cursor-y", `${e.clientY - rect.top}px`);
  }, []);

  const colClass = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div ref={ref} className={`grid grid-cols-1 ${colClass} gap-4`}>
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          className="card-glow group"
          onMouseMove={handleMouseMove}
        >
          <div className="relative h-full p-6 bg-navy/50 border border-border-dim rounded-card hover:border-border-bright hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="text-accent-blue mb-4 group-hover:text-accent-cyan transition-colors">{f.icon}</div>
            <h3 className="font-display font-bold text-base text-txt-primary mb-2 group-hover:text-accent-blue-light transition-colors">
              {f.title}
            </h3>
            <p className="text-txt-muted text-sm leading-relaxed">{f.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
