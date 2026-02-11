"use client";

import Script from "next/script";
import Footer from "@/components/footer";
import SolutionHero from "@/components/solution-hero";
import HomePage from "@/homepage/homepage";
import Navigation from "@/homepage/navigation";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { 
        "@type": "Organization",
        name: "Basita Technology",
        url: "https://basita.in",
        logo: "https://basita.in/logo.png",
        sameAs: ["https://www.linkedin.com/company/basita-technology"],
      },
      {
        "@type": "WebSite",
        name: "Basita Technology",
        url: "https://basita.in",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://basita.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Script
        id="basita-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navigation />
      <SolutionHero />
      <main className="w-full py-8">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
