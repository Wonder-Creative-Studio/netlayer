"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using any services provided by Netlayer Communications Pvt. Ltd. ("Netlayer," "we," "us," or "our"), including but not limited to Internet Leased Lines (ILL), MPLS VPN, SD-WAN, Cloud Connect, Colocation, and related platform services, you ("Customer," "you," or "your") agree to be bound by these Terms of Service ("Terms").

If you are accepting these Terms on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation. If you do not agree to these Terms, you must not use our services.`,
  },
  {
    title: "2. Service Description",
    content: `Netlayer provides enterprise-grade internet connectivity and network services across India. Our services include:

- Internet Leased Line (ILL): Dedicated, symmetric bandwidth connections
- MPLS VPN: Private multi-site networking with quality of service guarantees
- SD-WAN: Software-defined wide area networking overlay services
- Cloud Connect: Direct connectivity to major cloud service providers
- Colocation: Rack space and power in our data centre facilities
- Customer Portal: Self-service management platform for monitoring and administration
- API Access: Programmatic access to service management and monitoring

Service specifications, bandwidth options, and pricing are detailed in your individual Service Order Form (SOF) and Service Level Agreement (SLA).`,
  },
  {
    title: "3. Service Level Agreement",
    content: `We commit to maintaining the service levels specified in your SLA. Standard SLA guarantees include:

- Network Availability: 99.95% minimum uptime for standard circuits, 99.99% for premium
- Latency: Within agreed thresholds for your circuit type and distance
- Packet Loss: Less than 0.1% across our backbone network
- Mean Time to Repair (MTTR): 4 hours for critical issues, 8 hours for major, 24 hours for minor

Service credits are automatically calculated and applied for any SLA breaches. Credits are capped at 30% of the monthly recurring charge for the affected service. SLA exclusions apply during scheduled maintenance windows (communicated at least 72 hours in advance) and force majeure events.`,
  },
  {
    title: "4. Customer Obligations",
    content: `As a customer, you agree to:

- Provide accurate and complete information during onboarding and throughout the service term
- Maintain the security of your account credentials, API keys, and portal access
- Use our services in compliance with all applicable laws and regulations
- Not use our services for any unlawful purpose, including but not limited to sending unsolicited communications, distributing malware, or infringing intellectual property rights
- Ensure that your equipment and premises are ready for installation by the agreed-upon date
- Pay all invoices within the agreed payment terms
- Notify us promptly of any security breaches or unauthorised access to your account`,
  },
  {
    title: "5. Billing and Payment",
    content: `Billing terms are as follows:

- Services are billed monthly in advance on the 1st of each month
- Payment is due within 30 days of invoice date (Net-30) unless otherwise specified in your SOF
- Late payments are subject to interest at 1.5% per month on the outstanding amount
- One-time charges (installation, equipment) are billed upon service activation
- All prices are exclusive of applicable taxes (GST) unless stated otherwise
- Disputes must be raised within 30 days of the invoice date

We reserve the right to suspend services for accounts with overdue payments exceeding 60 days, with 15 days prior written notice.`,
  },
  {
    title: "6. Term and Termination",
    content: `- The initial service term is specified in your Service Order Form (typically 12 or 24 months)
- After the initial term, services auto-renew on a month-to-month basis unless either party provides 60 days written notice of termination
- Early termination during the initial term is subject to an early termination fee equal to the remaining months' charges
- We may terminate services immediately if you breach these Terms and fail to remedy the breach within 30 days of written notice
- Upon termination, you must return any Netlayer-owned equipment within 15 business days
- We will retain your data for 30 days post-termination to facilitate migration, after which it will be securely deleted`,
  },
  {
    title: "7. Intellectual Property",
    content: `All intellectual property rights in our services, platform, API, documentation, and related materials remain the exclusive property of Netlayer. You are granted a limited, non-exclusive, non-transferable licence to use our services during the term of your agreement.

You may not:
- Reverse engineer, decompile, or disassemble any part of our platform or services
- Copy, modify, or create derivative works from our proprietary materials
- Sub-license, resell, or redistribute our services without written permission
- Remove or alter any proprietary notices or labels on our materials`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law:

- Our total liability for any claims arising from or related to these Terms or our services shall not exceed the total fees paid by you in the 12 months preceding the claim
- We shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, or business opportunities
- We are not liable for service interruptions caused by third-party networks, force majeure events, or customer equipment failures
- Service credits under the SLA constitute your sole and exclusive remedy for service level failures

These limitations apply regardless of the form of action, whether in contract, tort, negligence, or otherwise.`,
  },
  {
    title: "9. Acceptable Use Policy",
    content: `You must not use our services to:

- Transmit any content that is illegal, harmful, threatening, abusive, or otherwise objectionable
- Engage in activities that interfere with or disrupt our network or services
- Attempt to gain unauthorised access to our systems or other customers' networks
- Send unsolicited bulk communications (spam) or conduct phishing attacks
- Host content that infringes on intellectual property rights of third parties
- Operate open mail relays, open DNS resolvers, or similar services that can be exploited

We reserve the right to suspend or terminate services and notify appropriate authorities if we detect violations of this policy.`,
  },
  {
    title: "10. Governing Law and Disputes",
    content: `These Terms are governed by the laws of India. Any disputes arising from or related to these Terms shall be:

- First, attempted to be resolved through good-faith negotiation between the parties
- If unresolved within 30 days, submitted to mediation under the rules of the Indian Council of Arbitration
- If mediation fails, resolved through binding arbitration in Mumbai, India, conducted in English

The courts of Mumbai, India shall have exclusive jurisdiction for any matters not subject to arbitration.`,
  },
  {
    title: "11. Modifications",
    content: `We reserve the right to modify these Terms at any time. Material changes will be communicated to you at least 30 days before they take effect via:

- Email notification to your registered email address
- A notice in the Customer Portal
- An updated version on our website

If you do not agree to the modified Terms, you may terminate your services before the changes take effect. Continued use of our services after the effective date constitutes acceptance of the modified Terms.`,
  },
  {
    title: "12. Contact Information",
    content: `For questions about these Terms of Service, please contact:

Netlayer Communications Pvt. Ltd.
Legal Department
Email: legal@netlayer.in
Phone: +91 22 4000 1234
Address: Level 8, Tower B, Equinox Business Park, LBS Marg, Kurla West, Mumbai 400070, India`,
  },
];

export default function TermsOfServicePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        titleAccent="Service"
        description="The agreement between you and Netlayer Communications for the use of our services. Last updated: March 1, 2024."
      />

      <section className="section-padding" ref={contentRef}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <h3 className="font-display font-bold text-lg text-txt-primary mb-4">{section.title}</h3>
                <div className="text-txt-muted text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 pt-8 border-t border-border-dim">
            <p className="text-xs font-mono text-txt-dim">
              Questions about these terms? Contact us at{" "}
              <a href="mailto:legal@netlayer.in" className="text-accent-blue hover:text-accent-blue-light transition-colors">
                legal@netlayer.in
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
