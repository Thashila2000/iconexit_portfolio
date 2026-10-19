"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const PROJECTS = [
  {
    tag: "CLOUD · INFRASTRUCTURE",
    title: "Enterprise Cloud Migration",
    description:
      "Migrated a 200-seat financial services firm from on-premise to AWS, cutting infrastructure costs by 38% and achieving 99.98% uptime in the first quarter post-launch.",
    year: "2024",
    outcome: "−38% infra cost",
  },
  {
    tag: "SECURITY · COMPLIANCE",
    title: "SOC 2 Compliance Uplift",
    description:
      "Designed and implemented a full security programme for a Series B SaaS startup, enabling them to achieve SOC 2 Type II certification in under six months.",
    year: "2024",
    outcome: "SOC 2 Type II in 6 mo",
  },
  {
    tag: "AI · DATA",
    title: "Predictive Maintenance Platform",
    description:
      "Built a machine-learning pipeline for a manufacturing client that predicts equipment failure 72 hours in advance, reducing unplanned downtime by 61%.",
    year: "2023",
    outcome: "−61% downtime",
  },
  {
    tag: "ENGINEERING · MOBILE",
    title: "Logistics Mobile Suite",
    description:
      "Delivered a cross-platform React Native app and supporting REST API for a regional logistics operator, processing 4,000+ daily driver events with sub-200 ms latency.",
    year: "2023",
    outcome: "4k+ events/day",
  },
  {
    tag: "CONSULTING · STRATEGY",
    title: "Digital Transformation Roadmap",
    description:
      "Produced a 24-month technology roadmap for a 500-person retail chain, prioritising ERP modernisation, customer data platform, and omnichannel integration.",
    year: "2022",
    outcome: "24-month roadmap",
  },
  {
    tag: "ENGINEERING · WEB",
    title: "Healthcare Patient Portal",
    description:
      "Architected and shipped a FHIR-compliant patient portal connecting three hospital systems, enabling secure record access for 80,000+ registered patients.",
    year: "2022",
    outcome: "80k+ patients served",
  },
];

export default function WorkPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;700&display=swap');

        .wk-page { background: #ffebeb; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

        /* ── Hero ── */
        .wk-hero {
          position: relative;
          min-height: 580px;
          display: flex; align-items: flex-end;
          padding: 0 60px 80px;
          overflow: hidden;
          background: #0A101D;
        }
        .wk-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #00C2CE; margin-bottom: 16px;
        }
        .wk-eyebrow-dot { width: 5px; height: 5px; background: #00C2CE; border-radius: 50%; box-shadow: 0 0 8px #00C2CE; }
        .wk-hero-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem); font-weight: 700;
          letter-spacing: -0.03em; line-height: 1.1; color: #FFFFFF;
          max-width: 800px; margin-bottom: 20px;
        }
        .wk-hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .wk-hero-sub {
          font-size: 1.1rem; line-height: 1.65; color: #CBD5E1;
          max-width: 540px; margin-bottom: 0;
        }

        /* ── Grid ── */
        .wk-grid-section { padding: 80px 60px 120px; background: #ffebeb; }
        .wk-grid-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem; font-weight: 900; letter-spacing: 0.08em;
          text-transform: uppercase; color: #94A3B8; margin-bottom: 48px;
        }
        .wk-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        /* ── Card ── */
        .wk-card {
          background: #FAFBFF;
          border: 1px solid #E8EDF5;
          border-radius: 20px;
          padding: 36px 32px;
          display: flex; flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
          cursor: default;
        }
        .wk-card:hover {
          border-color: #0070C6;
          box-shadow: 0 24px 52px -16px rgba(0, 112, 198, 0.18);
          transform: translateY(-4px);
        }
        .wk-card-tag {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #94A3B8; margin-bottom: 20px;
          transition: color 0.3s;
        }
        .wk-card:hover .wk-card-tag { color: #0070C6; }
        .wk-card-title {
          font-size: 1.15rem; font-weight: 700; letter-spacing: -0.015em;
          line-height: 1.3; color: #0B1220; margin-bottom: 14px; flex: 1;
        }
        .wk-card-desc {
          font-size: 0.875rem; line-height: 1.7; color: #64748B; margin-bottom: 28px;
        }
        .wk-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid #E8EDF5; padding-top: 20px;
          transition: border-color 0.3s;
        }
        .wk-card:hover .wk-card-footer { border-top-color: rgba(0, 112, 198, 0.2); }
        .wk-card-year {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.7rem; font-weight: 700; color: #94A3B8;
        }
        .wk-card-outcome {
          font-size: 0.75rem; font-weight: 700;
          background: linear-gradient(135deg, #0052D4 0%, #00C2CE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        /* ── CTA ── */
        .wk-cta-section {
          padding: 100px 60px;
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          text-align: center;
        }
        .wk-cta-title {
          font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700;
          letter-spacing: -0.03em; color: #FFFFFF; margin-bottom: 16px;
        }
        .wk-cta-sub {
          font-size: 1.1rem; color: rgba(255,255,255,0.8); margin-bottom: 40px;
        }
        .wk-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #FFFFFF; color: #0052D4;
          padding: 16px 36px; border-radius: 50px;
          font-weight: 700; font-size: 0.95rem;
          text-decoration: none; transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .wk-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }

        /* ── Responsive ── */
        @media (max-width: 1120px) { .wk-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .wk-hero { padding: 130px 24px 60px; min-height: auto; }
          .wk-grid-section { padding: 60px 24px 80px; }
          .wk-grid { grid-template-columns: 1fr; gap: 16px; }
          .wk-cta-section { padding: 80px 24px; }
        }
      `}</style>

      <div className="wk-page">

        {/* ── Hero ── */}
        <section className="wk-hero">
          <Image
            src="/Images/abstract img.jpg"
            alt="Work portfolio hero background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}
          />
          {/* Dark shadow overlay same as mission section */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(10, 16, 29, 0.72)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A101D 0%, transparent 40%, rgba(10, 16, 29, 0.8) 100%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10 }}>
            <motion.div className="wk-eyebrow" custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span className="wk-eyebrow-dot" />
              Selected Work
            </motion.div>

            <motion.h1 className="wk-hero-title" custom={0.1} variants={fadeUp} initial="hidden" animate="show">
              Projects that move the <em>needle.</em>
            </motion.h1>

            <motion.p className="wk-hero-sub" custom={0.2} variants={fadeUp} initial="hidden" animate="show">
              A selection of engagements across cloud, security, software, and AI each one built to solve a real problem for a real client.
            </motion.p>
          </div>
        </section>

        {/* ── Project Grid ── */}
        <section className="wk-grid-section">
          <motion.p
            className="wk-grid-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Case Studies — {PROJECTS.length} engagements
          </motion.p>

          <motion.div
            className="wk-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                className="wk-card"
                variants={fadeUp}
                custom={i * 0.06}
              >
                <div className="wk-card-tag">{p.tag}</div>
                <h2 className="wk-card-title">{p.title}</h2>
                <p className="wk-card-desc">{p.description}</p>
                <div className="wk-card-footer">
                  <span className="wk-card-year">{p.year}</span>
                  <span className="wk-card-outcome">{p.outcome}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="wk-cta-section">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="wk-cta-title">Ready to be our next case study?</h2>
            <p className="wk-cta-sub">
              Tell us about your challenge and we&apos;ll respond with a concrete plan within one business day.
            </p>
            <Link href="/contact" className="wk-cta-btn">
              Start a conversation ↗
            </Link>
          </motion.div>
        </section>

      </div>
    </>
  );
}
