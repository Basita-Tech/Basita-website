"use client";

import { motion } from "framer-motion";
import ServicesNavigation from "@/components/services-navigation";
import SolutionHero from "@/components/solution-hero";

export default function AllServicesPage() {
  return (
    <div className="w-full bg-white">
      <SolutionHero />

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wide">Our Services</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 mb-4">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From AI-powered innovations to robust cloud infrastructure, we deliver end-to-end technology services that transform your business. Click on any service below to learn more about how we can help.
            </p>
          </motion.div>

          <ServicesNavigation />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wide">Why Choose Basita</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Our Competitive Advantage
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Experienced professionals with expertise across multiple technologies and industries."
              },
              {
                title: "Custom Solutions",
                description: "Tailored solutions designed specifically for your unique business needs and goals."
              },
              {
                title: "Proven Track Record",
                description: "3+ years of experience delivering successful projects for diverse clients worldwide."
              },
              {
                title: "Agile Approach",
                description: "Flexible, iterative development methodologies that adapt to your changing requirements."
              },
              {
                title: "Quality Assurance",
                description: "Rigorous testing and quality processes ensure reliable, production-ready solutions."
              },
              {
                title: "Ongoing Support",
                description: "Dedicated support and maintenance to ensure your solution's continued success."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 via-teal-800 to-slate-900 py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Let's discuss your project and find the perfect solution for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-slate-900 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                Schedule Free Consultation
              </button>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-teal-200 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:bg-white/10">
                Contact Us Today
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
