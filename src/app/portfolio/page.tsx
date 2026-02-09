"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/homepage/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <main className="w-full bg-white">
      <Navigation />

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-10 flex flex-col gap-3">
            <p className="text-teal-600 font-semibold text-xs md:text-sm uppercase tracking-wide">Portfolio</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Case Studies</h1>
            <p className="text-base md:text-lg text-slate-600">
              A curated selection of projects that showcase our approach to design, engineering, and business impact.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="relative h-full overflow-hidden border border-slate-200 bg-white shadow-sm">
              <CardHeader className="pt-3 pb-2 space-y-0 items-start text-left">
                <div className="w-full h-14 md:h-18 flex items-center justify-start mb-2">
                  <Image
                    src="/satfera.svg"
                    alt="Satfera logo"
                    width={260}
                    height={72}
                    className="h-full w-auto max-w-full object-contain object-left"
                    priority
                  />
                </div>
                <CardTitle className="text-xl">Satfera Matrimony Platform</CardTitle>
                <CardDescription className="text-sm mt-2">
                  A privacy-first matrimony platform focused on meaningful connections and trusted discovery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">React</span>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">Node.js</span>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">MongoDB</span>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">AI/ML</span>
                </div>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  <li>• Value-based matching</li>
                  <li>• Secure messaging</li>
                  <li>• Advanced search filters</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/projects/satfera" className="text-teal-600 font-semibold text-sm inline-flex items-center gap-1">
                  View Case Study
                  <span aria-hidden="true">→</span>
                </Link>
              </CardFooter>
            </Card>

            <Card className="relative h-full overflow-hidden border border-slate-200 bg-white shadow-sm">
              <CardHeader className="pt-3 pb-2 space-y-0 items-start text-left">
                <div className="w-full h-14 md:h-18 flex items-center justify-start mb-2">
                  <Image
                    src="/logo%20(3).svg"
                    alt="Shreedhar International logo"
                    width={255}
                    height={60}
                    className="h-full w-auto max-w-full object-contain object-left scale-65 origin-left"
                  />
                </div>
                <CardTitle className="text-xl">Shreedhar International</CardTitle>
                <CardDescription className="text-sm mt-2">
                  A modern corporate website with multilingual support and a clean product showcase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">Next.js</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">Tailwind CSS</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">Strapi</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">PostgreSQL</span>
                </div>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  <li>• Modern UI/UX design</li>
                  <li>• Multilingual support</li>
                  <li>• Product catalog system</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/projects/shreedhara" className="text-emerald-600 font-semibold text-sm inline-flex items-center gap-1">
                  View Case Study
                  <span aria-hidden="true">→</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
