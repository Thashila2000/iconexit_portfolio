"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Cloud,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Database,
  Plus,
  Layers,
  Wifi,
  BatteryFull,
} from "lucide-react";

export interface LandingPageProps {
  title?: string;
  /** Words inside `title` that get the brand gradient; the rest stays black. */
  highlights?: string[];
  description?: string;
  primaryButtonText?: string;
  primaryButtonIcon?: React.ReactNode;
  primaryButtonHref?: string;
  brandColor?: string;
  accentColor?: string;
  showMockups?: boolean;
  logoComponent?: React.ReactNode;
}

/* Splits the title and wraps the highlighted words in the brand gradient. */
function renderTitle(title: string, highlights: string[], gradient: string) {
  const valid = highlights.filter((h) => h && title.includes(h));
  if (!valid.length) return title;

  const pattern = valid.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const parts = title.split(new RegExp(`(${pattern})`, "g"));

  return parts.map((part, i) =>
    valid.includes(part) ? (
      <span
        key={i}
        style={{
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          paddingBottom: "0.08em",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

/* Variants for scroll-triggered entrance animations */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const leftColVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const mockupsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const desktopWindowVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const backCard1Variants: Variants = {
  hidden: { opacity: 0, rotate: 0, scale: 0.95 },
  visible: {
    opacity: 0.7,
    rotate: 6,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const backCard2Variants: Variants = {
  hidden: { opacity: 0, rotate: 0, scale: 0.92 },
  visible: {
    opacity: 0.5,
    rotate: 12,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const phoneVariants: Variants = {
  hidden: { opacity: 0, y: 35, x: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const capabilityGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.4,
    },
  },
};

const capabilityItemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroSection({
  title = "Transform your enterprise with scalable digital solutions",
  highlights = ["enterprise", "digital solutions"],
  description = "From high-availability cloud architectures to bespoke AI and full-stack software, Iconex IT engineers platforms that drive measurable business impact.",
  primaryButtonText = "Start Your Project",
  primaryButtonIcon = <ArrowRight size={20} />,
  primaryButtonHref = "/contact",
  brandColor = "#0052D4",
  accentColor = "#00C2CE",
  showMockups = true,
  logoComponent,
}: LandingPageProps) {
  const gradient = `linear-gradient(135deg, ${brandColor} 0%, #0070C6 50%, ${accentColor} 100%)`;

  const ctaInner = (
    <>
      <span className="relative z-10">{primaryButtonText}</span>
      <span className="hero-cta-icon relative z-10 inline-flex">{primaryButtonIcon}</span>
    </>
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
      variants={sectionVariants}
      className="relative w-full overflow-hidden bg-[#ffebeb] px-4 py-14 sm:px-6 sm:py-24 lg:px-12"
    >
      <style>{`
        .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; }
        .hero-desc  { font-family: 'Inter', sans-serif; }

        /* ── GPU-accelerated ambient blob float keyframes (matching Mission & Vision section) ── */
        @keyframes heroBlobFloat1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(20px, -16px, 0) scale(1.06);
          }
          66% {
            transform: translate3d(-12px, 10px, 0) scale(0.96);
          }
        }

        @keyframes heroBlobFloat2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate3d(-20px, 18px, 0) rotate(3deg) scale(1.05);
          }
          66% {
            transform: translate3d(14px, -14px, 0) rotate(-2deg) scale(0.96);
          }
        }

        .hero-blob-1 {
          animation: heroBlobFloat1 14s ease-in-out infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .hero-blob-2 {
          animation: heroBlobFloat2 16s ease-in-out infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .hero-blob-1,
          .hero-blob-2 {
            animation: none !important;
            transform: none !important;
            will-change: auto !important;
          }
        }

        /* ── CTA: gradient pan, lift, glow, shine sweep, arrow nudge ── */
        .hero-cta.hero-cta {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          height: auto;
          padding: 1rem 2rem;
          border: 0;
          border-radius: 9999px;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          background: linear-gradient(110deg, #0052D4 0%, #0070C6 35%, #00C2CE 70%, #0052D4 100%);
          background-size: 220% 100%;
          background-position: 0% 50%;
          box-shadow: 0 10px 25px -6px rgba(0, 112, 198, 0.45);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s ease,
                      background-position 0.6s ease;
        }
        .hero-cta.hero-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }
        .hero-cta.hero-cta:hover {
          transform: translateY(-3px);
          background-position: 100% 50%;
          box-shadow: 0 18px 36px -8px rgba(0, 112, 198, 0.6),
                      0 0 0 4px rgba(0, 194, 206, 0.18);
        }
        .hero-cta.hero-cta:hover::after { transform: translateX(120%); }
        .hero-cta.hero-cta:active { transform: translateY(-1px) scale(0.98); }
        .hero-cta.hero-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px #ffebeb, 0 0 0 6px #0070C6;
        }
        .hero-cta-icon { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .hero-cta:hover .hero-cta-icon { transform: translateX(5px); }

        @media (min-width: 640px) {
          .hero-cta.hero-cta { font-size: 1.0625rem; padding: 1.1rem 2.25rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cta.hero-cta,
          .hero-cta.hero-cta::after,
          .hero-cta-icon,
          .hero-blob-1,
          .hero-blob-2 { animation: none; transition: none; }
          .hero-cta.hero-cta:hover { transform: none; }
          .hero-cta:hover .hero-cta-icon { transform: none; }
        }
      `}</style>

      {/* ── Left Soft Blue/Cyan Organic Shape ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 size-72 sm:size-96 rounded-full hero-blob-1 opacity-60 sm:opacity-65"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 194, 206, 0.28) 0%, rgba(0, 112, 198, 0.12) 45%, transparent 70%)",
        }}
      />

      {/* ── Right Pink/Magenta Organic Blob Shape ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 h-96 w-80 sm:h-[500px] sm:w-[480px] hero-blob-2 opacity-70 sm:opacity-80"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(255, 140, 210, 0.45) 0%, rgba(244, 114, 182, 0.3) 35%, rgba(251, 113, 133, 0.15) 52%, transparent 72%)",
          borderRadius: "62% 38% 70% 30% / 45% 58% 42% 55%",
        }}
      />

      {/* ── Crisp Vector Organic Accent Blob (Desktop only matching Mission & Vision background) ── */}
      <motion.svg
        aria-hidden
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 0.38,
            rotate: [0, 6, -5, 0],
            scale: [1, 1.05, 0.98, 1],
            y: [0, -14, 8, 0],
            transition: {
              opacity: { duration: 1.2 },
              rotate: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            },
          },
        }}
        className="pointer-events-none absolute -bottom-10 -right-8 hidden h-80 w-64 sm:block sm:h-[420px] sm:w-96 will-change-transform"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#F472B6"
          d="M48.2,-64.3C61.3,-55.8,70.2,-41.2,74.5,-25.6C78.9,-10,78.8,6.5,73.6,21.1C68.4,35.6,58.2,48.1,45.4,57.4C32.6,66.6,17.3,72.6,1.4,70.7C-14.5,68.8,-28.9,59,-42.6,49C-56.3,39,-69.1,28.8,-74.6,14.7C-80.1,0.5,-78.2,-17.6,-70,-31.6C-61.9,-45.6,-47.4,-55.6,-33.1,-63.5C-18.7,-71.3,-4.5,-77.1,9.4,-75.7C23.3,-74.3,35.1,-72.8,48.2,-64.3Z"
          transform="translate(140 100)"
        />
      </motion.svg>

      {/* Soft brand glow behind the mockups */}
      <motion.div
        aria-hidden
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: "easeOut" },
          },
        }}
        className="pointer-events-none absolute right-[-10%] top-1/2 hidden size-[42rem] -translate-y-1/2 lg:block"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,194,206,0.22), rgba(0,82,212,0.08) 55%, transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 lg:flex-row lg:gap-16">
        {/* ───────── Left: heading, description, CTA ───────── */}
        <motion.div variants={leftColVariants} className="max-w-2xl text-left will-change-[transform,opacity]">
          <motion.h2
            variants={fadeUpVariants}
            className="hero-title text-[2.15rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0A101D] sm:text-5xl lg:text-[3.5rem] transform-gpu will-change-[transform,opacity]"
          >
            {renderTitle(title, highlights, gradient)}
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="hero-desc mt-5 max-w-xl text-[1.05rem] font-medium leading-[1.7] text-slate-800 sm:mt-6 sm:text-[1.15rem] transform-gpu will-change-[transform,opacity]"
          >
            {description}
          </motion.p>

          <motion.div variants={fadeUpVariants} className="mt-8 sm:mt-10 transform-gpu will-change-[transform,opacity]">
            {primaryButtonHref ? (
              <Button asChild size="lg" className="hero-cta cursor-pointer">
                <Link href={primaryButtonHref}>{ctaInner}</Link>
              </Button>
            ) : (
              <Button size="lg" className="hero-cta cursor-pointer">
                {ctaInner}
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* ───────── Right: product mockups ───────── */}
        {showMockups && (
          <motion.div
            variants={mockupsContainerVariants}
            className="relative mx-auto mb-14 w-full max-w-lg lg:mb-0 lg:mr-0"
          >
            {/* Desktop application window */}
            <motion.div variants={desktopWindowVariants} className="relative">
              <div className="relative rotate-2 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl transition-transform duration-300 hover:rotate-1">
                <div className="border-b border-slate-800/80 bg-slate-900/90 px-5 py-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                    </div>

                    <div className="mx-4 max-w-xs flex-1">
                      <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs text-slate-400">
                        <Search size={13} className="text-slate-400" />
                        <span>iconexit.com/platform</span>
                      </div>
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs text-[#00C2CE]">
                      ★
                    </div>
                  </div>
                </div>

                <div className="min-h-[300px] bg-slate-950 p-6 sm:p-7">
                  <div className="mb-6 flex items-center space-x-3">
                    {logoComponent || (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg"
                        style={{ background: "linear-gradient(135deg, #0052D4 0%, #00C2CE 100%)" }}
                      >
                        <Layers size={20} />
                      </div>
                    )}
                    <div>
                      <span className="text-base font-bold text-white">Iconex IT Suite</span>
                      <p className="text-xs text-slate-400">Cloud Operations &amp; Intelligence</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-400">System Scalability &amp; Health</span>
                        <span className="font-semibold text-[#00C2CE]">99.98% Uptime</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                          className="h-full rounded-full"
                          variants={{
                            hidden: { width: 0 },
                            visible: {
                              width: "82%",
                              transition: { duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
                            },
                          }}
                          style={{ background: "linear-gradient(90deg, #0052D4, #00C2CE)" }}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Core Capabilities
                      </h3>
                      <motion.div
                        variants={capabilityGridVariants}
                        className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                      >
                        {[
                          { name: "Cloud", bg: "bg-blue-600/20 text-blue-400 border-blue-500/30", icon: <Cloud size={18} /> },
                          { name: "Analytics", bg: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30", icon: <BarChart3 size={18} /> },
                          { name: "Security", bg: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30", icon: <ShieldCheck size={18} /> },
                          { name: "Mobile", bg: "bg-cyan-600/20 text-cyan-400 border-cyan-500/30", icon: <Smartphone size={18} /> },
                          { name: "Database", bg: "bg-purple-600/20 text-purple-400 border-purple-500/30", icon: <Database size={18} /> },
                          { name: "Scale", bg: "bg-slate-800 text-slate-300 border-slate-700", icon: <Plus size={18} /> },
                        ].map((item) => (
                          <motion.div
                            key={item.name}
                            variants={capabilityItemVariants}
                            className="group flex cursor-pointer flex-col items-center space-y-1.5"
                          >
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-md transition-all duration-200 group-hover:scale-105 group-hover:border-cyan-400 ${item.bg}`}
                            >
                              {item.icon}
                            </div>
                            <span className="text-center text-[11px] font-medium text-slate-400">{item.name}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stacked windows behind */}
            <motion.div
              variants={backCard1Variants}
              className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-2xl shadow-xl origin-bottom-left"
              style={{ background: "linear-gradient(135deg, #0052D4 0%, #0070C6 100%)" }}
            />
            <motion.div
              variants={backCard2Variants}
              className="absolute -left-8 -top-8 -z-20 h-full w-full rounded-2xl shadow-xl origin-bottom-left"
              style={{ background: "linear-gradient(135deg, #0070C6 0%, #00C2CE 100%)" }}
            />

            {/* ───────── iPhone (Pro-style): titanium frame, Dynamic Island, home indicator ───────── */}
            <motion.div
              variants={phoneVariants}
              className="absolute -bottom-12 -right-2 z-20 w-[10.5rem] sm:-bottom-14 sm:-right-8 sm:w-52"
            >
              <div className="w-full -rotate-6 transition-transform duration-300 hover:rotate-0">
                <div
                  className="relative rounded-[2.5rem] p-[3px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] sm:rounded-[2.9rem]"
                  style={{
                    background:
                      "linear-gradient(145deg, #e4e6ea 0%, #8b8e96 28%, #d3d6db 52%, #6c6f77 78%, #b9bcc3 100%)",
                  }}
                >
                  {/* Side buttons */}
                  <span aria-hidden className="absolute -left-[2px] top-[13%] h-5 w-[3px] rounded-l bg-[#8b8e96]" />
                  <span aria-hidden className="absolute -left-[2px] top-[21%] h-9 w-[3px] rounded-l bg-[#8b8e96]" />
                  <span aria-hidden className="absolute -left-[2px] top-[31%] h-9 w-[3px] rounded-l bg-[#8b8e96]" />
                  <span aria-hidden className="absolute -right-[2px] top-[26%] h-14 w-[3px] rounded-r bg-[#8b8e96]" />

                  {/* Thin black bezel */}
                  <div className="rounded-[2.35rem] bg-black p-[5px] sm:rounded-[2.75rem]">
                    {/* Screen */}
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.95rem] bg-slate-950 sm:rounded-[2.3rem]">
                      {/* Dynamic Island */}
                      <div className="absolute left-1/2 top-2 z-20 flex h-[18px] w-[58px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2 sm:top-2.5 sm:h-5 sm:w-[66px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-800 ring-1 ring-slate-700" />
                      </div>

                      {/* Status bar */}
                      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-2.5 text-[9px] font-semibold text-white sm:px-6 sm:pt-3 sm:text-[10px]">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="flex items-end gap-[1.5px]">
                            {[3, 5, 7, 9].map((h) => (
                              <span key={h} className="w-[2px] rounded-sm bg-white" style={{ height: h }} />
                            ))}
                          </div>
                          <Wifi size={11} strokeWidth={2.5} />
                          <BatteryFull size={14} strokeWidth={2} />
                        </div>
                      </div>

                      {/* App content */}
                      <div className="flex h-full flex-col gap-2.5 px-3 pb-6 pt-10 sm:gap-3 sm:px-3.5 sm:pt-12">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 items-center justify-center rounded-lg text-white"
                            style={{ background: "linear-gradient(135deg, #0052D4 0%, #00C2CE 100%)" }}
                          >
                            <Layers size={13} />
                          </div>
                          <div className="leading-tight">
                            <p className="text-[11px] font-semibold text-white">Iconex Mobile</p>
                            <p className="text-[8px] text-slate-400">All systems operational</p>
                          </div>
                        </div>

                        {/* Uptime card with sparkline */}
                        <div
                          className="rounded-2xl p-3"
                          style={{ background: "linear-gradient(135deg, #0052D4 0%, #0070C6 55%, #00C2CE 100%)" }}
                        >
                          <p className="text-[8px] font-medium text-white/80">Uptime · 30 days</p>
                          <p className="text-lg font-bold leading-tight text-white sm:text-xl">99.98%</p>
                          <svg viewBox="0 0 100 24" className="mt-1 h-6 w-full" fill="none" aria-hidden>
                            <motion.path
                              d="M0 18 L12 14 L24 16 L36 9 L48 12 L60 6 L72 9 L84 4 L100 5"
                              stroke="rgba(255,255,255,0.95)"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              variants={{
                                hidden: { pathLength: 0, opacity: 0 },
                                visible: {
                                  pathLength: 1,
                                  opacity: 1,
                                  transition: { duration: 1.3, delay: 0.55, ease: "easeInOut" },
                                },
                              }}
                            />
                          </svg>
                        </div>

                        {/* Quick tiles */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5, delay: 0.65 },
                            },
                          }}
                          className="grid grid-cols-4 gap-1.5"
                        >
                          {[
                            { i: <Cloud size={13} />, c: "text-blue-400 bg-blue-600/20" },
                            { i: <BarChart3 size={13} />, c: "text-emerald-400 bg-emerald-600/20" },
                            { i: <ShieldCheck size={13} />, c: "text-indigo-400 bg-indigo-600/20" },
                            { i: <Database size={13} />, c: "text-purple-400 bg-purple-600/20" },
                          ].map((t, idx) => (
                            <div
                              key={idx}
                              className={`flex aspect-square items-center justify-center rounded-xl border border-white/5 ${t.c}`}
                            >
                              {t.i}
                            </div>
                          ))}
                        </motion.div>

                        {/* Activity row */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5, delay: 0.75 },
                            },
                          }}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900 px-2.5 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00C2CE] shadow-[0_0_6px_#00C2CE]" />
                            <span className="text-[9px] font-medium text-slate-200">Deploy complete</span>
                          </div>
                          <span className="text-[8px] text-slate-500">2m</span>
                        </motion.div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-1.5 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/80 sm:w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default HeroSection;