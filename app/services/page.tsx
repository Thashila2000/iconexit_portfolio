"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

interface ServiceItem {
  tag: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const MotionLink = motion(Link);

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
} as const;

const slowFadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } },
} as const;

const slowFadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const services: ServiceItem[] = [
  {
    tag: "INFRASTRUCTURE",
    title: "Cloud & Infrastructure",
    description: "We design and manage cloud environments that scale with your growth — from initial migration to ongoing optimisation across AWS, Azure, and GCP.",
    features: ["Cloud migration", "Infrastructure as code", "Cost optimisation", "24/7 monitoring"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
  },
  {
    tag: "SECURITY",
    title: "Cybersecurity",
    description: "Proactive threat detection, penetration testing, and compliance frameworks that protect your data and keep your systems audit-ready.",
    features: ["Penetration testing", "SOC 2 compliance", "Threat monitoring", "Incident response"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    tag: "ENGINEERING",
    title: "Software Development",
    description: "Full-stack engineering from MVP to enterprise scale — clean architecture, agile delivery, and code your team can actually maintain.",
    features: ["Web & mobile apps", "API development", "System integration", "Code audits"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>
      </svg>
    ),
  },
  {
    tag: "INTELLIGENCE",
    title: "AI & Data Analytics",
    description: "Turn raw data into decisions. We build custom ML pipelines, dashboards, and predictive models that make your business measurably smarter.",
    features: ["ML model development", "Data pipelines", "BI dashboards", "Predictive analytics"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    tag: "STRATEGY",
    title: "IT Consulting",
    description: "Technology roadmaps, vendor selection, and digital transformation advisory — so your next platform decision is built on evidence, not guesswork.",
    features: ["Tech roadmapping", "Vendor evaluation", "Digital transformation", "CTO advisory"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h22M12 2v22"/>
        <path d="m12 2 4 4-4 4M12 22l-4-4 4-4"/>
        <circle cx="12" cy="12" r="7" strokeDasharray="3 3"/>
      </svg>
    ),
  },
  {
    tag: "SUPPORT",
    title: "Managed IT Support",
    description: "Dedicated support teams, SLA-backed response times, and proactive system health checks — so your team stays focused on the work that matters.",
    features: ["Help desk support", "SLA guarantees", "Remote & on-site", "Proactive maintenance"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20a6 6 0 00-12 0"/><circle cx="12" cy="10" r="4"/>
        <path d="M22 20a9.965 9.965 0 00-2.895-7"/><path d="M2 20a9.965 9.965 0 012.895-7"/>
      </svg>
    ),
  },
];

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

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
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
    x.set(0); y.set(0);
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
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={isMobile ? {} : {
          rotateX, rotateY, transformStyle: "preserve-3d",
        }}
        whileHover={isMobile ? { y: -5 } : { scale: 1.015 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className={`srv-card ${hovered ? "is-hovered" : ""}`}
      >
        <div className="srv-ambient-glow" style={{ opacity: hovered ? 1 : 0 }} />

        <div className="srv-card-body">
          <div className="srv-card-top">
            <motion.div
              className="srv-icon-wrap"
              animate={{
                scale: hovered ? 1.12 : 1,
                filter: hovered
                  ? "drop-shadow(0 0 8px rgba(199,70,70,0.5))"
                  : "none",
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.icon}
            </motion.div>
            <span className="srv-tag">{service.tag}</span>
          </div>

          <h3 className="srv-card-title">{service.title}</h3>

          <p className="srv-card-desc">{service.description}</p>

          <div className="srv-card-features">
            {service.features.map((f, fi) => (
              <motion.div
                key={f}
                className="srv-card-feature"
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: index * 0.08 + fi * 0.05 + 0.3 }}
              >
                <span className="srv-feature-dot" />
                {f}
              </motion.div>
            ))}
          </div>

          <div className="srv-footer">
            <span className="srv-cta">
              Explore service
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Roboto+Mono:wght@500;700&family=Inter:wght@400;500;600&display=swap');

        .srv-page { background:#FFFFFF; min-height:100vh; color:#334155; font-family:'Inter',sans-serif; }

        /* ── Hero ── */
        .srv-hero {
          position:relative; padding:160px 60px 80px;
          overflow:hidden; background:#FFFFFF;
          border-bottom:1px solid rgba(15,23,42,0.05);
        }
        .srv-hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(255,107,74,0.03) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,107,74,0.03) 1px,transparent 1px);
          background-size:64px 64px;
          mask-image:radial-gradient(ellipse 80% 100% at 50% 0%,black 40%,transparent 100%);
        }
        .srv-hero-glow {
          position:absolute; top:-100px; right:-80px;
          width:500px; height:500px; border-radius:50%; pointer-events:none;
          background:radial-gradient(circle,rgba(255,107,74,0.06) 0%,transparent 70%);
        }
        .srv-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'Roboto Mono',monospace;
          font-size:0.75rem; font-weight:700; letter-spacing:0.16em;
          text-transform:uppercase; color: #C74646; margin-bottom:16px;
        }
        .srv-eyebrow-dot { width:5px; height:5px; background:#FF6B4A; border-radius:50%; }
        .srv-hero-title {
          font-size:clamp(2.25rem,5vw,4.5rem); font-weight:700;
          letter-spacing:-0.03em; line-height:1.1; color:#132B50;
          max-width:800px; margin-bottom:24px;
          font-family:'Plus Jakarta Sans',sans-serif;
        }
        .srv-hero-title em { font-style:normal; color:#FF6B4A; }
        .srv-hero-sub { font-size:1.125rem; line-height:1.65; color:#132B50; opacity: 0.85; max-width:576px; margin-bottom:32px; }
        
        /* ── Hero CTA updated with scaling support ── */
        .srv-hero-cta {
          display:inline-flex; align-items:center; gap:8px;
          background:#FF6B4A; color:#fff; border:none;
          padding:14px 28px; border-radius:12px;
          font-size:0.875rem; font-weight:600; cursor:pointer;
          text-decoration:none; transition:background 0.2s;
        }
        .srv-hero-cta:hover { background:#E8512F; }

       /* ── Grid section ── */
.srv-grid-section { padding:80px 60px 120px; background:#FFFFFF; }
.srv-section-label {
  font-family:'Plus Jakarta Sans', sans-serif;
  font-size:0.85rem; font-weight:900; letter-spacing:0.08em;
  text-transform:uppercase; color:#94A3B8; margin-bottom:48px;
}
.srv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }

        /* ── Card shell ── */
        .srv-card {
          position:relative;
          background:#132B50;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:20px;
          overflow:hidden;
          display:flex; flex-direction:column;
          height:100%;
          will-change:transform;
          cursor:default;
          background-image:
            repeating-linear-gradient(
              135deg,
              rgba(255,255,255,0.012) 0px,
              rgba(255,255,255,0.012) 1px,
              transparent 1px,
              transparent 12px
            );
          background-color:#132B50;
          transition:border-color 0.4s cubic-bezier(0.16,1,0.3,1),
                     box-shadow 0.4s ease;
        }
        .srv-card.is-hovered {
          border-color:#C74646;
          box-shadow:0 30px 60px -20px rgba(199,70,70,0.2);
        }

        .srv-ambient-glow {
          position:absolute; inset:-40px; pointer-events:none; z-index:0;
          background:radial-gradient(circle at center,rgba(199,70,70,0.12) 0%,transparent 70%);
          mix-blend-mode:screen;
          transition:opacity 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        .srv-card-body {
          position:relative; z-index:1;
          padding:32px 28px;
          display:flex; flex-direction:column; flex:1;
        }

        .srv-card-top {
          display:flex; align-items:center;
          justify-content:space-between;
          margin-bottom:32px;
        }

        .srv-icon-wrap {
          width:36px; height:36px;
          display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,0.85);
          transition:color 0.3s;
        }
        .srv-card.is-hovered .srv-icon-wrap { color:#FFFFFF; }
        .srv-icon-wrap svg { width:34px; height:34px; stroke-width:1.35; }

        .srv-tag {
          font-family:'Roboto Mono',monospace;
          font-size:0.6rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase;
          color:rgba(255,255,255,0.4);
          transition:color 0.3s;
        }
        .srv-card.is-hovered .srv-tag { color:#C74646; }

        .srv-card-title {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:1.15rem; font-weight:700;
          letter-spacing:-0.015em; line-height:1.3;
          color:#FFFFFF; margin-bottom:12px;
        }

        .srv-card-desc {
          font-family:'Inter',sans-serif;
          font-size:0.875rem; line-height:1.65;
          color:rgba(255,255,255,0.5);
          flex:1; margin-bottom:24px;
          transition:color 0.3s;
        }
        .srv-card.is-hovered .srv-card-desc { color:#94A3B8; }

        .srv-card-features {
          display:flex; flex-direction:column; gap:9px;
          margin-bottom:28px;
          border-top:1px solid rgba(255,255,255,0.06);
          padding-top:20px;
          transition:border-color 0.3s;
        }
        .srv-card.is-hovered .srv-card-features { border-top-color:rgba(199,70,70,0.2); }
        .srv-card-feature {
          display:flex; align-items:center; gap:10px;
          font-family:'Inter',sans-serif;
          font-size:0.8375rem; color:#CBD5E1; font-weight:500;
        }
        .srv-feature-dot {
          width:4px; height:4px; border-radius:50%;
          background:#C74646; flex-shrink:0; opacity:0.7;
        }
        .srv-card.is-hovered .srv-feature-dot { opacity:1; }

        .srv-footer {
          display:flex; align-items:center;
          padding-top:18px;
          border-top:1px solid rgba(255,255,255,0.06);
          transition:border-color 0.3s;
        }
        .srv-card.is-hovered .srv-footer { border-top-color:rgba(199,70,70,0.2); }
        .srv-cta {
          font-family:'Plus Jakarta Sans',sans-serif;
          display:inline-flex; align-items:center; gap:6px;
          font-size:0.775rem; font-weight:700;
          color:rgba(255,255,255,0.6);
          transition:color 0.3s, gap 0.2s;
          cursor:pointer;
        }
        .srv-card.is-hovered .srv-cta { color:#C74646; gap:10px; }
        .srv-cta svg { width:13px; height:13px; transition:transform 0.2s; }
        .srv-card:hover .srv-cta svg { transform:translateX(3px); }

        /* ── Responsive ── */
        @media (max-width:1120px) { .srv-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:768px) {
          .srv-hero { padding:130px 24px 60px; }
          .srv-grid-section { padding:60px 24px 80px; }
          .srv-grid { grid-template-columns:1fr; gap:14px; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none!important; transition-duration:0.01ms!important; }
        }
      `}</style>

      <div className="srv-page">

        {/* ── Hero ── */}
        <section className="srv-hero">
          <div className="srv-hero-grid" />
          <div className="srv-hero-glow" />

          <motion.div className="srv-eyebrow" custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span className="srv-eyebrow-dot" />
            Our Services
          </motion.div>

          <motion.h1 className="srv-hero-title" custom={0.1} variants={fadeUp} initial="hidden" animate="show">
            Technology services built for <em>real scale.</em>
          </motion.h1>

          <motion.p className="srv-hero-sub" custom={0.2} variants={fadeUp} initial="hidden" animate="show">
            From a single integration to a full digital overhaul we bring the engineering depth and strategic clarity to make it stick.
          </motion.p>

          <motion.a 
            href="/contact" 
            className="srv-hero-cta" 
            custom={0.3} 
            variants={fadeUp} 
            initial="hidden" 
            animate="show"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Talk to our team
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.a>
        </section>

        {/* ── Services Grid ── */}
        <section className="srv-grid-section">
          <motion.p
            className="srv-section-label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What we do
          </motion.p>
          <div className="srv-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </section>

        {/* ── CTA Band ── */}
        <section className="bg-ember-500 py-15" style={{ overflow: "hidden" }}>
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
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
                  Let&apos;s talk about what you&apos;re building.
                </motion.p>
              </div>
              <motion.div variants={slowFadeRight}>
                <MotionLink
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-colors duration-300"
                  style={{ backgroundColor: '#132B50' }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 21 }}
                >
                  Start a conversation
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MotionLink>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}