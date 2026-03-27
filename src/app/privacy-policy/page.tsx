"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly when you use our services, create an account, or contact us. This includes:

- Personal identification information (name, email address, phone number, company name)
- Billing and payment information (processed through secure third-party payment providers)
- Technical data related to your network services (circuit IDs, IP addresses, bandwidth usage)
- Communication records (support tickets, emails, chat logs)
- Usage data from our Customer Portal and API (login times, feature usage, session data)

We also automatically collect certain information when you visit our website, including browser type, IP address, pages visited, and referring URLs through cookies and similar technologies.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect for the following purposes:

- To provide, maintain, and improve our network services
- To process billing and payments for your account
- To communicate with you about service updates, maintenance windows, and outages
- To respond to your support requests and resolve technical issues
- To monitor network performance and ensure service quality
- To comply with legal obligations and enforce our terms of service
- To detect, prevent, and address fraud or security issues
- To send you marketing communications (with your consent, which you may withdraw at any time)`,
  },
  {
    title: "3. Data Sharing and Disclosure",
    content: `We do not sell your personal data to third parties. We may share your information in the following circumstances:

- With service providers who assist in delivering our services (data centre operators, last-mile partners, payment processors)
- With regulatory authorities when required by law or legal process
- With your consent or at your direction
- In connection with a merger, acquisition, or sale of assets (with prior notice)
- To protect the rights, property, or safety of Netlayer, our customers, or the public

All third-party service providers are bound by confidentiality agreements and are only permitted to use your data for the specific purposes we engage them for.`,
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include:

- Encryption of data in transit (TLS 1.3) and at rest (AES-256)
- Access controls and authentication mechanisms for all systems
- Regular security audits and vulnerability assessments
- Employee training on data protection and security best practices
- Incident response procedures for potential data breaches

While we strive to protect your personal data, no method of electronic transmission or storage is 100% secure. We encourage you to use strong passwords and protect your account credentials.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal data for as long as your account is active or as needed to provide you with our services. Specific retention periods include:

- Account information: Duration of the service agreement plus 5 years
- Billing records: 7 years as required by applicable tax and accounting regulations
- Network performance data: 90 days at full granularity, aggregated data retained for 2 years
- Support ticket records: 3 years from ticket closure
- Website usage data: 12 months

After the retention period, data is securely deleted or anonymised.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:

- Right to access: Request a copy of the personal data we hold about you
- Right to rectification: Request correction of inaccurate or incomplete data
- Right to erasure: Request deletion of your data (subject to legal retention requirements)
- Right to restrict processing: Request that we limit how we use your data
- Right to data portability: Receive your data in a structured, machine-readable format
- Right to object: Object to processing based on legitimate interests or for marketing purposes

To exercise any of these rights, please contact our Data Protection Officer at privacy@netlayer.in.`,
  },
  {
    title: "7. Cookies and Tracking",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyse site usage. We use:

- Essential cookies: Required for basic site functionality and security
- Analytics cookies: Help us understand how visitors interact with our website
- Preference cookies: Remember your settings and preferences

You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may impact the functionality of our website and Customer Portal.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. We will notify you of any material changes by:

- Posting the updated policy on our website with a revised effective date
- Sending an email notification to your registered email address
- Displaying a prominent notice in the Customer Portal

We encourage you to review this policy periodically. Your continued use of our services after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Netlayer Communications Pvt. Ltd.
Data Protection Officer
Email: privacy@netlayer.in
Phone: +91 22 4000 1234
Address: Level 8, Tower B, Equinox Business Park, LBS Marg, Kurla West, Mumbai 400070, India`,
  },
];

export default function PrivacyPolicyPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        titleAccent="Policy"
        description="How we collect, use, and protect your personal data. Last updated: March 1, 2024."
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
        </div>
      </section>
    </PageShell>
  );
}
