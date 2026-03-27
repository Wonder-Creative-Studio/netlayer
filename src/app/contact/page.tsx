"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

const steps = [
  { id: 1, label: "Location" },
  { id: 2, label: "Bandwidth" },
  { id: 3, label: "Service" },
  { id: 4, label: "Contact" },
];

const bandwidthOptions = ["10 Mbps", "50 Mbps", "100 Mbps", "250 Mbps", "500 Mbps", "1 Gbps", "Custom"];
const serviceOptions = [
  "Internet Leased Line",
  "MPLS VPN",
  "SD-WAN",
  "Dedicated Internet Access",
  "Cloud Connect",
  "Managed Wi-Fi",
  "Other",
];

const offices = [
  {
    city: "Mumbai",
    address: "Netlayer Networks, Level 14, Tower B, Goregaon East, Mumbai 400063",
    phone: "+91 22 4000 XXXX",
  },
  {
    city: "Delhi",
    address: "Netlayer Networks, 5th Floor, Sector 62, Noida, Uttar Pradesh 201309",
    phone: "+91 120 400 XXXX",
  },
  {
    city: "Bangalore",
    address: "Netlayer Networks, 3rd Floor, Whitefield Main Road, Bangalore 560066",
    phone: "+91 80 4000 XXXX",
  },
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    pincode: "",
    address: "",
    bandwidth: "",
    service: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const officesRef = useRef<HTMLDivElement>(null);
  const officesInView = useInView(officesRef, { once: true, margin: "-80px" });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Get in"
        titleAccent="touch."
        description="Check feasibility at your location in under 24 hours. Our solutions team will design a connectivity plan tailored to your business."
        badge="Quick Feasibility"
      />

      {/* Multi-step Form */}
      <section className="section-padding" ref={formRef}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-12">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      currentStep >= step.id ? "text-txt-primary" : "text-txt-dim"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all duration-300 ${
                        currentStep === step.id
                          ? "bg-accent-blue border-accent-blue text-void"
                          : currentStep > step.id
                          ? "bg-elevated border-accent-blue/40 text-accent-blue"
                          : "bg-navy/50 border-[var(--border-dim)] text-txt-dim"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-mono">{step.label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 lg:w-24 h-[1px] mx-2 transition-colors ${currentStep > step.id ? "bg-accent-blue/40" : "bg-[var(--border-dim)]"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div className="p-8 sm:p-10 bg-navy/50 border border-[var(--border-dim)] rounded-card">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-bold text-xl text-txt-primary mb-6">
                      Where do you need connectivity?
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          placeholder="e.g. Mumbai"
                          className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Pincode</label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => updateField("pincode", e.target.value)}
                          placeholder="e.g. 400001"
                          className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Full Address</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => updateField("address", e.target.value)}
                          placeholder="Building name, street, area"
                          rows={3}
                          className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-bold text-xl text-txt-primary mb-6">
                      What bandwidth do you need?
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {bandwidthOptions.map((bw) => (
                        <button
                          key={bw}
                          onClick={() => updateField("bandwidth", bw)}
                          className={`px-4 py-3 rounded-button text-sm font-mono border transition-all duration-300 ${
                            formData.bandwidth === bw
                              ? "bg-accent-blue/10 border-accent-blue/40 text-accent-blue"
                              : "bg-elevated/50 border-[var(--border-dim)] text-txt-muted hover:border-[var(--border-mid)]"
                          }`}
                        >
                          {bw}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-bold text-xl text-txt-primary mb-6">
                      What service are you looking for?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map((svc) => (
                        <button
                          key={svc}
                          onClick={() => updateField("service", svc)}
                          className={`px-4 py-3 rounded-button text-sm text-left border transition-all duration-300 ${
                            formData.service === svc
                              ? "bg-accent-blue/10 border-accent-blue/40 text-accent-blue"
                              : "bg-elevated/50 border-[var(--border-dim)] text-txt-muted hover:border-[var(--border-mid)]"
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-bold text-xl text-txt-primary mb-6">
                      How can we reach you?
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Company</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => updateField("company", e.target.value)}
                            placeholder="Company name"
                            className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-txt-dim uppercase tracking-wider mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          className="w-full px-4 py-3 bg-elevated/50 border border-[var(--border-dim)] rounded-button text-txt-primary text-sm placeholder:text-txt-dim/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border-dim)]">
                <button
                  onClick={prevStep}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-mono transition-colors ${
                    currentStep === 1 ? "text-txt-dim/30 cursor-not-allowed" : "text-txt-muted hover:text-txt-primary"
                  }`}
                  disabled={currentStep === 1}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back
                </button>
                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue text-void font-semibold text-sm rounded-button hover:bg-accent-blue-light transition-colors"
                  >
                    Continue
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue text-void font-semibold text-sm rounded-button btn-shine hover:bg-accent-blue-light hover:shadow-lg hover:shadow-accent-blue/20 transition-all">
                    Check Feasibility
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-padding relative" ref={officesRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-blue/[0.02] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent-blue" />
            <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
              Offices
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-txt-primary mb-10">
            Our <span className="gradient-text">locations</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 25 }}
                animate={officesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-navy/50 border border-[var(--border-dim)] rounded-card"
              >
                <div className="w-10 h-10 rounded-full bg-elevated/80 border border-accent-blue/20 flex items-center justify-center mb-4">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg text-txt-primary mb-2">{office.city}</h3>
                <p className="text-txt-muted text-sm leading-relaxed mb-3">{office.address}</p>
                <p className="font-mono text-sm text-txt-dim">{office.phone}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={officesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 p-8 bg-navy/50 border border-[var(--border-dim)] rounded-card"
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div>
                <span className="block text-xs font-mono text-txt-dim uppercase tracking-wider">Email</span>
                <span className="text-txt-secondary text-sm">sales@netlayer.in</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div>
                <span className="block text-xs font-mono text-txt-dim uppercase tracking-wider">Phone</span>
                <span className="text-txt-secondary text-sm">1800-XXX-XXXX (Toll Free)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent-blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="block text-xs font-mono text-txt-dim uppercase tracking-wider">Hours</span>
                <span className="text-txt-secondary text-sm">Mon - Sat, 9 AM - 7 PM IST</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
