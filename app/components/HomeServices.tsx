"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardData {
  tag: string;
  title: string;
  description: string;
  imagePath: string;
}

const services: ServiceCardData[] = [
  {
    tag: "INFRASTRUCTURE",
    title: "Cloud & Infrastructure",
    description: "Resilient cloud ecosystems that auto scale with your traffic, from zero downtime migrations to intelligent orchestration across AWS, Azure, and GCP.",
    imagePath: "/Images/service1.jpg",
  },
  {
    tag: "SECURITY",
    title: "Cybersecurity",
    description: "Military grade threat detection, advanced penetration testing, and ironclad compliance frameworks to safeguard your proprietary data and keep you audit ready.",
    imagePath: "/Images/service2.png",
  },
  {
    tag: "ENGINEERING",
    title: "Software Development",
    description: "Bespoke full stack systems built with clean, scalable, modular architectures. Clean, test-driven code your team will actually love to maintain.",
    imagePath: "/Images/service3.png",
  },
  {
    tag: "INTELLIGENCE",
    title: "AI & Data Analytics",
    description: "Transform chaotic data trails into predictable, actionable revenue. We deploy secure machine learning models and high-throughput pipelines.",
    imagePath: "/Images/service4.jpg",
  },
  {
    tag: "STRATEGY",
    title: "IT Consulting",
    description: "Pragmatic digital transformation roadmaps and independent vendor selection based entirely on objective benchmarks, not speculative buzzwords.",
    imagePath: "/Images/service5.jpg",
  },
  {
    tag: "MANAGED OPS",
    title: "Managed IT Support",
    description: "Ultra responsive, SLA backed engineers monitoring your endpoints 24/7, resolving performance roadblocks silently before they impact your workflow.",
    imagePath: "/Images/service6.png",
  },
];

