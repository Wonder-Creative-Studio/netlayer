"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Products",
    items: [
      { name: "Internet Leased Line", desc: "Dedicated symmetric bandwidth", href: "/products/internet-leased-line" },
      { name: "MPLS VPN", desc: "Private multi-site connectivity", href: "/products/mpls-vpn" },
      { name: "SD-WAN", desc: "Software-defined wide area network", href: "/products/sd-wan" },
      { name: "Managed Security", desc: "Enterprise-grade protection", href: "/products/managed-security" },
      { name: "Cloud Connect", desc: "Direct cloud on-ramp", href: "/products/cloud-connect" },
      { name: "Dedicated Internet", desc: "Premium internet access", href: "/products/dedicated-internet" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { name: "Enterprise", desc: "For large-scale operations", href: "/solutions/enterprise" },
      { name: "SME & Startups", desc: "Scale-ready connectivity", href: "/solutions/sme" },
      { name: "Government", desc: "Secure public sector networks", href: "/solutions/government" },
      { name: "Healthcare", desc: "HIPAA-ready infrastructure", href: "/solutions/healthcare" },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "Customer Portal", desc: "Real-time circuit monitoring", href: "/platform/customer-portal" },
      { name: "Network Status", desc: "Live infrastructure health", href: "/platform/network-status" },
      { name: "API Docs", desc: "Integrate with your NOC", href: "/platform/api-docs" },
    ],
  },
  {
    label: "Network",
    items: [
      { name: "Network Map", desc: "Interactive PoP locations", href: "/network/network-map" },
      { name: "PoP List", desc: "All points of presence", href: "/network/pop-list" },
    ],
  },
  {
    label: "Company",
    items: [
      { name: "About Us", desc: "Our story and mission", href: "/company/about" },
      { name: "Careers", desc: "Join the team", href: "/company/careers" },
      { name: "Partners", desc: "Strategic alliances", href: "/company/partners" },
      { name: "News", desc: "Latest updates", href: "/resources/news" },
    ],
  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-6 lg:left-8 z-[9999] rounded-pill px-2 py-2 transition-all duration-500 ${
          scrolled
            ? "bg-void/80 backdrop-blur-xl border border-border-bright shadow-lg shadow-accent-blue/5"
            : "bg-void/40 backdrop-blur-md border border-border-dim"
        }`}
      >
        <div className="flex items-center gap-1">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 px-4 py-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
              <span className="font-display font-extrabold text-xs text-void">N</span>
            </div>
            <span className="font-display font-bold text-txt-primary text-sm tracking-wide hidden sm:block">
              NETLAYER
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0">
            {navItems.map((item, i) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 text-sm text-txt-muted hover:text-txt-primary transition-colors font-body flex items-center gap-1">
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeDropdown === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-navy/95 backdrop-blur-xl border border-border-bright rounded-card p-2 shadow-2xl shadow-black/40"
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.items.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-elevated/80 transition-colors group"
                        >
                          <span className="text-sm text-txt-primary font-medium group-hover:text-accent-blue-light transition-colors">
                            {sub.name}
                          </span>
                          <span className="text-xs text-txt-dim">{sub.desc}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/contact"
            className="hidden lg:flex items-center gap-2 px-4 py-2 ml-2 bg-accent-blue text-void text-sm font-semibold rounded-pill btn-shine hover:bg-accent-blue-light hover:shadow-lg hover:shadow-accent-blue/20 hover:-translate-y-[1px] transition-all duration-300"
          >
            Request Feasibility
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 ml-2 text-txt-muted hover:text-txt-primary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="mb-6"
                >
                  <h3 className="text-txt-dim text-xs font-mono uppercase tracking-widest mb-3">{item.label}</h3>
                  <div className="space-y-1">
                    {item.items.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="block py-2 text-txt-primary text-lg font-display hover:text-accent-blue-light transition-colors"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
              <a
                href="/contact"
                className="block w-full text-center py-3 mt-6 bg-accent-blue text-void font-semibold rounded-button"
              >
                Request Feasibility
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
