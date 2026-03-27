"use client";

import dynamic from "next/dynamic";
import Navigation from "./Navigation";
import Footer from "./Footer";

const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
