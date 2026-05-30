import type { Metadata } from "next";
import CreekLogo from "@/components/creek-logo";
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
  title: "Creekjob Case Study | Basita Technology",
  description:
    "How Basita Technology built Creekjob—a high-performance hiring marketplace for hourly and gig work with smart matching, employer dashboards, and mobile-first onboarding.",
  alternates: {
    canonical: "/projects/creekjob",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects/creekjob`,
    siteName: "Basita Technology",
    title: "Creekjob Case Study | Basita Technology",
    description:
      "How Basita Technology built Creekjob—a high-performance hiring marketplace for hourly and gig work with smart matching, employer dashboards, and mobile-first onboarding.",
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
    title: "Creekjob Case Study | Basita Technology",
    description:
      "How Basita Technology built Creekjob—a high-performance hiring marketplace for hourly and gig work with smart matching, employer dashboards, and mobile-first onboarding.",
    images: ["/logo.png"],
  },
};

export default function CreekjobCaseStudyPage() {
  return (
    <main className="w-full bg-white">
      <Navigation />

      <CaseStudyHero
        logo={<CreekLogo />}
        title="Creekjob Hiring Platform"
        subtitle="A fast, mobile-friendly job marketplace connecting hourly workers and employers through intelligent matching, streamlined applications, and real-time hiring workflows."
        meta={[
          { label: "Industry", value: "HR Tech / Gig Economy" },
          { label: "Services", value: "Platform Dev, UI/UX" },
          { label: "Platform", value: "Web & Mobile Web" },
          { label: "Engagement", value: "Full-Stack Build" },
        ]}
      />

      <CaseStudyOverview
        paragraphs={[
          "Creekjob addresses a critical gap in the hiring market: connecting job seekers looking for immediate hourly and service-based work with employers who need reliable, fast hires. Traditional job boards are built for white-collar roles—leaving gig workers and small businesses with slow, fragmented experiences.",
          "Basita Technology partnered with Creekjob to design and develop a modern hiring marketplace optimized for speed, simplicity, and trust. The platform supports searchable job categories, one-tap applications, employer talent pipelines, and automated match recommendations.",
          "From warehouse staff and delivery drivers to hospitality and retail roles, Creekjob is engineered to serve the workers and businesses that power the hourly economy—with a product experience that feels as fast as the jobs it fills.",
        ]}
      />

      <CaseStudyMetrics
        metrics={[
          { value: "Mobile-First", label: "Optimized for on-the-go users" },
          { value: "Smart Match", label: "Skills & location-based" },
          { value: "Fast Apply", label: "Streamlined onboarding" },
          { value: "Real-Time", label: "Instant notifications" },
        ]}
      />

      <CaseStudyProblemObjective
        problem="Hourly workers and small-to-mid employers lacked a dedicated platform built for their hiring needs. Generic job boards offered slow applications, poor mobile experiences, and little support for gig-style workflows. Employers struggled to filter candidates quickly, while job seekers faced fragmented discovery across multiple channels—with no reliable way to track responses or get matched to nearby opportunities."
        objective="Build a high-performance hiring marketplace that simplifies job discovery for workers, gives employers intuitive tools to post roles and manage applicants, and delivers a mobile-first experience optimized for speed, clarity, and trust."
      />

      <CaseStudySolution
        intro="We delivered a full-featured hiring platform with intelligent job matching, employer dashboards, real-time notifications, and a mobile-optimized application flow—designed to reduce time-to-hire for both sides of the marketplace."
        features={[
          {
            title: "Smart Job Search & Matching",
            description:
              "AI-assisted filters match seekers to roles by skills, location, availability, and pay range—surfacing the most relevant opportunities first.",
          },
          {
            title: "Employer Dashboard",
            description:
              "Employers post jobs, review applicants, schedule interviews, and manage hiring pipelines from a single, intuitive control panel.",
          },
          {
            title: "Quick Onboarding",
            description:
              "Streamlined profile creation and one-tap apply flows reduce friction—critical for workers who need jobs fast.",
          },
          {
            title: "Instant Notifications",
            description:
              "Real-time alerts notify seekers of new matches and keep employers updated when applications arrive or candidates respond.",
          },
          {
            title: "Category-Based Discovery",
            description:
              "Organized job categories—retail, logistics, hospitality, and more—make browsing intuitive for both seekers and hirers.",
          },
          {
            title: "Mobile-Optimized Experience",
            description:
              "Every workflow is designed for smartphones, ensuring workers can search, apply, and communicate without a desktop.",
          },
        ]}
      />

      <CaseStudyProcess
        steps={[
          {
            step: "1",
            title: "Market Research",
            description:
              "Studied hourly hiring pain points for both job seekers and employers to define core platform requirements.",
          },
          {
            step: "2",
            title: "Product Design",
            description:
              "Mapped user flows for job posting, discovery, application, and employer review—with mobile as the primary device.",
          },
          {
            step: "3",
            title: "Platform Build",
            description:
              "Developed the backend APIs, frontend experience, matching logic, and notification system using a modern stack.",
          },
          {
            step: "4",
            title: "Testing & Launch",
            description:
              "Validated performance, usability, and reliability across devices before rolling out to initial user groups.",
          },
        ]}
      />

      <CaseStudyDetails
        technologies={["Golang", "Next.js", "TanStack Query", "PostgreSQL", "Tailwind CSS", "REST APIs"]}
        approach={[
          "Prioritized page speed and mobile responsiveness for on-the-go job seekers.",
          "Built a scalable API layer to support growing job listings and user volumes.",
          "Designed employer workflows around speed—post, review, and hire in minimal steps.",
          "Implemented notification infrastructure for real-time engagement on both sides.",
        ]}
        challenges="Serving non-technical users on both sides of the marketplace required extreme simplicity without sacrificing functionality. We addressed this with progressive onboarding, clear visual hierarchy, and defaults that minimize required input while still capturing enough data for quality matching."
        outcome="Creekjob launched as a purpose-built hiring platform for the hourly economy—enabling faster job matches, better applicant visibility for employers, and a reliable mobile experience for workers. The product reduces hiring friction and gives both parties the tools they need to connect quickly and confidently."
        deliverables={[
          {
            title: "Job Marketplace Platform",
            description: "Full hiring platform with search, apply, and employer management workflows.",
          },
          {
            title: "Matching & Notification Engine",
            description: "Real-time job recommendations and alerts for seekers and employers.",
          },
          {
            title: "Employer Admin Panel",
            description: "Dashboard for job posting, applicant review, and pipeline management.",
          },
        ]}
      />

      <CaseStudyConclusion
        conclusion="In the gig and hourly hiring space, speed and simplicity win. Creekjob proves that when you design for the actual users—workers on their phones and busy employers who need hires today—you create products that deliver real value. This project reinforced our expertise in building marketplace platforms that balance performance, usability, and trust."
      />

      <CaseStudyCTA />
      <Footer />
    </main>
  );
}
