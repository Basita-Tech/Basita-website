import Image from "next/image";
import { Navigation } from "@/homepage/navigation";
import Footer from "@/components/footer";

export default function ShreedharCaseStudyPage() {
  return (
    <main className="w-full bg-white">
      <Navigation />
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-10">
            <div className="relative h-14 w-56 md:h-16 md:w-64">
              <Image
                src="/logo%20(3).svg"
                alt="Shreedhar International logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="text-sm uppercase tracking-wide text-slate-500 mt-4">Project Title</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Shreedhar International
            </h1>
            <p className="text-slate-600 mt-2">Name of the project / feature</p>
          </div>

          <div className="max-w-5xl mx-auto text-slate-700 leading-relaxed">
            <p className="text-sm uppercase tracking-wide text-slate-500">Overview</p>
            <p className="mt-2">
              Shreedhar International is one of the best abroad education consultants for New Zealand, Canada, Australia, UK, USA, Europe and Singapore catering since 2001. Shreedhar International has built up its foundations on trust, honesty, faith to walk an extra mile, providing unique expertise to aspirants seeking overseas student placement management and total hassle-free travel solutions, with post-landing services and perfect guidance in foreign immigration and visa consultancy.
            </p>
            <p className="mt-2">
              Since its inception, Shreedhar International has become a gateway to well over 4000+ students willing to study abroad to acquire global education. With so many hot-spot study destinations and courses to choose from, Shreedhar International’s expert student-counseling team will help identifying the customized and the right University, College or Institution. We also provide work permit guidance to earn a living in the UK, USA, Canada, Australia, New Zealand or Singapore that has earned Shreedhar International its top ranking best student visa guidance provider position.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Problem Statement</h2>
              <p className="text-slate-600 mt-2 text-sm">
                Students needed a trusted, end‑to‑end advisory for course, university, and visa decisions across multiple countries. The lack of centralized guidance made the journey confusing and risky.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Objective</h2>
              <p className="text-slate-600 mt-2 text-sm">
                Create a clear, professional experience that helps students identify the right destination and institution, and smoothly complete admissions and visa processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Solution / Feature Description</h2>
            <p className="text-slate-600 mt-2">
              We built a structured service flow that presents key offerings and guides students from discovery to admission and post‑landing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">Course Suggestion</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Selection of perfect & suitable course is very important aspect for Study Abroad, our experienced team will assist you for course selection.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">University Selection</h3>
              <p className="text-slate-600 mt-2 text-sm">
                One of the primary and main criterion is Selection of right University for your future education career. We will do it on behalf of you.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">Perfect Coaching</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Coaching is first step towards your career in Abroad. We are offering coaching for IELTS, TOEFL, GMAT, GRE, PTE by experienced coaches.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">Assistance in Admission</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Our experienced team will assist you from the start of your admission process till your admission is confirmed. We will help you in all possible ways.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">Visa Process</h3>
              <p className="text-slate-600 mt-2 text-sm">
                We have a separate department for Visa Process, team of well‑trained & experienced persons for Visa Assistance.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">Pre‑Departure Awareness</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Last but not least, our team will assist you and make you familiar with all required information for Departure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Technology / Tools Used</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">Next.js</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">React</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">Tailwind CSS</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">TypeScript</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Implementation Approach</h2>
              <ul className="mt-2 text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Structured the content to mirror the student journey.</li>
                <li>Designed clear service blocks to highlight value.</li>
                <li>Optimized for readability with consistent spacing and hierarchy.</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Challenges Faced</h2>
              <p className="text-slate-600 mt-2 text-sm">
                Consolidating a large service offering into a concise, user‑friendly narrative without losing clarity.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Result / Outcome</h2>
              <p className="text-slate-600 mt-2 text-sm">
                A professional case study layout that communicates trust, services, and outcomes, helping prospective students understand the end‑to‑end support offered.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Learning / Conclusion</h2>
            <p className="text-slate-600 mt-2 text-sm">
              Clear information hierarchy and service‑based storytelling improve confidence and decision‑making for study‑abroad aspirants.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
