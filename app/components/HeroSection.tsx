"use client";
import Link from "next/link";


import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import { useReady } from "@/app/components/LoadingContext";

interface ServiceItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

const services: ServiceItem[] = [
  {
    id: "01",
    label: "Cloud Infrastructure",
    description: "Scalable cloud architecture built for growth zero downtime, full control across AWS, Azure, and GCP.",
    tag: "INFRASTRUCTURE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" strokeDasharray="2 2"/>
        <path d="M12 22V12M12 2v10M2 12h20" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    id: "02",
    label: "Cybersecurity",
    description: "End-to-end threat detection, pen testing, and compliance frameworks that keep attackers out for good.",
    tag: "SECURITY",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "03",
    label: "Software Development",
    description: "Full-stack engineering from MVP to enterprise scale clean code, agile delivery, measurable output.",
    tag: "ENGINEERING",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
      </svg>
    ),
  },
  {
    id: "04",
    label: "AI & Data Analytics",
    description: "Custom ML pipelines and real time analytics that turn raw data into decisions your business can act on.",
    tag: "INTELLIGENCE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <circle cx="12" cy="5" r="1" fill="currentColor"/>
        <circle cx="17" cy="12" r="1" fill="currentColor"/>
        <circle cx="7" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "05",
    label: "IT Consulting",
    description: "Technology roadmaps and digital transformation advisory that make your next platform decision bulletproof.",
    tag: "STRATEGY",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h22M12 2v22" />
        <path d="m12 2 4 4-4 4M12 22l-4-4 4-4" />
        <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
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
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const isMobile = useIsMobile();
  const ready = useReady();
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
      initial={{ opacity: 0, y: 35 }}
      animate={ready && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={isMobile ? { y: -5 } : { scale: 1.015 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className={`svc-card ${hovered ? "is-hovered" : ""}`}
      >
        <div className="svc-ambient-glow" style={{ opacity: hovered ? 1 : 0 }} />
        <div className="svc-card-body">
          <div className="svc-card-top">
            <motion.div
              className="svc-icon-wrap"
              animate={{
                scale: hovered ? 1.12 : 1,
                filter: hovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none",
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.85)" }}
            >
              {service.icon}
            </motion.div>
            <span className="svc-tag">{service.tag}</span>
          </div>
          <h3 className="svc-label">{service.label}</h3>
          <p className="svc-desc">{service.description}</p>
          <div className="svc-footer">
            <span className="svc-cta">
              Explore Platform
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

export default function HeroSection() {
  const isMobile = useIsMobile();
  const ready = useReady();

  const heroAnim = (delay: number) => ({
    initial: { opacity: 0, y: 15 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Grotesk:wght@700&family=Roboto+Mono:wght@700&display=swap" rel="stylesheet" />

      <style>{`
        .hero-container {
          /* pt-28 in layout already offsets the navbar (112px).
             Use remaining viewport height so the hero fills the screen
             without double-counting the navbar gap. */
          min-height: calc(100vh - 112px);
          background: #FFFFFF;
          font-family: 'Inter', sans-serif;
          color: #1E293B;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .hero-body {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          /* Match the horizontal padding of .services-section (60px).
             Top padding is small because layout's pt-28 already gives
             the navbar clearance — no double-spacing needed. */
          padding: 64px 60px 0 60px;
        }

        .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 100px; /* increase this value to push text down */
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #C74646;
}
        .eyebrow-dot {
          width: 6px; height: 6px;
          background: #C74646; border-radius: 50%;
        }

        .headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5.5vw, 5.5rem);
          font-weight: 700; line-height: 1.02;
          letter-spacing: -0.04em; color: #0F172A;
          margin-top: 20px; max-width: 860px;
        }
       .headline-em {
  background: linear-gradient(135deg, #FF8466 0%, #FF6B4A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block; /* Essential for background gradients to clip correctly on text */
}

        .sub {
          margin-top: 24px; font-size: 1.05rem;
          line-height: 1.7; color: #475569; max-width: 540px;
        }

        .actions {
          display: flex; align-items: center;
          gap: 14px; margin-top: 40px; flex-wrap: wrap;
        }
        .btn-primary {
          display: flex; align-items: center; gap: 8px;
          background: #0F172A; color: #fff; border: none;
          padding: 14px 28px; border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          cursor: pointer; transition: background 0.2s, transform 0.1s;
        }
        .btn-primary:hover { background: #C74646; }
        .btn-ghost {
          background: transparent; color: #475569;
          border: 1px solid rgba(15,23,42,0.1);
          padding: 14px 28px; border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(15,23,42,0.25); color: #0F172A; }

        /* Services section — same horizontal padding as hero-body */
        .services-section {
          position: relative; z-index: 10;
          padding: 80px 60px;
        }
        .services-label {
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #94A3B8; margin-bottom: 32px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* ── Cards ── */
        .svc-card {
          position: relative;
          background: #C74646;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; overflow: hidden;
          display: flex; flex-direction: column; height: 100%;
          will-change: transform, background-color, border-color;
          cursor: default;
          transition: background-color 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s ease;
        }
        .svc-card.is-hovered {
          background: #0A0E17;
          border-color: #C74646;
          box-shadow: 0 30px 60px -20px rgba(199,70,70,0.25);
        }
        .svc-ambient-glow {
          position: absolute; inset: -40px; pointer-events: none; z-index: 0;
          background: radial-gradient(circle at center, rgba(199,70,70,0.15) 0%, transparent 70%);
          mix-blend-mode: screen;
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-card-body {
          position: relative; z-index: 1;
          padding: 32px 26px;
          display: flex; flex-direction: column; flex: 1;
        }
        .svc-card-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 36px;
        }
        .svc-icon-wrap {
          width: auto; height: 32px;
          display: flex; align-items: center; justify-content: flex-start; z-index: 2;
        }
        .svc-icon-wrap svg { width: 34px; height: 34px; stroke-width: 1.35; }
        .svc-tag {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.625rem; font-weight: 700;
          letter-spacing: 0.14em; color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
        }
        .svc-card.is-hovered .svc-tag { color: #C74646; }
        .svc-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.15rem; font-weight: 700; color: #FFFFFF;
          line-height: 1.3; margin-bottom: 12px; letter-spacing: -0.015em;
        }
        .svc-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem; line-height: 1.65;
          color: rgba(255,255,255,0.82); flex: 1; margin-bottom: 36px;
          transition: color 0.3s ease;
        }
        .svc-card.is-hovered .svc-desc { color: #94A3B8; }
        .svc-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.15);
          transition: border-color 0.3s ease;
        }
        .svc-card.is-hovered .svc-footer { border-top-color: #1E293B; }
        .svc-cta {
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.775rem; font-weight: 700; color: #FFFFFF;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1); cursor: pointer;
        }
        .svc-card:hover .svc-cta svg { transform: translateX(4px); }
        .svc-cta svg { width: 12px; height: 12px; transition: transform 0.2s ease; }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-body { padding: 48px 24px 0 24px; }
          .services-section { padding: 50px 24px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 520px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hero-container">
        {!isMobile && (
          <>
            <motion.div
              className="orb orb-1"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="orb orb-2"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <div className="hero-body">
          <motion.div className="eyebrow" {...heroAnim(0.05)}>
            <span className="eyebrow-dot" />
            Enterprise Technology Partner
          </motion.div>

          <motion.h1 className="headline" {...heroAnim(0.15)}>
            We engineer the{" "}
            <span className="headline-em">digital backbone</span>{" "}
            of modern business.
          </motion.h1>

          <motion.p className="sub" {...heroAnim(0.25)}>
            From cloud infrastructure to AI driven insights we deliver
            technology that scales, secures, and accelerates your organisation.
          </motion.p>

         

<motion.div className="actions" {...heroAnim(0.35)}>
  <Link 
    href="/work" 
    className="btn-primary" 
    style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
  >
    Explore our work
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  </Link>
</motion.div>
        </div>

        <section className="services-section">
          <motion.p
            className="services-label"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            Capabilities Matrix
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