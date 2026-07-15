"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  tag: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  imagePath: string;
  accent: string;
}

const services: ServiceItem[] = [
  {
    tag: "INFRASTRUCTURE",
    title: "Cloud & Infrastructure",
    description: "We design and manage resilient cloud ecosystems that auto-scale with your traffic — from zero-downtime migrations to intelligent cost-saving orchestration across AWS, Azure, and GCP.",
    features: ["Cloud migration", "Infrastructure as code", "Cost optimisation", "24/7 monitoring"],
    imagePath: "/Images/service1.jpg",
    accent: "#F15C31",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F15C31" />
            <stop offset="100%" stopColor="#FF9F43" />
          </linearGradient>
        </defs>
        <path d="M6.5 18C3.46 18 1 15.54 1 12.5C1 9.79 2.95 7.54 5.53 7.07C6.67 4.13 9.6 2 13 2c3.98 0 7.3 2.91 7.89 6.74C22.61 9.14 24 10.91 24 13c0 2.76-2.24 5-5 5H6.5z" fill="url(#cloudGrad)" opacity="0.15"/>
        <path d="M16.5 6.5C15.74 4.43 13.78 3 11.5 3C8.75 3 6.43 4.96 5.92 7.58C3.69 8.04 2 10.02 2 12.4C2 15.16 4.24 17.4 7 17.4H10" stroke="#F15C31" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11V16M12 11L9.5 13.5M12 11L14.5 13.5" stroke="#F15C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "SECURITY",
    title: "Cybersecurity",
    description: "Military-grade threat detection, advanced penetration testing, and ironclad compliance frameworks (SOC 2, ISO) to safeguard your proprietary data and keep your systems audit-ready.",
    features: ["Penetration testing", "SOC 2 compliance", "Threat monitoring", "Incident response"],
    imagePath: "/Images/service2.png",
    accent: "#E85555",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E85555" />
            <stop offset="100%" stopColor="#F15C31" />
          </linearGradient>
        </defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shieldGrad)" opacity="0.15"/>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#E85555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8v5M12 16h.01" stroke="#E85555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "ENGINEERING",
    title: "Software Development",
    description: "Bespoke full-stack systems built with clean, scalable, modular architectures. We write test-driven code your team will actually love to maintain.",
    features: ["Web & mobile apps", "API development", "System integration", "Code audits"],
    imagePath: "/Images/service3.png",
    accent: "#132B50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#132B50" />
            <stop offset="100%" stopColor="#1e4080" />
          </linearGradient>
        </defs>
        <rect x="2" y="3" width="20" height="18" rx="2" fill="url(#codeGrad)" opacity="0.12"/>
        <rect x="2" y="3" width="20" height="18" rx="2" stroke="#132B50" strokeWidth="2"/>
        <path d="M8 10l-3 2.5L8 15M16 10l3 2.5-3 2.5M13.5 8l-3 9" stroke="#132B50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "INTELLIGENCE",
    title: "AI & Data Analytics",
    description: "Transform chaotic data trails into predictable, actionable revenue. We deploy secure machine learning models and high-throughput analytical pipelines.",
    features: ["ML model development", "Data pipelines", "BI dashboards", "Predictive analytics"],
    imagePath: "/Images/service4.jpg",
    accent: "#7C3AED",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#aiGrad)" opacity="0.18"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "STRATEGY",
    title: "IT Consulting",
    description: "Pragmatic digital transformation roadmaps and independent vendor selection based entirely on objective benchmarks, not speculative buzzwords.",
    features: ["Tech roadmapping", "Vendor evaluation", "Digital transformation", "CTO advisory"],
    imagePath: "/Images/service5.jpg",
    accent: "#0891B2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="strategyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" fill="url(#strategyGrad)" opacity="0.12"/>
        <circle cx="12" cy="12" r="9" stroke="#0891B2" strokeWidth="2"/>
        <path d="M12 7v5l3.5 2" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "SUPPORT",
    title: "Managed IT Support",
    description: "Ultra-responsive, SLA-backed engineers monitoring your endpoints 24/7. We resolve performance roadblocks silently in the background before they slow your workflow.",
    features: ["Help desk support", "SLA guarantees", "Remote & on-site", "Proactive maintenance"],
    imagePath: "/Images/service6.png",
    accent: "#059669",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="supportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="url(#supportGrad)" opacity="0.12"/>
        <circle cx="12" cy="12" r="10" stroke="#059669" strokeWidth="2"/>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HomeServices() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const mobilePinRef   = useRef<HTMLDivElement>(null);
  const desktopPinRef  = useRef<HTMLDivElement>(null);
  const headingRef     = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef     = useRef<HTMLSpanElement>(null);

  // ── Word splitter (no Club license needed) ─────────────────────────────────
  const splitWords = (el: HTMLElement): HTMLSpanElement[] => {
    const spans: HTMLSpanElement[] = [];
    const wrap = (node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = (node.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((w) => {
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else if (w) {
            const outer = document.createElement("span");
            outer.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
            const inner = document.createElement("span");
            inner.style.display = "inline-block";
            inner.textContent = w;
            outer.appendChild(inner);
            spans.push(inner);
            frag.appendChild(outer);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(el.childNodes).forEach(wrap);
    return spans;
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Heading animation (both breakpoints) ───────────────────────────────
    if (headingRef.current) {
      const eyebrow = headingRef.current.querySelector<HTMLElement>(".hs-eyebrow");
      const title   = headingRef.current.querySelector<HTMLElement>(".hs-section-title");
      const sub     = headingRef.current.querySelector<HTMLElement>(".hs-section-sub");
      const link    = headingRef.current.querySelector<HTMLElement>(".hs-all-link");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      if (eyebrow) {
        const words = splitWords(eyebrow);
        tl.from(words, { y: "110%", opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 }, 0);
      }
      if (title) {
        const words = splitWords(title);
        tl.from(words, { y: "110%", opacity: 0, duration: 0.75, ease: "power4.out", stagger: 0.055 }, 0.1);
      }
      if (sub)  tl.from(sub,  { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.35);
      if (link) tl.from(link, { x: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, 0.4);
    }

    // ── MOBILE: horizontal pinned slider ────────────────────────────────────
    mm.add("(max-width: 1023px)", () => {
      const track = containerRef.current?.querySelector<HTMLElement>(".hs-mobile-slider-track");
      const cards = gsap.utils.toArray<HTMLElement>(".hs-mobile-card");
      if (!track || !cards.length || !mobilePinRef.current) return;

      gsap.set(cards, { scale: 0.94, opacity: 0.7 });
      gsap.set(cards[0], { scale: 1, opacity: 1 });

      const getScrollDist = () =>
        track.offsetWidth - window.innerWidth + window.innerWidth * 0.08;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobilePinRef.current,
          start: "top 80px",
          end: () => `+=${getScrollDist() * 1.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -getScrollDist(), ease: "none" });
      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(card, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" }, ">-0.1");
      });
    });

    // ── DESKTOP: fullscreen pin + crossfade + progress bar ─────────────────
    mm.add("(min-width: 1024px)", () => {
      const textCards = gsap.utils.toArray<HTMLElement>(".hs-text-card");
      const imgLayers = gsap.utils.toArray<HTMLElement>(".hs-img-layer");
      const accentBar = containerRef.current?.querySelector<HTMLElement>(".hs-accent-bar");
      const counter   = counterRef.current;
      const progressBar = progressBarRef.current;

      if (!textCards.length || !imgLayers.length || !desktopPinRef.current) return;

      // Initial states
      gsap.set(textCards, { opacity: 0, y: 55, pointerEvents: "none" });
      gsap.set(imgLayers, { opacity: 0, scale: 1.06, filter: "blur(6px)" });
      gsap.set(textCards[0], { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(imgLayers[0], { opacity: 1, scale: 1, filter: "blur(0px)" });

      if (accentBar) gsap.set(accentBar, { backgroundColor: services[0].accent });
      if (counter)   counter.textContent = "01";

      const total = services.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopPinRef.current,
          start: "top 80px",
          end: `+=${total * 120}%`,
          pin: true,
          scrub: 1.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Live counter + progress bar
            const idx = Math.min(Math.round(self.progress * (total - 1)), total - 1);
            if (counter) counter.textContent = String(idx + 1).padStart(2, "0");
            if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
          },
        },
      });

      for (let i = 1; i < total; i++) {
        const label = `step${i}`;
        tl.addLabel(label)
          // outgoing
          .to(textCards[i - 1], { opacity: 0, y: -55, pointerEvents: "none", duration: 1, ease: "power2.inOut" }, label)
          .to(imgLayers[i - 1], { opacity: 0, scale: 0.96, filter: "blur(6px)", duration: 1, ease: "power2.inOut" }, label)
          // incoming
          .to(textCards[i], { opacity: 1, y: 0, pointerEvents: "auto", duration: 1, ease: "power2.inOut" }, label)
          .to(imgLayers[i], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.inOut" }, label)
          // accent color shift
          .to(accentBar ?? {}, { backgroundColor: services[i].accent, duration: 0.8, ease: "power2.inOut" }, label)
          // breathing pause
          .to({}, { duration: 0.6 });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="hs-section">
      <style>{`
        /* ── Base ── */
        .hs-section {
          background: #FFFFFF;
          color: #132B50;
          position: relative;
          width: 100%;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ── Heading block ── */
        .hs-heading-block {
          max-width: 1200px;
          margin: 0 auto;
          padding: 88px 5% 52px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .hs-heading-left { max-width: 680px; }

        .hs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F15C31;
          margin-bottom: 14px;
          overflow: hidden;
        }
        .hs-eyebrow-dot {
          width: 6px; height: 6px;
          background: #F15C31;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(241,92,49,0.5);
          flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }

        .hs-section-title {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #132B50;
          margin: 0 0 14px;
          overflow: hidden;
        }
        .hs-section-title em { font-style: normal; color: #F15C31; }

        .hs-section-sub {
          font-size: 1rem;
          color: #64748B;
          line-height: 1.6;
          margin: 0;
        }

        .hs-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 1.5px solid #132B50;
          border-radius: 10px;
          font-size: 0.825rem;
          font-weight: 700;
          color: #132B50;
          text-decoration: none;
          white-space: nowrap;
          align-self: center;
          transition: background 0.2s, color 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hs-all-link:hover { background: #132B50; color: #fff; }
        .hs-all-link svg { transition: transform 0.2s; }
        .hs-all-link:hover svg { transform: translateX(3px); }

        /* ── Shared tag / feature styles ── */
        .hs-tag-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .hs-icon { width: 30px; height: 30px; }
        .hs-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--hs-accent, #F15C31);
        }
        .hs-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          line-height: 1.2;
          color: #132B50;
          margin: 0 0 10px;
        }
        .hs-card-desc {
          color: #475569;
          line-height: 1.65;
          margin: 0 0 20px;
        }
        .hs-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px 20px;
        }
        .hs-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.83rem;
          color: #334155;
          font-weight: 500;
        }
        .hs-feature-check {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: var(--hs-accent, #F15C31);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          opacity: 0.9;
        }
        .hs-feature-check svg { width: 9px; height: 9px; }

        /* ── MOBILE slider ── */
        .hs-mobile-pin-wrapper {
          width: 100%;
          height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hs-mobile-slider-track {
          display: flex;
          gap: 20px;
          padding: 0 5%;
          width: max-content;
          will-change: transform;
        }
        .hs-mobile-card {
          width: 82vw;
          max-width: 400px;
          flex-shrink: 0;
          background: #FAFBFF;
          border: 1px solid #E8EEF6;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(19,43,80,0.06);
          will-change: transform, opacity;
        }
        .hs-mobile-img {
          width: 100%;
          aspect-ratio: 16/9;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .hs-mobile-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(250,251,255,0.9) 100%);
        }
        .hs-mobile-body { padding: 20px 22px 24px; }
        .hs-card-title { font-size: 1.2rem; }
        .hs-card-desc  { font-size: 0.875rem; }

        /* ── DESKTOP pin layout ── */
        .hs-desktop-pin {
          display: none;
          width: 100%;
          height: calc(100vh - 80px);
          align-items: center;
          padding: 0 6%;
        }

        .hs-desktop-inner {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 7%;
        }

        /* Left text panel */
        .hs-left-side {
          flex: 1.1;
          position: relative;
          height: 460px;
        }
        .hs-text-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          will-change: opacity, transform;
        }
        .hs-text-card .hs-card-title { font-size: 2.1rem; }
        .hs-text-card .hs-card-desc  { font-size: 1.05rem; }

        /* Right image panel */
        .hs-right-side {
          flex: 0.9;
          aspect-ratio: 4/3;
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          background: #EEF2F8;
          box-shadow:
            0 0 0 1px rgba(19,43,80,0.06),
            0 30px 60px -12px rgba(19,43,80,0.14);
        }
        .hs-img-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: transform, opacity, filter;
        }

        /* Accent bar (left edge of right panel) */
        .hs-accent-bar {
          position: absolute;
          left: 0; top: 10%; bottom: 10%;
          width: 4px;
          border-radius: 0 4px 4px 0;
          background: #F15C31;
          transition: background 0.5s ease;
          z-index: 2;
        }

        /* Image overlay gradient */
        .hs-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(19,43,80,0.18) 0%, transparent 60%);
          z-index: 1;
          pointer-events: none;
        }

        /* Progress + counter strip */
        .hs-progress-strip {
          position: absolute;
          bottom: 28px;
          left: 6%;
          right: 6%;
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 10;
        }
        .hs-counter {
          font-family: 'Plus Jakarta Sans', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #94A3B8;
          white-space: nowrap;
        }
        .hs-counter span { color: #132B50; }
        .hs-progress-track {
          flex: 1;
          height: 2px;
          background: #E2E8F0;
          border-radius: 2px;
          overflow: hidden;
        }
        .hs-progress-fill {
          height: 100%;
          width: 0%;
          background: #F15C31;
          border-radius: 2px;
          transition: background 0.4s;
        }

        /* ── Responsive ── */
        @media (min-width: 640px) {
          .hs-mobile-card { width: 65vw; }
        }

        @media (min-width: 1024px) {
          .hs-mobile-pin-wrapper { display: none !important; }
          .hs-desktop-pin { display: flex; }
        }

        @media (max-width: 768px) {
          .hs-heading-block { flex-direction: column; align-items: flex-start; padding: 64px 5% 40px; }
          .hs-features-grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hs-eyebrow-dot { animation: none; }
        }
      `}</style>

      {/* ── Heading ── */}
      <div ref={headingRef} className="hs-heading-block">
        <div className="hs-heading-left">
          <div className="hs-eyebrow">
            <span className="hs-eyebrow-dot" />
            Our Expertise
          </div>
          <h2 className="hs-section-title">
            Comprehensive tech services<br />built for <em>unlimited scale.</em>
          </h2>
          <p className="hs-section-sub">
            Six practice areas. One unified team. Delivered with engineering depth and strategic clarity.
          </p>
        </div>
        <Link href="/services" className="hs-all-link">
          All services
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      {/* ── MOBILE: horizontal pin slider ── */}
      <div ref={mobilePinRef} className="hs-mobile-pin-wrapper">
        <div className="hs-mobile-slider-track">
          {services.map((s) => (
            <div key={`m-${s.title}`} className="hs-mobile-card" style={{ "--hs-accent": s.accent } as React.CSSProperties}>
              <div className="hs-mobile-img" style={{ backgroundImage: `url(${s.imagePath})` }}>
                <div className="hs-mobile-img-overlay" />
              </div>
              <div className="hs-mobile-body">
                <div className="hs-tag-wrapper">
                  <div className="hs-icon">{s.icon}</div>
                  <span className="hs-tag">{s.tag}</span>
                </div>
                <h3 className="hs-card-title">{s.title}</h3>
                <p className="hs-card-desc">{s.description}</p>
                <div className="hs-features-grid">
                  {s.features.map((f) => (
                    <div key={f} className="hs-feature-item">
                      <span className="hs-feature-check" style={{ background: s.accent }}>
                        <svg viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: fullscreen pin crossfade ── */}
      <div ref={desktopPinRef} className="hs-desktop-pin">
        <div className="hs-desktop-inner">

          {/* Left: stacked text cards */}
          <div className="hs-left-side">
            {services.map((s) => (
              <div
                key={`d-${s.title}`}
                className="hs-text-card"
                style={{ "--hs-accent": s.accent } as React.CSSProperties}
              >
                <div className="hs-tag-wrapper">
                  <div className="hs-icon">{s.icon}</div>
                  <span className="hs-tag">{s.tag}</span>
                </div>
                <h3 className="hs-card-title">{s.title}</h3>
                <p className="hs-card-desc">{s.description}</p>
                <div className="hs-features-grid">
                  {s.features.map((f) => (
                    <div key={f} className="hs-feature-item">
                      <span className="hs-feature-check" style={{ background: s.accent }}>
                        <svg viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/services" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  marginTop: 28,
                  fontSize: "0.82rem", fontWeight: 700, color: s.accent,
                  textDecoration: "none", fontFamily: "'Plus Jakarta Sans',sans-serif",
                  transition: "gap 0.2s",
                }}>
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Right: stacked image layers */}
          <div className="hs-right-side">
            <div className="hs-accent-bar" />
            <div className="hs-img-overlay" />
            {services.map((s) => (
              <div
                key={`di-${s.imagePath}`}
                className="hs-img-layer"
                style={{ backgroundImage: `url(${s.imagePath})` }}
              />
            ))}
          </div>

        </div>

        {/* Progress strip */}
        <div className="hs-progress-strip">
          <span className="hs-counter">
            <span ref={counterRef}>01</span>
            <span style={{ opacity: 0.35 }}> / {String(services.length).padStart(2, "0")}</span>
          </span>
          <div className="hs-progress-track">
            <div ref={progressBarRef} className="hs-progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}