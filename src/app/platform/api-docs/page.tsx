"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const endpoints = [
  {
    method: "GET", path: "/v1/circuits", desc: "List all circuits associated with your account.",
    request: `GET /v1/circuits?status=active&page=1
Host: api.netlayer.in
Authorization: Bearer nl_live_xxxxx`,
    response: `{
  "data": [
    {
      "id": "ckt_1042",
      "type": "ILL",
      "bandwidth": "100mbps",
      "status": "active",
      "pop": "mum-01"
    }
  ],
  "meta": { "total": 24, "page": 1 }
}`,
  },
  {
    method: "GET", path: "/v1/circuits/:id/metrics", desc: "Get real-time performance metrics for a specific circuit.",
    request: `GET /v1/circuits/ckt_1042/metrics
Host: api.netlayer.in
Authorization: Bearer nl_live_xxxxx`,
    response: `{
  "circuit_id": "ckt_1042",
  "metrics": {
    "latency_ms": 2.4,
    "jitter_ms": 0.8,
    "packet_loss": 0.001,
    "throughput_mbps": 94.2
  },
  "timestamp": "2026-03-15T10:30:00Z"
}`,
  },
  {
    method: "POST", path: "/v1/tickets", desc: "Create a new support ticket with subject, description, and priority.",
    request: `POST /v1/tickets
Content-Type: application/json
Authorization: Bearer nl_live_xxxxx

{
  "subject": "Bandwidth upgrade",
  "priority": "medium",
  "circuit_id": "ckt_1042"
}`,
    response: `{
  "id": "tkt_4502",
  "subject": "Bandwidth upgrade",
  "status": "open",
  "priority": "medium",
  "created_at": "2026-03-15T11:00:00Z"
}`,
  },
  {
    method: "GET", path: "/v1/invoices", desc: "Retrieve invoices with filtering by date range and status.",
    request: `GET /v1/invoices?status=paid&from=2026-01-01
Host: api.netlayer.in
Authorization: Bearer nl_live_xxxxx`,
    response: `{
  "data": [
    {
      "id": "inv_2026_003",
      "amount": 245000,
      "currency": "INR",
      "status": "paid",
      "due_date": "2026-02-28"
    }
  ],
  "meta": { "total": 12, "page": 1 }
}`,
  },
];

const sdks = [
  { lang: "Python", install: "pip install netlayer", icon: "Py", color: "from-[#3776AB] to-[#FFD43B]" },
  { lang: "Node.js", install: "npm install @netlayer/sdk", icon: "JS", color: "from-[#339933] to-[#68A063]" },
  { lang: "Go", install: "go get github.com/netlayer/go-sdk", icon: "Go", color: "from-[#00ADD8] to-[#00A29C]" },
  { lang: "Ruby", install: "gem install netlayer", icon: "Rb", color: "from-[#CC342D] to-[#E44D26]" },
];

function CodeBlock({ code, lang = "bash", showLines = false }: { code: string; lang?: string; showLines?: boolean }) {
  const lines = code.split("\n");
  return (
    <div className="bg-[#0A0E1A] border border-border-dim rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-dim/50 bg-deep/50">
        <span className="text-[10px] font-mono text-txt-dim uppercase tracking-wider">{lang}</span>
        <button onClick={() => navigator.clipboard?.writeText(code)} className="text-[10px] font-mono text-txt-dim hover:text-accent-blue transition-colors">Copy</button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed">
        {showLines ? (
          <code>{lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 shrink-0 text-right pr-4 text-txt-dim/40 select-none">{i + 1}</span>
              <span className="text-txt-secondary">{line}</span>
            </div>
          ))}</code>
        ) : (
          <code className="text-txt-secondary">{code}</code>
        )}
      </pre>
    </div>
  );
}

