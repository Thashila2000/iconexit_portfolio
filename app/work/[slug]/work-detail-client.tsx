"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  Server,
  BarChart3,
  Calendar,
  Building2,
  Tag,
} from "lucide-react";
import type { DetailedProject } from "@/app/work/work-data";

interface WorkDetailClientProps {
  project: DetailedProject;
  nextProject: DetailedProject;
  prevProject: DetailedProject;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export default function WorkDetailClient({
  project,
  nextProject,
  prevProject,
}: WorkDetailClientProps) {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap");

        .wd-root {
          background: #ffebeb;
          font-family: "Plus Jakarta Sans", sans-serif;
          color: #0f172a;
          overflow-x: hidden;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* ── Top Bar / Breadcrumb ── */
        .wd-top-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .wd-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: #1e293b;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.25s ease;
        }
        .wd-back-btn:hover {
          background: #0a101d;
          color: #ffffff;
          border-color: #0a101d;
          transform: translateX(-3px);
          box-shadow: 0 4px 14px rgba(10, 16, 29, 0.15);
        }

        .wd-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0070c6;
          background: rgba(0, 112, 198, 0.08);
          border: 1px solid rgba(0, 112, 198, 0.2);
          padding: 6px 14px;
          border-radius: 9999px;
        }
        .wd-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0070c6;
          box-shadow: 0 0 8px #00c2ce;
          animation: wd-pulse 2s infinite ease-in-out;
        }
        @keyframes wd-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        /* ── Hero Header ── */
        .wd-hero-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 36px;
        }

        .wd-title {
          font-size: clamp(2rem, 4.5vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: #0a101d;
          margin-bottom: 18px;
        }

        .wd-subtitle {
          font-family: "Inter", sans-serif;
          font-size: clamp(1.02rem, 1.8vw, 1.25rem);
          line-height: 1.6;
          color: #334155;
          max-width: 860px;
          font-weight: 450;
        }

        /* ── Meta Specs Strip ── */
        .wd-specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          margin-top: 36px;
        }
        .wd-spec-card {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 18px;
          padding: 16px 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease;
        }
        .wd-spec-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 112, 198, 0.25);
        }
        .wd-spec-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-family: var(--font-mono, monospace), monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 600;
        }
        .wd-spec-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0a101d;
        }

        /* ── Project Showcase Top Image ── */
        .wd-image-showcase {
          max-width: 1200px;
          margin: 16px auto 60px;
          padding: 0 24px;
        }
        .wd-browser-frame {
          position: relative;
          background: #090e17;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          box-shadow: 0 24px 60px -15px rgba(10, 16, 29, 0.35);
        }
        .wd-browser-topbar {
          background: #0f172a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .wd-browser-dots {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .wd-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .wd-dot-red { background: #ff5f56; }
        .wd-dot-yellow { background: #ffbd2e; }
        .wd-dot-green { background: #27c93f; }

        .wd-url-bar {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 0.74rem;
          color: #94a3b8;
          font-family: var(--font-mono, monospace), monospace;
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 440px;
          width: 100%;
          margin: 0 auto;
        }
        .wd-url-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .wd-image-container {
          position: relative;
          width: 100%;
          height: 520px;
          overflow: hidden;
          background: #070b12;
        }
        @media (max-width: 768px) {
          .wd-image-container {
            height: 320px;
          }
        }
        .wd-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(9, 14, 23, 0.05) 0%,
            rgba(9, 14, 23, 0.45) 85%,
            rgba(9, 14, 23, 0.85) 100%
          );
          pointer-events: none;
        }
        .wd-image-float-badge {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: rgba(9, 14, 23, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 8px 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 600;
          z-index: 5;
        }

        /* ── Shared Section Styles ── */
        .wd-section {
          max-width: 1200px;
          margin: 0 auto 72px;
          padding: 0 24px;
        }
        .wd-section-header {
          margin-bottom: 32px;
        }
        .wd-section-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0070c6;
          margin-bottom: 12px;
        }
        .wd-section-title {
          font-size: clamp(1.65rem, 3vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0a101d;
          line-height: 1.2;
        }
        .wd-section-lead {
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          color: #334155;
          max-width: 820px;
          line-height: 1.65;
          margin-top: 10px;
        }

        /* ── Section: Overview Grid ── */
        .wd-overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        @media (max-width: 840px) {
          .wd-overview-grid {
            grid-template-columns: 1fr;
          }
        }
        .wd-card-challenge {
          background: #ffffff;
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
        }
        .wd-card-challenge::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ef4444, #f97316);
        }
        .wd-card-solution {
          background: #ffffff;
          border: 1px solid rgba(0, 112, 198, 0.2);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
        }
        .wd-card-solution::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0052d4, #00c2ce);
        }
        .wd-card-title {
          font-size: 1.22rem;
          font-weight: 750;
          color: #0a101d;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .wd-card-body {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #334155;
        }

        .wd-arch-card {
          background: #0a101d;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 32px;
          color: #f8fafc;
          margin-bottom: 24px;
          box-shadow: 0 12px 36px rgba(10, 16, 29, 0.2);
        }
        .wd-arch-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .wd-arch-text {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #cbd5e1;
        }

        .wd-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }
        .wd-tech-pill {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #93c5fd;
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 9999px;
          letter-spacing: 0.04em;
        }

        /* ── Section: Features Grid ── */
        .wd-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }
        @media (max-width: 768px) {
          .wd-features-grid {
            grid-template-columns: 1fr;
          }
        }
        .wd-feature-card {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 22px;
          padding: 28px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .wd-feature-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 112, 198, 0.35);
          box-shadow: 0 10px 30px rgba(0, 112, 198, 0.08);
        }
        .wd-feature-tag {
          font-family: var(--font-mono, monospace), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          color: #0070c6;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(0, 112, 198, 0.08);
          padding: 4px 12px;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 14px;
        }
        .wd-feature-title {
          font-size: 1.15rem;
          font-weight: 750;
          color: #0a101d;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .wd-feature-desc {
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          line-height: 1.62;
          color: #243042;
          font-weight: 450;
        }

        /* ── Section: Impact Metrics ── */
        .wd-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .wd-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .wd-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .wd-metric-card {
          background: #0a101d;
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 20px;
          padding: 28px 22px;
          box-shadow: 0 8px 28px rgba(10, 16, 29, 0.22);
        }
        .wd-metric-val {
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #ffffff 0%, #38bdf8 60%, #00c2ce 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .wd-metric-lbl {
          font-size: 0.9rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 4px;
        }
        .wd-metric-dtl {
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          line-height: 1.5;
          color: #94a3b8;
        }

        /* ── Bottom Section: View Website CTA ── */
        .wd-bottom-cta {
          max-width: 1200px;
          margin: 60px auto 0;
          padding: 0 24px;
        }
        .wd-cta-container {
          background: linear-gradient(135deg, #070c17 0%, #0c162b 50%, #091224 100%);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 56px 44px;
          box-shadow: 0 20px 60px rgba(7, 12, 23, 0.35);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 32px;
          position: relative;
          overflow: hidden;
        }
        .wd-cta-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(0, 194, 206, 0.22) 0%, transparent 70%);
          pointer-events: none;
        }
        .wd-cta-title {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.025em;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .wd-cta-sub {
          font-family: "Inter", sans-serif;
          font-size: 0.98rem;
          color: #94a3b8;
          max-width: 580px;
          line-height: 1.6;
        }
        .wd-cta-btn-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Primary "View Website" Button */
        .wd-view-site-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #0052d4 0%, #0070c6 50%, #00c2ce 100%);
          color: #ffffff;
          font-size: 0.96rem;
          font-weight: 700;
          padding: 16px 32px;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 10px 28px rgba(0, 112, 198, 0.4);
          transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .wd-view-site-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 36px rgba(0, 194, 206, 0.55);
        }

        .wd-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 16px 26px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .wd-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* ── Project Switcher Strip ── */
        .wd-switcher {
          max-width: 1200px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .wd-switch-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #1e293b;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 9999px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }
        .wd-switch-link:hover {
          background: #0a101d;
          color: #ffffff;
          border-color: #0a101d;
          transform: translateY(-2px);
        }
      `}</style>

      <main className="wd-root">
        {/* ── Breadcrumb & Navigation Bar ── */}
        <div className="wd-top-bar">
          <Link href="/work" className="wd-back-btn">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="wd-badge-pill">
              <span className="wd-badge-dot" />
              {project.tag}
            </span>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
              {project.year} Case Study
            </span>
          </div>
        </div>

        {/* ── Hero Title & Subtitle ── */}
        <header className="wd-hero-header">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.h1 className="wd-title" variants={fadeUp} custom={0}>
              {project.title}
            </motion.h1>
            <motion.p className="wd-subtitle" variants={fadeUp} custom={0.08}>
              {project.subtitle}
            </motion.p>

            {/* Quick Meta Specs Grid */}
            <motion.div className="wd-specs-grid" variants={fadeUp} custom={0.16}>
              <div className="wd-spec-card">
                <div className="wd-spec-label">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" />
                  Client
                </div>
                <div className="wd-spec-val">{project.client}</div>
              </div>

              <div className="wd-spec-card">
                <div className="wd-spec-label">
                  <Tag className="w-3.5 h-3.5 text-cyan-500" />
                  Industry
                </div>
                <div className="wd-spec-val">{project.industry}</div>
              </div>

              <div className="wd-spec-card">
                <div className="wd-spec-label">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  Timeline
                </div>
                <div className="wd-spec-val">{project.timeline}</div>
              </div>

              <div className="wd-spec-card">
                <div className="wd-spec-label">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Outcome
                </div>
                <div className="wd-spec-val">{project.outcome}</div>
              </div>
            </motion.div>
          </motion.div>
        </header>

        {/* ── TOP OF THE PAGE: Project Image Display ── */}
        <section className="wd-image-showcase">
          <motion.div
            className="wd-browser-frame"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Top Mock Window Bar */}
            <div className="wd-browser-topbar">
              <div className="wd-browser-dots">
                <span className="wd-dot wd-dot-red" />
                <span className="wd-dot wd-dot-yellow" />
                <span className="wd-dot wd-dot-green" />
              </div>

              <div className="wd-url-bar">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="wd-url-text">{project.websiteUrl}</span>
              </div>

              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 hover:text-white transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Hero Project Image Display */}
            <div className="wd-image-container">
              <Image
                src={project.heroImage}
                alt={`${project.title} - Showcase`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />
              <div className="wd-image-overlay" />

              <div className="wd-image-float-badge">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>{project.outcome}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── SECTION 1: OVERVIEW ── */}
        <section className="wd-section" id="overview">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="wd-section-header"
          >
            <div className="wd-section-tag">
              <span>01</span>
              <span>·</span>
              <span>Overview</span>
            </div>
            <h2 className="wd-section-title">Context & Operational Background</h2>
            <p className="wd-section-lead">{project.overview.summary}</p>
          </motion.div>

          {/* Challenge & Solution 2-Column Split */}
          <div className="wd-overview-grid">
            <motion.div
              className="wd-card-challenge"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="wd-card-title">
                <AlertCircle className="w-5 h-5 text-red-500" />
                The Challenge
              </h3>
              <p className="wd-card-body">{project.overview.challenge}</p>
            </motion.div>

            <motion.div
              className="wd-card-solution"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="wd-card-title">
                <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                Our Solution
              </h3>
              <p className="wd-card-body">{project.overview.solution}</p>
            </motion.div>
          </div>

          {/* Architecture & Tech Stack Card */}
          <motion.div
            className="wd-arch-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wd-arch-header">
              <Server className="w-5 h-5 text-cyan-400" />
              <span>Architecture & Engineering Strategy</span>
            </div>
            <p className="wd-arch-text">{project.overview.architecture}</p>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 font-semibold">
                Technologies & Infrastructure
              </div>
              <div className="wd-tech-pills">
                {project.overview.techStack.map((tech) => (
                  <span key={tech} className="wd-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── SECTION 2: FEATURES ── */}
        <section className="wd-section" id="features">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="wd-section-header"
          >
            <div className="wd-section-tag">
              <span>02</span>
              <span>·</span>
              <span>Features</span>
            </div>
            <h2 className="wd-section-title">Core Capabilities & Modules</h2>
            <p className="wd-section-lead">
              A breakdown of the mission-critical functional features engineered
              into the platform for daily operational reliability.
            </p>
          </motion.div>

          <div className="wd-features-grid">
            {project.features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="wd-feature-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <span className="wd-feature-tag">{feature.tag}</span>
                  <h3 className="wd-feature-title">{feature.title}</h3>
                  <p className="wd-feature-desc">{feature.description}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Fully Production Deployed</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: IMPACT ── */}
        <section className="wd-section" id="impact">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="wd-section-header"
          >
            <div className="wd-section-tag">
              <span>03</span>
              <span>·</span>
              <span>Impact</span>
            </div>
            <h2 className="wd-section-title">{project.impact.headline}</h2>
            <p className="wd-section-lead">{project.impact.description}</p>
          </motion.div>

          <div className="wd-metrics-grid">
            {project.impact.metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                className="wd-metric-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="wd-metric-val">{metric.value}</div>
                <div className="wd-metric-lbl">{metric.label}</div>
                <div className="wd-metric-dtl">{metric.detail}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM PART: View Website Button & CTA ── */}
        <section className="wd-bottom-cta">
          <motion.div
            className="wd-cta-container"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="wd-cta-glow" />

            <div style={{ position: "relative", zIndex: 2 }}>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest mb-3">
                <Globe className="w-3.5 h-3.5" />
                Live Project Deployment
              </div>
              <h2 className="wd-cta-title">Explore {project.title}</h2>
              <p className="wd-cta-sub">
                Visit the live website to experience the user interface, real-time
                workflows, and cloud performance in action.
              </p>
            </div>

            <div className="wd-cta-btn-group" style={{ position: "relative", zIndex: 2 }}>
              {/* Primary Requested "View Website" Button */}
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wd-view-site-btn"
                id="btn-view-website"
              >
                <Globe className="w-4 h-4" />
                <span>View Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Secondary CTA */}
              <Link href="/contact" className="wd-secondary-btn">
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Project Navigation Strip ── */}
        <div className="wd-switcher">
          <Link href={`/work/${prevProject.slug}`} className="wd-switch-link">
            <ArrowLeft className="w-4 h-4" />
            <span>
              Previous: <strong>{prevProject.title}</strong>
            </span>
          </Link>

          <Link href={`/work/${nextProject.slug}`} className="wd-switch-link">
            <span>
              Next: <strong>{nextProject.title}</strong>
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
