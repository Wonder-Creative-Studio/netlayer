"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Platform from "@/components/Platform";
import Advantage from "@/components/Advantage";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <Solutions />
        <Platform />
        <Advantage />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
