"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReady } from "@/app/components/LoadingContext";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function HeroSection() {
  const ready = useReady();
  const isMobile = useIsMobile();
  const pcVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Controlled playback — wait until loading screen is done
  useEffect(() => {
    const activeRef = isMobile ? mobileVideoRef : pcVideoRef;
    const video = activeRef.current;
    if (!video) return;

    if (ready) {
      video.muted = true;
      video.play().catch((err) => console.warn("Autoplay blocked:", err));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [ready, isMobile]);

  const heroAnim = (delay: number) => ({
    initial: { opacity: 0, y: 15 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <>
      <style>{`
        .hero-container {
          height: 100vh;
          min-height: 100vh;
          background: #0A1323;
          font-family: 'Inter', sans-serif;
          color: #FFFFFF;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        /* ── Video layers ── */
        .hero-video-wrap {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          z-index: 1; overflow: hidden;
        }
        .hero-video {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
        }

        /* Show PC video on desktop, mobile video on mobile */
        .hero-video-pc   { display: block; }
        .hero-video-mob  { display: none;  }
        @media (max-width: 768px) {
          .hero-video-pc  { display: none;  }
          .hero-video-mob { display: block; }
        }

        /* ── Shadow overlay for text visibility ── */
        .hero-shadow-flat {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: rgba(10, 16, 29, 0.62);
        }
        .hero-shadow-grad {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background:
            linear-gradient(to bottom,
              rgba(10, 16, 29, 0.75) 0%,
              rgba(10, 16, 29, 0.20) 40%,
              rgba(10, 16, 29, 0.45) 70%,
              rgba(10, 16, 29, 0.85) 100%
            );
        }

        /* ── Content ── */
        .hero-body {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          padding: 80px 40px; max-width: 1200px; width: 100%; margin-left: 5%;
          transform: translateY(15px);
        }

        .cta-bottom-right {
          position: absolute; bottom: 40px; right: 40px; z-index: 20;
        }
        .btn-primary {
          display: flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          color: #FFFFFF;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 18px rgba(0, 112, 198, 0.45);
          text-decoration: none;
        }
        .btn-primary:hover {
          filter: brightness(1.12);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0, 112, 198, 0.6);
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #00C2CE; margin-top: 0;
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          background: #00C2CE; border-radius: 50%;
          box-shadow: 0 0 8px #00C2CE;
        }

        .headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem); font-weight: 700; line-height: 1.05;
          letter-spacing: -0.04em; color: #FFFFFF; margin-top: 20px; max-width: 920px;
          text-shadow: 0 2px 24px rgba(10, 16, 29, 0.5);
        }
        .headline-em {
          background: linear-gradient(135deg, #0070C6 0%, #00C2CE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .sub {
          margin-top: 28px; font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.7; color: rgba(255,255,255,0.88); max-width: 620px;
          text-shadow: 0 1px 12px rgba(10, 16, 29, 0.6);
        }

        @media (max-width: 768px) {
          .hero-body { padding: 40px 24px 60px; margin-left: 0; transform: translateY(-35px); }
          .cta-bottom-right { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className="hero-container">

        {/* ── PC video (hidden on mobile) ── */}
        <div className="hero-video-wrap hero-video-pc">
          <video
            ref={pcVideoRef}
            loop
            muted
            playsInline
            autoPlay
            poster="/Images/abstract img.jpg"
            className="hero-video"
            preload="auto"
          >
            <source src="/Videos/home-pc-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Mobile video (hidden on desktop) ── */}
        <div className="hero-video-wrap hero-video-mob">
          <video
            ref={mobileVideoRef}
            loop
            muted
            playsInline
            autoPlay
            poster="/Images/abstract img.jpg"
            className="hero-video"
            preload="auto"
          >
            <source src="/Videos/home-mobile-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Shadow overlays for font visibility ── */}
        <div className="hero-shadow-flat" />
        <div className="hero-shadow-grad" />

        {/* ── CTA button ── */}
        <motion.div className="cta-bottom-right" {...heroAnim(0.5)}>
          <Link href="/work" className="btn-primary">
            Explore our work ↗
          </Link>
        </motion.div>

        {/* ── Text content ── */}
        <div className="hero-body">
          <motion.div className="eyebrow" {...heroAnim(0.05)}>
            <span className="eyebrow-dot" /> Enterprise Technology Partner
          </motion.div>

          <motion.h1 className="headline" {...heroAnim(0.15)}>
            We engineer the <span className="headline-em">digital backbone</span> of modern business.
          </motion.h1>

          <motion.p className="sub" {...heroAnim(0.25)}>
            From cloud infrastructure to AI driven insights, we deliver technology that scales, secures, and accelerates your organization.
          </motion.p>

          <motion.p className="sub" {...heroAnim(0.30)} style={{ marginTop: "16px" }}>
            Our bespoke solutions integrate seamlessly into your existing workflows, transforming legacy systems into high performance engines for growth.
          </motion.p>
        </div>
      </div>
    </>
  );
}