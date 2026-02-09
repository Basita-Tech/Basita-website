"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [showAIDropdown, setShowAIDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setShowAIDropdown(false);
    setShowServicesDropdown(false);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <nav className="bg-white/95 backdrop-blur shadow-sm py-3 px-3">
        <div className="container mx-auto flex justify-between items-center">
   
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Basita Technology Logo"
              width={130}
              height={130}
            /> 
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 transition"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="transition font-medium py-2 nav-link">
              Home
            </Link>
          
            <div 
              className="relative"
              onMouseEnter={() => setShowAIDropdown(true)}
              onMouseLeave={() => setShowAIDropdown(false)}
            >
              <button className={`flex items-center gap-1 transition font-medium py-2 ${showAIDropdown ? 'nav-link-active' : 'nav-link'}`}>
                AI Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showAIDropdown && (
                <div className="absolute top-full left-0 pt-2 bg-white shadow-lg rounded-md py-2 min-w-[250px] z-50">
                  <Link href="/services/ai-consulting" className="block px-6 py-2 transition nav-dropdown-item">
                    AI Consulting
                  </Link>
                  <Link href="/services/ai-development" className="block px-6 py-2 transition nav-dropdown-item">
                    AI Development
                  </Link>
                  <Link href="/services/generative-ai-development" className="block px-6 py-2 transition nav-dropdown-item">
                    Generative AI Development
                  </Link>
                  <Link href="/services/ai-agent-development" className="block px-6 py-2 transition nav-dropdown-item">
                    AI Agent Development
                  </Link>
                  <Link href="/services/chatgpt-development" className="block px-6 py-2 transition nav-dropdown-item">
                    ChatGPT Development
                  </Link>
                  <Link href="/services/llm-development" className="block px-6 py-2 transition nav-dropdown-item">
                    LLM Development
                  </Link>
                  <Link href="/services/ai-workflow-automation" className="block px-6 py-2 transition nav-dropdown-item">
                    AI & Workflow Automation
                  </Link>
                 
                </div>
              )}
            </div>
            
            
            <div 
              className="relative"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <button className={`flex items-center gap-1 transition font-medium py-2 ${showServicesDropdown ? 'nav-link-active' : 'nav-link'}`}>
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showServicesDropdown && (
                <div className="absolute top-full left-0 pt-2 bg-white shadow-lg rounded-md py-4 min-w-[500px] z-50">
                  <div className="grid grid-cols-2 gap-8 px-6">
                   
                    <div>
                      <Link href="/services/web-development" className="block px-2 py-2 transition nav-dropdown-item">
                        Web Development
                      </Link>
                      <Link href="/services/mobile-app-development" className="block px-2 py-2 transition nav-dropdown-item">
                        Mobile App Development
                      </Link>
                      <Link href="/services/cloud-services" className="block px-2 py-2 transition nav-dropdown-item">
                        Cloud Services
                      </Link>
                      <Link href="/services/mvp-development" className="block px-2 py-2 transition nav-dropdown-item">
                        MVP Development
                      </Link>
                      <Link href="/services/website-maintenance" className="block px-2 py-2 transition nav-dropdown-item">
                        Website Maintenance
                      </Link>
                      <Link href="/services/consulting" className="block px-2 py-2 transition nav-dropdown-item">
                        Consulting
                      </Link>
                      <Link href="/services/content-strategy" className="block px-2 py-2 transition nav-dropdown-item">
                        Content Strategy & Creation
                      </Link>
                    </div>

                 
                    <div>
                      <Link href="/services/cms-development" className="block px-2 py-2 transition nav-dropdown-item">
                        CMS Development
                      </Link>
                      <Link href="/services/ui-ux-design" className="block px-2 py-2 transition nav-dropdown-item">
                        UI/UX Design
                      </Link>
                      <Link href="/services/seo-optimization" className="block px-2 py-2 transition nav-dropdown-item">
                        SEO Optimization
                      </Link>
                      <Link href="/services/digital-marketing" className="block px-2 py-2 transition nav-dropdown-item">
                        Digital Marketing
                      </Link>
                      <Link href="/services/iot-development" className="block px-2 py-2 transition nav-dropdown-item">
                        IoT Development
                      </Link>
                      <Link href="/services/devops" className="block px-2 py-2 transition nav-dropdown-item">
                        DevOps & Platform Engineering
                      </Link>
                      <Link href="/services/ecommerce" className="block px-2 py-2 transition nav-dropdown-item">
                        E-Commerce Development
                      </Link>
                      

                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/about" className="transition font-medium py-2 nav-link">
              About Us
            </Link>
            <Link href="/portfolio" className="transition font-medium py-2 nav-link">
              Portfolio
            </Link>
            
            <Link href="/contact" className="transition font-medium py-2 nav-link">
              Contact
            </Link>
            
           
            <Link 
              href="/contact" 
              className="px-6 py-2.5 rounded-md transition font-medium nav-cta-btn"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col p-4 gap-2">
              <Link
                href="/"
                className="transition font-medium py-2 nav-link"
                onClick={handleMobileLinkClick}
              >
                Home
              </Link>

              <button
                type="button"
                className={`flex items-center justify-between transition font-medium py-2 ${showAIDropdown ? 'nav-link-active' : 'nav-link'}`}
                onClick={() => setShowAIDropdown((open) => !open)}
              >
                <span>AI Services</span>
                <ChevronDown className={`w-4 h-4 transition ${showAIDropdown ? "rotate-180" : "rotate-0"}`} />
              </button>

              {showAIDropdown && (
                <div className="pl-3 border-l border-slate-200">
                  <Link href="/services/ai-consulting" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    AI Consulting
                  </Link>
                  <Link href="/services/ai-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    AI Development
                  </Link>
                  <Link href="/services/generative-ai-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Generative AI Development
                  </Link>
                  <Link href="/services/ai-agent-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    AI Agent Development
                  </Link>
                  <Link href="/services/chatgpt-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    ChatGPT Development
                  </Link>
                  <Link href="/services/llm-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    LLM Development
                  </Link>
                  <Link href="/services/ai-workflow-automation" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    AI & Workflow Automation
                  </Link>
                </div>
              )}

              <button
                type="button"
                className={`flex items-center justify-between transition font-medium py-2 ${showServicesDropdown ? 'nav-link-active' : 'nav-link'}`}
                onClick={() => setShowServicesDropdown((open) => !open)}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition ${showServicesDropdown ? "rotate-180" : "rotate-0"}`} />
              </button>

              {showServicesDropdown && (
                <div className="pl-3 border-l border-slate-200">
                  <Link href="/services/web-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Web Development
                  </Link>
                  <Link href="/services/mobile-app-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Mobile App Development
                  </Link>
                  <Link href="/services/cloud-services" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Cloud Services
                  </Link>
                  <Link href="/services/mvp-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    MVP Development
                  </Link>
                  <Link href="/services/website-maintenance" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Website Maintenance
                  </Link>
                  <Link href="/services/consulting" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Consulting
                  </Link>
                  <Link href="/services/content-strategy" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Content Strategy & Creation
                  </Link>
                  <Link href="/services/cms-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    CMS Development
                  </Link>
                  <Link href="/services/ui-ux-design" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    UI/UX Design
                  </Link>
                  <Link href="/services/seo-optimization" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    SEO Optimization
                  </Link>
                  <Link href="/services/digital-marketing" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    Digital Marketing
                  </Link>
                  <Link href="/services/iot-development" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    IoT Development
                  </Link>
                  <Link href="/services/devops" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    DevOps & Platform Engineering
                  </Link>
                  <Link href="/services/ecommerce" className="block px-2 py-2 transition nav-dropdown-item" onClick={handleMobileLinkClick}>
                    E-Commerce Development
                  </Link>
                </div>
              )}

              <Link href="/about" className="transition font-medium py-2 nav-link" onClick={handleMobileLinkClick}>
                About Us
              </Link>
              <Link href="/portfolio" className="transition font-medium py-2 nav-link" onClick={handleMobileLinkClick}>
                Portfolio
              </Link>
              <Link href="/contact" className="transition font-medium py-2 nav-link" onClick={handleMobileLinkClick}>
                Contact
              </Link>
              <Link
                href="/contact"
                className="mt-2 px-6 py-2.5 rounded-md transition font-medium nav-cta-btn text-center"
                onClick={handleMobileLinkClick}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
