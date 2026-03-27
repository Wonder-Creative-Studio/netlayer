"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const regions = ["All", "North", "South", "East", "West"];

const cities = [
  { name: "Mumbai", region: "West", x: 27, y: 65, tier: 1 },
  { name: "Delhi", region: "North", x: 35, y: 24, tier: 1 },
  { name: "Bangalore", region: "South", x: 34, y: 80, tier: 1 },
  { name: "Chennai", region: "South", x: 42, y: 82, tier: 1 },
  { name: "Hyderabad", region: "South", x: 37, y: 70, tier: 1 },
  { name: "Kolkata", region: "East", x: 58, y: 46, tier: 1 },
  { name: "Pune", region: "West", x: 28, y: 68, tier: 2 },
  { name: "Ahmedabad", region: "West", x: 22, y: 50, tier: 2 },
  { name: "Jaipur", region: "North", x: 28, y: 35, tier: 2 },
  { name: "Lucknow", region: "North", x: 43, y: 35, tier: 2 },
  { name: "Chandigarh", region: "North", x: 34, y: 18, tier: 2 },
  { name: "Kochi", region: "South", x: 30, y: 90, tier: 2 },
  { name: "Indore", region: "West", x: 28, y: 52, tier: 2 },
  { name: "Nagpur", region: "East", x: 38, y: 56, tier: 2 },
  { name: "Noida", region: "North", x: 37, y: 26, tier: 2 },
  { name: "Gurugram", region: "North", x: 33, y: 26, tier: 2 },
  { name: "Bhubaneswar", region: "East", x: 52, y: 56, tier: 3 },
  { name: "Guwahati", region: "East", x: 64, y: 34, tier: 3 },
  { name: "Coimbatore", region: "South", x: 32, y: 86, tier: 3 },
  { name: "Visakhapatnam", region: "East", x: 46, y: 66, tier: 3 },
];

const stats = [
  { value: 50, suffix: "+", label: "Points of Presence" },
  { value: 195, suffix: "+", label: "Cities Covered" },
  { value: 10, suffix: " Gbps", label: "Backbone Capacity" },
  { value: 99.99, suffix: "%", label: "Network Uptime" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  // Simple counter animation using useRef for tracking
  useState(() => {
    if (typeof window === "undefined") return;
    let frame: number;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(value % 1 ? 2 : 0)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const timeout = setTimeout(() => { frame = requestAnimationFrame(animate); }, 500);
    return () => { cancelAnimationFrame(frame); clearTimeout(timeout); };
  });

  return (
    <span ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl">
      {display}{suffix}
    </span>
  );
}

export default function NetworkMapPage() {
  const [activeRegion, setActiveRegion] = useState("All");
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Network"
        title="Network"
        titleAccent="Map"
        description="50+ Points of Presence across India. Explore our nationwide backbone infrastructure connecting enterprises across every major metro and tier-2 city."
        badge="Infrastructure"
      />

      {/* Stats bar */}
      <section className="py-8" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 bg-navy/30 border border-border-dim rounded-2xl overflow-hidden divide-x divide-y lg:divide-y-0 divide-border-dim">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 lg:p-8 text-center"
              >
                <div className="text-accent-blue">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-xs font-mono text-txt-dim mt-2 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-12 lg:py-20" ref={mapRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Region filter buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-mono text-txt-dim mr-2">Filter:</span>
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                    activeRegion === r
                      ? "bg-accent-blue text-void shadow-lg shadow-accent-blue/20"
                      : "bg-navy/50 text-txt-dim border border-border-dim hover:text-txt-secondary hover:border-border-mid"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Map container */}
            <div className="relative bg-navy/20 border border-border-dim rounded-2xl p-4 sm:p-8 overflow-hidden">
              {/* Background dots */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(56,136,255,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: "3/4" }}>
                {/* India SVG outline */}
                <svg viewBox="0 0 100 110" className="w-full h-full absolute inset-0" fill="none">
                  <path
                    d="M35 5 L42 3 L48 5 L55 8 L60 12 L65 18 L68 25 L70 32 L68 38 L64 42 L60 45 L58 50 L56 55 L54 58 L52 62 L50 66 L48 70 L46 74 L44 78 L42 82 L40 86 L38 90 L36 94 L34 96 L32 94 L30 90 L28 86 L26 82 L25 78 L24 74 L22 70 L20 65 L18 60 L16 54 L15 48 L16 42 L18 36 L20 30 L22 24 L25 18 L28 12 L31 8 Z"
                    stroke="rgba(56,136,255,0.12)"
                    strokeWidth="0.5"
                    fill="rgba(56,136,255,0.015)"
                  />
                  {/* Backbone connections between tier-1 cities */}
                  {cities.filter(c => c.tier === 1).map((c1, i) =>
                    cities.filter(c => c.tier === 1).slice(i + 1).map((c2) => (
                      <line key={`${c1.name}-${c2.name}`} x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke="rgba(56,136,255,0.06)" strokeWidth="0.3" strokeDasharray="2 2" />
                    ))
                  )}
                </svg>

                {/* City dots */}
                {cities.map((city, i) => {
                  const isActive = activeRegion === "All" || city.region === activeRegion;
                  const dotSizes = { 1: "w-4 h-4", 2: "w-2.5 h-2.5", 3: "w-1.5 h-1.5" };
                  const dotColors = { 1: "bg-accent-blue shadow-lg shadow-accent-blue/40", 2: "bg-accent-cyan", 3: "bg-txt-dim" };

                  return (
                    <motion.div
                      key={city.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={mapInView ? { scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.15 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                      className="absolute group"
                      style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      {/* Pulse ring for tier 1 */}
                      {city.tier === 1 && isActive && (
                        <span className="absolute inset-[-4px] rounded-full bg-accent-blue/20 animate-ping" style={{ animationDuration: "2.5s" }} />
                      )}
                      <span className={`relative block rounded-full transition-all duration-300 ${dotSizes[city.tier as keyof typeof dotSizes]} ${isActive ? dotColors[city.tier as keyof typeof dotColors] : "bg-txt-dim/20"}`} />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-deep border border-border-mid rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                        <p className="text-[11px] font-display font-bold text-txt-primary">{city.name}</p>
                        <p className="text-[10px] font-mono text-txt-dim">Tier {city.tier} &middot; {city.region}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-border-dim/50">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-accent-blue rounded-full shadow-md shadow-accent-blue/30" />
                  <span className="text-xs text-txt-dim font-mono">Tier 1 — Metro Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-accent-cyan rounded-full" />
                  <span className="text-xs text-txt-dim font-mono">Tier 2 — Regional PoP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-txt-dim rounded-full" />
                  <span className="text-xs text-txt-dim font-mono">Tier 3 — Edge PoP</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Need a PoP near you?"
        description="Check service availability at your location within 24 hours."
        ctaText="Check Feasibility →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
