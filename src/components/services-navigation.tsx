"use client";

import Link from "next/link";
import { getAllServices } from "@/data/services";
import { motion } from "framer-motion";
import { Code, Smartphone, Palette, Package, Brain, Cloud, ShoppingCart, Cog, Database, Target, FileText, Zap, Users, Shield, GitBranch, BarChart3, Workflow } from "lucide-react";
import type { ComponentType } from "react";


const iconMap: Record<string, ComponentType<{ className?: string }>> = {
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

export default function ServicesNavigation() {
  const services = getAllServices();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, idx) => {
        const Icon = iconMap[service.iconName] ?? Code;
        return (
          <motion.div
            key={service.id}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <Link href={`/services/${service.slug}`}>
              <div className="h-full bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4 mb-3">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-br from-teal-50 to-blue-50 group-hover:from-teal-100 group-hover:to-blue-100 transition-colors">
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn More
                  <span className="ml-auto group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
