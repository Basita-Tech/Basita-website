"use client";

  import { Award, Briefcase, ThumbsUp, Rocket, Code, Brain, Cloud, Smartphone, ShoppingCart, Cog, Palette, Package, Users, Target, Shield, Headphones, Database, GitBranch, Zap, Lock, BarChart3, Workflow } from "lucide-react";
  import Image from "next/image";
  import Link from "next/link";
  import { motion } from "framer-motion";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    })
  };

export const HomePage = () => {
  return (
    <>
      <section className="w-full bg-white">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl accent-bg">
                <Award className="h-6 w-6 accent-icon" />
              </div>
              <p className="text-2xl font-bold section-heading">3+</p>
              <p className="text-xs font-medium section-text">Years Experience</p>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl accent-bg">
                <Briefcase className="h-6 w-6 accent-icon" />
              </div>
              <p className="text-2xl font-bold section-heading">50+</p>
              <p className="text-xs font-medium section-text">Projects Delivered</p>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl accent-bg">
                <ThumbsUp className="h-6 w-6 accent-icon" />
              </div>
              <p className="text-2xl font-bold section-heading">100%</p>
              <p className="text-xs font-medium section-text">Client Satisfaction</p>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl accent-bg">
                <Rocket className="h-6 w-6 accent-icon" />
              </div>
              <p className="text-2xl font-bold section-heading">2</p>
              <p className="text-xs font-medium section-text">Major Active Projects</p>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-slate-200/70" />
      </section>

      <section className="w-full bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-semibold text-sm uppercase tracking-wide mb-3 section-label">OUR SERVICES</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 section-heading">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto section-text">
              From AI-powered innovations to robust cloud infrastructure, we deliver end-to-end technology services that transform your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Code className="w-full h-full text-purple-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">Web Development</CardTitle>
                  <CardDescription className="text-sm">
                    We offer a broad spectrum of web development services to fully tap into the capabilities offered by modern web technologies.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/web-development" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Smartphone className="w-full h-full text-green-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">Mobile App Development</CardTitle>
                  <CardDescription className="text-sm">
                    End-to-end mobile apps development, from business analysis, design to testing and deployment or online market publication.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/mobile-app-development" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Palette className="w-full h-full text-orange-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">UI/UX Design</CardTitle>
                  <CardDescription className="text-sm">
                    Comprehensive UI/UX services that include idea to the wireframes, web and mobile app design, consulting, and branding using the latest tools and technologies.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/ui-ux-design" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Package className="w-full h-full text-cyan-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">Product Development</CardTitle>
                  <CardDescription className="text-sm">
                    Full-spectrum product development ideation to deployment. Product consultation, Product enhancement, MVP (Minimum Viable Product) and support services with expertise.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/product-development" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Brain className="w-full h-full text-purple-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">AI Integration</CardTitle>
                  <CardDescription className="text-sm">
                    Leverage cutting-edge AI and machine learning to automate processes, gain insights, and drive intelligent decision-making across your business.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/ai-integration" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Cloud className="w-full h-full text-blue-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">Cloud Services</CardTitle>
                  <CardDescription className="text-sm">
                    Secure, scalable cloud solutions that optimize infrastructure, reduce costs, and enable seamless digital transformation for your organization.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/cloud-services" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <ShoppingCart className="w-full h-full text-green-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">E-Commerce Solutions</CardTitle>
                  <CardDescription className="text-sm">
                    Complete e-commerce platforms with secure payment processing, inventory management, and optimized customer journeys for maximum conversion.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/ecommerce" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              custom={7}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 mb-2">
                    <Cog className="w-full h-full text-indigo-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">DevOps & Automation</CardTitle>
                  <CardDescription className="text-sm">
                    Streamline development workflows with CI/CD pipelines, infrastructure automation, and continuous monitoring solutions for optimal efficiency.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/services/devops" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition inline-flex items-center">
                    Learn More →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

 
      <section id="portfolio" className="w-full bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide mb-3">OUR PORTFOLIO</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Featured Projects
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Showcasing our expertise in delivering innovative solutions that drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pt-3 pb-2 space-y-0 items-start text-left">
                  <div className="w-full h-14 md:h-18 flex items-center justify-start mb-2">
                    <Image
                      src="/satfera.svg"
                      alt="Satfera Matrimony logo"
                      width={260}
                      height={72}
                      className="h-full w-auto max-w-full object-contain object-left"
                      priority
                    />
                  </div>
                  <CardTitle className="text-lg">Satfera Matrimony Platform</CardTitle>
                  <CardDescription className="text-xs">
                    A comprehensive matrimony platform featuring AI-powered matching algorithms to help users find their perfect life partner.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded">React</span>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded">Node.js</span>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded">MongoDB</span>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded">AI/ML</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>AI Matching Algorithm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Secure Messaging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Advanced Search Filters</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <a href="/projects/satfera" className="text-teal-600 font-semibold text-xs hover:text-teal-700 transition inline-flex items-center">
                    View Case Study →
                  </a>
                </CardFooter>
              </Card>
            </motion.div>

     
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="h-full bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pt-3 pb-2 space-y-0 items-start text-left">
                  <div className="w-full h-14 md:h-18 flex items-center justify-start mb-2">
                    <Image
                      src="/logo%20(3).svg"
                      alt="Shreedhar International logo"
                      width={255}
                      height={60}
                      className="h-full w-auto max-w-full object-contain object-left scale-65 origin-left"
                    />
                  </div>
                  <CardTitle className="text-lg">Shreedhar International</CardTitle>
                  <CardDescription className="text-xs mt-0">
                    A modern corporate website with multilingual support, showcasing products and services with an elegant, professional design.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">Next.js</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">Tailwind CSS</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">Strapi</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">PostgreSQL</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Modern UI/UX Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Multilingual Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Product Catalog System</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <a href="/projects/shreedhara" className="text-emerald-600 font-semibold text-xs hover:text-emerald-700 transition inline-flex items-center">
                    View Case Study →
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
                <p className="text-teal-600 font-semibold text-1xl uppercase tracking-wide mb-3">WHY CHOOSE US</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Trusted by Businesses Worldwide
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                At Basita Technology, we combine deep technical expertise with a genuine commitment to our clients' success. Our founder's 3+ years of experience drives our passion for excellence in every project we undertake.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2.5 bg-teal-50 text-teal-600 font-semibold rounded-lg hover:bg-teal-100 transition">
                  ISO Certified Processes
                </button>
                <button className="px-6 py-2.5 bg-teal-50 text-teal-600 font-semibold rounded-lg hover:bg-teal-100 transition">
                  Agile Methodology
                </button>
              </div>
            </div>

            {/* Right Grid - Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
              >
                <div className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Experienced Team</h3>
                  <p className="text-slate-600 text-sm">
                    Our team brings 3+ years of combined industry experience, delivering solutions that work.
                  </p>
                </div>
              </motion.div>

           
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
              >
                <div className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Client-Centric Approach</h3>
                  <p className="text-slate-600 text-sm">
                    We prioritize understanding your unique needs to deliver tailored solutions that exceed expectations.
                  </p>
                </div>
              </motion.div>

           
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
              >
                <div className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Quality Assurance</h3>
                  <p className="text-slate-600 text-sm">
                    Rigorous testing and quality control ensure reliable, secure, and high-performance solutions.
                  </p>
                </div>
              </motion.div>

        
              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
              >
                <div className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                    <Headphones className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ongoing Support</h3>
                  <p className="text-slate-600 text-sm">
                    Our commitment extends beyond delivery with continuous support and maintenance services.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    
      <section className="w-full bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide mb-3">TECHNOLOGY STACK</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              We leverage cutting-edge tools and frameworks to build scalable, secure, and innovative solutions.
            </p>
          </div>

          {/* Marquee Section */}
          <div className="relative overflow-hidden mt-12">
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-280px * 8));
                }
              }
              
              .tech-scroll {
                animation: scroll 40s linear infinite;
              }
              
              .tech-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            
            
            <div className="flex gap-4 tech-scroll">
        
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">React.js</p>
                  <p className="text-slate-600 text-xs">Frontend</p>
                </div>
              </div>

              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                  <Cog className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Node.js</p>
                  <p className="text-slate-600 text-xs">Backend</p>
                </div>
              </div>

           
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">MongoDB</p>
                  <p className="text-slate-600 text-xs">Database</p>
                </div>
              </div>

      
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">AWS</p>
                  <p className="text-slate-600 text-xs">Cloud Services</p>
                </div>
              </div>

       
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                  <GitBranch className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Docker</p>
                  <p className="text-slate-600 text-xs">DevOps</p>
                </div>
              </div>

        
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">TensorFlow</p>
                  <p className="text-slate-600 text-xs">AI/ML</p>
                </div>
              </div>

            
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">React Native</p>
                  <p className="text-slate-600 text-xs">Mobile Dev</p>
                </div>
              </div>

             
            
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">TypeScript</p>
                  <p className="text-slate-600 text-xs">Type Safety</p>
                </div>
              </div>

   
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                  <Cog className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">PostgreSQL</p>
                  <p className="text-slate-600 text-xs">Database</p>
                </div>
              </div>

       
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Redis</p>
                  <p className="text-slate-600 text-xs">Caching</p>
                </div>
              </div>

          
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Kubernetes</p>
                  <p className="text-slate-600 text-xs">Orchestration</p>
                </div>
              </div>

              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Next.js</p>
                  <p className="text-slate-600 text-xs">Full Stack</p>
                </div>
              </div>

          
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Tailwind CSS</p>
                  <p className="text-slate-600 text-xs">Styling</p>
                </div>
              </div>

          
              <div className="shrink-0 w-56 bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">FastAPI</p>
                  <p className="text-slate-600 text-xs">Python Backend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden bg-green-50 hero-light py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-4xl font-bold mb-4 hero-heading">
              Get Ready to Start?
            </h2>
            <p className="text-lg mb-8 hero-text">
              Let's discuss how our solutions can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hero-primary-btn"
              >
                Schedule Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 border-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hero-secondary-btn"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px opacity-50 hero-divider"></div>
      </section>
    </>
  );
};

export default HomePage;
