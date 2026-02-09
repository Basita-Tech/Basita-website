"use client";

import { ArrowRight, Sparkles, Rocket, Zap } from "lucide-react";
import Link from "next/link";

export default function SolutionHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-green-50 hero-light"
    >
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <div className="inline-block">
              <span className="px-4 py-2 border rounded-full text-sm font-medium inline-flex items-center gap-2 hero-badge">
                <Sparkles className="w-4 h-4" />
                Advanced Solutions
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight hero-heading">
                Intelligent Solutions for
                <span className="block text-blue-600">
                  Modern Businesses
                </span>
              </h1>

              <p className="text-lg md:text-lg leading-relaxed max-w-2xl hero-text">
                Harness the power of AI and cutting-edge technology to transform your business operations, 
                enhance productivity, and drive exponential growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hero-primary-btn"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>

    </div>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-50 hero-divider"></div>
    </section>
  );
}
