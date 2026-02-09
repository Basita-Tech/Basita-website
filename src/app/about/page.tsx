"use client";

import Navigation from "@/homepage/navigation";
import Footer from "@/components/footer";
import { Award, Users, Target, Shield, Rocket, HeartHandshake, Briefcase, Globe } from "lucide-react";

const highlights = [
  {
    title: "3+ Years Experience",
    description: "Decades of leadership in delivering reliable, enterprise-grade solutions.",
    icon: Award,
  },
  {
    title: "Client-First Approach",
    description: "We align every engagement with your goals, timeline, and budget.",
    icon: HeartHandshake,
  },
  {
    title: "Expert Team",
    description: "Skilled engineers, designers, and strategists across multiple domains.",
    icon: Users,
  },
  {
    title: "Security & Quality",
    description: "Robust QA practices with security baked into every build.",
    icon: Shield,
  },
];

const values = [
  {
    title: "Innovation",
    description: "We adopt modern architectures and emerging technologies to keep you ahead.",
    icon: Rocket,
  },
  {
    title: "Trust & Transparency",
    description: "Clear communication and measurable progress at every stage.",
    icon: Briefcase,
  },
  {
    title: "Global Delivery",
    description: "A distributed team delivering projects worldwide with local understanding.",
    icon: Globe,
  },
  {
    title: "Outcome Driven",
    description: "We focus on ROI, performance, and long-term scalability.",
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="w-full bg-green-50 border-slate-200">
        <div className="container mx-auto px-4 py-14 md:py-18">
          <div className="max-w-3xl">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide mb-3">About Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 mb-4">
              Building digital products that grow your business
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Basita Technology partners with startups and enterprises to design, build, and scale
              high‑performing software. From AI solutions to cloud platforms, we deliver outcomes
              that are secure, scalable, and future‑ready.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-14 md:py-18">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Who we are
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We are a technology company focused on delivering clean architecture, elegant
                interfaces, and measurable business impact. Our team blends strategy, design, and
                engineering to build digital experiences that convert and platforms that scale.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you need a modern web platform, a mobile product, or AI‑powered automation,
                we provide end‑to‑end delivery—from discovery and UX to development, launch, and
                ongoing support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                    <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 py-14 md:py-18">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide mb-3">Our Values</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">What drives us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-200 p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-14 md:py-18">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-teal-50 to-blue-50 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Let’s build something great together
                </h2>
                <p className="text-slate-600">
                  Share your goals and we’ll help you plan, design, and deliver a solution that
                  accelerates your growth.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-teal-600 text-white px-6 py-3 font-semibold hover:bg-teal-700 transition"
                >
                  Contact Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-teal-600 text-teal-600 px-6 py-3 font-semibold hover:bg-teal-50 transition"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
