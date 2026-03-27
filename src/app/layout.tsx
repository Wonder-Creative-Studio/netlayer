import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Netlayer — Enterprise Connectivity Infrastructure",
  description:
    "Dedicated leased lines, MPLS & SD-WAN for enterprises that treat downtime as a four-letter word. 99.9% SLA. Real-time monitoring.",
  openGraph: {
    title: "Netlayer — The Infrastructure Behind Your Uptime",
    description:
      "Enterprise connectivity with 99.9% SLA, real-time monitoring, and a portal your IT team will actually enjoy using.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">
        {children}
        {/* Film grain — static background image instead of live SVG filter */}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
