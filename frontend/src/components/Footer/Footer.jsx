import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Safety Tips", href: "/safety" },
        { name: "Contact Us", href: "#contact" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Compliance", href: "/compliance" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/satfera", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/satfera", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/satfera", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/satfera", label: "LinkedIn" },
  ];

  return (
    <footer id="contact" className="bg-[#fbfaf7] text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
  
          <div className="md:col-span-1">
            <div className="mb-2">
              <img src="/logo.png" alt="Satfera Logo" className="h-12 w-auto object-contain" />
              <p className="text-[10px] text-gray-500 mt-1">by Jisal and Parul Patel</p>
            </div>
            <p className="text-gray-400 text-xs mb-3">
              India's most trusted matrimony platform.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-[#1a1a1a] hover:bg-[#D4A052] hover:text-[#800000] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-3 h-3" />
                  </a>
                );
              })}
            </div>
          </div>

      
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-3 text-[#D4A052]">
                {section.title}
              </h4>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#D4A052] transition-colors duration-300 text-xs"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

    
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-gray-400">
            <a href="mailto:contact@satfera.com" className="hover:text-[#D4A052] transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" /> support@satfera.in
            </a>
            <span className="text-gray-600 hidden md:inline">|</span>
            <a href="tel:+919925203929" className="hover:text-[#D4A052] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" /> +91 9925203929
            </a>
            <span className="text-gray-600 hidden md:inline">|</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Ahmedabad, India
            </div>
          </div>
        </div>

   
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} Satfera Matrimony. All rights reserved.
          </p>
          <div className="flex justify-center items-center gap-4 mt-2 text-xs">
            <Link to="/terms" className="text-gray-400 hover:text-[#D4A052] transition-colors">
              Terms
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/privacy" className="text-gray-400 hover:text-[#D4A052] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>


    </footer>
  );
}
