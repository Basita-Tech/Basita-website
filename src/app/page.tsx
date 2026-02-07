"use client";

import Footer from "@/components/footer";
import SolutionHero from "@/components/solution-hero";
import HomePage from "@/homepage/homepage";
import Navigation from "@/homepage/navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SolutionHero />
      <main className="container mx-auto px-4 py-8">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
