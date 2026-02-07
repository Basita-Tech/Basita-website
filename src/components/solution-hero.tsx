"use client";

import { ArrowRight, Sparkles, Rocket, Zap } from "lucide-react";

export default function SolutionHero() {
  return (
    <section
      className="relative w-full overflow-hidden hero-section"
      style={{ background: "var(--hero-bg-from)" }}
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
                <span className="block text-transparent bg-clip-text hero-title-gradient">
                  Modern Businesses
                </span>
              </h1>

              <p className="text-lg md:text-lg leading-relaxed max-w-2xl hero-text">
                Harness the power of AI and cutting-edge technology to transform your business operations, 
                enhance productivity, and drive exponential growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hero-primary-btn">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 border-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hero-secondary-btn">
                Learn More
              </button>
            </div>

          </div>

    
          <div className="relative h-72 md:h-[380px] hidden lg:block">
            <div className="absolute inset-0 rounded-2xl border backdrop-blur-sm hero-card"></div>
            
            <div className="absolute top-7 right-7 backdrop-blur-md rounded-lg p-5 w-56 shadow-lg hero-card border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center hero-card-icon">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="font-semibold hero-heading">AI Powered</h3>
              </div>
              <p className="text-sm hero-text">Advanced machine learning algorithms optimized for your business needs</p>
            </div>

            <div className="absolute bottom-7 left-7 backdrop-blur-md rounded-lg p-5 w-56 shadow-lg hero-card border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center hero-card-icon">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold hero-heading">Lightning Fast</h3>
              </div>
              <p className="text-sm hero-text">Real-time processing and instant insights for immediate action</p>
            </div>

            <div className="absolute top-1/2 right-1/4 w-32 h-32 hero-glow rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-50 hero-divider"></div>
    </section>
  );
}
