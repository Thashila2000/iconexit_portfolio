"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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

interface Project {
  slug: string;
  tag: string;
  title: string;
  description: string;
  year: string;
  outcome: string;
  badge1: string;
  badge2: string;
  type: "erp" | "hospitality" | "booking";
  buttonVariant: "outline" | "solid";
  bgGlow: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    slug: "enterprise-erp",
    tag: "SAAS · ERP",
    title: "Enterprise Resource Planning (ERP) Platform",
    description:
      "Engineered a scalable SaaS ERP solution tailored for small-to-medium businesses, unifying inventory, finance, and human resources into a single real-time dashboard.",
    year: "2024",
    outcome: "Unified business operations",
    badge1: "SaaS Core →",
    badge2: "Real-time Sync",
    type: "erp",
    buttonVariant: "solid",
    bgGlow: "radial-gradient(circle at 80% 20%, rgba(0, 112, 198, 0.45) 0%, rgba(10, 16, 29, 0) 70%)",
    image: "/Images/solution1.png",
  },
  {
    slug: "hotel-management",
    tag: "SAAS · HOSPITALITY",
    title: "Hotel Management SaaS Suite",
    description:
      "Developed a cloud-based property management system featuring automated room booking, dynamic pricing, real-time housekeeping tracking, and guest check-in portals.",
    year: "2024",
    outcome: "Streamlined guest operations",
    badge1: "Hospitality Suite →",
    badge2: "Smart Booking",
    type: "hospitality",
    buttonVariant: "solid",
    bgGlow: "radial-gradient(circle at 20% 20%, rgba(0, 194, 206, 0.35) 0%, rgba(10, 16, 29, 0) 70%)",
    image: "/Images/solution2.png",
  },
  {
    slug: "salon-booking",
    tag: "SAAS · BOOKING",
    title: "Salon Booking & Management System",
    description:
      "Launched a feature-rich multi-tenant scheduling platform for salons, complete with staff rostering, automated SMS reminders, and integrated digital payments.",
    year: "2023",
    outcome: "Automated client scheduling",
    badge1: "Booking Hub →",
    badge2: "SMS Automation",
    type: "booking",
    buttonVariant: "solid",
    bgGlow: "radial-gradient(circle at 50% 15%, rgba(16, 185, 129, 0.35) 0%, rgba(10, 16, 29, 0) 70%)",
    image: "/Images/solution3.png",
  },
];

