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
}

const services: ServiceItem[] = [
  {
    tag: "INFRASTRUCTURE",
    title: "Cloud & Infrastructure",
    description: "We design and manage resilient cloud ecosystems that auto scale with your traffic from zero-downtime migrations to intelligent cost-saving orchestration across AWS, Azure, and GCP.",
    features: ["Cloud migration", "Infrastructure as code", "Cost optimisation", "24/7 monitoring"],
    imagePath: "/Images/service1.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 18C3.46 18 1 15.54 1 12.5C1 9.79 2.95 7.54 5.53 7.07C6.67 4.13 9.6 2 13 2c3.98 0 7.3 2.91 7.89 6.74C22.61 9.14 24 10.91 24 13c0 2.76-2.24 5-5 5H6.5z" fill="#F15C31" opacity="0.15"/>
        <path d="M16.5 6.5C15.74 4.43 13.78 3 11.5 3C8.75 3 6.43 4.96 5.92 7.58C3.69 8.04 2 10.02 2 12.4C2 15.16 4.24 17.4 7 17.4H10" stroke="#F15C31" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11V16M12 11L9.5 13.5M12 11L14.5 13.5" stroke="#F15C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "SECURITY",
    title: "Cybersecurity",
    description: "Military grade threat detection, advanced penetration testing, and ironclad compliance frameworks (SOC 2, ISO) to safeguard your proprietary data and keep your systems audit ready.",
    features: ["Penetration testing", "SOC 2 compliance", "Threat monitoring", "Incident response"],
    imagePath: "/Images/service2.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#F15C31" opacity="0.15"/>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#F15C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8v5M12 16h.01" stroke="#F15C31" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "ENGINEERING",
    title: "Software Development",
    description: "Bespoke full stack systems built with clean, scalable, modular architectures. We write test-driven code your team will actually love to maintain.",
    features: ["Web & mobile apps", "API development", "System integration", "Code audits"],
    imagePath: "/Images/service3.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="18" rx="2" fill="#F15C31" opacity="0.12"/>
        <rect x="2" y="3" width="20" height="18" rx="2" stroke="#F15C31" strokeWidth="2"/>
        <path d="M8 10l-3 2.5L8 15M16 10l3 2.5-3 2.5M13.5 8l-3 9" stroke="#F15C31" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "INTELLIGENCE",
    title: "AI & Data Analytics",
    description: "Transform chaotic data trails into predictable, actionable revenue. We deploy secure machine learning models and high throughput analytical pipelines.",
    features: ["ML model development", "Data pipelines", "BI dashboards", "Predictive analytics"],
    imagePath: "/Images/service4.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#F15C31" opacity="0.15"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z" stroke="#F15C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "STRATEGY",
    title: "IT Consulting",
    description: "Pragmatic digital transformation roadmaps and independent vendor selection based entirely on objective benchmarks, not speculative buzzwords.",
    features: ["Tech roadmapping", "Vendor evaluation", "Digital transformation", "CTO advisory"],
    imagePath: "/Images/service5.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="#F15C31" opacity="0.12"/>
        <circle cx="12" cy="12" r="9" stroke="#F15C31" strokeWidth="2"/>
        <path d="M12 7v5l3.5 2" stroke="#F15C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: "SUPPORT",
    title: "Managed IT Support",
    description: "Ultra-responsive, SLA-backed engineers monitoring your endpoints 24/7. We resolve performance roadblocks silently in the background before they slow your workflow.",
    features: ["Help desk support", "SLA guarantees", "Remote & on-site", "Proactive maintenance"],
    imagePath: "/Images/service6.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#F15C31" opacity="0.12"/>
        <circle cx="12" cy="12" r="10" stroke="#F15C31" strokeWidth="2"/>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="#F15C31" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#F15C31" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HomeServices() {
  const containerRef      = useRef<HTMLDivElement>(null);
  const mobilePinRef      = useRef<HTMLDivElement>(null);
  const tabletDesktopRef  = useRef<HTMLDivElement>(null);
  const headingRef        = useRef<HTMLDivElement>(null);
  const progressBarRef    = useRef<HTMLDivElement>(null);
  const counterRef        = useRef<HTMLSpanElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const mobileCounterRef  = useRef<HTMLSpanElement>(null);

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

    // ── Heading Animation ────────────────────────────────────────────────
    if (headingRef.current) {
      const eyebrow = headingRef.current.querySelector<HTMLElement>(".hs-eyebrow");
      const title   = headingRef.current.querySelector<HTMLElement>(".hs-section-title");
      const sub     = headingRef.current.querySelector<HTMLElement>(".hs-section-sub");
      const link    = headingRef.current.querySelector<HTMLElement>(".hs-all-link");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
      if (eyebrow) tl.from(splitWords(eyebrow), { y: "110%", opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 }, 0);
      if (title)   tl.from(splitWords(title),   { y: "110%", opacity: 0, duration: 0.75, ease: "power4.out", stagger: 0.055 }, 0.1);
      if (sub)     tl.from(sub,  { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.35);
      if (link)    tl.from(link, { x: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, 0.4);
    }

    // ── Mobile Screen Optimization (< 640px) ─────────────────────────────
    mm.add("(max-width: 639px)", () => {
      const mobileCards = gsap.utils.toArray<HTMLElement>(".hs-mobile-stacked-card");
      const mobileImgs  = gsap.utils.toArray<HTMLElement>(".hs-mobile-img-layer");
      const mCounter    = mobileCounterRef.current;
      const mProgress   = mobileProgressRef.current;
      if (!mobileCards.length || !mobilePinRef.current) return;

      const total = services.length;
      gsap.set(mobileCards, { opacity: 0, y: 30, pointerEvents: "none" });
      gsap.set(mobileImgs,  { opacity: 0 });
      gsap.set(mobileCards[0], { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(mobileImgs[0],  { opacity: 1 });
      if (mCounter) mCounter.textContent = "01";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobilePinRef.current,
          start: "top 80px",
          end: `+=${total * 100}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(Math.round(self.progress * (total - 1)), total - 1);
            if (mCounter)  mCounter.textContent  = String(idx + 1).padStart(2, "0");
            if (mProgress) mProgress.style.width = `${self.progress * 100}%`;
          },
        },
      });

      for (let i = 1; i < total; i++) {
        tl.to(mobileCards[i - 1], { opacity: 0, y: -30, pointerEvents: "none", duration: 1, ease: "none" }, i - 1)
          .to(mobileImgs[i - 1],  { opacity: 0, duration: 1, ease: "none" }, i - 1)
          .to(mobileCards[i],     { opacity: 1, y: 0,  pointerEvents: "auto", duration: 1, ease: "none" }, i - 0.7)
          .to(mobileImgs[i],      { opacity: 1, duration: 1, ease: "none" }, i - 0.7);
      }
    });

    // ── Tablet & Desktop Optimization (>= 640px) ─────────────────────────
    mm.add("(min-width: 640px)", () => {
      const textCards   = gsap.utils.toArray<HTMLElement>(".hs-text-card");
      const imgLayers   = gsap.utils.toArray<HTMLElement>(".hs-img-layer");
      const accentBar   = containerRef.current?.querySelector<HTMLElement>(".hs-accent-bar");
      const counter     = counterRef.current;
      const progressBar = progressBarRef.current;
      if (!textCards.length || !imgLayers.length || !tabletDesktopRef.current) return;

      const total = services.length;
      gsap.set(textCards, { opacity: 0, y: 30, pointerEvents: "none" });
      gsap.set(imgLayers, { opacity: 0 });
      gsap.set(textCards[0], { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(imgLayers[0], { opacity: 1 });
      if (counter) counter.textContent = "01";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tabletDesktopRef.current,
          start: "top 80px",
          end: `+=${total * 100}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(Math.round(self.progress * (total - 1)), total - 1);
            if (counter)     counter.textContent     = String(idx + 1).padStart(2, "0");
            if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
          },
        },
      });

      for (let i = 1; i < total; i++) {
        tl.to(textCards[i - 1], { opacity: 0, y: -30, pointerEvents: "none", duration: 1, ease: "none" }, i - 1)
          .to(imgLayers[i - 1], { opacity: 0, duration: 1, ease: "none" }, i - 1)
          .to(textCards[i],     { opacity: 1, y: 0,  pointerEvents: "auto", duration: 1, ease: "none" }, i - 0.7)
          .to(imgLayers[i],     { opacity: 1, duration: 1, ease: "none" }, i - 0.7)
          .to(accentBar ?? {},  { backgroundColor: "#F15C31", duration: 0.3, ease: "none" }, i - 0.7);
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="hs-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=600;700;800&family=DM+Sans:ital,opsz,wght=0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        .hs-section { background:#FFFFFF; color:#132B50; position:relative; width:100%; overflow-x:hidden; }

        /* ── Heading ── */
        .hs-heading-block { 
          max-width:1200px; 
          margin:0 auto; 
          padding: 88px 5% 52px 2%; 
          display:flex; 
          align-items:center; 
          justify-content:space-between; 
          gap:24px; 
          flex-wrap:wrap; 
        }

        .hs-heading-left  { max-width:680px; }
        .hs-eyebrow { display:inline-flex; align-items:center; gap:9px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#F15C31; margin-bottom:14px; overflow:hidden; }
        .hs-eyebrow-dot { 
          width: 6px; 
          height: 6px; 
          background: #F15C31; 
          border-radius: 50%; 
          flex-shrink: 0; 
          display: inline-block; 
        }
        .hs-section-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(2rem,3.5vw,3rem); font-weight:800; line-height:1.12; letter-spacing:-0.03em; color:#132B50; margin:0 0 14px; overflow:hidden; }
        .hs-section-title em { font-style:normal; color:#F15C31; }
        .hs-section-sub { font-family:'DM Sans',sans-serif; font-size:1rem; font-weight:500; color:#64748B; line-height:1.65; margin:0; }
        .hs-all-link { display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border:1.5px solid #132B50; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.825rem; font-weight:700; color:#132B50; text-decoration:none; white-space:nowrap; flex-shrink:0; transition:background 0.2s,color 0.2s; }
        .hs-all-link:hover { background:#132B50; color:#fff; }
        .hs-all-link svg  { transition:transform 0.2s; }
        .hs-all-link:hover svg { transform:translateX(3px); }

        /* ── Shared card internals ── */
        .hs-tag-wrapper { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
        .hs-icon         { width:30px; height:30px; flex-shrink:0; }
        .hs-tag { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#F15C31; }
        .hs-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; line-height:1.2; letter-spacing:-0.02em; color:#132B50; margin:0 0 10px; }
        .hs-card-desc  { font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:400; color:#475569; line-height:1.7; margin:0 0 20px; }
        .hs-features-grid { display:grid; grid-template-columns:1fr 1fr; gap:9px 20px; }
        .hs-feature-item { display:flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:0.83rem; font-weight:500; color:#334155; }
        .hs-feature-check { width:16px; height:16px; border-radius:50%; background:#F15C31; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .hs-feature-check svg { width:9px; height:9px; }

        /* ── Progress strip ── */
        .hs-progress-strip { position:absolute; bottom:20px; left:5%; right:5%; display:flex; align-items:center; gap:16px; z-index:10; }
        .hs-counter { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.75rem; font-weight:700; letter-spacing:0.1em; color:#94A3B8; white-space:nowrap; }
        .hs-counter span { color:#132B50; }
        .hs-progress-track { flex:1; height:2px; background:#E2E8F0; border-radius:2px; overflow:hidden; }
        .hs-progress-fill  { height:100%; width:0%; background:#F15C31; border-radius:2px; }

        /* ── Mobile View UI ── */
        .hs-mobile-pin-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: calc(100vh - 80px);
          position: relative;
        }
        .hs-mobile-img-stack {
          flex: 0 0 36%;
          position: relative;
          overflow: hidden;
          border-radius: 0 0 16px 16px;
        }
        .hs-mobile-img-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: opacity;
        }
        .hs-mobile-text-stack {
          flex: 1;
          position: relative;
          overflow: hidden;
          padding: 20px 5% 56px;
        }
        .hs-mobile-stacked-card {
          position: absolute;
          inset: 0;
          padding: 20px 5% 56px;
          overflow-y: auto;
          will-change: opacity, transform;
        }
        .hs-mobile-stacked-card .hs-card-title { font-size: 1.2rem; }
        .hs-mobile-stacked-card .hs-card-desc  { font-size: 0.855rem; margin-bottom: 14px; }
        .hs-mobile-stacked-card .hs-features-grid { grid-template-columns: 1fr 1fr; gap: 8px; }

        /* ── Tablet & Desktop View UI ── */
        .hs-tablet-desktop-pin {
          display: none;
          width: 100%;
          height: calc(100vh - 80px);
          align-items: center;
          padding: 0 5%;
          position: relative;
        }
        .hs-td-inner {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 5%;
        }
        .hs-left-side {
          flex: 1.1;
          position: relative;
          height: 420px;
        }
        .hs-text-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          will-change: opacity, transform;
        }
        .hs-text-card .hs-card-title { font-size: 1.5rem; }
        .hs-text-card .hs-card-desc  { font-size: 0.9rem; }

        .hs-right-side {
          flex: 0.9;
          aspect-ratio: 4/3;
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: #EEF2F8;
          box-shadow: 0 0 0 1px rgba(19,43,80,0.06), 0 24px 48px -10px rgba(19,43,80,0.12);
        }
        .hs-img-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: opacity;
        }
        .hs-accent-bar {
          position: absolute; left:0; top:10%; bottom:10%;
          width:4px; border-radius:0 4px 4px 0;
          background:#F15C31; z-index:2;
        }

        @media (min-width: 1024px) {
          .hs-text-card .hs-card-title { font-size: 2.1rem; }
          .hs-text-card .hs-card-desc  { font-size: 1.05rem; }
          .hs-left-side { height: 460px; }
          .hs-td-inner  { gap: 7%; }
          .hs-tablet-desktop-pin { padding: 0 6%; }
        }

        /* Responsive Layout Toggles */
        @media (max-width: 639px) {
          .hs-tablet-desktop-pin { display: none !important; }
          .hs-mobile-pin-wrapper  { display: flex; }
        }
        @media (min-width: 640px) {
          .hs-mobile-pin-wrapper  { display: none !important; }
          .hs-tablet-desktop-pin  { display: flex; }
        }

        @media (max-width: 768px) {
          .hs-heading-block { flex-direction:column; align-items:flex-start; padding:64px 5% 40px; }
          .hs-features-grid { grid-template-columns:1fr; }
        }
        @media (max-width: 480px) {
          .hs-mobile-stacked-card .hs-features-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── Heading ── */}
      <div ref={headingRef} className="hs-heading-block">
        <div className="hs-heading-left">
          <div className="hs-eyebrow"><span className="hs-eyebrow-dot" />Our Expertise</div>
          <h2 className="hs-section-title">
            Comprehensive tech services<br />built for <em>unlimited scale.</em>
          </h2>
          <p className="hs-section-sub">
            Six practice areas. One unified team. Delivered with engineering depth and strategic clarity.
          </p>
        </div>
      </div>

      {/* ══ MOBILE VIEW (< 640px) ══════════════════════════════════════════ */}
      <div ref={mobilePinRef} className="hs-mobile-pin-wrapper">
        <div className="hs-mobile-img-stack">
          {services.map((s) => (
            <div key={`mi-${s.tag}`} className="hs-mobile-img-layer"
              style={{ backgroundImage: `url(${s.imagePath})` }} />
          ))}
        </div>

        <div className="hs-mobile-text-stack">
          {services.map((s) => (
            <div key={`mt-${s.tag}`} className="hs-mobile-stacked-card">
              <div className="hs-tag-wrapper">
                <div className="hs-icon">{s.icon}</div>
                <span className="hs-tag">{s.tag}</span>
              </div>
              <h3 className="hs-card-title">{s.title}</h3>
              <p className="hs-card-desc">{s.description}</p>
              <div className="hs-features-grid">
                {s.features.map((f) => (
                  <div key={f} className="hs-feature-item">
                    <span className="hs-feature-check">
                      <svg viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hs-progress-strip">
          <div className="hs-counter"><span ref={mobileCounterRef}>01</span> / {String(services.length).padStart(2, '0')}</div>
          <div className="hs-progress-track">
            <div ref={mobileProgressRef} className="hs-progress-fill" />
          </div>
        </div>
      </div>

      {/* ══ TABLET + DESKTOP VIEW (>= 640px) ═══════════════════════════════ */}
      <div ref={tabletDesktopRef} className="hs-tablet-desktop-pin">
        <div className="hs-td-inner">
          
          {/* Left Side: Text Cards */}
          <div className="hs-left-side">
            {services.map((s) => (
              <div key={`d-${s.tag}`} className="hs-text-card">
                <div className="hs-tag-wrapper">
                  <div className="hs-icon">{s.icon}</div>
                  <span className="hs-tag">{s.tag}</span>
                </div>
                <h3 className="hs-card-title">{s.title}</h3>
                <p className="hs-card-desc">{s.description}</p>
                <div className="hs-features-grid">
                  {s.features.map((f) => (
                    <div key={f} className="hs-feature-item">
                      <span className="hs-feature-check">
                        <svg viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Visual Layers */}
          <div className="hs-right-side">
            <div className="hs-accent-bar" />
            {services.map((s) => (
              <div key={`di-${s.tag}`} className="hs-img-layer"
                style={{ backgroundImage: `url(${s.imagePath})` }} />
            ))}
          </div>

        </div>

        <div className="hs-progress-strip">
          <div className="hs-counter"><span ref={counterRef}>01</span> / {String(services.length).padStart(2, '0')}</div>
          <div className="hs-progress-track">
            <div ref={progressBarRef} className="hs-progress-fill" />
          </div>
        </div>
      </div>

    </div>
  );
}