import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Membership", href: "/#membership" },
       
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help", disabled: true },
        
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      
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
    <footer
      id="contact"
      className="bg-white text-[#1f1f1f] py-10 mt-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-8 md:gap-12 mb-8">
          <div className="md:col-span-1 text-center sm:text-left">
            <div className="mb-3 flex sm:block justify-center">
              <img src="/logo.png" alt="Satfera Logo" className="h-14 sm:h-12 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-xs mb-3 text-[#1f1f1f]">
              
            </p>

            <div className="flex justify-center sm:justify-start gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#1a1a1a] text-white hover:bg-[#D4A052] hover:text-[#800000] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="text-center sm:text-left">
              <h4 className="text-sm font-semibold mb-3 text-[#D4A052]">
                {section.title}
              </h4>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.disabled ? (
                      <span className="text-xs text-gray-400 cursor-not-allowed">
                        {link.name}
                      </span>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-xs text-[#1f1f1f] hover:text-[#D4A052] transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#d3c4a9] pt-4 text-center">
          <p className="text-xs text-[#1f1f1f]">
            © {currentYear} Satfera Matrimony. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
