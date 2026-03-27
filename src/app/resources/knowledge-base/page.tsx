"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const kbCategories = [
  {
    title: "Getting Started",
    description: "Onboarding guides, account setup, and portal walkthrough.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    articles: 12,
  },
  {
    title: "Network",
    description: "Circuit types, bandwidth options, SLAs, and peering information.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    articles: 18,
  },
  {
    title: "Billing",
    description: "Invoice management, payment methods, and billing FAQs.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    articles: 8,
  },
  {
    title: "API",
    description: "Authentication, endpoints, webhooks, and integration guides.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    articles: 14,
  },
  {
    title: "Troubleshooting",
    description: "Diagnose common issues, outage guides, and escalation paths.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M20.25 4.5l-9.92 9.92m0 0a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0 0L8.25 9.67M14 3v4.5m3.5-1.5L15 8.5m5 .5H15.5" />
      </svg>
    ),
    articles: 10,
  },
];

const faqs = [
  {
    question: "What is the typical lead time for a new ILL circuit?",
    answer: "For metro cities with existing fibre infrastructure, provisioning takes 7-14 business days. Tier-2 and Tier-3 cities may require 15-30 days depending on last-mile feasibility. We provide a detailed timeline during the feasibility check.",
  },
  {
    question: "How do I check service feasibility at my location?",
    answer: "You can submit a feasibility check request through our website or Customer Portal. Our team will verify last-mile availability and provide a response within 24 hours, including bandwidth options and estimated costs.",
  },
  {
    question: "What SLA guarantees does Netlayer provide?",
    answer: "We offer 99.95% uptime SLA for standard circuits and 99.99% for premium connections. SLAs include latency, jitter, and packet loss guarantees with automatic credit provisions for any breach.",
  },
  {
    question: "Can I upgrade my bandwidth without downtime?",
    answer: "Yes, bandwidth upgrades on ILL circuits can be performed with zero downtime in most cases. Upgrades within the same port speed are instantaneous. Cross-port upgrades may require a brief maintenance window of under 15 minutes.",
  },
  {
    question: "How does the billing cycle work?",
    answer: "Billing is on a monthly cycle with invoices generated on the 1st of each month. Payment terms are Net-30 by default. We support multiple payment methods including bank transfer, NEFT/RTGS, and auto-debit.",
  },
  {
    question: "What monitoring tools are available in the Customer Portal?",
    answer: "The portal includes real-time bandwidth utilisation graphs, latency and jitter monitoring, packet loss tracking, and customisable alerting thresholds. All data is available with 1-minute granularity and 90-day retention.",
  },
  {
    question: "Does Netlayer offer managed SD-WAN services?",
    answer: "Yes, our managed SD-WAN service includes hardware provisioning, configuration, policy management, and 24/7 monitoring. We partner with leading SD-WAN vendors and provide a fully managed overlay on top of our underlay network.",
  },
  {
    question: "How do I raise a support ticket?",
    answer: "Tickets can be raised through the Customer Portal, via email to support@netlayer.in, or by calling our 24/7 NOC. All tickets receive an automatic acknowledgement with an SLA-based response time depending on priority level.",
  },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border-dim rounded-card overflow-hidden hover:border-border-bright transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-elevated/20 transition-colors"
      >
        <span className="text-sm text-txt-primary font-medium">{faq.question}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-txt-dim transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
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
            <div className="px-5 pb-4 border-t border-border-dim/50 pt-3">
              <p className="text-sm text-txt-muted leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KnowledgeBasePage() {
  const catRef = useRef<HTMLDivElement>(null);
  const catInView = useInView(catRef, { once: true, margin: "-80px" });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title="Knowledge"
        titleAccent="Base"
        description="Technical resources and FAQs. Find answers, explore documentation, and learn how to get the most from Netlayer's platform."
        badge="Help Centre"
      />

      {/* Search */}
      <section className="section-padding">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search the knowledge base..."
              className="w-full pl-12 pr-4 py-4 bg-navy/50 border border-border-dim rounded-card text-sm text-txt-secondary placeholder:text-txt-dim focus:outline-none focus:border-accent-blue/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="section-padding" ref={catRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={catInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">Browse by Topic</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kbCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 25 }}
                animate={catInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group cursor-pointer"
              >
                <div className="h-full p-6 bg-navy/50 border border-border-dim rounded-card hover:border-border-bright hover:-translate-y-1 transition-all duration-300">
                  <div className="text-accent-blue mb-4 group-hover:text-accent-cyan transition-colors">{cat.icon}</div>
                  <h3 className="font-display font-bold text-base text-txt-primary mb-2 group-hover:text-accent-blue-light transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-txt-muted text-sm leading-relaxed mb-3">{cat.description}</p>
                  <span className="text-xs font-mono text-txt-dim">{cat.articles} articles</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding" ref={faqRef}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-accent-blue" />
              <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-txt-primary">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <FAQItem faq={faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Can&apos;t find what you need?"
        description="Our support team is available 24/7 to help you with any questions."
        ctaText="Contact Support &rarr;"
        ctaHref="/contact"
      />
    </PageShell>
  );
}
