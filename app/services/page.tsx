"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface ServiceItem {
  tag: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  accent: string;       
  bgLight: string;      
  borderLight: string;  
  glow: string;         
}

// ─── Framer Motion Variants ───────────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Paced out staging delay between title and description
    },
  },
} as const;

// Customized slow, organic glide parameters for scrolling into view
const slowFadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1.2,          // Increased duration for a slower entry
      ease: [0.25, 1, 0.5, 1] // Smooth quintic decelerating curve
    } 
  },
} as const;

const slowFadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.25, 1, 0.5, 1] 
    } 
  },
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const services: ServiceItem[] = [
  {
    tag: "Infrastructure",
    title: "Cloud & Infrastructure",
    description:
      "We design and manage cloud environments that scale with your growth — from initial migration to ongoing optimisation across AWS, Azure, and GCP.",
    features: ["Cloud migration", "Infrastructure as code", "Cost optimisation", "24/7 monitoring"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
    accent: "#1D4ED8",      
    bgLight: "#EFF6FF",     
    borderLight: "#DBEAFE",
    glow: "rgba(37,99,235,0.08)",
  },
  {
    tag: "Security",
    title: "Cybersecurity",
    description:
      "Proactive threat detection, penetration testing, and compliance frameworks that protect your data and keep your systems audit-ready.",
    features: ["Penetration testing", "SOC 2 compliance", "Threat monitoring", "Incident response"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    accent: "#0369A1",      
    bgLight: "#F0F9FF",     
    borderLight: "#E0F2FE",
    glow: "rgba(6,182,212,0.08)",
  },
  {
    tag: "Development",
    title: "Software Development",
    description:
      "Full-stack engineering from MVP to enterprise scale — clean architecture, agile delivery, and code your team can actually maintain.",
    features: ["Web & mobile apps", "API development", "System integration", "Code audits"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    accent: "#6366F1",      
    bgLight: "#EEF2F6",     
    borderLight: "#E0E7FF",
    glow: "rgba(129,140,248,0.08)",
  },
  {
    tag: "Intelligence",
    title: "AI & Data Analytics",
    description:
      "Turn raw data into decisions. We build custom ML pipelines, dashboards, and predictive models that make your business measurably smarter.",
    features: ["ML model development", "Data pipelines", "BI dashboards", "Predictive analytics"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    accent: "#BE185D",      
    bgLight: "#FDF2F8",     
    borderLight: "#FCE7F3",
    glow: "rgba(244,114,182,0.08)",
  },
  {
    tag: "Strategy",
    title: "IT Consulting",
    description:
      "Technology roadmaps, vendor selection, and digital transformation advisory — so your next platform decision is built on evidence, not guesswork.",
    features: ["Tech roadmapping", "Vendor evaluation", "Digital transformation", "CTO advisory"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    accent: "#047857",      
    bgLight: "#ECFDF5",     
    borderLight: "#D1FAE5",
    glow: "rgba(52,211,153,0.08)",
  },
  {
    tag: "Support",
    title: "Managed IT Support",
    description:
      "Dedicated support teams, SLA-backed response times, and proactive system health checks — so your team stays focused on the work that matters.",
    features: ["Help desk support", "SLA guarantees", "Remote & on-site", "Proactive maintenance"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20a6 6 0 00-12 0"/><circle cx="12" cy="10" r="4"/><path d="M22 20a9.965 9.965 0 00-2.895-7"/><path d="M2 20a9.965 9.965 0 012.895-7"/>
      </svg>
    ),
    accent: "#6D28D9",      
    bgLight: "#F5F3FF",     
    borderLight: "#EDE9FE",
    glow: "rgba(139,92,246,0.08)",
  },
];

// ─── Detect touch/mobile ──────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(
      window.matchMedia("(hover: none), (max-width: 768px)").matches
    );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Service Card Component ───────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [5, -5]);
  const rotateY = useTransform(x, [-60, 60], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ perspective: isMobile ? undefined : 800 }}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMobile ? undefined : rotateX,
          rotateY: isMobile ? undefined : rotateY,
          transformStyle: isMobile ? undefined : "preserve-3d",
          backgroundColor: service.bgLight,
          borderColor: service.borderLight,
        }}
        whileHover={isMobile ? { y: -4 } : { scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="srv-card"
      >
        {!isMobile && (
          <div className="srv-card-glow" style={{ background: service.glow }} />
        )}

        <div className="srv-card-top">
          <span className="srv-card-tag" style={{ color: service.accent, backgroundColor: `${service.accent}10`, borderColor: `${service.accent}25` }}>
            {service.tag}
          </span>
          <span className="srv-card-icon" style={{ color: service.accent }}>
            {service.icon}
          </span>
        </div>

        <h2 className="srv-card-title" style={{ color: service.accent }}>{service.title}</h2>
        <p className="srv-card-desc">{service.description}</p>

        <div className="srv-card-features">
          {service.features.map((f) => (
            <div key={f} className="srv-card-feature">
              <span className="srv-card-feature-dot" style={{ backgroundColor: service.accent }} />
              {f}
            </div>
          ))}
        </div>

        <a href="#" className="srv-card-link" style={{ color: service.accent }}>
          Learn more
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      <style>{`
        .srv-page {
          background: #FFFFFF;
          min-height: 100vh;
          color: #334155;
          font-family: var(--font-space-grotesk), sans-serif;
        }

        /* ── Hero ── */
        .srv-hero {
          position: relative;
          padding: 60px 60px 80px;
          margin-top: -32px;
          overflow: hidden;
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
        }
        .srv-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .srv-hero-glow {
          position: absolute;
          top: -100px; right: -80px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 107, 74, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .srv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF6B4A;
          margin-bottom: 20px;
        }
        .srv-eyebrow-dot {
          width: 5px; height: 5px;
          background: #FF6B4A;
          border-radius: 50%;
        }
        .srv-hero-title {
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #0F172A;
          max-width: 700px;
          margin-bottom: 24px;
        }
        .srv-hero-title em {
          font-style: normal;
          color: #FF6B4A;
        }
        .srv-hero-sub {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #64748B;
          max-width: 500px;
          margin-bottom: 40px;
        }
        .srv-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FF6B4A;
          color: #fff;
          border: none;
          padding: 13px 26px;
          border-radius: 8px;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .srv-hero-cta:hover { background: #E8512F; transform: translateY(-1px); }

        /* ── Services Grid ── */
        .srv-grid-section {
          padding: 80px 60px;
        }
        .srv-section-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 48px;
        }
        .srv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* LIGHT COLOR CARDS MAPPED SYSTEM */
        .srv-card {
          position: relative;
          border: 1px solid transparent;
          border-radius: 16px;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          will-change: transform;
        }
        .srv-card:hover {
          box-shadow: 0 12px 30px -10px rgba(15, 23, 42, 0.04);
          filter: brightness(0.99);
        }
        .srv-card-glow {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          filter: blur(40px);
        }
        .srv-card:hover .srv-card-glow { opacity: 1; }

        .srv-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .srv-card-tag {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid transparent;
        }
        .srv-card-icon {
          width: 26px; height: 26px;
          flex-shrink: 0;
        }
        .srv-card-icon svg { width: 100%; height: 100%; }

        .srv-card-title {
          font-size: 1.1875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .srv-card-desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: #334155;
          margin-bottom: 28px;
          flex: 1;
        }

        .srv-card-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
        }
        .srv-card-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8125rem;
          color: #475569;
          font-weight: 500;
        }
        .srv-card-feature-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.6;
        }

        .srv-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          margin-top: auto;
          transition: gap 0.2s;
        }
        .srv-card:hover .srv-card-link { gap: 10px; }
        .srv-card-link svg { width: 14px; height: 14px; }

        /* ── Responsive ── */
        @media (max-width: 1120px) {
          .srv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .srv-hero { padding: 60px 24px; }
          .srv-grid-section { padding: 60px 24px; }
          .srv-grid { grid-template-columns: 1fr; gap: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="srv-page">

        {/* ── Hero ── */}
        <section className="srv-hero">
          <div className="srv-hero-grid" />
          <div className="srv-hero-glow" />

          <motion.div
            className="srv-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="srv-eyebrow-dot" />
            What we do
          </motion.div>

          <motion.h1
            className="srv-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Technology services built for <em>real scale</em>
          </motion.h1>

          <motion.p
            className="srv-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            From a single integration to a full digital overhaul — we bring the engineering depth and strategic clarity to make it stick.
          </motion.p>

          <motion.a
            href="/contact"
            className="srv-hero-cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            Talk to our team
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.a>
        </section>

        {/* ── Services Grid ── */}
        <section className="srv-grid-section">
          <p className="srv-section-label">Our services</p>
          <div className="srv-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </section>

        {/* ── 6. CTA (Equipped with Slow and Graceful Scroll-Activated Animations) ── */}
        <section className="bg-ember-500 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
            >
              <div>
                <motion.h2
                  variants={slowFadeLeft}
                  className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
                >
                  Like what you see?
                </motion.h2>
                <motion.p variants={slowFadeLeft} className="mt-2 text-white/80">
                  Let us talk about what you are building.
                </motion.p>
              </div>
              <motion.div variants={slowFadeRight}>
                <Link
                  href="#contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink-950 px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
                >
                  Start a conversation
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}