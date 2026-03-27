"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const sidebarItems = [
  { icon: "◫", label: "Dashboard", active: true },
  { icon: "◉", label: "Circuits", active: false },
  { icon: "◈", label: "Network", active: false },
  { icon: "▣", label: "Tickets", active: false },
  { icon: "◧", label: "Orders", active: false },
  { icon: "◨", label: "Billing", active: false },
  { icon: "◩", label: "Projects", active: false },
  { icon: "⚙", label: "Settings", active: false },
];

const kpiData = [
  { label: "Active Circuits", value: "24", color: "text-accent-blue" },
  { label: "Circuits Down", value: "0", color: "text-status-up" },
  { label: "Current SLA", value: "99.97%", color: "text-accent-cyan" },
  { label: "Open Tickets", value: "3", color: "text-status-warn" },
];

const circuitRows = [
  { name: "MUM-BLR-ILL-001", type: "ILL", bandwidth: "1 Gbps", latency: "12ms", status: "up" },
  { name: "DEL-MUM-MPLS-042", type: "MPLS", bandwidth: "500 Mbps", latency: "18ms", status: "up" },
  { name: "CHN-HYD-SDWAN-007", type: "SD-WAN", bandwidth: "200 Mbps", latency: "15ms", status: "up" },
  { name: "BLR-PUN-ILL-015", type: "ILL", bandwidth: "2 Gbps", latency: "8ms", status: "up" },
  { name: "KOL-DEL-MPLS-033", type: "MPLS", bandwidth: "1 Gbps", latency: "22ms", status: "warning" },
];

export default function Platform() {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [tilt, setTilt] = useState({ x: 3, y: -1 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 3, y: -1 });
  }, []);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-blue/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Customer Platform</span>
            <div className="w-8 h-[1px] bg-accent-blue" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-txt-primary leading-tight mb-4">
            Every circuit. Every metric.{" "}
            <span className="gradient-text">One dashboard.</span>
          </h2>
          <p className="text-txt-muted text-base sm:text-lg">
            No more calling your account manager for a status update. Monitor, pay, raise tickets — all in
            real-time.
          </p>
        </motion.div>

        {/* Portal Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="portal-browser max-w-5xl mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={frameRef}
            className="portal-frame bg-navy/80 rounded-card border border-border-bright overflow-hidden glow-blue"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-elevated/60 border-b border-border-dim">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-status-down/60" />
                <div className="w-3 h-3 rounded-full bg-status-warn/60" />
                <div className="w-3 h-3 rounded-full bg-status-up/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-navy/80 rounded-lg px-3 py-1 text-xs font-mono text-txt-dim max-w-sm mx-auto text-center border border-border-dim">
                  portal.netlayer.in/dashboard
                </div>
              </div>
            </div>

            {/* App body */}
            <div className="flex min-h-[420px]">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col w-48 bg-deep/60 border-r border-border-dim p-3">
                <div className="flex items-center gap-2 px-2 py-2 mb-4">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
                    <span className="text-[8px] font-bold text-void">N</span>
                  </div>
                  <span className="text-xs font-display font-bold text-txt-primary">Netlayer</span>
                </div>
                {sidebarItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs mb-0.5 cursor-default ${
                      item.active
                        ? "bg-accent-blue/10 text-accent-blue-light border border-accent-blue/20"
                        : "text-txt-dim hover:text-txt-secondary"
                    }`}
                  >
                    <span className="text-[10px]">{item.icon}</span>
                    {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 sm:p-6">
                {/* KPI cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {kpiData.map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="bg-elevated/50 rounded-xl border border-border-dim p-3"
                    >
                      <div className="text-[10px] font-mono text-txt-dim mb-1">{kpi.label}</div>
                      <div className={`font-display font-bold text-xl ${kpi.color}`}>{kpi.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Traffic graph */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="bg-elevated/30 rounded-xl border border-border-dim p-4 mb-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-txt-dim">Aggregate Traffic — Last 24h</span>
                    <span className="text-[10px] font-mono text-accent-cyan">LIVE</span>
                  </div>
                  <svg viewBox="0 0 600 100" className="w-full h-20">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(56,136,255,0.05)" strokeWidth="0.5" />
                    ))}
                    {/* Traffic line */}
                    <path
                      d="M0,80 C30,75 60,60 90,55 C120,50 150,35 180,40 C210,45 240,30 270,25 C300,20 330,35 360,30 C390,25 420,15 450,20 C480,25 510,18 540,22 C570,26 585,20 600,18"
                      fill="none"
                      stroke="url(#trafficGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 1000,
                        strokeDashoffset: inView ? 0 : 1000,
                        transition: "stroke-dashoffset 2s ease-out 0.8s",
                      }}
                    />
                    {/* Fill */}
                    <path
                      d="M0,80 C30,75 60,60 90,55 C120,50 150,35 180,40 C210,45 240,30 270,25 C300,20 330,35 360,30 C390,25 420,15 450,20 C480,25 510,18 540,22 C570,26 585,20 600,18 L600,100 L0,100 Z"
                      fill="url(#trafficFill)"
                      style={{
                        opacity: inView ? 1 : 0,
                        transition: "opacity 1s ease-out 2s",
                      }}
                    />
                    <defs>
                      <linearGradient id="trafficGrad" x1="0" y1="0" x2="600" y2="0">
                        <stop offset="0%" stopColor="#3888ff" />
                        <stop offset="100%" stopColor="#00d4ff" />
                      </linearGradient>
                      <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="100">
                        <stop offset="0%" stopColor="rgba(56,136,255,0.1)" />
                        <stop offset="100%" stopColor="rgba(56,136,255,0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Circuit table */}
                <div className="bg-elevated/30 rounded-xl border border-border-dim overflow-hidden">
                  <div className="px-4 py-2 border-b border-border-dim">
                    <span className="text-xs font-mono text-txt-dim">Circuit Health</span>
                  </div>
                  <div className="divide-y divide-border-dim">
                    {circuitRows.map((row, i) => (
                      <motion.div
                        key={row.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.0 + i * 0.08 }}
                        className="flex items-center px-4 py-2 text-[11px] font-mono hover:bg-elevated/40 transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full mr-3 ${row.status === "up" ? "bg-status-up" : "bg-status-warn"}`} />
                        <span className="text-txt-secondary w-40 truncate">{row.name}</span>
                        <span className="text-txt-dim w-16 hidden sm:block">{row.type}</span>
                        <span className="text-txt-muted w-20 hidden sm:block">{row.bandwidth}</span>
                        <span className="text-accent-cyan ml-auto">{row.latency}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
