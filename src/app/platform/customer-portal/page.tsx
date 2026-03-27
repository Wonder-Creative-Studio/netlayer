"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { id: "circuits", label: "Circuits", icon: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" },
  { id: "billing", label: "Billing", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
  { id: "tickets", label: "Tickets", icon: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" },
  { id: "orders", label: "Orders", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" },
];

function Sparkline({ data, color = "#3888FF" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 60},${24 - ((v - min) / range) * 20}`).join(" ");
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="inline-block">
      <polyline points={points} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

function MockDashboard() {
  const kpis = [
    { label: "Active Circuits", value: "24", trend: [18, 20, 19, 22, 21, 23, 24], color: "#3888FF" },
    { label: "Avg Uptime", value: "99.97%", trend: [99.95, 99.96, 99.97, 99.98, 99.97, 99.99, 99.97], color: "#22C55E" },
    { label: "Open Tickets", value: "3", trend: [7, 5, 6, 4, 3, 5, 3], color: "#F59E0B" },
    { label: "Bandwidth", value: "8.4 TB", trend: [6.1, 6.8, 7.2, 7.5, 7.9, 8.1, 8.4], color: "#06B6D4" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="bg-elevated/60 border border-border-dim rounded-lg p-3">
            <p className="text-[10px] font-mono text-txt-dim uppercase tracking-wider">{k.label}</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-xl font-display font-bold text-txt-primary">{k.value}</p>
              <Sparkline data={k.trend} color={k.color} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-elevated/40 border border-border-dim rounded-lg p-4 h-36 flex items-end gap-[3px]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex-1 bg-accent-blue/50 hover:bg-accent-blue rounded-t transition-all" style={{ height: `${30 + Math.sin(i * 0.5) * 25 + Math.random() * 40}%` }} />
        ))}
      </div>
    </div>
  );
}

function MockCircuits() {
  const circuits = [
    { id: "CKT-1042", type: "ILL", bw: "100 Mbps", status: "Active", pct: 72 },
    { id: "CKT-1087", type: "MPLS", bw: "50 Mbps", status: "Active", pct: 45 },
    { id: "CKT-1103", type: "ILL", bw: "1 Gbps", status: "Active", pct: 88 },
    { id: "CKT-1156", type: "SD-WAN", bw: "200 Mbps", status: "Provisioning", pct: 0 },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border-dim text-txt-dim font-mono uppercase tracking-wider">
            <th className="text-left py-2 px-2">ID</th><th className="text-left py-2 px-2">Type</th><th className="text-left py-2 px-2">Status</th><th className="text-left py-2 px-2">Bandwidth Usage</th>
          </tr>
        </thead>
        <tbody>
          {circuits.map((c) => (
            <tr key={c.id} className="border-b border-border-dim/50 hover:bg-elevated/30 transition-colors">
              <td className="py-2.5 px-2 font-mono text-accent-blue">{c.id}</td>
              <td className="py-2.5 px-2 text-txt-muted">{c.type}</td>
              <td className="py-2.5 px-2">
                <span className={`inline-flex items-center gap-1.5 ${c.status === "Active" ? "text-status-up" : "text-status-warn"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-status-up" : "bg-status-warn"}`} />
                  <span className="text-[10px] font-mono">{c.status}</span>
                </span>
              </td>
              <td className="py-2.5 px-2 w-40">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-elevated rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-txt-dim w-8">{c.pct}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MockBilling() {
  const invoices = [
    { id: "INV-2024-003", date: "Mar 2024", amount: "\u20B92,45,000", status: "Pending" },
    { id: "INV-2024-002", date: "Feb 2024", amount: "\u20B92,30,000", status: "Paid" },
    { id: "INV-2024-001", date: "Jan 2024", amount: "\u20B92,30,000", status: "Paid" },
    { id: "INV-2023-012", date: "Dec 2023", amount: "\u20B92,15,000", status: "Paid" },
  ];
  return (
    <div className="space-y-2">
      {invoices.map((inv) => (
        <div key={inv.id} className="flex items-center justify-between py-3 px-4 bg-elevated/30 border border-border-dim/50 rounded-lg hover:border-border-mid transition-colors">
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-txt-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            <div>
              <span className="text-xs font-mono text-txt-secondary">{inv.id}</span>
              <span className="text-xs text-txt-dim ml-3">{inv.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-txt-primary">{inv.amount}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${inv.status === "Paid" ? "bg-status-up/10 text-status-up" : "bg-status-warn/10 text-status-warn"}`}>{inv.status}</span>
            <svg className="w-4 h-4 text-txt-dim hover:text-accent-blue cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockTickets() {
  const tickets = [
    { id: "TKT-4501", subject: "Intermittent packet loss on CKT-1042", priority: "High", status: "In Progress", updated: "2h ago" },
    { id: "TKT-4498", subject: "Bandwidth upgrade for Mumbai office", priority: "Medium", status: "Open", updated: "1d ago" },
    { id: "TKT-4490", subject: "New static IP block allocation", priority: "Low", status: "Resolved", updated: "3d ago" },
  ];
  const priorityColors: Record<string, string> = { High: "bg-status-down/10 text-status-down", Medium: "bg-status-warn/10 text-status-warn", Low: "bg-elevated text-txt-dim" };
  return (
    <div className="space-y-2">
      {tickets.map((t) => (
        <div key={t.id} className="p-3 bg-elevated/30 border border-border-dim/50 rounded-lg hover:border-border-mid transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-accent-blue">{t.id}</span>
              <p className="text-sm text-txt-secondary mt-1">{t.subject}</p>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${priorityColors[t.priority]}`}>{t.priority}</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-txt-dim">
            <span className={t.status === "Resolved" ? "text-status-up" : t.status === "In Progress" ? "text-accent-cyan" : "text-status-warn"}>{t.status}</span>
            <span>Updated {t.updated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockOrders() {
  const orders = [
    { id: "ORD-780", type: "New ILL 500 Mbps", steps: ["Feasibility", "Survey", "Fiber Laying", "Testing", "Go-Live"], current: 1 },
    { id: "ORD-776", type: "MPLS Extension", steps: ["Feasibility", "Survey", "Fiber Laying", "Testing", "Go-Live"], current: 2 },
    { id: "ORD-770", type: "SD-WAN Overlay", steps: ["Feasibility", "Survey", "Config", "Testing", "Go-Live"], current: 3 },
  ];
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="p-4 bg-elevated/30 border border-border-dim/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-accent-blue">{o.id}</span>
              <span className="text-sm text-txt-secondary ml-3">{o.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {o.steps.map((step, i) => (
              <div key={step} className="flex-1 flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-mono shrink-0 ${i <= o.current ? "bg-accent-blue text-void" : "bg-elevated border border-border-dim text-txt-dim"}`}>{i + 1}</div>
                {i < o.steps.length - 1 && <div className={`flex-1 h-[2px] mx-1 ${i < o.current ? "bg-accent-blue" : "bg-border-dim"}`} />}
              </div>
            ))}
          </div>
          <div className="flex mt-1.5">
            {o.steps.map((step, i) => (
              <div key={step} className="flex-1 text-center">
                <span className={`text-[8px] font-mono ${i <= o.current ? "text-accent-blue" : "text-txt-dim"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const mockComponents: Record<string, () => JSX.Element> = {
  dashboard: MockDashboard, circuits: MockCircuits, billing: MockBilling, tickets: MockTickets, orders: MockOrders,
};

const testimonials = [
  { name: "Arjun Mehta", role: "CTO, Finova Systems", quote: "The portal replaced three separate tools we were using. Now our entire infra team lives in one dashboard." },
  { name: "Priya Sharma", role: "NOC Manager, CloudFirst", quote: "Real-time circuit monitoring with 1-minute granularity changed how we do incident response. We catch issues before customers notice." },
  { name: "Rahul Kapoor", role: "CFO, DataBridge Corp", quote: "Billing transparency was the reason we switched. Every rupee is accounted for with downloadable invoices and payment history." },
];

export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const portalRef = useRef<HTMLDivElement>(null);
  const portalInView = useInView(portalRef, { once: true, margin: "-80px" });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

  const ActiveMock = mockComponents[activeTab];

  return (
    <PageShell>
      <PageHero
        eyebrow="Platform"
        title="Customer"
        titleAccent="Portal"
        description="Every circuit, every metric, one dashboard. Manage your entire Netlayer infrastructure from a single, purpose-built portal designed for network operations teams."
        badge="Self-Service Platform"
      />

      {/* Full-width browser mockup */}
      <section className="py-12 lg:py-20 px-4" ref={portalRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={portalInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-deep border border-border-dim rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-dim bg-navy/60">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-6 py-1.5 bg-elevated/60 rounded-full text-[11px] font-mono text-txt-dim flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    portal.netlayer.in
                  </div>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex border-b border-border-dim bg-navy/30">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-3 text-xs font-mono transition-all ${
                      activeTab === tab.id ? "text-accent-blue" : "text-txt-dim hover:text-txt-secondary"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} /></svg>
                    <span className="hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div className="p-5 md:p-8 min-h-[420px] bg-void/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ActiveMock />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24" ref={quoteRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Testimonials</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary">
              Why teams <span className="gradient-text">love it</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative p-8 bg-navy/50 border border-border-dim rounded-2xl hover:border-accent-blue/30 transition-all duration-500 group"
              >
                <svg className="w-8 h-8 text-accent-blue/20 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" /></svg>
                <p className="text-txt-secondary text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-void font-display font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-display font-bold text-txt-primary">{t.name}</p>
                    <p className="text-xs text-txt-dim">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="See it in action"
        description="Schedule a personalized demo and explore the portal with your own data."
        ctaText="Request a Demo →"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
