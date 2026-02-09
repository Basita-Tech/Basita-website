"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white">
      <Separator />
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Basita Technology Logo"
              width={130}
              height={130}
            />
            
          </div>
          <p className="text-sm text-gray-600">
            We build modern digital products, AI solutions, and scalable
            platforms for growing businesses.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/about" className="hover:text-teal-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-teal-600">
                Portfolio
              </Link>
            </li>
           
            <li>
              <Link href="/contact" className="hover:text-teal-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Services</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/services/ai-integration" className="hover:text-teal-600">
                AI Services
              </Link>
            </li>
            <li>
              <Link href="/services/web-development" className="hover:text-teal-600">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/services/mobile-app-development" className="hover:text-teal-600">
                Mobile Development
              </Link>
            </li>
            <li>
              <Link href="/services/cloud-services" className="hover:text-teal-600">
                Cloud Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="mailto:contact@basita.in" className="hover:text-teal-600">
                contact@basita.in
              </a>
            </li>
            <li>
              <a href="tel:+919879003929" className="hover:text-teal-600">
                +91 98790 03929
              </a>
            </li>
            <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 md:flex-row">
        <p>© 2026 Basita Technology. All rights reserved.</p>
        
      </div>
    </footer>
  );
}
