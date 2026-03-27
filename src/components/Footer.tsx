"use client";

const footerLinks = [
  {
    title: "Solutions",
    links: [
      { label: "Internet Leased Line", href: "/products/internet-leased-line" },
      { label: "MPLS VPN", href: "/products/mpls-vpn" },
      { label: "SD-WAN", href: "/products/sd-wan" },
      { label: "Managed Security", href: "/products/managed-security" },
      { label: "Cloud Connect", href: "/products/cloud-connect" },
      { label: "Dedicated Internet", href: "/products/dedicated-internet" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Customer Portal", href: "/platform/customer-portal" },
      { label: "Network Status", href: "/platform/network-status" },
      { label: "API Docs", href: "/platform/api-docs" },
      { label: "SLA Dashboard", href: "/platform/sla" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-dim">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
                <span className="font-display font-extrabold text-sm text-void">N</span>
              </div>
              <span className="font-display font-bold text-txt-primary text-lg tracking-wide">NETLAYER</span>
            </div>
            <p className="text-txt-dim text-sm leading-relaxed mb-6 max-w-[240px]">
              The enterprise connectivity infrastructure company that gives you complete visibility and control over
              your network.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {["LinkedIn", "X", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-navy/60 border border-border-dim flex items-center justify-center text-txt-dim hover:text-accent-blue-light hover:border-border-bright transition-all text-xs font-mono"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono text-txt-dim uppercase tracking-[0.2em] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-txt-muted hover:text-accent-blue-light transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-dim font-mono">
            © {new Date().getFullYear()} Netlayer Communications. All rights reserved.
          </p>
          <p className="text-xs text-txt-dim/50 font-mono">
            Designed by Wonder Creative Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
