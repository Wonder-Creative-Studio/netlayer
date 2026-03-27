"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

const categories = ["All", "Product", "Network", "Company", "Events"];

const articles = [
  {
    title: "Netlayer Expands Backbone to 10 Gbps Across 6 New Cities",
    excerpt: "Our latest infrastructure upgrade brings 10 Gbps backbone capacity to Jaipur, Lucknow, Chandigarh, Kochi, Indore, and Nagpur, connecting more enterprises to high-speed internet.",
    date: "Mar 15, 2024",
    category: "Network",
    readTime: "3 min",
  },
  {
    title: "Introducing SD-WAN Managed Service for Enterprise",
    excerpt: "Simplify multi-site networking with our fully managed SD-WAN overlay. Zero-touch provisioning, centralised policy management, and 24/7 NOC monitoring included.",
    date: "Mar 8, 2024",
    category: "Product",
    readTime: "5 min",
  },
  {
    title: "Customer Portal 2.0: A Complete Redesign",
    excerpt: "The new Customer Portal features real-time circuit monitoring, automated ticketing, and a revamped billing dashboard for seamless self-service management.",
    date: "Feb 28, 2024",
    category: "Product",
    readTime: "4 min",
  },
  {
    title: "Netlayer Partners with AWS for Direct Connect in Mumbai",
    excerpt: "Enterprise customers can now access AWS services with sub-2ms latency via our new Direct Connect link at the Mumbai PoP, enabling hybrid cloud architectures.",
    date: "Feb 20, 2024",
    category: "Network",
    readTime: "3 min",
  },
  {
    title: "Netlayer Recognised as Top ISP for Enterprise by DataQuest",
    excerpt: "We are honoured to be recognised for our commitment to delivering enterprise-grade connectivity and customer service excellence across India.",
    date: "Feb 10, 2024",
    category: "Company",
    readTime: "2 min",
  },
  {
    title: "Join Us at India Internet Day 2024 in Bangalore",
    excerpt: "Meet the Netlayer team at booth #42 at India Internet Day. We will be demonstrating our API platform, SD-WAN solution, and discussing enterprise connectivity trends.",
    date: "Jan 30, 2024",
    category: "Events",
    readTime: "2 min",
  },
];

const categoryColors: Record<string, string> = {
  Product: "bg-accent-blue/10 text-accent-blue",
  Network: "bg-accent-cyan/10 text-accent-cyan",
  Company: "bg-status-up/10 text-status-up",
  Events: "bg-status-warn/10 text-status-warn",
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const filtered = activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title="News &"
        titleAccent="Updates"
        description="The latest from Netlayer. Stay informed about product launches, network expansions, and company announcements."
        badge="Newsroom"
      />

      <section className="section-padding" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-pill text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? "bg-accent-blue/10 text-accent-blue border border-accent-blue/30"
                    : "bg-navy/50 text-txt-dim border border-border-dim hover:text-txt-secondary hover:border-border-bright"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 25 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group"
              >
                <div className="h-full flex flex-col bg-navy/50 border border-border-dim rounded-card p-6 hover:border-border-bright hover:-translate-y-1 transition-all duration-300">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-pill text-[10px] font-mono ${categoryColors[article.category]}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-txt-dim font-mono">{article.date}</span>
                  </div>

                  {/* Placeholder image */}
                  <div className="w-full h-36 bg-elevated/60 border border-border-dim rounded-badge mb-4 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at ${30 + i * 15}% ${40 + i * 10}%, rgba(56,136,255,0.1) 0%, transparent 60%), radial-gradient(circle at ${70 - i * 10}% ${60 + i * 5}%, rgba(0,212,255,0.08) 0%, transparent 50%)`,
                      }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-txt-dim/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-base text-txt-primary mb-2 group-hover:text-accent-blue-light transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-txt-muted text-sm leading-relaxed mb-4 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-dim/50">
                    <span className="text-[10px] text-txt-dim font-mono">{article.readTime} read</span>
                    <span className="text-xs text-accent-blue group-hover:text-accent-cyan transition-colors font-medium">
                      Read more &rarr;
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
