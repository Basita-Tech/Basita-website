import Image from "next/image";
import { Navigation } from "@/homepage/navigation";
import Footer from "@/components/footer";

export default function SatferaCaseStudyPage() {
  return (
    <main className="w-full bg-white">
      <Navigation />
      <section className="py-12 md:py-16 bg-linear-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-10">
            <div className="relative h-14 w-56 md:h-16 md:w-64">
              <Image
                src="/satfera.svg"
                alt="Satfera logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="text-sm uppercase tracking-wide text-slate-500 mt-4">Project Title</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Satfera Matrimony Platform
            </h1>
            <p className="text-slate-600 mt-2 text-base md:text-lg">Meaningful connections, built on trust and privacy.</p>
          </div>

          <div className="max-w-5xl mx-auto text-slate-700 leading-relaxed text-base md:text-lg">
            <p className="text-sm uppercase tracking-wide text-slate-500">Overview</p>
            <p className="mt-2">
              Satfera was founded with a simple yet profound mission: to revolutionize the way
              people find meaningful relationships in our modern world. We believe that finding
              the right partner isn&apos;t just about chance—it&apos;s about connecting with someone who
              shares your values, dreams, and vision for life.
            </p>
            <p className="mt-2">
              Our platform was created by Jisal and Parul Patel, two visionaries who understood
              the challenges of traditional matrimony services and wanted to build something better.
              With a deep commitment to privacy, security, and authentic connections, Satfera has
              become a trusted platform for thousands of individuals seeking their perfect match.
            </p>
            <p className="mt-2">
              We&apos;re not just a matrimony platform—we&apos;re your trusted companion in one of life&apos;s
              most important journeys.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">Problem Statement</h2>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                Traditional matrimony platforms often feel transactional and lack trust, privacy,
                and meaningful discovery. Users needed a safe, modern space to connect based on
                shared values and long-term compatibility.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">Objective</h2>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                Build a secure, user-centric matrimony experience that prioritizes authenticity,
                privacy, and thoughtful matchmaking—helping people find the right partner with
                confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Solution / Feature Description</h2>
            <p className="text-slate-600 mt-2 text-base md:text-lg">
              We delivered a modern matrimony platform with intelligent discovery, privacy-first
              profiles, and secure communication—designed to foster authentic connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">Value-Based Matching</h3>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                Profiles and discovery flows are built around shared values, goals, and lifestyles
                to help users find genuinely compatible partners.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">Privacy & Trust Controls</h3>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                Granular privacy options ensure users share information only with the right people
                at the right time, reinforcing trust and safety.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">Secure Messaging</h3>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                A secure communication layer enables respectful, meaningful conversations while
                reducing spam and unwanted contact.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">Smart Search & Filters</h3>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                Advanced filters make it easy to explore matches that align with personal
                preferences, priorities, and cultural considerations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">Technology / Tools Used</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">React</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">Node.js</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">MongoDB</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">Tailwind CSS</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">Implementation Approach</h2>
              <ul className="mt-2 text-base md:text-lg text-slate-600 space-y-2 list-disc list-inside">
                <li>Structured the experience around trust and long-term compatibility.</li>
                <li>Designed privacy-first interaction flows and profile controls.</li>
                <li>Optimized onboarding and discovery for clarity and confidence.</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">Challenges Faced</h2>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                Balancing deep personalization with privacy safeguards while keeping the experience
                simple and welcoming.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">Result / Outcome</h2>
              <p className="text-slate-600 mt-2 text-base md:text-lg">
                A trusted matrimony platform that supports meaningful connections through secure
                communication, thoughtful discovery, and user-first privacy controls.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">Learning / Conclusion</h2>
            <p className="text-slate-600 mt-2 text-base md:text-lg">
              Building trust is essential in relationship-driven platforms. Clear privacy options,
              respectful communication, and values-based matching create a safer space for meaningful
              connections.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
