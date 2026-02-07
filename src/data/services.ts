import {
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
  Workflow,
  Sparkles,
  MessageSquare,
  BookOpen
} from "lucide-react";

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  color: string;
  features: string[];
  process: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  caseStudies?: {
    title: string;
    description: string;
    result: string;
  }[];
}

export const services: Service[] = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    shortDescription: "We offer a broad spectrum of web development services to fully tap into the capabilities offered by modern web technologies.",
    longDescription: "Our comprehensive web development services transform your digital vision into reality. From responsive designs to robust backend systems, we build scalable web solutions that drive business growth and user engagement. We specialize in creating fast, secure, and maintainable web applications using the latest technologies and best practices.",
    iconName: "Code",
    color: "text-purple-600",
    features: [
      "Custom Web Application Development",
      "Responsive & Mobile-First Design",
      "Progressive Web Applications (PWA)",
      "Full-Stack Development",
      "API Development & Integration",
      "Performance Optimization",
      "SEO-Friendly Architecture",
      "Security Implementation"
    ],
    process: [
      {
        title: "Discovery & Planning",
        description: "We analyze your requirements, target audience, and business goals to create a comprehensive development roadmap."
      },
      {
        title: "Design & Prototyping",
        description: "Our design team creates intuitive wireframes and interactive prototypes for your approval."
      },
      {
        title: "Development",
        description: "Expert developers build your application using modern frameworks and best practices."
      },
      {
        title: "Testing & QA",
        description: "Rigorous testing ensures your application is bug-free, secure, and performs optimally."
      },
      {
        title: "Deployment & Support",
        description: "We deploy your application and provide ongoing maintenance and support."
      }
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Docker", "AWS", "Vercel"],
    benefits: [
      {
        title: "Increased User Engagement",
        description: "Fast, intuitive interfaces that keep users engaged and drive conversions."
      },
      {
        title: "Scalability",
        description: "Architecture built to grow with your business needs without performance degradation."
      },
      {
        title: "Cost Efficiency",
        description: "Optimized development processes reduce time-to-market and total cost of ownership."
      },
      {
        title: "Security & Compliance",
        description: "Industry-standard security practices protect your data and user information."
      }
    ],
    caseStudies: [
      {
        title: "E-Commerce Platform Transformation",
        description: "Rebuilt legacy e-commerce platform with modern tech stack",
        result: "300% improvement in page load time, 45% increase in conversion rate"
      },
      {
        title: "SaaS Application Development",
        description: "Built complete SaaS platform from scratch with multi-tenant architecture",
        result: "Launched in 6 months, acquired 1000+ paying customers"
      }
    ]
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "End-to-end mobile apps development, from business analysis, design to testing and deployment or online market publication.",
    longDescription: "We create innovative mobile applications that engage users and drive business results. Whether you need iOS, Android, or cross-platform solutions, our expert team delivers high-performance apps that provide exceptional user experiences. From concept to app store, we handle every aspect of mobile development.",
    iconName: "Smartphone",
    color: "text-green-600",
    features: [
      "Native iOS Development (Swift)",
      "Native Android Development (Kotlin)",
      "Cross-Platform Development (React Native, Flutter)",
      "Mobile UI/UX Design",
      "App Store Optimization",
      "Push Notifications & Analytics",
      "Offline Functionality",
      "Payment Integration"
    ],
    process: [
      {
        title: "Requirements Analysis",
        description: "Understand your app idea, target audience, and business objectives."
      },
      {
        title: "UI/UX Design",
        description: "Create intuitive, beautiful designs optimized for mobile devices."
      },
      {
        title: "Development",
        description: "Build your app using native or cross-platform technologies."
      },
      {
        title: "Testing & QA",
        description: "Comprehensive testing across devices and operating systems."
      },
      {
        title: "Launch & Marketing",
        description: "Deploy to app stores and implement growth strategies."
      }
    ],
    technologies: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "AWS Amplify", "Xcode", "Android Studio"],
    benefits: [
      {
        title: "Wider Reach",
        description: "Access millions of potential users through app stores."
      },
      {
        title: "Enhanced User Experience",
        description: "Native performance delivers smooth, responsive interactions."
      },
      {
        title: "Brand Loyalty",
        description: "Apps create deeper engagement and customer loyalty."
      },
      {
        title: "Monetization Opportunities",
        description: "Multiple revenue streams through in-app purchases and ads."
      }
    ]
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Comprehensive UI/UX services that include idea to the wireframes, web and mobile app design, consulting, and branding using the latest tools and technologies.",
    longDescription: "We craft beautiful, intuitive digital experiences that delight users and drive business results. Our design philosophy combines aesthetics with functionality, creating interfaces that are both stunning and easy to use. Every design decision is backed by research and user feedback.",
    iconName: "Palette",
    color: "text-orange-600",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design & Branding",
      "Interaction Design",
      "Design Systems & Components",
      "Accessibility Compliance",
      "Usability Testing",
      "Design Iteration & Refinement"
    ],
    process: [
      {
        title: "User Research",
        description: "Conduct interviews, surveys, and analytics to understand user needs."
      },
      {
        title: "Information Architecture",
        description: "Organize content and features logically for optimal navigation."
      },
      {
        title: "Wireframing",
        description: "Create low-fidelity sketches to establish layout and functionality."
      },
      {
        title: "Visual Design",
        description: "Develop high-fidelity mockups with colors, typography, and imagery."
      },
      {
        title: "Prototyping & Testing",
        description: "Build interactive prototypes and test with real users."
      }
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Framer", "Webflow", "User Testing Tools", "Analytics Platforms"],
    benefits: [
      {
        title: "Increased Conversion Rates",
        description: "Well-designed interfaces guide users toward desired actions."
      },
      {
        title: "Reduced Development Cost",
        description: "Clear designs reduce developer confusion and iteration time."
      },
      {
        title: "Brand Differentiation",
        description: "Unique design creates memorable brand experiences."
      },
      {
        title: "User Satisfaction",
        description: "Intuitive interfaces reduce user frustration and support costs."
      }
    ]
  },
  {
    id: "cloud-services",
    slug: "cloud-services",
    title: "Cloud Services",
    shortDescription: "Secure, scalable cloud solutions that optimize infrastructure, reduce costs, and enable seamless digital transformation for your organization.",
    longDescription: "Harness the power of cloud computing to scale your operations, reduce infrastructure costs, and accelerate digital transformation. We provide end-to-end cloud solutions including migration, architecture design, deployment, and ongoing management on major cloud platforms.",
    iconName: "Cloud",
    color: "text-blue-600",
    features: [
      "Cloud Architecture Design",
      "Cloud Migration Services",
      "Infrastructure as Code (IaC)",
      "Multi-Cloud Solutions",
      "Disaster Recovery & Backup",
      "Cloud Security & Compliance",
      "Auto-Scaling & Load Balancing",
      "Cost Optimization"
    ],
    process: [
      {
        title: "Assessment",
        description: "Evaluate current infrastructure and cloud readiness."
      },
      {
        title: "Planning & Architecture",
        description: "Design optimal cloud architecture for your needs."
      },
      {
        title: "Migration Strategy",
        description: "Develop phased migration plan to minimize downtime."
      },
      {
        title: "Implementation",
        description: "Execute migration and setup cloud infrastructure."
      },
      {
        title: "Optimization & Support",
        description: "Monitor, optimize, and provide ongoing support."
      }
    ],
    technologies: ["AWS", "Google Cloud Platform", "Microsoft Azure", "Kubernetes", "Docker", "Terraform", "CloudFormation"],
    benefits: [
      {
        title: "Cost Savings",
        description: "Pay-as-you-go model eliminates expensive upfront infrastructure costs."
      },
      {
        title: "Scalability",
        description: "Automatically scale resources based on demand."
      },
      {
        title: "High Availability",
        description: "Built-in redundancy ensures maximum uptime and reliability."
      },
      {
        title: "Security",
        description: "Enterprise-grade security with compliance certifications."
      }
    ]
  },
  {
    id: "ai-integration",
    slug: "ai-integration",
    title: "AI Integration",
    shortDescription: "Leverage cutting-edge AI and machine learning to automate processes, gain insights, and drive intelligent decision-making across your business.",
    longDescription: "Transform your business with artificial intelligence and machine learning solutions. We integrate advanced AI technologies into your applications to automate workflows, predict outcomes, and unlock new business opportunities. From chatbots to predictive analytics, we deliver AI solutions that create measurable value.",
    iconName: "Brain",
    color: "text-purple-600",
    features: [
      "Machine Learning Model Development",
      "Natural Language Processing (NLP)",
      "Computer Vision Solutions",
      "Chatbots & Conversational AI",
      "Predictive Analytics",
      "Recommendation Engines",
      "Data Processing & Analysis",
      "AI Model Deployment & Monitoring"
    ],
    process: [
      {
        title: "Problem Definition",
        description: "Identify business problems that AI can solve."
      },
      {
        title: "Data Collection & Preparation",
        description: "Gather and prepare quality data for model training."
      },
      {
        title: "Model Development",
        description: "Train and optimize machine learning models."
      },
      {
        title: "Integration",
        description: "Integrate AI models into your existing systems."
      },
      {
        title: "Monitoring & Iteration",
        description: "Monitor model performance and continuously improve."
      }
    ],
    technologies: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenAI", "Hugging Face", "Python", "Jupyter", "Apache Spark"],
    benefits: [
      {
        title: "Process Automation",
        description: "Automate repetitive tasks and increase operational efficiency."
      },
      {
        title: "Better Decisions",
        description: "Gain data-driven insights for informed decision-making."
      },
      {
        title: "Competitive Advantage",
        description: "Stay ahead with cutting-edge AI capabilities."
      },
      {
        title: "Revenue Growth",
        description: "Unlock new business opportunities and revenue streams."
      }
    ]
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-Commerce Solutions",
    shortDescription: "Complete e-commerce platforms with secure payment processing, inventory management, and optimized customer journeys for maximum conversion.",
    longDescription: "Launch and scale your online store with our comprehensive e-commerce solutions. We build secure, fast, and conversion-optimized platforms that handle everything from product catalogs to payments and fulfillment. Our solutions grow with your business from startup to enterprise.",
    iconName: "ShoppingCart",
    color: "text-green-600",
    features: [
      "E-Commerce Platform Development",
      "Payment Gateway Integration",
      "Inventory Management System",
      "Order Management",
      "Customer Account Management",
      "Shopping Cart Optimization",
      "Product Search & Filtering",
      "Marketing & Analytics Integration"
    ],
    process: [
      {
        title: "Business Requirements",
        description: "Define your products, target market, and business model."
      },
      {
        title: "Platform Selection & Customization",
        description: "Choose optimal e-commerce platform and customize for your needs."
      },
      {
        title: "Product & Content Setup",
        description: "Catalog setup, product descriptions, and high-quality imagery."
      },
      {
        title: "Payment & Shipping Integration",
        description: "Connect payment gateways and shipping providers."
      },
      {
        title: "Launch & Marketing",
        description: "Deploy store and implement marketing strategies."
      }
    ],
    technologies: ["Shopify", "WooCommerce", "Magento", "Custom Build", "Stripe", "PayPal", "Shopify Plus"],
    benefits: [
      {
        title: "24/7 Sales",
        description: "Generate revenue even while you sleep with online sales."
      },
      {
        title: "Global Reach",
        description: "Sell to customers worldwide without physical limitations."
      },
      {
        title: "Customer Insights",
        description: "Detailed analytics help optimize products and marketing."
      },
      {
        title: "Easy Management",
        description: "Streamlined systems for order, inventory, and customer management."
      }
    ]
  },
  {
    id: "product-development",
    slug: "product-development",
    title: "Product Development",
    shortDescription: "Full-spectrum product development ideation to deployment. Product consultation, Product enhancement, MVP (Minimum Viable Product) and support services with expertise.",
    longDescription: "Turn your product vision into a market-ready reality. From initial concept through full-scale launch, we guide you through every phase of product development. We specialize in creating MVPs quickly, validating ideas with real users, and scaling successful products.",
    iconName: "Package",
    color: "text-cyan-600",
    features: [
      "Product Strategy & Consulting",
      "MVP Development",
      "Prototyping & Validation",
      "Feature Development & Enhancement",
      "Product Roadmapping",
      "User Testing & Feedback",
      "Go-to-Market Strategy",
      "Post-Launch Support & Scaling"
    ],
    process: [
      {
        title: "Ideation & Validation",
        description: "Refine your idea and validate market demand with potential users."
      },
      {
        title: "MVP Development",
        description: "Build minimum viable product with core features quickly."
      },
      {
        title: "User Testing & Feedback",
        description: "Gather feedback from real users and iterate."
      },
      {
        title: "Feature Expansion",
        description: "Add features based on user feedback and business goals."
      },
      {
        title: "Launch & Growth",
        description: "Launch product and scale based on market demand."
      }
    ],
    technologies: ["React", "Node.js", "MongoDB", "Firebase", "Next.js", "TypeScript"],
    benefits: [
      {
        title: "Faster Time to Market",
        description: "MVP approach gets your product to market quickly."
      },
      {
        title: "Reduced Risk",
        description: "Validate ideas before investing heavily in development."
      },
      {
        title: "Better Market Fit",
        description: "Build products based on real user needs and feedback."
      },
      {
        title: "Scalability",
        description: "Architecture built to scale as your product grows."
      }
    ]
  },
  {
    id: "cms-development",
    slug: "cms-development",
    title: "CMS Development",
    shortDescription: "Custom Content Management Systems that give you complete control over your digital content with intuitive interfaces and powerful features.",
    longDescription: "Build a custom CMS that perfectly fits your content management needs. Whether you need to manage web content, media, or complex digital assets, we develop tailored CMS solutions that empower your team to manage content efficiently without technical expertise.",
    iconName: "Database",
    color: "text-indigo-600",
    features: [
      "Custom CMS Development",
      "Headless CMS Solutions",
      "Content Workflow Management",
      "Multi-Language Support",
      "Version Control & Publishing",
      "User Permission Management",
      "SEO Optimization Tools",
      "API-Driven Architecture"
    ],
    process: [
      {
        title: "Requirements Analysis",
        description: "Understand your content types, workflows, and user needs."
      },
      {
        title: "Architecture Design",
        description: "Design scalable, flexible CMS architecture."
      },
      {
        title: "Custom Development",
        description: "Build CMS tailored to your specific requirements."
      },
      {
        title: "Content Migration",
        description: "Migrate existing content to new CMS if needed."
      },
      {
        title: "Training & Support",
        description: "Train your team and provide ongoing support."
      }
    ],
    technologies: ["Strapi", "Contentful", "Sanity", "Node.js", "React", "MongoDB", "PostgreSQL"],
    benefits: [
      {
        title: "Full Control",
        description: "Manage all aspects of your content without vendor lock-in."
      },
      {
        title: "Flexibility",
        description: "Scale and customize as your content needs evolve."
      },
      {
        title: "Team Efficiency",
        description: "Streamlined workflows help teams work faster and smarter."
      },
      {
        title: "Integration Ready",
        description: "Easily integrate with other tools and platforms."
      }
    ]
  },
  {
    id: "devops",
    slug: "devops",
    title: "DevOps & Platform Engineering",
    shortDescription: "Streamline your development and operations with continuous integration, deployment, and infrastructure automation for faster, more reliable releases.",
    longDescription: "Accelerate your development lifecycle with modern DevOps practices and infrastructure automation. We implement CI/CD pipelines, infrastructure-as-code, and monitoring solutions that enable your team to deploy faster, more reliably, and with confidence.",
    iconName: "Cog",
    color: "text-slate-600",
    features: [
      "CI/CD Pipeline Development",
      "Infrastructure as Code (IaC)",
      "Container Orchestration (Kubernetes)",
      "Monitoring & Logging",
      "Security & Compliance Automation",
      "Automated Testing",
      "Infrastructure Management",
      "Disaster Recovery Planning"
    ],
    process: [
      {
        title: "Current State Assessment",
        description: "Evaluate existing development and deployment processes."
      },
      {
        title: "Strategy Development",
        description: "Design DevOps strategy tailored to your needs."
      },
      {
        title: "Tool Selection & Setup",
        description: "Select and configure appropriate DevOps tools."
      },
      {
        title: "Pipeline Implementation",
        description: "Build and optimize CI/CD pipelines."
      },
      {
        title: "Team Training & Support",
        description: "Train teams and provide ongoing DevOps support."
      }
    ],
    technologies: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions", "Terraform", "Ansible", "Prometheus", "ELK Stack"],
    benefits: [
      {
        title: "Faster Deployment",
        description: "Deploy updates and features multiple times per day."
      },
      {
        title: "Higher Quality",
        description: "Automated testing catches issues before production."
      },
      {
        title: "Improved Reliability",
        description: "Consistent processes reduce human errors and downtime."
      },
      {
        title: "Cost Reduction",
        description: "Automation reduces operational overhead and costs."
      }
    ]
  },
  {
    id: "seo-optimization",
    slug: "seo-optimization",
    title: "SEO Optimization",
    shortDescription: "Improve your search engine rankings and organic visibility with comprehensive SEO strategies, technical optimization, and content enhancement.",
    longDescription: "Dominate search results and attract more organic traffic with our comprehensive SEO services. We combine technical optimization, content strategy, and link building to improve your search rankings and drive qualified traffic to your website.",
    iconName: "Target",
    color: "text-red-600",
    features: [
      "Technical SEO Audit",
      "On-Page Optimization",
      "Content Strategy & Optimization",
      "Link Building & Outreach",
      "Local SEO",
      "SEO Analytics & Reporting",
      "Keyword Research & Analysis",
      "Competitive Analysis"
    ],
    process: [
      {
        title: "SEO Audit",
        description: "Comprehensive analysis of your website and SEO performance."
      },
      {
        title: "Strategy Development",
        description: "Create SEO strategy targeting high-value keywords."
      },
      {
        title: "Technical Optimization",
        description: "Fix technical SEO issues and optimize site structure."
      },
      {
        title: "Content Optimization",
        description: "Enhance existing content and create new SEO-optimized content."
      },
      {
        title: "Monitoring & Reporting",
        description: "Track rankings and provide regular performance reports."
      }
    ],
    technologies: ["Google Search Console", "Ahrefs", "SEMrush", "Google Analytics", "Screaming Frog", "Google Core Web Vitals"],
    benefits: [
      {
        title: "Increased Organic Traffic",
        description: "Higher search rankings lead to more organic visitors."
      },
      {
        title: "Cost Efficiency",
        description: "Organic traffic costs less per click than paid advertising."
      },
      {
        title: "Build Authority",
        description: "Establish your brand as an industry authority."
      },
      {
        title: "Long-Term Results",
        description: "SEO benefits continue long after the investment."
      }
    ]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Comprehensive digital marketing services including social media, content marketing, paid advertising, and analytics to grow your online presence.",
    longDescription: "Grow your business with integrated digital marketing strategies. From social media management to paid advertising and content marketing, we create cohesive campaigns that increase brand awareness, drive traffic, and generate leads.",
    iconName: "BarChart3",
    color: "text-pink-600",
    features: [
      "Social Media Management",
      "Content Marketing",
      "Email Marketing",
      "Paid Advertising (PPC)",
      "Marketing Automation",
      "Landing Page Design & Optimization",
      "Analytics & Reporting",
      "Influencer Marketing"
    ],
    process: [
      {
        title: "Strategy Planning",
        description: "Develop comprehensive digital marketing strategy."
      },
      {
        title: "Channel Setup",
        description: "Set up and optimize marketing channels."
      },
      {
        title: "Content Creation",
        description: "Create engaging content for your audience."
      },
      {
        title: "Campaign Execution",
        description: "Launch and manage marketing campaigns."
      },
      {
        title: "Analysis & Optimization",
        description: "Analyze results and optimize for better performance."
      }
    ],
    technologies: ["Google Ads", "Facebook Ads", "Meta Ads", "Mailchimp", "HubSpot", "Buffer", "Google Analytics"],
    benefits: [
      {
        title: "Increased Brand Awareness",
        description: "Reach more potential customers across multiple channels."
      },
      {
        title: "Lead Generation",
        description: "Generate qualified leads that convert into customers."
      },
      {
        title: "Cost Optimization",
        description: "Maximize ROI on marketing spend through optimization."
      },
      {
        title: "Customer Engagement",
        description: "Build stronger relationships with your audience."
      }
    ]
  },
  {
    id: "iot-development",
    slug: "iot-development",
    title: "IoT Development",
    shortDescription: "Build connected devices and IoT solutions that collect, process, and act on data to drive intelligent business outcomes.",
    longDescription: "Transform your business with Internet of Things technology. We develop IoT solutions that connect devices, collect real-time data, and enable intelligent automation. From hardware integration to cloud platforms, we deliver end-to-end IoT ecosystems.",
    iconName: "Zap",
    color: "text-yellow-600",
    features: [
      "IoT Hardware Integration",
      "Firmware Development",
      "Cloud Platform Development",
      "Data Collection & Processing",
      "Real-Time Analytics",
      "Device Management",
      "Security & Encryption",
      "Mobile App for IoT Control"
    ],
    process: [
      {
        title: "Requirements & Design",
        description: "Define IoT solution architecture and hardware needs."
      },
      {
        title: "Hardware Integration",
        description: "Connect and configure IoT devices and sensors."
      },
      {
        title: "Firmware & Backend Development",
        description: "Develop firmware and cloud backend systems."
      },
      {
        title: "Integration & Testing",
        description: "Integrate all components and perform comprehensive testing."
      },
      {
        title: "Deployment & Support",
        description: "Deploy solution and provide ongoing support."
      }
    ],
    technologies: ["Arduino", "Raspberry Pi", "AWS IoT", "Azure IoT", "MQTT", "Node.js", "Python", "LoRaWAN"],
    benefits: [
      {
        title: "Real-Time Data",
        description: "Collect and analyze data as it happens."
      },
      {
        title: "Process Automation",
        description: "Automate processes and reduce manual work."
      },
      {
        title: "Cost Reduction",
        description: "Optimize operations and reduce maintenance costs."
      },
      {
        title: "New Revenue Streams",
        description: "Create new business models with IoT capabilities."
      }
    ]
  },
  {
    id: "consulting",
    slug: "consulting",
    title: "Technology Consulting",
    shortDescription: "Strategic technology consulting to guide your digital transformation, optimize operations, and align technology with business goals.",
    longDescription: "Make confident technology decisions with guidance from our expert consultants. We assess your current state, identify opportunities, and recommend strategies to align technology with your business goals. Whether modernizing legacy systems or planning digital transformation, we provide strategic direction.",
    iconName: "Users",
    color: "text-teal-600",
    features: [
      "Technology Strategy & Roadmapping",
      "Digital Transformation Consulting",
      "Legacy System Modernization",
      "Architecture Review & Optimization",
      "Vendor Evaluation & Selection",
      "Risk Assessment",
      "Process Optimization",
      "Team Capacity Planning"
    ],
    process: [
      {
        title: "Business Discovery",
        description: "Understand your business goals and technology challenges."
      },
      {
        title: "Current State Assessment",
        description: "Evaluate existing technology infrastructure and processes."
      },
      {
        title: "Strategic Planning",
        description: "Develop comprehensive technology strategy and roadmap."
      },
      {
        title: "Implementation Support",
        description: "Guide implementation of recommended strategies."
      },
      {
        title: "Continuous Improvement",
        description: "Monitor progress and adjust strategy as needed."
      }
    ],
    technologies: ["Enterprise Architecture Tools", "TOGAF", "Industry Frameworks", "Best Practices"],
    benefits: [
      {
        title: "Reduced Risk",
        description: "Avoid costly technology mistakes with expert guidance."
      },
      {
        title: "Better ROI",
        description: "Investments in technology deliver measurable business results."
      },
      {
        title: "Faster Transformation",
        description: "Accelerate digital transformation initiatives."
      },
      {
        title: "Competitive Advantage",
        description: "Stay ahead with aligned technology strategy."
      }
    ]
  },
  {
    id: "mvp-development",
    slug: "mvp-development",
    title: "MVP Development",
    shortDescription: "Rapidly develop minimum viable products to validate your idea, gather user feedback, and launch to market with minimal investment.",
    longDescription: "Get your product idea to market fast with our MVP development services. We focus on essential features and rapid iteration to validate your concept with real users. This lean approach reduces risk, proves market demand, and attracts investors.",
    iconName: "Workflow",
    color: "text-lime-600",
    features: [
      "Concept Validation",
      "Feature Prioritization",
      "Agile Development",
      "Rapid Prototyping",
      "User Testing & Feedback",
      "MVP Launch",
      "Metrics & Analytics Setup",
      "Scaling Strategy"
    ],
    process: [
      {
        title: "Idea Validation",
        description: "Validate your idea with potential users before development."
      },
      {
        title: "Feature Scoping",
        description: "Define essential features for MVP launch."
      },
      {
        title: "Rapid Development",
        description: "Build MVP quickly using agile methodologies."
      },
      {
        title: "Launch & Feedback",
        description: "Launch MVP and gather user feedback."
      },
      {
        title: "Iterate & Scale",
        description: "Iterate based on feedback and plan for scaling."
      }
    ],
    technologies: ["React", "Node.js", "Firebase", "MongoDB", "Next.js"],
    benefits: [
      {
        title: "Faster Time to Market",
        description: "Launch in weeks, not months."
      },
      {
        title: "Lower Investment",
        description: "Prove concept before investing heavily."
      },
      {
        title: "Investor Ready",
        description: "MVP with users and traction attracts investors."
      },
      {
        title: "Validated Learning",
        description: "Learn what users actually want from real feedback."
      }
    ]
  },
  {
    id: "content-strategy",
    slug: "content-strategy",
    title: "Content Strategy & Creation",
    shortDescription: "Develop comprehensive content strategies and create engaging content that attracts, engages, and converts your target audience.",
    longDescription: "Content drives business results. We develop strategic content plans and create high-quality content that resonates with your audience. From blog posts to videos, we create content that builds authority, drives traffic, and converts readers into customers.",
    iconName: "FileText",
    color: "text-blue-700",
    features: [
      "Content Strategy Development",
      "Content Calendar & Planning",
      "Blog & Article Writing",
      "Video Content Creation",
      "Infographic Design",
      "Copywriting",
      "Content Optimization",
      "Content Distribution & Promotion"
    ],
    process: [
      {
        title: "Audience & Goals Definition",
        description: "Define target audience and content goals."
      },
      {
        title: "Content Strategy",
        description: "Develop comprehensive content strategy and topics."
      },
      {
        title: "Content Creation",
        description: "Create high-quality, engaging content."
      },
      {
        title: "Optimization",
        description: "Optimize content for search engines and conversions."
      },
      {
        title: "Distribution & Analytics",
        description: "Distribute content and track performance."
      }
    ],
    technologies: ["WordPress", "Medium", "LinkedIn", "YouTube", "Canva", "Video Editing Software"],
    benefits: [
      {
        title: "Build Authority",
        description: "Establish yourself as an industry expert."
      },
      {
        title: "Attract Traffic",
        description: "Quality content attracts organic visitors."
      },
      {
        title: "Lead Generation",
        description: "Content engages and converts potential customers."
      },
      {
        title: "Brand Loyalty",
        description: "Valuable content builds trust and loyalty."
      }
    ]
  },
  {
    id: "website-maintenance",
    slug: "website-maintenance",
    title: "Website Maintenance & Support",
    shortDescription: "Ongoing website maintenance, security updates, performance optimization, and technical support to keep your site running smoothly.",
    longDescription: "Keep your website secure, fast, and up-to-date with our comprehensive maintenance and support services. We handle updates, security patches, backups, monitoring, and optimization so you can focus on your business.",
    iconName: "Shield",
    color: "text-red-600",
    features: [
      "Regular Updates & Patches",
      "Security Monitoring",
      "Performance Optimization",
      "Backup & Recovery",
      "Uptime Monitoring",
      "Bug Fixes & Troubleshooting",
      "Content Updates",
      "Technical Support"
    ],
    process: [
      {
        title: "Audit & Planning",
        description: "Assess current state and create maintenance plan."
      },
      {
        title: "Monitoring Setup",
        description: "Implement monitoring and alerting systems."
      },
      {
        title: "Regular Maintenance",
        description: "Perform scheduled updates and optimizations."
      },
      {
        title: "Support & Response",
        description: "Provide rapid support for issues and emergencies."
      },
      {
        title: "Reporting",
        description: "Provide regular reports on site health and performance."
      }
    ],
    technologies: ["WordPress", "Cloudflare", "Uptime Robot", "New Relic", "Automated Backups"],
    benefits: [
      {
        title: "Security",
        description: "Stay protected against security threats."
      },
      {
        title: "Reliability",
        description: "Maximize uptime and website availability."
      },
      {
        title: "Performance",
        description: "Keep site fast and responsive."
      },
      {
        title: "Peace of Mind",
        description: "Focus on business while we handle technical issues."
      }
    ]
  },
  {
    id: "ai-consulting",
    slug: "ai-consulting",
    title: "AI Consulting",
    shortDescription: "Strategic AI consulting to identify opportunities, assess readiness, and develop AI implementation roadmaps for your business.",
    longDescription: "Transform your business with AI strategy consulting. Our expert consultants help you identify AI opportunities, assess organizational readiness, and develop comprehensive implementation roadmaps. We guide you through the entire AI journey from exploration to deployment.",
    iconName: "Brain",
    color: "text-blue-600",
    features: [
      "AI Opportunity Assessment",
      "Business Case Development",
      "Technology Stack Recommendations",
      "AI Readiness Assessment",
      "Risk & Compliance Analysis",
      "Implementation Roadmap",
      "Team Building Strategy",
      "Change Management Planning"
    ],
    process: [
      {
        title: "Business Analysis",
        description: "Understand your business goals, challenges, and opportunities."
      },
      {
        title: "AI Assessment",
        description: "Evaluate where AI can create the most impact."
      },
      {
        title: "Strategy Development",
        description: "Create comprehensive AI strategy and implementation plan."
      },
      {
        title: "Technology Selection",
        description: "Recommend suitable AI tools and platforms."
      },
      {
        title: "Roadmap Creation",
        description: "Develop detailed implementation timeline and milestones."
      }
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Azure AI", "AWS AI", "Google AI", "Scikit-learn"],
    benefits: [
      {
        title: "Competitive Advantage",
        description: "Leverage AI to outpace competitors and capture market share."
      },
      {
        title: "Operational Excellence",
        description: "Automate processes and improve efficiency with AI."
      },
      {
        title: "Data-Driven Decisions",
        description: "Make better business decisions with AI insights."
      },
      {
        title: "Risk Mitigation",
        description: "Identify and manage AI implementation risks proactively."
      }
    ],
    caseStudies: [
      {
        title: "Retail AI Transformation",
        description: "Consulted major retailer on AI strategy for customer experience",
        result: "Identified 5 key AI initiatives, projected $2M annual savings"
      }
    ]
  },
  {
    id: "ai-development",
    slug: "ai-development",
    title: "AI Development",
    shortDescription: "Custom AI solutions including machine learning models, predictive analytics, and intelligent systems tailored to your business needs.",
    longDescription: "Build powerful AI applications with our expert development team. We create custom machine learning models, predictive analytics systems, and intelligent applications that solve real business problems. From data preparation to model deployment, we handle every step.",
    iconName: "Brain",
    color: "text-cyan-600",
    features: [
      "Machine Learning Model Development",
      "Predictive Analytics",
      "Computer Vision Solutions",
      "Natural Language Processing",
      "Data Pipeline Development",
      "Model Training & Optimization",
      "API Development & Integration",
      "Deployment & Monitoring"
    ],
    process: [
      {
        title: "Data Collection",
        description: "Gather and prepare training data for model development."
      },
      {
        title: "Model Development",
        description: "Design and train machine learning models."
      },
      {
        title: "Validation & Testing",
        description: "Evaluate model performance and accuracy."
      },
      {
        title: "Optimization",
        description: "Fine-tune models for production deployment."
      },
      {
        title: "Deployment & Monitoring",
        description: "Deploy models and monitor performance in production."
      }
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "AWS ML", "Azure ML", "Google Cloud AI"],
    benefits: [
      {
        title: "Automation",
        description: "Automate complex processes with intelligent systems."
      },
      {
        title: "Improved Accuracy",
        description: "Machine learning models provide better predictions than rules-based systems."
      },
      {
        title: "Scalability",
        description: "AI models scale to handle growing data volumes."
      },
      {
        title: "Cost Reduction",
        description: "Reduce costs through automation and optimization."
      }
    ],
    caseStudies: [
      {
        title: "Predictive Maintenance AI",
        description: "Developed ML model to predict equipment failures",
        result: "Reduced downtime by 40%, saved $500K annually"
      }
    ]
  },
  {
    id: "generative-ai-development",
    slug: "generative-ai-development",
    title: "Generative AI Development",
    shortDescription: "Harness the power of generative AI with custom solutions including text generation, image synthesis, and creative AI applications.",
    longDescription: "Unlock the potential of generative AI for your business. We build innovative generative AI applications including content generation, code generation, image creation, and more. Our solutions leverage latest models like GPT, DALL-E, and Stable Diffusion.",
    iconName: "Sparkles",
    color: "text-violet-600",
    features: [
      "Large Language Model Integration",
      "Custom Fine-tuning",
      "Content Generation Pipelines",
      "Image & Video Generation",
      "Code Generation Systems",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "API Integration & Optimization"
    ],
    process: [
      {
        title: "Requirements & Use Cases",
        description: "Define specific generative AI use cases and requirements."
      },
      {
        title: "Model Selection",
        description: "Choose optimal base models and fine-tuning strategies."
      },
      {
        title: "Fine-tuning & Training",
        description: "Train models on your data for domain-specific performance."
      },
      {
        title: "Prompt Engineering",
        description: "Develop optimal prompts and workflows."
      },
      {
        title: "Integration & Deployment",
        description: "Integrate into your applications and scale to production."
      }
    ],
    technologies: ["OpenAI API", "GPT-4", "Claude", "DALL-E", "Stable Diffusion", "LLaMA", "Hugging Face", "LangChain"],
    benefits: [
      {
        title: "Content at Scale",
        description: "Generate high-quality content rapidly at reduced costs."
      },
      {
        title: "Creative Capabilities",
        description: "Unlock new creative possibilities with generative models."
      },
      {
        title: "Faster Development",
        description: "Accelerate coding and documentation with AI assistance."
      },
      {
        title: "Enhanced Productivity",
        description: "Boost team productivity with AI-powered tools."
      }
    ],
    caseStudies: [
      {
        title: "AI Content Generation Platform",
        description: "Built content generation platform for marketing teams",
        result: "50% faster content creation, 30% cost reduction"
      }
    ]
  },
  {
    id: "ai-agent-development",
    slug: "ai-agent-development",
    title: "AI Agent Development",
    shortDescription: "Create autonomous AI agents that can perceive, reason, and take action to solve complex business problems independently.",
    longDescription: "Develop intelligent autonomous agents that can operate independently, learn from interactions, and improve over time. Our AI agents can handle customer service, data analysis, process automation, and more with minimal human intervention.",
    iconName: "Zap",
    color: "text-amber-600",
    features: [
      "Autonomous Agent Architecture",
      "Reinforcement Learning Implementation",
      "Multi-Agent Systems",
      "Natural Language Understanding",
      "Decision-Making Systems",
      "Real-time Learning",
      "Integration with Business Systems",
      "Performance Monitoring & Optimization"
    ],
    process: [
      {
        title: "Agent Design",
        description: "Design agent architecture and define behavioral objectives."
      },
      {
        title: "Environment Setup",
        description: "Create simulation environments for training."
      },
      {
        title: "Training",
        description: "Train agents using reinforcement learning techniques."
      },
      {
        title: "Evaluation",
        description: "Test agent performance and refine strategies."
      },
      {
        title: "Deployment",
        description: "Deploy agents to production systems with monitoring."
      }
    ],
    technologies: ["Reinforcement Learning", "Multi-agent Framework", "ROS", "OpenAI Gym", "Ray RLlib", "TensorFlow Agents", "Python"],
    benefits: [
      {
        title: "24/7 Operations",
        description: "Agents work continuously without fatigue or downtime."
      },
      {
        title: "Scalability",
        description: "Deploy multiple agents to handle growing workloads."
      },
      {
        title: "Improved Decisions",
        description: "Agents learn optimal strategies over time."
      },
      {
        title: "Reduced Manual Work",
        description: "Automate complex tasks that require decision-making."
      }
    ]
  },
  {
    id: "chatgpt-development",
    slug: "chatgpt-development",
    title: "ChatGPT Development",
    shortDescription: "Build intelligent chatbots and conversational AI applications powered by ChatGPT and other large language models.",
    longDescription: "Create powerful conversational AI experiences with ChatGPT integration. We build intelligent chatbots for customer service, support, sales, and engagement. Our solutions understand context, provide accurate responses, and improve through continuous learning.",
    iconName: "MessageSquare",
    color: "text-green-600",
    features: [
      "Custom Chatbot Development",
      "Natural Language Understanding",
      "Multi-language Support",
      "Context-Aware Responses",
      "Integration with Knowledge Bases",
      "Sentiment Analysis",
      "Chat Analytics & Insights",
      "Continuous Learning & Improvement"
    ],
    process: [
      {
        title: "Requirements Analysis",
        description: "Define chatbot capabilities and conversation flows."
      },
      {
        title: "Training Data Preparation",
        description: "Prepare domain-specific training data and knowledge bases."
      },
      {
        title: "Model Fine-tuning",
        description: "Fine-tune ChatGPT for your specific use cases."
      },
      {
        title: "Integration",
        description: "Integrate with your platforms and systems."
      },
      {
        title: "Testing & Launch",
        description: "Test thoroughly and deploy to production."
      }
    ],
    technologies: ["OpenAI API", "ChatGPT", "GPT-4", "LangChain", "Node.js", "Python", "Webhooks", "Vector Databases"],
    benefits: [
      {
        title: "Improved Customer Service",
        description: "24/7 instant support reduces response times."
      },
      {
        title: "Cost Savings",
        description: "Reduce support costs by automating routine inquiries."
      },
      {
        title: "Better Engagement",
        description: "Natural conversations increase customer satisfaction."
      },
      {
        title: "Valuable Insights",
        description: "Gather insights from customer conversations."
      }
    ],
    caseStudies: [
      {
        title: "E-Commerce Support Chatbot",
        description: "Built ChatGPT-powered support bot for online retailer",
        result: "Handled 70% of inquiries, 40% reduction in support costs"
      }
    ]
  },
  {
    id: "llm-development",
    slug: "llm-development",
    title: "LLM Development",
    shortDescription: "Develop and deploy custom large language models optimized for your specific business applications and requirements.",
    longDescription: "Build and deploy custom large language models tailored to your domain. We handle everything from fine-tuning existing models to training models from scratch. Our solutions provide better performance and control compared to generic models.",
    iconName: "BookOpen",
    color: "text-purple-600",
    features: [
      "Model Selection & Evaluation",
      "Fine-tuning Strategies",
      "Custom Model Training",
      "Prompt Engineering",
      "Model Optimization",
      "Inference Optimization",
      "API Development",
      "Monitoring & Maintenance"
    ],
    process: [
      {
        title: "Model Assessment",
        description: "Evaluate available models and select best fit."
      },
      {
        title: "Data Preparation",
        description: "Prepare high-quality training data for your domain."
      },
      {
        title: "Fine-tuning",
        description: "Fine-tune models on domain-specific data."
      },
      {
        title: "Optimization",
        description: "Optimize for performance, speed, and cost."
      },
      {
        title: "Deployment",
        description: "Deploy model with scaling and monitoring."
      }
    ],
    technologies: ["Hugging Face", "PyTorch", "TensorFlow", "NVIDIA GPUs", "vLLM", "Text Generation WebUI", "Modal", "Replicate"],
    benefits: [
      {
        title: "Domain Expertise",
        description: "Models trained on your specific data perform better."
      },
      {
        title: "Cost Efficiency",
        description: "Optimized inference reduces API costs significantly."
      },
      {
        title: "Privacy",
        description: "Keep data private with on-premises or secure hosting."
      },
      {
        title: "Control",
        description: "Full control over model behavior and outputs."
      }
    ]
  },
  {
    id: "ai-workflow-automation",
    slug: "ai-workflow-automation",
    title: "AI & Workflow Automation",
    shortDescription: "Automate complex business processes with AI-powered workflows that improve efficiency, reduce errors, and cut operational costs.",
    longDescription: "Transform your business operations with intelligent workflow automation. We design and implement AI-powered workflows that automate complex processes, improve accuracy, and free up your team for higher-value work. From document processing to business logic automation, we deliver solutions.",
    iconName: "Workflow",
    color: "text-red-600",
    features: [
      "Workflow Analysis & Design",
      "Process Automation",
      "Document Processing (OCR, IDP)",
      "Intelligent Routing",
      "Error Detection & Handling",
      "Integration with Existing Systems",
      "Performance Monitoring",
      "Continuous Optimization"
    ],
    process: [
      {
        title: "Process Discovery",
        description: "Map current workflows and identify automation opportunities."
      },
      {
        title: "Workflow Design",
        description: "Design optimized AI-powered workflows."
      },
      {
        title: "Implementation",
        description: "Build and integrate automation solutions."
      },
      {
        title: "Testing & Validation",
        description: "Test workflows thoroughly before deployment."
      },
      {
        title: "Deployment & Training",
        description: "Deploy and train teams on new workflows."
      }
    ],
    technologies: ["UiPath", "Automation Anywhere", "Blue Prism", "Zapier", "Make", "Apache Airflow", "Python", "RPA"],
    benefits: [
      {
        title: "Efficiency Gains",
        description: "Automate 80%+ of routine tasks."
      },
      {
        title: "Error Reduction",
        description: "AI catches and prevents errors automatically."
      },
      {
        title: "Cost Savings",
        description: "Reduce operational costs by 40-60%."
      },
      {
        title: "Employee Satisfaction",
        description: "Free teams from repetitive tasks for meaningful work."
      }
    ],
    caseStudies: [
      {
        title: "Invoice Processing Automation",
        description: "Automated invoice processing with AI document extraction",
        result: "Processing time reduced from 5 days to 1 day, 99% accuracy"
      }
    ]
  }

];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getAllServices = (): Service[] => {
  return services;
};
