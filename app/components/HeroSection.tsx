"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReady } from "@/app/components/LoadingContext";

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

export default function HeroSection() {
  const isMobile = useIsMobile();
  const ready = useReady();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay block detected.", error);
        });
      }
    }
  }, []);

  const heroAnim = (delay: number) => ({
    initial: { opacity: 0, y: 15 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />

      <style>{`
        .hero-container {
          min-height: calc(100vh - 112px);
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
        }

        .hero-fallback-grid {
          position: absolute; inset: 0;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          z-index: 0;
        }

        .hero-video-wrapper {
          position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; overflow: hidden; 
        }
        
        .hero-video {
          position: absolute; top: 0; left: -2%; width: 104%; height: calc(100% + 60px); object-fit: cover;
        }
        
        .hero-video-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(10, 19, 35, 0.5) 0%, rgba(10, 19, 35, 0.8) 100%);
          z-index: 2;
        }

        .hero-body {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          padding: 80px 40px; max-width: 1200px; width: 100%; margin-left: 5%; 
        }

        /* Red-Orange Bottom-Right Floating CTA */
        .cta-bottom-right {
          position: absolute; bottom: 40px; right: 40px; z-index: 20;
        }
        .btn-red-orange {
          display: flex; align-items: center; gap: 10px;
          background: #FF8466;
          color: #FFFFFF;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 132, 102, 0.3);
        }
        .btn-red-orange:hover {
          background: #FF6B4A;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 132, 102, 0.4);
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #FF8466; margin-top: 30px; 
        }
        .eyebrow-dot { width: 6px; height: 6px; background: #FF8466; border-radius: 50%; }

        .headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem); font-weight: 700; line-height: 1.05;
          letter-spacing: -0.04em; color: #FFFFFF; margin-top: 20px; max-width: 920px;
        }
        .headline-em {
          background: linear-gradient(135deg, #FF8466 0%, #FF6B4A 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .sub {
          margin-top: 28px; font-size: clamp(1.05rem, 2vw, 1.25rem);
          line-height: 1.7; color: #FFFFFF; opacity: 0.85; max-width: 620px;
        }

        .actions { display: flex; align-items: center; gap: 14px; margin-top: 48px; flex-wrap: wrap; }
        .btn-ghost {
          background: transparent; color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 16px 32px; border-radius: 12px; font-weight: 600;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: #FFFFFF; background: rgba(255, 255, 255, 0.05); }

        .orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; }
        .orb-1 { width: 400px; height: 400px; background: #FF8466; top: -100px; right: -50px; }
        .orb-2 { width: 500px; height: 500px; background: #132B50; bottom: -150px; left: -100px; }

        @media (max-width: 768px) {
          .hero-video { width: 100%; left: 0; height: 100%; top: 0; }
          .hero-body { padding: 80px 24px; margin-left: 0; }
          .cta-bottom-right { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className="hero-container">
        <div className="hero-fallback-grid" />

        {!videoError && (
          <div className="hero-video-wrapper">
            <video ref={videoRef} autoPlay loop muted playsInline className="hero-video" preload="auto" onError={() => setVideoError(true)}>
              <source src="/videos/company.mp4" type="video/mp4" />
              <source src="/company.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-overlay" />
          </div>
        )}

        <motion.div className="cta-bottom-right" {...heroAnim(0.5)}>
          <Link href="/work" className="btn-red-orange" style={{ textDecoration: "none" }}>
            Explore our work ↗
          </Link>
        </motion.div>

        <div className="hero-body">
          <motion.div className="eyebrow" {...heroAnim(0.05)}>
            <span className="eyebrow-dot" /> Enterprise Technology Partner
          </motion.div>

          <motion.h1 className="headline" {...heroAnim(0.15)}>
            We engineer the <span className="headline-em">digital backbone</span> of modern business.
          </motion.h1>

          <motion.p className="sub" {...heroAnim(0.25)}>
            From cloud infrastructure to AI-driven insights, we deliver technology that scales, secures, and accelerates your organization.
          </motion.p>
          
          <motion.p className="sub" {...heroAnim(0.30)} style={{ marginTop: '16px' }}>
            Our bespoke solutions integrate seamlessly into your existing workflows, transforming legacy systems into high-performance engines for growth.
          </motion.p>

        
        </div>
      </div>
    </>
  );
}