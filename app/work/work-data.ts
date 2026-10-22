export interface ProjectFeature {
  title: string;
  description: string;
  tag: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

export interface DetailedProject {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  outcome: string;
  badge1: string;
  badge2: string;
  type: "erp" | "hospitality" | "booking";
  buttonVariant: "solid";
  bgGlow: string;
  heroImage: string;
  client: string;
  industry: string;
  timeline: string;
  websiteUrl: string;
  overview: {
    summary: string;
    challenge: string;
    solution: string;
    architecture: string;
    techStack: string[];
  };
  features: ProjectFeature[];
  impact: {
    headline: string;
    description: string;
    metrics: ProjectMetric[];
    quote: {
      text: string;
      author: string;
      role: string;
    };
  };
}

export const DETAILED_PROJECTS: DetailedProject[] = [
  {
    slug: "enterprise-erp",
    tag: "SAAS · ERP",
    title: "Enterprise Resource Planning (ERP) Platform",
    subtitle: "A unified cloud operational backbone designed to eliminate software fragmentation for fast-scaling enterprises.",
    description:
      "Engineered a scalable SaaS ERP solution tailored for small-to-medium businesses, unifying inventory, finance, and human resources into a single real-time dashboard.",
    year: "2024",
    outcome: "Unified business operations",
    badge1: "SaaS Core →",
    badge2: "Real-time Sync",
    type: "erp",
    buttonVariant: "solid",
    bgGlow: "radial-gradient(circle at 80% 20%, rgba(0, 112, 198, 0.45) 0%, rgba(10, 16, 29, 0) 70%)",
    heroImage: "/Images/solution1.png",
    client: "ApexLogix Enterprises",
    industry: "Manufacturing & Supply Chain",
    timeline: "6 Months",
    websiteUrl: "https://erp.iconexit.com",
    overview: {
      summary:
        "ApexLogix was struggling with fragmented legacy tools across accounting, warehouse logistics, and payroll. Departments were operating in silos, requiring manual data synchronization and resulting in costly reconciliation bottlenecks.",
      challenge:
        "The legacy architecture suffered from high latency, inaccurate multi-warehouse inventory levels, and error-prone batch exports. The business needed an enterprise-grade SaaS system capable of handling thousands of concurrent inventory transactions with sub-second synchronization.",
      solution:
        "We architected a high-throughput, multi-tenant cloud ERP platform featuring an event-driven microservices architecture, automated ledger reconciliation, and a modular UI dashboard with real-time operational telemetry.",
      architecture:
        "Built on AWS with a serverless event bus connecting PostgreSQL transactional databases and Redis caching layers. High-volume events are queued through Amazon SQS to guarantee zero data loss during traffic spikes.",
      techStack: [
        "Next.js 15",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "AWS ECS & Fargate",
        "Docker",
        "Tailwind CSS",
        "Prisma ORM",
      ],
    },
    features: [
      {
        tag: "FINANCIALS",
        title: "Automated Multi Entity Ledger",
        description:
          "Consolidated multi currency general ledger with real time balance sheet generation, automated bank reconciliation, and automated tax reporting.",
      },
      {
        tag: "LOGISTICS",
        title: "Intelligent Inventory Telemetry",
        description:
          "Barcode and RFID scanning integration with dynamic reorder point calculations, live stock level tracking, and automated vendor purchase orders.",
      },
      {
        tag: "HR & PAYROLL",
        title: "Workforce Management & Role-Based RBAC",
        description:
          "Granular employee access permissions, automated timesheet verification, department level leave management, and single click compliant payroll runs.",
      },
      {
        tag: "ANALYTICS",
        title: "Executive Pulse Dashboard",
        description:
          "A unified high speed analytics console powered by materialized database views, rendering cash flow, margins, and departmental KPIs with sub 50ms query speeds.",
      },
    ],
    impact: {
      headline: "Transforming Fragmented Operations into a High-Speed Business Engine",
      description:
        "Within four months of deployment, ApexLogix decommissioned four legacy software vendors, drastically lowered software licensing costs, and streamlined daily inventory audits.",
      metrics: [
        { value: "−38%", label: "Operational Overhead", detail: "Significant reduction in administrative data entry hours." },
        { value: "99.98%", label: "Platform Uptime SLA", detail: "Zero unplanned downtime across multi region deployments." },
        { value: "3,500+", label: "Active Daily Users", detail: "Operating concurrently without database performance degradation." },
        { value: "18ms", label: "Average API Latency", detail: "Lightning fast telemetry response for warehouse scanners." },
      ],
      quote: {
        text: "Iconexit replaced our fragile stack of five disjointed tools with a unified platform that our team genuinely loves using every day. It's the best tech investment we've made.",
        author: "Marcus Vance",
        role: "Chief Operating Officer, ApexLogix",
      },
    },
  },
  {
    slug: "hotel-management",
    tag: "SAAS · HOSPITALITY",
    title: "Hotel Management SaaS Suite",
    subtitle: "An end to end cloud property management system engineering delightful guest journeys and maximizing revenue yield.",
    description:
      "Developed a cloud based property management system featuring automated room booking, dynamic pricing, real-time housekeeping tracking, and guest check in portals.",
    year: "2024",
    outcome: "Streamlined guest operations",
    badge1: "Hospitality Suite →",
    badge2: "Smart Booking",
    type: "hospitality",
    buttonVariant: "solid",
    bgGlow: "radial-gradient(circle at 20% 20%, rgba(0, 194, 206, 0.35) 0%, rgba(10, 16, 29, 0) 70%)",
    heroImage: "/Images/solution2.png",
    client: "Grand Horizon Hotel Collection",
    industry: "Hospitality & Leisure",
    timeline: "5 Months",
    websiteUrl: "https://hotels.iconexit.com",
    overview: {
      summary:
        "The Grand Horizon Hotel Collection operates a portfolio of premium boutique resorts. Their previous on-premise PMS resulted in long front-desk check in queues, missed dynamic pricing opportunities, and delayed housekeeping dispatch.",
      challenge:
        "The client required a modern cloud native PMS that synchronized direct website bookings, global OTA channels (Booking.com, Expedia), housekeeping mobile terminals, and mobile digital room keys into one cohesive platform.",
      solution:
        "We designed a multi property PMS suite equipped with an AI driven dynamic pricing engine, web based contactless guest check in portals, and an automated housekeeping dispatch system running on progressive web app technology.",
      architecture:
        "Architected with Next.js App Router for high performance direct guest booking pages, supported by serverless WebSockets for instant room state updates between reception and housekeeping teams.",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Stripe Payments",
        "WebSocket Server",
        "PostgreSQL",
        "Redis",
        "Tailwind CSS",
      ],
    },
    features: [
      {
        tag: "REVENUE OPTIMIZATION",
        title: "Dynamic Revenue Yield Engine",
        description:
          "Algorithmic rate adjustments based on local seasonality, competitor pricing scraping, and real time occupancy triggers to maximize RevPAR.",
      },
      {
        tag: "GUEST EXPERIENCE",
        title: "Contactless Check-In & Digital Keys",
        description:
          "Guests receive a secure web portal on their smartphone 24 hours prior to arrival, allowing digital ID verification, payment authorization, and room unlocking.",
      },
      {
        tag: "OPERATIONS",
        title: "Real time Housekeeping Dispatch",
        description:
          "Instant cleaning assignments sent to floor attendants upon guest checkout, reducing room turnaround time by over 45 minutes on peak turnover days.",
      },
      {
        tag: "DISTRIBUTION",
        title: "Two Way Channel Manager Sync",
        description:
          "Instantaneous two-way inventory sync across Booking.com, Airbnb, and Expedia, virtually eliminating double-booking incidents across all seasons.",
      },
    ],
    impact: {
      headline: "Boosting Direct Bookings While Slashing Front-Desk Congestion",
      description:
        "Following implementation across four resort locations, Grand Horizon experienced an immediate surge in direct commission free bookings and dramatic guest satisfaction uplifts.",
      metrics: [
        { value: "+28%", label: "Direct Booking Revenue", detail: "Guests booking directly on the seamless web portal." },
        { value: "4.2 min", label: "Check in Reduction", detail: "Average front desk check-in reduced from 7 minutes to under 3." },
        { value: "94%", label: "Average Peak Occupancy", detail: "Optimized through automated dynamic pricing algorithms." },
        { value: "100%", label: "Overbooking Elimination", detail: "Zero double bookings across all external distribution channels." },
      ],
      quote: {
        text: "The contactless check in portal revolutionized our lobby atmosphere. Our guests arrive relaxed, and our revenue managers can optimize pricing with confidence.",
        author: "Eleanor Sterling",
        role: "Managing Director, Grand Horizon Resorts",
      },
    },
  },
  {
    slug: "salon-booking",
    tag: "SAAS · BOOKING",
    title: "Salon Booking & Management System",
    subtitle: "A multi tenant scheduling and client retention platform powering high volume salons and boutique wellness studios.",
    description:
      "Launched a feature rich multi tenant scheduling platform for salons, complete with staff rostering, automated SMS reminders, and integrated digital payments.",
    year: "2023",
    outcome: "Automated client scheduling",
    badge1: "Booking Hub →",
    badge2: "SMS Automation",
    type: "booking",
    buttonVariant: "solid",
    bgGlow: "radial-gradient(circle at 50% 15%, rgba(16, 185, 129, 0.35) 0%, rgba(10, 16, 29, 0) 70%)",
    heroImage: "/Images/solution3.png",
    client: "LuxeStudio Salon Network",
    industry: "Beauty & Personal Care",
    timeline: "4 Months",
    websiteUrl: "https://salon.iconexit.com",
    overview: {
      summary:
        "LuxeStudio operates an expanding network of premium beauty salons. Their stylists relied on manual phone appointments and paper diaries, leading to costly no-shows, schedule conflicts, and disorganized commission payouts.",
      challenge:
        "The solution needed to be exceptionally simple for both non tech savvy salon clients booking on mobile devices and busy stylists managing their daily appointments and tips between client sessions.",
      solution:
        "We built an intuitive multi tenant SaaS booking platform featuring automated two way SMS reminder workflows, instant deposit collection via Stripe, staff calendar sync, and automated commission calculations.",
      architecture:
        "Powered by Next.js and Supabase with automated Twilio SMS triggers scheduled through Redis queues, backed by Stripe Connect for automated stylist payout splits.",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Twilio SMS API",
        "Stripe Connect",
        "Tailwind CSS",
      ],
    },
    features: [
      {
        tag: "SCHEDULING",
        title: "Intelligent Multi Stylist Calendar",
        description:
          "Drag-and drop booking interface that respects individual stylist processing times, equipment availability, and custom buffer durations between appointments.",
      },
      {
        tag: "CLIENT RETENTION",
        title: "Automated SMS Confirmations & Follow Ups",
        description:
          "Two way SMS reminders with instant 'C' confirmation triggers, reducing salon no-shows by more than 75% across participating studios.",
      },
      {
        tag: "PAYMENTS",
        title: "Integrated Stripe Checkout & Tip Splits",
        description:
          "Seamless card pre authorization, automated deposit collections upon booking, contactless checkout, and automated staff gratuity calculations.",
      },
      {
        tag: "MARKETING",
        title: "Client History & Personalized Formulas",
        description:
          "Digital client profiles storing previous color formulas, preferred stylists, visit frequencies, and automated birthday promotional coupons.",
      },
    ],
    impact: {
      headline: "Eliminating No-Shows and Automating Daily Salon Administration",
      description:
        "LuxeStudio experienced an immediate operational turnaround, with stylists spending more time crafting experiences and zero time managing paper diaries.",
      metrics: [
        { value: "−78%", label: "Appointment No-Shows", detail: "Drastic drop thanks to automated two way SMS confirmations." },
        { value: "80,000+", label: "Bookings Processed", detail: "Handled seamlessly within the first 12 months post-launch." },
        { value: "98.5%", label: "Stylist Adoption Rate", detail: "Immediate onboarding with zero formal training required." },
        { value: "+32%", label: "Retail Add On Sales", detail: "Driven by automated post-appointment product recommendations." },
      ],
      quote: {
        text: "The automated SMS reminders alone paid for the system in the first month. Our stylists love having their daily roster in their pocket.",
        author: "Chantelle Beauchamp",
        role: "Founder, LuxeStudio Network",
      },
    },
  },
];

export function getProjectBySlug(slug: string): DetailedProject | undefined {
  return DETAILED_PROJECTS.find((p) => p.slug === slug);
}