function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

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
      className="h-full"
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
        className={`gl-card ${hovered ? "is-hovered" : ""}`}
      >
        {/* Ambient Radial Aura & Glow */}
        <div
          aria-hidden="true"
          className="gl-ambient-glow"
          style={{
            background: project.bgGlow,
            opacity: hovered ? 1 : 0.45,
          }}
        />

        {/* Top Pill Badges */}
        <div className="gl-badge-row">
          <span className="gl-pill">{project.badge1}</span>
          <span className="gl-pill">{project.badge2}</span>
        </div>

        {/* Middle Card Image Stage */}
        <div className="gl-stage">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
            className={`object-cover object-top transition-transform duration-700 ease-out ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090E17]/70 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Bottom Content Area */}
        <div className="gl-content">
          <h3 className="gl-title">{project.title}</h3>
          <p className="gl-desc">{project.description}</p>

          {/* View Case Study Button */}
          <Link
            href={`/work/${project.slug}`}
            className="gl-btn-solid"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .wk-page {
          background: #ffebeb;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── Hero ── */
        .wk-hero {
          position: relative;
          padding: 160px 60px 80px;
          overflow: hidden;
          background: #0A101D;
        }
        .wk-hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0;
          text-align: left;
        }
        .wk-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00C2CE;
          margin-bottom: 16px;
        }
        .wk-eyebrow-dot {
          width: 5px;
          height: 5px;
          background: #00C2CE;
          border-radius: 50%;
          box-shadow: 0 0 8px #00C2CE;
        }
        .wk-hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #FFFFFF;
          max-width: 800px;
          margin-bottom: 24px;
          text-align: left;
        }
        .wk-hero-title em {
          font-style: normal;
          font-weight: 700;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .wk-hero-sub {
          font-family: 'Inter', sans-serif;
          font-size: 1.125rem;
          line-height: 1.65;
          color: #CBD5E1;
          opacity: 0.9;
          max-width: 576px;
          margin: 0 0 32px;
          text-align: left;
        }

        /* ── Grid Section ── */
        .wk-grid-section {
          padding: 60px 24px 100px;
          background: #ffebeb;
          max-width: 1160px;
          margin: 0 auto;
        }
        .wk-grid-header {
          position: relative;
          z-index: 10;
          max-width: 900px;
          width: 100%;
          margin: 0 auto 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .wk-grid-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0052D4;
          margin-bottom: 10px;
        }
        .wk-grid-badge-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #0052D4 0%, #00C2CE 100%);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 194, 206, 0.6);
        }
        .wk-grid-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.85rem, 3.4vw, 2.85rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin: 0;
          text-align: center;
        }
        .wk-grid-title em {
          font-style: normal;
          font-weight: 800;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .wk-grid-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          font-weight: 600;
          color: #1E293B;
          margin: 10px auto 0;
          line-height: 1.6;
          max-width: 650px;
          text-align: center;
        }

        .wk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Google Labs Style Showcase Card (Compact Size) ── */
        .gl-card {
          position: relative;
          background: #090E17;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 18px 18px 20px;
          min-height: 490px;
          height: 100%;
          will-change: transform;
          cursor: default;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.35);
          transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s ease;
        }
        .gl-card.is-hovered {
          border-color: rgba(0, 194, 206, 0.5);
          box-shadow: 0 30px 60px -20px rgba(0, 112, 198, 0.35);
        }
        .gl-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Top Pill Badges */
        .gl-badge-row {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .gl-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition: background 0.2s, color 0.2s;
        }
        .gl-pill:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        /* Middle Interactive UI Preview Stage */
        .gl-stage {
          position: relative;
          z-index: 5;
          width: 100%;
          height: 205px;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(14, 22, 36, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 18px;
        }

        /* Content Area */
        .gl-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: flex-end;
        }
        .gl-title {
          font-size: clamp(1.15rem, 1.4vw, 1.35rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .gl-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.81rem;
          line-height: 1.55;
          color: #94A3B8;
          margin-bottom: 18px;
          font-weight: 400;
        }

        /* Bottom Buttons */
        .gl-btn-solid {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 9999px;
          background: #FFFFFF;
          color: #0A101D;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          width: fit-content;
        }
        .gl-btn-solid:hover {
          background: #FFFFFF;
          color: #0052D4;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.45);
        }

        .gl-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          width: fit-content;
        }
        .gl-btn-outline:hover {
          background: #FFFFFF;
          color: #0A101D;
          border-color: #FFFFFF;
          transform: scale(1.03);
          box-shadow: 0 6px 18px rgba(255, 255, 255, 0.25);
        }

        /* ── CTA ── */
        .wk-cta-section {
          padding: 100px 60px;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          text-align: center;
        }
        .wk-cta-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin-bottom: 16px;
        }
        .wk-cta-sub {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
        }
        .wk-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          color: #0052D4;
          padding: 16px 36px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .wk-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        /* ── Responsive ── */
        @media (max-width: 1120px) {
          .wk-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .wk-hero {
            padding: 130px 24px 60px;
            min-height: auto;
          }
          .wk-grid-section {
            padding: 60px 20px 80px;
          }
          .wk-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .gl-card {
            border-radius: 28px;
            padding: 20px;
            min-height: auto;
          }
          .wk-cta-section {
            padding: 80px 24px;
          }
        }
      `}</style>

      <div className="wk-page">
        {/* ── Hero ── */}
        <section className="wk-hero">
          <Image
            src="/Images/abstract img.jpg"
            alt="Work portfolio hero background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10, 16, 29, 0.72)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A101D 0%, transparent 40%, rgba(10, 16, 29, 0.8) 100%)", pointerEvents: "none" }} />

          <div className="wk-hero-content">
            <motion.div className="wk-eyebrow" custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span className="wk-eyebrow-dot" />
              Selected Work
            </motion.div>

            <motion.h1 className="wk-hero-title" custom={0.1} variants={fadeUp} initial="hidden" animate="show">
              Projects that move the <em>needle.</em>
            </motion.h1>

            <motion.p className="wk-hero-sub" custom={0.2} variants={fadeUp} initial="hidden" animate="show">
              A curated selection of modern digital platforms, cloud architectures, and bespoke software engineered for scalable real-world impact.
            </motion.p>
          </div>
        </section>

        {/* ── Project Showcase Grid ── */}
        <section className="wk-grid-section">
          {/* Centered Section Header */}
          <div className="wk-grid-header">
            <motion.div
              className="wk-grid-badge"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="wk-grid-badge-dot" />
              Featured Platforms
            </motion.div>

            <motion.h2
              className="wk-grid-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Bespoke systems built for <em>continuous scale.</em>
            </motion.h2>

            <motion.p
              className="wk-grid-desc"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              Explore how we translate ambitious enterprise visions into high-availability cloud platforms and intuitive digital experiences.
            </motion.p>
          </div>

          <div className="wk-grid">
            {PROJECTS.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="wk-cta-section">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="wk-cta-title">Ready to be our next case study?</h2>
            <p className="wk-cta-sub">
              Tell us about your challenge and we&apos;ll respond with a concrete plan within one business day.
            </p>
            <Link href="/contact" className="wk-cta-btn">
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}

