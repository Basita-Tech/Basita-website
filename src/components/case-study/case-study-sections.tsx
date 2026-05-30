import type { ReactNode } from "react";
import { GetStartedCTA } from "@/components/get-started-cta";

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyFeature = {
  title: string;
  description: string;
};

export type CaseStudyProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type CaseStudyDeliverable = {
  title: string;
  description: string;
};

type CaseStudyHeroProps = {
  logo: ReactNode;
  title: string;
  subtitle: string;
  meta: CaseStudyMetaItem[];
};

export function CaseStudyHero({ logo, title, subtitle, meta }: CaseStudyHeroProps) {
  return (
    <section className="py-12 md:py-16 bg-linear-to-b from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {logo}
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold mt-6">Case Study</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-1">{title}</h1>
          <p className="text-slate-600 mt-3 text-base md:text-lg max-w-3xl">{subtitle}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200">
            {meta.map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">{item.label}</p>
                <p className="text-sm md:text-base font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseStudyOverviewProps = {
  paragraphs: string[];
};

export function CaseStudyOverview({ paragraphs }: CaseStudyOverviewProps) {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold">Project Overview</p>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">About the Client</h2>
          <div className="mt-4 space-y-4 text-slate-700 leading-relaxed text-base md:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyMetrics({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <section className="relative w-full overflow-hidden bg-green-50 hero-light py-10 md:py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold section-label">{metric.value}</p>
              <p className="text-sm md:text-base section-text mt-1">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-50 hero-divider" />
    </section>
  );
}

type CaseStudyProblemObjectiveProps = {
  problem: string;
  objective: string;
};

export function CaseStudyProblemObjective({ problem, objective }: CaseStudyProblemObjectiveProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-8">
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold">The Challenge</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">Problem &amp; Objective</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">Problem Statement</h3>
            <p className="text-slate-600 mt-3 text-base md:text-lg leading-relaxed">{problem}</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">Project Objective</h3>
            <p className="text-slate-600 mt-3 text-base md:text-lg leading-relaxed">{objective}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseStudySolutionProps = {
  intro: string;
  features: CaseStudyFeature[];
};

export function CaseStudySolution({ intro, features }: CaseStudySolutionProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold">Our Solution</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">What We Built</h2>
          <p className="text-slate-600 mt-3 text-base md:text-lg leading-relaxed">{intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-teal-50/50 rounded-xl p-6 border border-teal-100">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 mt-2 text-sm md:text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type CaseStudyProcessProps = {
  steps: CaseStudyProcessStep[];
};

export function CaseStudyProcess({ steps }: CaseStudyProcessProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-8">
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold">Our Approach</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">How We Delivered</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((item) => (
            <div key={item.step} className="bg-white rounded-xl p-6 border border-slate-200">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold">
                {item.step}
              </span>
              <h3 className="text-base font-semibold text-slate-900 mt-4">{item.title}</h3>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type CaseStudyDetailsProps = {
  technologies: string[];
  approach: string[];
  challenges: string;
  outcome: string;
  deliverables: CaseStudyDeliverable[];
};

export function CaseStudyDetails({
  technologies,
  approach,
  challenges,
  outcome,
  deliverables,
}: CaseStudyDetailsProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-8">
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold">Project Details</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">Technology &amp; Execution</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Technology Stack</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Implementation Approach</h3>
            <ul className="mt-4 text-sm md:text-base text-slate-600 space-y-2">
              {approach.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Key Challenges</h3>
            <p className="text-slate-600 mt-3 text-sm md:text-base leading-relaxed">{challenges}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Results &amp; Impact</h3>
            <p className="text-slate-600 mt-3 text-sm md:text-base leading-relaxed">{outcome}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Deliverables</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deliverables.map((item) => (
              <div key={item.title} className="bg-teal-50/30 rounded-lg p-5 border border-teal-100">
                <h4 className="font-semibold text-slate-900 text-sm md:text-base">{item.title}</h4>
                <p className="text-slate-600 mt-2 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseStudyConclusionProps = {
  conclusion: string;
};

export function CaseStudyConclusion({ conclusion }: CaseStudyConclusionProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 md:p-10 border border-slate-200 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-teal-600 font-semibold">Conclusion</p>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">Key Takeaways</h2>
          <p className="text-slate-600 mt-4 text-base md:text-lg leading-relaxed">{conclusion}</p>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyCTA() {
  return (
    <GetStartedCTA
      title="Ready to Build Your Next Project?"
      description="Let us help you turn your idea into a scalable, user-focused digital product—just like we did for our clients."
      primaryLabel="Schedule Free Consultation"
      secondaryLabel="View More Projects"
      secondaryHref="/portfolio"
    />
  );
}