export default function ApiDocsPage() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const quickRef = useRef<HTMLDivElement>(null);
  const quickInView = useInView(quickRef, { once: true, margin: "-80px" });
  const epRef = useRef<HTMLDivElement>(null);
  const epInView = useInView(epRef, { once: true, margin: "-80px" });
  const rateRef = useRef<HTMLDivElement>(null);
  const rateInView = useInView(rateRef, { once: true, margin: "-80px" });
  const sdkRef = useRef<HTMLDivElement>(null);
  const sdkInView = useInView(sdkRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Platform"
        title="API"
        titleAccent="Documentation"
        description="Integrate Netlayer into your NOC. Our RESTful API gives you programmatic access to circuits, metrics, tickets, and billing data."
        badge="Developer API"
      />

      {/* Quick Start */}
      <section className="py-12 lg:py-20" ref={quickRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={quickInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Quick Start</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-txt-primary mb-2">Base URL</h3>
                  <div className="px-4 py-3 bg-deep border border-border-dim rounded-xl font-mono text-sm text-accent-blue">
                    https://api.netlayer.in/v1
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-txt-primary mb-2">Authentication</h3>
                  <div className="px-4 py-3 bg-deep border border-border-dim rounded-xl font-mono text-sm">
                    <span className="text-txt-dim">Authorization:</span>{" "}
                    <span className="text-accent-cyan">Bearer</span>{" "}
                    <span className="text-status-up">nl_live_xxxxx</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { k: "Protocol", v: "HTTPS only" },
                    { k: "Format", v: "JSON" },
                    { k: "Versioning", v: "URL-based (v1)" },
                    { k: "Pagination", v: "Cursor-based" },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between py-2 border-b border-border-dim/30 text-sm">
                      <span className="text-txt-dim">{r.k}</span>
                      <span className="font-mono text-txt-secondary">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: code */}
              <div className="lg:col-span-3">
                <CodeBlock
                  code={`# List your circuits
curl -X GET "https://api.netlayer.in/v1/circuits" \\
  -H "Authorization: Bearer nl_live_a1b2c3d4" \\
  -H "Content-Type: application/json"

# Response
{
  "data": [
    {
      "id": "ckt_1042",
      "type": "ILL",
      "bandwidth": "100mbps",
      "status": "active"
    }
  ],
  "meta": { "total": 24, "page": 1 }
}`}
                  lang="bash"
                  showLines
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-12 lg:py-20 bg-deep/20" ref={epRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={epInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Endpoints</span>
            </div>

            <div className="space-y-3">
              {endpoints.map((ep, i) => {
                const isOpen = expanded === i;
                const methodColor = ep.method === "GET" ? "bg-status-up/15 text-status-up border-status-up/20" : "bg-accent-blue/15 text-accent-blue border-accent-blue/20";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={epInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="border border-border-dim rounded-xl overflow-hidden bg-navy/30"
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-elevated/10 transition-colors text-left"
                    >
                      <span className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold border ${methodColor}`}>{ep.method}</span>
                      <span className="font-mono text-sm text-txt-primary flex-1">{ep.path}</span>
                      <span className="text-sm text-txt-dim hidden md:block max-w-[280px] truncate">{ep.desc}</span>
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
                          <div className="border-t border-border-dim p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] font-mono text-txt-dim uppercase tracking-wider mb-2">Request</p>
                              <CodeBlock code={ep.request} lang="http" showLines />
                            </div>
                            <div>
                              <p className="text-[10px] font-mono text-txt-dim uppercase tracking-wider mb-2">Response</p>
                              <CodeBlock code={ep.response} lang="json" showLines />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-12 lg:py-20" ref={rateRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={rateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Rate Limits</span>
            </div>

            <div className="bg-[#0A0E1A] border border-border-dim rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-dim bg-deep/50">
                    <th className="text-left py-4 px-6 font-mono text-txt-dim text-xs uppercase tracking-wider">Plan</th>
                    <th className="text-left py-4 px-6 font-mono text-txt-dim text-xs uppercase tracking-wider">Req/min</th>
                    <th className="text-left py-4 px-6 font-mono text-txt-dim text-xs uppercase tracking-wider">Burst</th>
                    <th className="text-left py-4 px-6 font-mono text-txt-dim text-xs uppercase tracking-wider hidden sm:table-cell">Daily</th>
                    <th className="text-left py-4 px-6 font-mono text-txt-dim text-xs uppercase tracking-wider hidden md:table-cell">Webhooks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dim/30">
                  {[
                    { plan: "Free", rpm: "60", burst: "10", daily: "50K", wh: "5", highlight: false },
                    { plan: "Pro", rpm: "300", burst: "50", daily: "250K", wh: "25", highlight: true },
                    { plan: "Enterprise", rpm: "1,000", burst: "200", daily: "Unlimited", wh: "Unlimited", highlight: false },
                  ].map((r) => (
                    <tr key={r.plan} className={`hover:bg-elevated/10 transition-colors ${r.highlight ? "bg-accent-blue/[0.03]" : ""}`}>
                      <td className="py-4 px-6 font-display font-bold text-txt-primary">
                        {r.plan}
                        {r.highlight && <span className="ml-2 text-[9px] font-mono bg-accent-blue/10 text-accent-blue px-1.5 py-0.5 rounded-full">Popular</span>}
                      </td>
                      <td className="py-4 px-6 font-mono text-txt-muted">{r.rpm}</td>
                      <td className="py-4 px-6 font-mono text-txt-muted">{r.burst}</td>
                      <td className="py-4 px-6 font-mono text-txt-muted hidden sm:table-cell">{r.daily}</td>
                      <td className="py-4 px-6 font-mono text-txt-muted hidden md:table-cell">{r.wh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-12 lg:py-20" ref={sdkRef}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sdkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">SDKs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sdks.map((sdk, i) => (
                <motion.div
                  key={sdk.lang}
                  initial={{ opacity: 0, y: 20 }}
                  animate={sdkInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-navy/40 border border-border-dim rounded-xl p-5 hover:border-border-mid transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sdk.color} flex items-center justify-center text-white font-mono font-bold text-sm mb-4`}>
                    {sdk.icon}
                  </div>
                  <h3 className="font-display font-bold text-txt-primary mb-3">{sdk.lang}</h3>
                  <div className="px-3 py-2 bg-deep/80 rounded-lg font-mono text-xs text-accent-cyan truncate">
                    $ {sdk.install}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Ready to integrate?"
        description="Get your API key from the Customer Portal and start building today."
        ctaText="Get API Key →"
        ctaHref="/platform/customer-portal"
      />
    </PageShell>
  );
}
