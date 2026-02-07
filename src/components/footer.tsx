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
              width={90}
              height={90}
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
              <Link href="/blog" className="hover:text-teal-600">
                Blog
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
              <Link href="/ai-services" className="hover:text-teal-600">
                AI Services
              </Link>
            </li>
            <li>
              <Link href="/web-development" className="hover:text-teal-600">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/mobile-app-development" className="hover:text-teal-600">
                Mobile Development
              </Link>
            </li>
            <li>
              <Link href="/cloud-services" className="hover:text-teal-600">
                Cloud Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="mailto:info@basitatechnology.com" className="hover:text-teal-600">
                info@basitatechnology.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:text-teal-600">
                +1 (234) 567-890
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
