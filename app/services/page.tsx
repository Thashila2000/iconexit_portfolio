"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {a
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "Cloud & Infrastructure",
    description: "We design and manage cloud environments that scale with your growth from initial migration to ongoing optimisation across AWS, Azure, and GCP.",
    features: [
      "Cloud Migration",
      "Infrastructure as Code",
      "Cost Optimisation",
      "24/7 Monitoring",
      "Auto Scaling",
      "Disaster Recovery",
      "Multi-cloud Strategy",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
  },
  {
    title: "Mobile App Development",
    description: "Native iOS & Android and cross-platform apps built with Flutter, React Native, and Swift/Kotlin, engineered for 60fps performance and intuitive UI.",
    features: [
      "iOS & Android App Development",
      "Cross-Platform Apps (Flutter & React Native)",
      "Native Swift & Kotlin Architecture",
      "Mobile UI/UX & Motion Design",
      "API & Cloud Backend Integration",
      "App Store Optimization & Deployment",
      "Offline-First & Real-Time Sync",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" ry="3"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    title: "Software Development",
    description: "Full stack engineering from MVP to enterprise scale, clean architecture, agile delivery, and code your team can actually maintain.",
    features: [
      "Web & Mobile Apps",
      "API Development",
      "System Integration",
      "Code Audits",
      "DevOps & CI/CD",
      "Microservices",
      "Legacy Modernisation",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>
      </svg>
    ),
  },
  {
    title: "AI & Data Analytics",
    description: "Turn raw data into decisions. We build custom ML pipelines, dashboards, and predictive models that make your business measurably smarter.",
    features: [
      "ML Model Development",
      "Data Pipelines",
      "BI Dashboards",
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Real-time Analytics",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    title: "IT Consulting",
    description: "Technology roadmaps, vendor selection, and digital transformation advisory so your next platform decision is built on evidence, not guesswork.",
    features: [
      "Tech Roadmapping",
      "Vendor Evaluation",
      "Digital Transformation",
      "CTO Advisory",
      "Process Optimisation",
      "Change Management",
      "Risk Assessment",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    title: "Managed IT Support",
    description: "Dedicated support teams, SLA-backed response times, and proactive system health checks so your team stays focused on the work that matters.",
    features: [
      "Help Desk Support",
      "SLA Guarantees",
      "Remote & On-site",
      "Proactive Maintenance",
      "Network Management",
      "Backup & Recovery",
      "Asset Management",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20a6 6 0 00-12 0"/><circle cx="12" cy="10" r="4"/>
        <path d="M22 20a9.965 9.965 0 00-2.895-7"/><path d="M2 20a9.965 9.965 0 012.895-7"/>
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ServicesPage() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const current = services[active];

  // Keep the selected pill visible inside the swipeable row (skip first render).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const btn = tabsRef.current?.children[active] as HTMLElement | undefined;
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <>
      <style>{`

        /* Hero */
        .srv-hero {
          position: relative;
          padding: 160px 60px 80px;
          overflow: hidden;
        }
        .srv-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #00C2CE; margin-bottom: 16px;
        }
        .srv-eyebrow-dot {
          width: 5px; height: 5px; background: #00C2CE;
          border-radius: 50%; box-shadow: 0 0 8px #00C2CE;
        }
        .srv-hero-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem); font-weight: 700;
          letter-spacing: -0.03em; line-height: 1.1; color: #FFFFFF;
          max-width: 800px; margin-bottom: 24px;
          font-family: var(--font-space-grotesk), sans-serif;
        }
        .srv-hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .srv-hero-sub {
          font-size: 1.125rem; line-height: 1.65; color: #CBD5E1;
          opacity: 0.9; max-width: 576px; margin-bottom: 32px;
          font-family: var(--font-space-grotesk), sans-serif;
        }

        /* Bottom section with light background */
        .srv-bottom {
          background: #ffebeb;
        }

        /* Tab Strip */
        .srv-tabs-wrap {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 40px 60px 0;
        }
        .srv-tabs-wrap::-webkit-scrollbar { display: none; }

        .srv-tabs {
          display: flex; gap: 12px;
          min-width: max-content;
          padding-bottom: 8px;
        }

        .srv-tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 26px;
          border-radius: 9999px;
          border: 1.5px solid rgba(15, 23, 42, 0.12);
          background: #FFFFFF;
          color: #0F172A;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          outline: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }
        .srv-tab:hover {
          border-color: #0070C6;
          color: #0052D4;
          background: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 112, 198, 0.15);
        }
        .srv-tab.active {
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          border-color: transparent;
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(0, 112, 198, 0.35);
          transform: translateY(-1px);
        }

        /* Panel */
        .srv-panel-wrap {
          padding: 50px 60px 100px;
          position: relative;
        }

        .srv-panel {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* Left col */
        .srv-panel-left {
          position: relative;
        }

        .srv-panel-icon-wrap {
          width: 72px; height: 72px;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1.5px solid rgba(0, 112, 198, 0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0, 82, 212, 0.08);
        }
        .srv-panel-icon-wrap svg {
          width: 36px; height: 36px;
          stroke: #0066EE;
        }

        .srv-panel-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: #0a101d;
          margin-bottom: 20px;
        }

        .srv-panel-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.0625rem;
          line-height: 1.75;
          color: #0F172A;
          font-weight: 500;
          max-width: 520px;
        }

        /* Feature Box */
        .srv-feature-box {
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          border-radius: 24px;
          padding: 36px 36px 32px;
          box-shadow: 0 16px 40px rgba(0, 82, 212, 0.28);
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .srv-feature-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .srv-feature-box-pill {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.18);
          padding: 5px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .srv-feature-box-count {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .srv-feature-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
        }

        .srv-feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.02rem;
          font-weight: 500;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .srv-feature-item:last-child {
          border-bottom: none;
        }
        .srv-feature-item:hover {
          transform: translateX(5px);
        }

        .srv-feature-bullet {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .srv-panel { grid-template-columns: 1fr; gap: 36px; }
        }

        /* ─────────────────────────────────────────────────────────────
           MOBILE: same look as before (icon above title, large pills,
           roomy feature box) but the whole section is sized in em, and
           the em itself is derived from the screen height. So it always
           fills the visible screen and nothing is ever cropped.
           ───────────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .srv-hero { padding: 130px 24px 50px; }

          .srv-bottom {
            /* Height of your fixed navbar. Adjust if yours differs. */
            --srv-header-h: 80px;
            /* 1em = (visible screen height) / 46. Capped so tall screens don't get huge. */
            font-size: clamp(10.5px, calc((100svh - var(--srv-header-h)) / 46), 16px);
            min-height: calc(100svh - var(--srv-header-h));
            scroll-margin-top: var(--srv-header-h);
            display: flex;
            flex-direction: column;
          }

          /* Pills: still one swipeable row, like before */
          .srv-tabs-wrap {
            padding: 0.9em 1em 0;
            -webkit-overflow-scrolling: touch;
            scroll-padding-inline: 1em;
          }
          .srv-tabs { gap: 0.6em; padding: 0.4em 0.2em 0.5em 0; }
          .srv-tab {
            padding: 0.7em 1.3em;
            font-size: 0.9em;
            line-height: 1.2;
          }
          .srv-tab:hover,
          .srv-tab.active { transform: none; }

          .srv-panel-wrap { flex: 1; padding: 0.9em 1em 1.2em; }
          .srv-panel { grid-template-columns: 1fr; gap: 1.1em; }

          .srv-panel-icon-wrap {
            width: 3.2em; height: 3.2em;
            border-radius: 0.9em;
            margin-bottom: 0.8em;
          }
          .srv-panel-icon-wrap svg { width: 1.7em; height: 1.7em; }

          .srv-panel-title {
            font-size: 1.6em;
            line-height: 1.12;
            margin-bottom: 0.5em;
          }
          .srv-panel-desc {
            font-size: 0.95em;
            line-height: 1.55;
            max-width: none;
            min-height: 6.2em; /* 4 lines reserved: box below never jumps between tabs */
          }

          .srv-feature-box {
            padding: 1.3em 1.4em 0.7em;
            border-radius: 1.4em;
          }
          .srv-feature-box-header { padding-bottom: 0.9em; margin-bottom: 0.2em; }
          .srv-feature-box-pill {
            font-size: 0.62em;
            padding: 0.4em 1em;
          }
          .srv-feature-box-count { font-size: 0.8em; }
          .srv-feature-item {
            gap: 0.9em;
            padding: 0.62em 0;
            font-size: 0.92em;
            line-height: 1.3;
          }
          .srv-feature-item:hover { transform: none; }
          .srv-feature-bullet { width: 0.5em; height: 0.5em; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="srv-hero">
        <Image
          src="/Images/abstract img.jpg"
          alt="Services hero background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10, 16, 29, 0.72)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A101D 0%, transparent 40%, rgba(10,16,29,0.8) 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10 }}>
          <motion.div className="srv-eyebrow" variants={fadeUp} custom={0} initial="hidden" animate="show">
            <span className="srv-eyebrow-dot" />
            Our Services
          </motion.div>
          <motion.h1 className="srv-hero-title" variants={fadeUp} custom={0.1} initial="hidden" animate="show">
            Technology services built for <em>real scale.</em>
          </motion.h1>
          <motion.p className="srv-hero-sub" variants={fadeUp} custom={0.2} initial="hidden" animate="show">
            From a single integration to a full digital overhaul we bring the engineering depth and strategic clarity to make it stick.
          </motion.p>
        </div>
      </section>

      {/* Section: Tab Strip + Panel */}
      <div className="srv-bottom">

        {/* Tab Strip */}
        <div className="srv-tabs-wrap">
          <div className="srv-tabs" ref={tabsRef}>
            {services.map((s, i) => (
              <button
                key={s.title}
                className={`srv-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="srv-panel-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="srv-panel"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left Column: Icon, Title & Description */}
              <div className="srv-panel-left">
                <div className="srv-panel-icon-wrap">
                  {current.icon}
                </div>
                <h2 className="srv-panel-title">{current.title}</h2>
                <p className="srv-panel-desc">{current.description}</p>
              </div>

              {/* Right Column: Feature Box in Dark Blue Gradient */}
              <div className="srv-feature-box">
                <div className="srv-feature-box-header">
                  <span className="srv-feature-box-pill">Capabilities</span>
                  <span className="srv-feature-box-count">{current.features.length} Deliverables</span>
                </div>
                <ul className="srv-feature-list">
                  {current.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      className="srv-feature-item"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: fi * 0.04 }}
                    >
                      <span className="srv-feature-bullet" />
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </>
  );
}