export default function HomeServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const stageContentRef = useRef<HTMLDivElement>(null);

  // Update card transforms based on scroll progress (0 to 1)
  const applyCardTransforms = (progress: number) => {
    if (!trackRef.current) return;
    const total = services.length;
    const currentFloatIndex = progress * (total - 1);

    const viewportW = window.innerWidth;
    const firstCard = cardsRef.current[0];
    const cardW = firstCard?.offsetWidth || 310;
    const gap = viewportW < 640 ? 16 : 24;
    const stride = cardW + gap;

    // Center the current fractional card in the viewport
    const trackX = viewportW / 2 - cardW / 2 - currentFloatIndex * stride;
    gsap.set(trackRef.current, { x: trackX });

    // Apply focus, tilt, and scale relative to distance from center
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const diff = idx - currentFloatIndex;
      const absDiff = Math.abs(diff);

      // Center card: scale 1.04, 0deg tilt, full opacity & elevated shadow
      // Side cards: tilted slightly (-3.5deg to +3.5deg), scaled down (0.92), softer opacity
      const scale = Math.max(0.9, 1.04 - absDiff * 0.12);
      const rotation = Math.max(-4.5, Math.min(4.5, diff * 3.6));
      const opacity = Math.max(0.68, 1 - absDiff * 0.28);
      const zIndex = Math.round(20 - absDiff * 2);

      gsap.set(card, {
        scale,
        rotation,
        opacity,
        zIndex,
        transformOrigin: "center center",
      });
    });
  };

  // Set up ScrollTrigger on mount
  useEffect(() => {
    if (!containerRef.current) return;

    let triggerInstance: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for header content when user reaches section
      if (headerContentRef.current) {
        gsap.fromTo(
          headerContentRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Entrance animation for carousel stage when user reaches section
      if (stageContentRef.current) {
        gsap.fromTo(
          stageContentRef.current,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const isMobileDevice = window.innerWidth < 768;

      // 3. Pinned carousel ScrollTrigger (no intrusive snapping on mobile touch devices)
      triggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: isMobileDevice ? 0.3 : 0.6,
        snap: isMobileDevice
          ? undefined
          : {
              snapTo: 1 / (services.length - 1),
              duration: { min: 0.2, max: 0.45 },
              delay: 0.08,
              ease: "power2.out",
            },
        onUpdate: (self) => {
          applyCardTransforms(self.progress);
        },
      });

      // Initial layout pass
      applyCardTransforms(0);
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
      if (triggerInstance) {
        applyCardTransforms(triggerInstance.progress);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        /* ── Scroll container with #ffebeb background ── */
        .exp-scroll-container {
          position: relative;
          height: 420vh;
          background: #ffebeb;
        }

        /* ── Pinned sticky viewport ── */
        .exp-sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
          padding: 40px 0;
          background: #ffebeb;
        }

        /* ── Header block — centered ── */
        .exp-header {
          position: relative;
          z-index: 10;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .exp-eyebrow {
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
        .exp-eyebrow-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #0052D4 0%, #00C2CE 100%);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 194, 206, 0.6);
        }
        .exp-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.85rem, 3.4vw, 2.85rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin: 0;
          text-align: center;
        }
        .exp-title em {
          font-style: normal;
          font-weight: 800;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .exp-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          font-weight: 600;
          color: #1E293B;
          margin: 10px auto 0;
          line-height: 1.6;
          max-width: 650px;
          text-align: center;
        }

        /* ── Carousel Stage ── */
        .exp-carousel-stage {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: visible;
          padding: 10px 0;
        }
        .exp-cards-track {
          display: flex;
          align-items: center;
          gap: 24px;
          will-change: transform;
          user-select: none;
        }

        /* ── Individual Card ── */
        .exp-card {
          flex-shrink: 0;
          width: clamp(275px, 24vw, 335px);
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid #E2E8F0;
          padding: 16px;
          box-sizing: border-box;
          will-change: transform, opacity;
          box-shadow: 0 16px 36px rgba(0, 82, 212, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: border-color 0.3s;
          display: flex;
          flex-direction: column;
        }

        /* Inner image container */
        .exp-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 1.25 / 1;
          border-radius: 16px;
          overflow: hidden;
          background: #0A101D;
        }
        .exp-card-img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .exp-card:hover .exp-card-img {
          transform: scale(1.03);
        }

        /* Card text content */
        .exp-card-info {
          padding: 14px 4px 4px;
          display: flex;
          flex-direction: column;
        }
        .exp-card-tag {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0070C6;
          margin-bottom: 5px;
        }
        .exp-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.22rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #0F172A;
          margin: 0 0 8px;
        }
        .exp-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.6;
          color: #334155;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .exp-header {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          .exp-sticky-viewport {
            padding: 24px 0 20px;
            gap: 16px;
          }
          .exp-header {
            margin: 0 auto;
            padding: 0 20px;
            transform: translateY(-28px);
          }
          .exp-card {
            width: clamp(255px, 76vw, 295px);
            padding: 14px;
            border-radius: 20px;
          }
          .exp-card-title {
            font-size: 1.12rem;
          }
          .exp-card-desc {
            font-size: 0.8rem;
            font-weight: 600;
          }
        }
      `}</style>

      <div ref={containerRef} className="exp-scroll-container">
        <div ref={stickyRef} className="exp-sticky-viewport">

          {/* ── Section Header (Centered) ── */}
          <div className="exp-header">
            <div
              ref={headerContentRef}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div className="exp-eyebrow">
                <span className="exp-eyebrow-dot" />
                Our Expertise
              </div>
              <h2 className="exp-title">
                Comprehensive tech services<br />built for <em>unlimited scale.</em>
              </h2>
              <p className="exp-subtitle">
                From high availability cloud foundations to bespoke software platforms, explore our full spectrum of digital engineering services.
              </p>
            </div>
          </div>

          {/* ── Centered Card Carousel Track (Only cards) ── */}
          <div ref={stageContentRef} className="exp-carousel-stage">
            <div ref={trackRef} className="exp-cards-track">
              {services.map((item, idx) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className="exp-card"
                >
                  <div className="exp-card-media">
                    <Image
                      src={item.imagePath}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 76vw, 335px"
                      className="exp-card-img"
                    />
                  </div>

                  <div className="exp-card-info">
                    <span className="exp-card-tag">{item.tag}</span>
                    <h3 className="exp-card-title">{item.title}</h3>
                    <p className="exp-card-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
