"use client";

const clients = [
  "Tech Mahindra",
  "Infosys BPO",
  "HDFC Bank",
  "Reliance General",
  "Wipro",
  "Apollo Hospitals",
  "Tata Steel",
  "Manipal Health",
  "ICICI Prudential",
  "HCLTech",
];

export default function TrustMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="relative py-12 border-y border-border-dim overflow-hidden">
      {/* Label */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-txt-dim uppercase tracking-[0.3em]">
          Trusted by leading enterprises
        </span>
      </div>

      <div className="marquee-mask">
        <div className="flex animate-marquee">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center mx-8 sm:mx-12"
            >
              <span className="font-display font-bold text-xl sm:text-2xl text-txt-dim/40 whitespace-nowrap hover:text-txt-muted transition-colors duration-500">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
