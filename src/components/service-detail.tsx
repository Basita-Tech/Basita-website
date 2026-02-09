"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Zap, Code, Smartphone, Palette, Package, Brain, Cloud, ShoppingCart, Cog, Database, Target, FileText, Users, Shield, GitBranch, BarChart3, Workflow } from "lucide-react";
import Link from "next/link";
import { Service } from "@/data/services";

interface ServiceDetailProps {
  service: Service;
}


const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Palette,
  Package,
  Brain,
  Cloud,
  ShoppingCart,
  Cog,
  Database,
  Target,
  FileText,
  Zap,
  Users,
  Shield,
  GitBranch,
  BarChart3,
  Workflow
};

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const Icon = iconMap[service.iconName] || Code2;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="w-full bg-white">
   
      <section
        className="relative w-full overflow-hidden bg-green-50 hero-light py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center border backdrop-blur-sm hero-icon-badge">
                <Icon className="w-10 h-10 hero-icon" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 leading-tight hero-heading">
              {service.title}
            </h1>

            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed hero-text">
              {service.longDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hero-primary-btn"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-semibold text-sm uppercase tracking-wide section-label">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 section-heading">
              Key Features & Capabilities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="flex gap-4 p-4 rounded-lg card transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md feature-icon">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold section-heading">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-semibold text-sm uppercase tracking-wide section-label">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 section-heading">
              How We Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.process.map((step, idx) => (
              <div key={idx}>
                <motion.div
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full feature-icon font-bold mb-4">
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center section-heading">{step.title}</h3>
                    <p className="text-sm text-center section-text">{step.description}</p>
                  </div>

                  {idx < service.process.length - 1 && (
                    <div className="hidden md:block absolute top-6 -right-2 w-4 h-0.5 bg-gradient-to-r feature-icon to-transparent"></div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-semibold text-sm uppercase tracking-wide section-label">Tech Stack</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 section-heading">
              Technologies We Use
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center">
            {service.technologies.map((tech, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="px-4 py-2 border rounded-full tech-badge"
              >
                <span className="font-medium text-sm flex items-center gap-2">
                  <Code2 className="w-4 h-4 tech-badge-icon" />
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-semibold text-sm uppercase tracking-wide section-label">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 section-heading">
              Key Benefits
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md benefit-icon">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 section-heading">{benefit.title}</h3>
                    <p className="section-text">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {service.caseStudies && service.caseStudies.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="font-semibold text-sm uppercase tracking-wide section-label">Success Stories</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 section-heading">
                Case Studies
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.caseStudies.map((study, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-lg border border-slate-200"
                >
                  <h3 className="text-xl font-semibold mb-2 section-heading">{study.title}</h3>
                  <p className="mb-4 section-text">{study.description}</p>
                  <div className="border-l-4 p-4 rounded accent-bg" style={{borderColor: 'var(--accent-primary)'}}>
                    <p className="text-sm font-medium" style={{color: 'var(--accent-primary-text)'}}>
                      <span className="font-bold">Result: </span>
                      {study.result}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

     
      <section
       className="relative w-full overflow-hidden bg-green-50 hero-light py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 hero-heading">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 hero-text">
              Let's discuss how {service.title} can transform your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hero-primary-btn">
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hero-secondary-btn"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
