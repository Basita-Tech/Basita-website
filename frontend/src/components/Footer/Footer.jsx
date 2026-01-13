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
        { name: "Help Center", href: "/help" },
        
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
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
    <footer id="contact" className="bg-[#ffff] text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
  
          <div className="md:col-span-1">
            <div className="mb-2">
              <img src="/logo.png" alt="Satfera Logo" className="h-12 w-auto object-contain" />
             
            </div>
            <p className="text-black text-xs mb-3">
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
                      className="text-black hover:text-[#D4A052] transition-colors duration-300 text-xs"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
   
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-black text-xs">
            © {currentYear} Satfera Matrimony. All rights reserved.
          </p>
          
        </div>
      </div>


    </footer>
  );
}
