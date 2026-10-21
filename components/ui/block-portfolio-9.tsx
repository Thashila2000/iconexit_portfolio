"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

//  ------------------------------ | BUSINESS SOLUTIONS / PORTFOLIO 9 | ------------------------------  //

export interface ProjectItem {
  title: string;
  description: string;
  bgColor: string;
  image: string;
  isWide: boolean;
  tag?: string;
  href?: string;
}

const defaultProjects: ProjectItem[] = [
  {
    title: "Enterprise Cloud Platforms",
    description:
      "Resilient multi cloud infrastructure and automated FinOps engineered for zero downtime scale.",
    bgColor: "bg-[#005bb5]",
    image: "/Images/solution1.jpg",
    isWide: true,
    tag: "CLOUD & INFRASTRUCTURE",
    href: "/services",
  },
  {
    title: "AI & Decision Intelligence",
    description:
      "Real time analytics pipelines and secure machine learning models turning telemetry into revenue.",
    bgColor: "bg-[#008f9c]",
    image: "/Images/solution2.jpg",
    isWide: false,
    tag: "DATA ANALYTICS",
    href: "/services",
  },
  {
    title: "Zero Trust Cybersecurity",
    description:
      "Ironclad threat defense, 24/7 endpoint telemetry, and audit ready governance frameworks.",
    bgColor: "bg-[#3730a3]",
    image: "/Images/solution3.jpg",
    isWide: false,
    tag: "SECURITY OPERATIONS",
    href: "/services",
  },
  {
    title: "Bespoke Digital Systems",
    description:
      "Full stack custom software platforms with scalable architectures designed for rapid expansion.",
    bgColor: "bg-[#5b21b6]",
    image: "/Images/solution4.jpg",
    isWide: true,
    tag: "SOFTWARE ENGINEERING",
    href: "/services",
  },
];

// Identical fadeUp animation variant matching services page
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Hook to check for mobile/touch devices matching services page
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(hover: none), (max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Interactive card matching services page 3D tilt, spring hover, and scroll-triggered fadeUp
function PortfolioCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  // 3D perspective tilt calculations matching services page
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [4, -4]);
  const rotateY = useTransform(x, [-60, 60], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      style={{ perspective: isMobile ? undefined : 1100 }}
      custom={index * 0.08}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={project.isWide ? "md:col-span-7" : "md:col-span-5"}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={
          isMobile
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={isMobile ? { y: -5 } : { scale: 1.015 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] ${project.bgColor} h-[380px] shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:h-[450px] lg:h-[480px]`}
      >
        {/* Soft interactive highlight glow on hover */}
        <div
          className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 pointer-events-none rounded-[2rem]"
          style={{ opacity: hovered ? 0.12 : 0 }}
        />

        {/* Text Content */}
        <div className="absolute top-8 right-8 left-8 z-20 flex flex-col gap-2 sm:top-10 sm:right-10 sm:left-10">
          {project.tag && (
            <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">
              {project.tag}
            </span>
          )}
          <h3 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            {project.title}
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
            {project.description}
          </p>
        </div>

        {/* Local Mockup Image */}
        <div className="relative mt-auto flex w-full justify-center overflow-hidden px-4 sm:px-8">
          <div className="relative w-full max-w-xl h-44 sm:h-56 overflow-hidden rounded-t-2xl shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export interface Portfolio9Props {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  buttonText?: string;
  buttonHref?: string;
  projects?: ProjectItem[];
  className?: string;
}

export default function Portfolio9({
  title,
  subtitle = "From high-availability cloud foundations to bespoke AI and software platforms, we engineer systems that empower modern business operations.",
  badge = "Business Solutions",
  buttonText = "Explore Portfolio",
  buttonHref = "/work",
  projects = defaultProjects,
  className = "",
}: Portfolio9Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .bp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0052D4;
          margin-bottom: 10px;
        }
        .bp-eyebrow-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #0052D4 0%, #00C2CE 100%);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 194, 206, 0.6);
        }
        .bp-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.85rem, 3.4vw, 2.85rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin: 0;
          text-align: center;
        }
        .bp-title em {
          font-style: normal;
          font-weight: 800;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bp-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          font-weight: 600;
          color: #1E293B;
          margin-top: 10px;
          line-height: 1.6;
          text-align: center;
        }
        .bp-btn-gradient {
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          box-shadow: 0 6px 20px rgba(0, 112, 198, 0.35);
          color: #FFFFFF;
          border: none;
          transition: all 0.3s ease;
        }
        .bp-btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 112, 198, 0.48);
          filter: brightness(1.04);
        }
        .bp-btn-gradient:active {
          transform: translateY(0);
        }
      `}</style>

      <section className={`bg-[#ffebeb] py-20 sm:py-28 ${className}`}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-12 max-w-7xl">
          {/* Header Section — centered like Testimonials section */}
          <div
            ref={headerRef}
            className="mb-14 flex flex-col items-center text-center"
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isHeaderInView ? "show" : "hidden"}
              custom={0}
              className="max-w-2xl mx-auto flex flex-col items-center text-center"
            >
              <div className="bp-eyebrow">
                <span className="bp-eyebrow-dot" />
                {badge}
              </div>
              <h2 className="bp-title">
                {title || (
                  <>
                    Tailored business solutions<br />
                    engineered for <em>digital growth.</em>
                  </>
                )}
              </h2>
              {subtitle && (
                <p className="bp-subtitle">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {/* Gradient CTA Button */}
            {buttonText && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isHeaderInView ? "show" : "hidden"}
                custom={0.12}
                className="mt-7 flex justify-center"
              >
                <Button
                  size="lg"
                  asChild
                  className="bp-btn-gradient rounded-full px-8 py-3.5 text-sm font-bold tracking-wide gap-2.5 h-auto"
                >
                  <Link href={buttonHref}>
                    <span>{buttonText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Portfolio Grid with exact services page 3D tilt & scroll-triggered entrance */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8">
            {projects.map((project, idx) => (
              <PortfolioCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
