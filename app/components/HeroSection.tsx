"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface ServiceItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const services: ServiceItem[] = [
  {
    id: "01",
    label: "Cloud Infrastructure",
    description:
      "Scalable, resilient cloud architecture designed to grow with your business — zero downtime, full control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    accent: "#2563EB",
    glow: "rgba(37,99,235,0.08)",
  },
  {
    id: "02",
    label: "Cybersecurity",
    description:
      "End-to-end threat detection, penetration testing, and compliance frameworks that keep attackers out.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.08)",
  },
  {
    id: "03",
    label: "Software Development",
    description:
      "Full-stack engineering from MVP to enterprise — clean code, agile delivery, measurable results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accent: "#818CF8",
    glow: "rgba(129,140,248,0.08)",
  },
  {
    id: "04",
    label: "AI & Data Analytics",
    description:
      "Transform raw data into business intelligence with custom ML models and real-time analytics pipelines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.08)",
  },
  {
    id: "05",
    label: "IT Consulting",
    description:
      "Strategic technology roadmaps, vendor evaluation, and digital transformation advisory for future-ready teams.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    accent: "#34D399",
    glow: "rgba(52,211,153,0.08)",
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

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();

  // Tilt — only created on desktop, idle on mobile
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
        duration: 0.5,
        delay: isMobile ? index * 0.06 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Only apply 3D transforms on desktop
        style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={isMobile ? { y: -4 } : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="service-card"
      >
        {/* Glow — desktop only */}
        {!isMobile && (
          <div className="card-glow" style={{ background: service.glow }} />
        )}

        <div className="card-top">
          <span className="card-id">{service.id}</span>
          <div className="card-icon" style={{ color: service.accent }}>
            {service.icon}
          </div>
        </div>

        <h3 className="card-label">{service.label}</h3>
        <p className="card-desc">{service.description}</p>

        <div className="card-footer">
          <span className="card-cta" style={{ color: service.accent }}>
            Learn more
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
          <div
            className="card-line"
            style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

        .hero-container {
          min-height: calc(100vh - 112px);
          background: #FFFFFF;
          font-family: 'Inter', sans-serif;
          color: #334155;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Grid — hidden on mobile to save paint cost */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        @media (max-width: 768px) { .hero-grid { display: none; } }

        /* Orbs — static on mobile (no animation loop) */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.55;
          will-change: transform; /* promote to own GPU layer */
        }
        .orb-1 {
          width: 480px; height: 480px;
          background: rgba(255,107,74,0.14);
          top: -120px; left: -80px;
        }
        .orb-2 {
          width: 340px; height: 340px;
          background: rgba(6,182,212,0.10);
          top: 60px; right: -60px;
        }
        /* No animation on touch devices */
        @media (hover: none) {
          .orb { animation: none !important; }
        }

        /* Hero body */
        .hero-body {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 60px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 40px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ff6b4a;
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          background: #ff6b4a;
          border-radius: 50%;
        }

        .headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 5.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin-top: 20px;
          max-width: 820px;
        }
        .headline-gradient {
          background: linear-gradient(135deg, #0F172A 0%, #ff6b4a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sub {
          margin-top: 24px;
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #475569;
          max-width: 520px;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ff6b4a;
          color: #fff;
          border: none;
          padding: 13px 26px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #e05333; transform: translateY(-1px); }
        .btn-ghost {
          background: transparent;
          color: #475569;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 13px 26px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(0,0,0,0.2); color: #0F172A; }

        /* Services */
        .services-section {
          position: relative;
          z-index: 10;
          padding: 80px 60px;
        }
        .services-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 32px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* Card — NO backdrop-filter on any device */
        .service-card {
          position: relative;
          background: #FAFAFA;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 16px;
          padding: 28px 24px 24px;
          cursor: default;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, box-shadow 0.25s;
          /* GPU composite layer — avoids layout thrash on hover */
          will-change: transform;
        }
        .service-card:hover {
          border-color: rgba(15,23,42,0.13);
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.07);
        }

        /* Glow blob — desktop only via JS */
        .card-glow {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          filter: blur(40px);
        }
        .service-card:hover .card-glow { opacity: 1; }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .card-id {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #CBD5E1;
        }
        .card-icon { width: 28px; height: 28px; flex-shrink: 0; }
        .card-icon svg { width: 100%; height: 100%; }

        .card-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.3;
          margin-bottom: 10px;
        }
        .card-desc {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: #64748B;
          flex: 1;
        }
        .card-footer {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          transition: gap 0.2s;
        }
        .service-card:hover .card-cta { gap: 10px; }
        .card-cta svg { width: 14px; height: 14px; }
        .card-line { height: 1px; width: 100%; opacity: 0.2; }

        /* Responsive */
        @media (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-body { padding: 0 20px; }
          .services-section { padding: 48px 20px 60px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .sub { font-size: 0.9375rem; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="hero-container">
        <div className="hero-grid" />

        {/* Orbs: animated on desktop, static on mobile */}
        {isMobile ? (
          <>
            <div className="orb orb-1" />
            <div className="orb orb-2" />
          </>
        ) : (
          <>
            <motion.div
              className="orb orb-1"
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="orb orb-2"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <div className="hero-body">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="eyebrow-dot" />
            Enterprise Technology Partner
          </motion.div>

          <motion.h1
            className="headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We engineer the{" "}
            <span className="headline-gradient">digital backbone</span>{" "}
            of modern business.
          </motion.h1>

          <motion.p
            className="sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
          >
            From cloud infrastructure to AI-driven insights — we deliver
            technology that scales, secures, and accelerates your organisation.
          </motion.p>

          <motion.div
            className="actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
          >
            <button className="btn-primary">
              Explore our work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
            <button className="btn-ghost">Watch showreel</button>
          </motion.div>
        </div>

        <section className="services-section">
          <motion.p
            className="services-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            What we do
          </motion.p>
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}