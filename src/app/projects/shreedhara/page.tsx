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
  title: "Shreedhar International Case Study | Basita Technology",
  description:
    "How Basita Technology built a professional corporate website for Shreedhar International—an abroad education consultancy serving 4000+ students since 2001.",
  alternates: {
    canonical: "/projects/shreedhara",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects/shreedhara`,
    siteName: "Basita Technology",
    title: "Shreedhar International Case Study | Basita Technology",
    description:
      "How Basita Technology built a professional corporate website for Shreedhar International—an abroad education consultancy serving 4000+ students since 2001.",
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
    title: "Shreedhar International Case Study | Basita Technology",
    description:
      "How Basita Technology built a professional corporate website for Shreedhar International—an abroad education consultancy serving 4000+ students since 2001.",
    images: ["/logo.png"],
  },
};

export default function ShreedharCaseStudyPage() {
  return (
    <main className="w-full bg-white">
      <Navigation />

      <CaseStudyHero
        logo={
          <div className="relative h-14 w-56 md:h-16 md:w-64">
            <Image
              src="/logo%20(3).svg"
              alt="Shreedhar International logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        }
        title="Shreedhar International"
        subtitle="A modern corporate website for a trusted abroad education consultancy—showcasing services, building credibility, and guiding students through every step of their study-abroad journey."
        meta={[
          { label: "Industry", value: "Education / Immigration" },
          { label: "Services", value: "Web Dev, CMS, UI/UX" },
          { label: "Platform", value: "Corporate Website" },
          { label: "Client Since", value: "Est. 2001" },
        ]}
      />

      <CaseStudyOverview
        paragraphs={[
          "Shreedhar International is a leading abroad education consultancy serving students across New Zealand, Canada, Australia, the UK, USA, Europe, and Singapore since 2001. Built on trust, honesty, and a commitment to going the extra mile, the firm has helped over 4,000 students pursue global education and navigate complex visa and immigration processes.",
          "As the consultancy expanded its reach, it needed a digital presence that matched its reputation—one that clearly communicated its full range of services, established credibility with prospective students and parents, and made it easy to understand the end-to-end study-abroad journey.",
          "Basita Technology partnered with Shreedhar International to design and develop a professional, multilingual-ready corporate website that transforms a complex service offering into a clear, confidence-building digital experience.",
        ]}
      />

      <CaseStudyMetrics
        metrics={[
          { value: "4,000+", label: "Students placed abroad" },
          { value: "7+", label: "Study destinations" },
          { value: "Since 2001", label: "Years of expertise" },
          { value: "End-to-End", label: "Advisory services" },
        ]}
      />

      <CaseStudyProblemObjective
        problem="Prospective students and parents faced information overload when researching study-abroad options. Shreedhar International offered comprehensive services—from course selection and university placement to visa processing and pre-departure guidance—but lacked a centralized digital platform that presented this value clearly. Without a professional web presence, the consultancy risked losing trust and leads to competitors with stronger online branding."
        objective="Create a polished, professional website that communicates Shreedhar International's expertise, organizes services into a clear student journey, and builds confidence with prospective clients—ultimately driving inquiries and strengthening the brand's digital credibility."
      />

      <CaseStudySolution
        intro="We built a structured, service-oriented website that mirrors the student journey—from initial counseling through admission, visa processing, and pre-departure support—making complex offerings easy to understand and act on."
        features={[
          {
            title: "Course & Career Counseling",
            description:
              "Dedicated sections explain how expert counselors help students select the right course aligned with career goals, market demand, and personal aspirations.",
          },
          {
            title: "University Selection",
            description:
              "Clear content outlines the consultancy's process for identifying and shortlisting universities and institutions across multiple countries.",
          },
          {
            title: "Test Preparation Support",
            description:
              "Information on IELTS, TOEFL, GMAT, GRE, and PTE coaching—positioning Shreedhar as a one-stop advisory partner.",
          },
          {
            title: "Admission Assistance",
            description:
              "Step-by-step guidance on application preparation, documentation, and follow-up through confirmed admission.",
          },
          {
            title: "Visa & Immigration",
            description:
              "A dedicated visa services section highlights the firm's specialized team and track record in student visa processing.",
          },
          {
            title: "Pre-Departure & Post-Landing",
            description:
              "Resources covering travel preparation, accommodation guidance, and post-arrival support for a smooth transition abroad.",
          },
        ]}
      />

      <CaseStudyProcess
        steps={[
          {
            step: "1",
            title: "Content Audit",
            description:
              "Reviewed existing materials, service offerings, and client messaging to define the site information architecture.",
          },
          {
            step: "2",
            title: "Design & Branding",
            description:
              "Created a clean, professional UI that reflects trust, expertise, and accessibility for students and parents.",
          },
          {
            step: "3",
            title: "Development",
            description:
              "Built a fast, SEO-friendly site with structured service pages, contact flows, and CMS-ready content blocks.",
          },
          {
            step: "4",
            title: "Launch & Optimize",
            description:
              "Deployed the site and refined content hierarchy based on readability, mobile performance, and user flow.",
          },
        ]}
      />

      <CaseStudyDetails
        technologies={["Next.js", "React", "Tailwind CSS", "TypeScript", "Strapi", "PostgreSQL"]}
        approach={[
          "Organized content to follow the natural student journey—from discovery to departure.",
          "Designed scannable service blocks with clear headings and concise descriptions.",
          "Built with performance and SEO best practices for international discoverability.",
          "Structured the site for future multilingual expansion across key markets.",
        ]}
        challenges="Consolidating a wide range of services—spanning seven countries and multiple test prep programs—into a concise, navigable website without overwhelming visitors required careful information hierarchy and progressive content disclosure."
        outcome="Shreedhar International now has a professional digital presence that communicates trust, expertise, and comprehensive support. The website helps prospective students quickly understand available services, builds credibility with parents and counselors, and positions the firm as a leading study-abroad advisory partner."
        deliverables={[
          {
            title: "Corporate Website",
            description: "Fully responsive site with service pages, about section, and contact integration.",
          },
          {
            title: "Service Architecture",
            description: "Structured content model covering the full student advisory lifecycle.",
          },
          {
            title: "Brand-Aligned UI",
            description: "Professional design system reflecting credibility and global reach.",
          },
        ]}
      />

      <CaseStudyConclusion
        conclusion="For service-driven businesses like education consultancies, clarity is the product. By organizing Shreedhar International's extensive offerings into a logical, student-centric narrative, we helped transform a complex advisory model into an approachable digital experience. Strong information hierarchy and trust-focused design are essential when guiding high-stakes life decisions."
      />

      <CaseStudyCTA />
      <Footer />
    </main>
  );
}
