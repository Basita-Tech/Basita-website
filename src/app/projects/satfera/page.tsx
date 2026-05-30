import type { Metadata } from "next";
import Image from "next/image";
import { Navigation } from "@/homepage/navigation";
import Footer from "@/components/footer";
import {
  CaseStudyConclusion,
  CaseStudyCTA,
  CaseStudyDetails,
  CaseStudyHero,
  CaseStudyMetrics,
  CaseStudyOverview,
  CaseStudyProblemObjective,
  CaseStudyProcess,
  CaseStudySolution,
} from "@/components/case-study/case-study-sections";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

export const metadata: Metadata = {
  title: "Satfera Case Study | Basita Technology",
  description:
    "How Basita Technology built Satfera—a privacy-first matrimony platform with AI-powered matching, secure messaging, and values-based discovery.",
  alternates: {
    canonical: "/projects/satfera",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects/satfera`,
    siteName: "Basita Technology",
    title: "Satfera Case Study | Basita Technology",
    description:
      "How Basita Technology built Satfera—a privacy-first matrimony platform with AI-powered matching, secure messaging, and values-based discovery.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Basita Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satfera Case Study | Basita Technology",
    description:
      "How Basita Technology built Satfera—a privacy-first matrimony platform with AI-powered matching, secure messaging, and values-based discovery.",
    images: ["/logo.png"],
  },
};

export default function SatferaCaseStudyPage() {
  return (
    <main className="w-full bg-white">
      <Navigation />

      <CaseStudyHero
        logo={
          <div className="relative h-14 w-56 md:h-16 md:w-64">
            <Image
              src="/satfera.svg"
              alt="Satfera logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        }
        title="Satfera Matrimony Platform"
        subtitle="A modern matrimony platform that helps people find meaningful, long-term connections through AI-powered matching, privacy-first profiles, and secure communication."
        meta={[
          { label: "Industry", value: "Social / Matrimony" },
          { label: "Services", value: "Web App, AI/ML, UI/UX" },
          { label: "Platform", value: "Web Application" },
          { label: "Engagement", value: "End-to-End Build" },
        ]}
      />

      <CaseStudyOverview
        paragraphs={[
          "Satfera was founded with a clear mission: to redefine how people discover meaningful relationships in a digital world. Founded by Jisal and Parul Patel, the platform was built in response to the limitations of traditional matrimony services—where trust, privacy, and genuine compatibility were often secondary to volume and visibility.",
          "Basita Technology partnered with Satfera to design and develop a full-stack matrimony experience that puts users first. The platform combines intelligent matchmaking with granular privacy controls, enabling individuals and families to explore connections with confidence.",
          "From profile creation to secure messaging, every interaction was crafted to feel respectful, intentional, and safe—reflecting Satfera's belief that finding the right partner is one of life's most important journeys.",
        ]}
      />

      <CaseStudyMetrics
        metrics={[
          { value: "AI-Powered", label: "Smart matching engine" },
          { value: "Privacy-First", label: "Granular profile controls" },
          { value: "Secure", label: "Encrypted messaging layer" },
          { value: "Scalable", label: "Cloud-ready architecture" },
        ]}
      />

      <CaseStudyProblemObjective
        problem="Traditional matrimony platforms often prioritize listings over quality connections. Users face cluttered interfaces, limited privacy controls, and match suggestions that lack depth. Families and individuals needed a platform that felt trustworthy, modern, and aligned with their values—not just another database of profiles."
        objective="Design and build a secure, user-centric matrimony platform that enables values-based discovery, protects personal information, and fosters authentic conversations—helping users find compatible partners with clarity and confidence."
      />

      <CaseStudySolution
        intro="We delivered a comprehensive matrimony platform with intelligent discovery, privacy-first profiles, and a secure communication layer—engineered to support meaningful connections at every stage of the user journey."
        features={[
          {
            title: "AI Matching Algorithm",
            description:
              "Machine-learning models analyze preferences, values, and lifestyle factors to surface highly compatible matches—reducing noise and improving match quality.",
          },
          {
            title: "Value-Based Profiles",
            description:
              "Structured profile fields guide users to express what matters most—education, family values, career goals, and cultural preferences—for deeper compatibility.",
          },
          {
            title: "Privacy & Trust Controls",
            description:
              "Users control photo visibility, contact details, and profile access—ensuring information is shared only with approved connections.",
          },
          {
            title: "Secure Messaging",
            description:
              "A built-in messaging system enables respectful, private conversations with spam protection and moderation-ready architecture.",
          },
          {
            title: "Advanced Search Filters",
            description:
              "Multi-dimensional filters let users refine discovery by location, profession, community, education, and personal preferences.",
          },
          {
            title: "Admin & Moderation Tools",
            description:
              "A backend dashboard supports profile verification, content moderation, and platform analytics for ongoing quality management.",
          },
        ]}
      />

      <CaseStudyProcess
        steps={[
          {
            step: "1",
            title: "Discovery & Strategy",
            description:
              "Mapped user personas, defined trust requirements, and aligned on product goals with the Satfera founding team.",
          },
          {
            step: "2",
            title: "UX & Architecture",
            description:
              "Designed onboarding flows, match discovery patterns, and a scalable system architecture for growth.",
          },
          {
            step: "3",
            title: "Development & QA",
            description:
              "Built the frontend, backend APIs, matching logic, and messaging layer with rigorous testing across devices.",
          },
          {
            step: "4",
            title: "Launch & Iterate",
            description:
              "Deployed the platform and refined features based on user feedback, performance metrics, and engagement data.",
          },
        ]}
      />

      <CaseStudyDetails
        technologies={["React", "Node.js", "MongoDB", "Tailwind CSS", "AI/ML", "REST APIs"]}
        approach={[
          "Structured the product around trust, privacy, and long-term compatibility—not vanity metrics.",
          "Built modular APIs to support future features like video intros and premium tiers.",
          "Designed mobile-responsive interfaces for discovery, profiles, and messaging.",
          "Implemented role-based access for admins, moderators, and end users.",
        ]}
        challenges="Balancing deep personalization with strict privacy safeguards required careful UX decisions. We solved this by progressive disclosure—users reveal more only as trust builds—and by separating public profile summaries from private details."
        outcome="Satfera launched as a trusted matrimony platform with intelligent matching, secure communication, and user-first privacy controls. The product gives families and individuals a modern alternative to legacy matrimony services—one built for authenticity, not volume."
        deliverables={[
          {
            title: "Full-Stack Web Platform",
            description: "Responsive matrimony application with profiles, search, and messaging.",
          },
          {
            title: "AI Matching Engine",
            description: "Recommendation system based on compatibility signals and user preferences.",
          },
          {
            title: "Admin Dashboard",
            description: "Tools for verification, moderation, and platform health monitoring.",
          },
        ]}
      />

      <CaseStudyConclusion
        conclusion="Relationship-driven platforms succeed when trust is designed in from day one. Satfera demonstrates that thoughtful matchmaking, clear privacy options, and respectful communication create a safer, more meaningful space for people seeking lifelong partners. This project reinforced our belief that the best digital products balance technology with human values."
      />

      <CaseStudyCTA />
      <Footer />
    </main>
  );
}
