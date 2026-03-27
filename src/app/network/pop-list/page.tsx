"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const popData = [
  { city: "Mumbai", region: "West", tier: 1, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect", "Colo"] },
  { city: "Delhi NCR", region: "North", tier: 1, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect", "Colo"] },
  { city: "Bangalore", region: "South", tier: 1, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect", "Colo"] },
  { city: "Chennai", region: "South", tier: 1, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect"] },
  { city: "Hyderabad", region: "South", tier: 1, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect"] },
  { city: "Kolkata", region: "East", tier: 1, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect"] },
  { city: "Pune", region: "West", tier: 2, services: ["ILL", "MPLS", "SD-WAN"] },
  { city: "Ahmedabad", region: "West", tier: 2, services: ["ILL", "MPLS", "SD-WAN"] },
  { city: "Jaipur", region: "North", tier: 2, services: ["ILL", "MPLS", "SD-WAN"] },
  { city: "Lucknow", region: "North", tier: 2, services: ["ILL", "MPLS"] },
  { city: "Chandigarh", region: "North", tier: 2, services: ["ILL", "MPLS", "SD-WAN"] },
  { city: "Noida", region: "North", tier: 2, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect"] },
  { city: "Gurugram", region: "North", tier: 2, services: ["ILL", "MPLS", "SD-WAN", "Cloud Connect"] },
  { city: "Kochi", region: "South", tier: 2, services: ["ILL", "MPLS"] },
  { city: "Indore", region: "West", tier: 2, services: ["ILL", "MPLS"] },
  { city: "Nagpur", region: "East", tier: 2, services: ["ILL", "MPLS"] },
  { city: "Coimbatore", region: "South", tier: 3, services: ["ILL", "MPLS"] },
  { city: "Visakhapatnam", region: "East", tier: 3, services: ["ILL", "MPLS"] },
  { city: "Bhubaneswar", region: "East", tier: 3, services: ["ILL", "MPLS"] },
  { city: "Guwahati", region: "East", tier: 3, services: ["ILL"] },
];

const regionOrder = ["North", "South", "East", "West"];
const tierOptions = ["All", "1", "2", "3"];

export default function PopListPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [openRegions, setOpenRegions] = useState<Record<string, boolean>>({ North: true, South: true, East: true, West: true });

  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    return popData.filter((p) => {
      const matchSearch = p.city.toLowerCase().includes(search.toLowerCase());
      const matchRegion = regionFilter === "All" || p.region === regionFilter;
      const matchTier = tierFilter === "All" || p.tier === Number(tierFilter);
      return matchSearch && matchRegion && matchTier;
    });
  }, [search, regionFilter, tierFilter]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof popData> = {};
    filtered.forEach((p) => {
      if (!g[p.region]) g[p.region] = [];
      g[p.region].push(p);
    });
    return g;
  }, [filtered]);

  const toggleRegion = (r: string) => setOpenRegions((prev) => ({ ...prev, [r]: !prev[r] }));

  const tierColors: Record<number, string> = {
    1: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    2: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
    3: "bg-elevated text-txt-dim border-border-dim",
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Network"
        title="Points of"
        titleAccent="Presence"
        description="Our infrastructure, city by city. Browse our nationwide network of data centres and points of presence across India."
        badge="PoP Directory"
      />

      <section className="py-12 lg:py-20" ref={listRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={listInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Search & Filters */}
            <div className="bg-navy/40 border border-border-dim rounded-2xl p-4 sm:p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                  <input
                    type="text"
                    placeholder="Search by city name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-deep border border-border-dim rounded-xl text-sm text-txt-secondary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                </div>

                {/* Region filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-txt-dim shrink-0">Region:</span>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="px-3 py-3 bg-deep border border-border-dim rounded-xl text-sm text-txt-secondary focus:outline-none focus:border-accent-blue/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="All">All Regions</option>
                    {regionOrder.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Tier filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-txt-dim shrink-0">Tier:</span>
                  <div className="flex gap-1">
                    {tierOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTierFilter(t)}
                        className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                          tierFilter === t ? "bg-accent-blue/10 text-accent-blue border border-accent-blue/30" : "bg-deep text-txt-dim border border-border-dim hover:border-border-mid"
                        }`}
                      >
                        {t === "All" ? "All" : `T${t}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Count */}
              <div className="mt-4 pt-3 border-t border-border-dim/50">
                <p className="text-xs font-mono text-txt-dim">
                  Showing <span className="text-accent-blue font-bold">{filtered.length}</span> of {popData.length} locations
                </p>
              </div>
            </div>

            {/* Grouped results */}
            <div className="space-y-4">
              {regionOrder.filter((r) => grouped[r]).map((region) => {
                const isOpen = openRegions[region] !== false;
                const regionCities = grouped[region];
                return (
                  <div key={region} className="border border-border-dim rounded-2xl overflow-hidden bg-navy/20">
                    {/* Region header - collapsible */}
                    <button
                      onClick={() => toggleRegion(region)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-elevated/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-display font-bold text-txt-primary">{region}</span>
                        <span className="text-[10px] font-mono text-txt-dim bg-elevated/60 px-2 py-0.5 rounded-full">{regionCities.length} PoPs</span>
                      </div>
                      <svg className={`w-4 h-4 text-txt-dim transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border-dim divide-y divide-border-dim/30">
                            {regionCities.map((pop) => (
                              <div key={pop.city} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-elevated/10 transition-colors gap-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-txt-primary font-medium">{pop.city}</span>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tierColors[pop.tier]}`}>
                                    Tier {pop.tier}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <div className="flex flex-wrap gap-1">
                                    {pop.services.map((s) => (
                                      <span key={s} className="px-2 py-0.5 bg-elevated/50 border border-border-dim rounded-full text-[10px] font-mono text-txt-muted">{s}</span>
                                    ))}
                                  </div>
                                  <a href="/contact" className="text-xs font-mono text-accent-blue hover:text-accent-cyan transition-colors shrink-0">
                                    Check Availability &rarr;
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="bg-navy/30 border border-border-dim rounded-2xl p-12 text-center">
                  <p className="text-txt-dim text-sm">No locations match your search criteria.</p>
                  <button onClick={() => { setSearch(""); setRegionFilter("All"); setTierFilter("All"); }} className="text-xs text-accent-blue hover:text-accent-cyan mt-3 font-mono transition-colors">
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Don't see your city?"
        description="We're expanding rapidly. Check feasibility for your location."
        ctaText="Check Feasibility →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
