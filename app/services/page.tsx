import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Iconex IT",
  description: "End-to-end technology services for modern businesses.",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    tag: "Infrastructure",
    title: "Cloud & Infrastructure",
    description:
      "We design and manage cloud environments that scale with your growth — from initial migration to ongoing optimisation across AWS, Azure, and GCP.",
    features: ["Cloud migration", "Infrastructure as code", "Cost optimisation", "24/7 monitoring"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>`,
  },
  {
    tag: "Security",
    title: "Cybersecurity",
    description:
      "Proactive threat detection, penetration testing, and compliance frameworks that protect your data and keep your systems audit-ready.",
    features: ["Penetration testing", "SOC 2 compliance", "Threat monitoring", "Incident response"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    tag: "Development",
    title: "Software Development",
    description:
      "Full-stack engineering from MVP to enterprise scale — clean architecture, agile delivery, and code your team can actually maintain.",
    features: ["Web & mobile apps", "API development", "System integration", "Code audits"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    tag: "Intelligence",
    title: "AI & Data Analytics",
    description:
      "Turn raw data into decisions. We build custom ML pipelines, dashboards, and predictive models that make your business measurably smarter.",
    features: ["ML model development", "Data pipelines", "BI dashboards", "Predictive analytics"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  },
  {
    tag: "Strategy",
    title: "IT Consulting",
    description:
      "Technology roadmaps, vendor selection, and digital transformation advisory — so your next platform decision is built on evidence, not guesswork.",
    features: ["Tech roadmapping", "Vendor evaluation", "Digital transformation", "CTO advisory"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  },
  {
    tag: "Support",
    title: "Managed IT Support",
    description:
      "Dedicated support teams, SLA-backed response times, and proactive system health checks — so your team stays focused on the work that matters.",
    features: ["Help desk support", "SLA guarantees", "Remote & on-site", "Proactive maintenance"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20a6 6 0 00-12 0"/><circle cx="12" cy="10" r="4"/><path d="M22 20a9.965 9.965 0 00-2.895-7"/><path d="M2 20a9.965 9.965 0 012.895-7"/></svg>`,
  },
];

const stats = [
  { value: "200+", label: "Projects delivered" },
  { value: "98%", label: "Client retention" },
  { value: "12+", label: "Years in operation" },
  { value: "40+", label: "Engineers on staff" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      <style>{`
        .srv-page {
          background: #FFFFFF;
          min-height: 100vh;
          color: #334155;
          font-family: var(--font-space-grotesk), sans-serif;
        }

        /* ── Hero ── */
        
.srv-hero {
  position: relative;
  padding: 60px 60px 80px; /* Reduced top padding from 80px to 40px */
  margin-top: -32px;       /* Optional: Pulls the section up closer to the layout's header border */
  overflow: hidden;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}
        .srv-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .srv-hero-glow {
          position: absolute;
          top: -100px; right: -80px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 107, 74, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .srv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF6B4A;
          margin-bottom: 20px;
        }
        .srv-eyebrow-dot {
          width: 5px; height: 5px;
          background: #FF6B4A;
          border-radius: 50%;
        }
        .srv-hero-title {
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #0F172A;
          max-width: 700px;
          margin-bottom: 24px;
        }
        .srv-hero-title em {
          font-style: normal;
          color: #FF6B4A;
        }
        .srv-hero-sub {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #64748B;
          max-width: 500px;
          margin-bottom: 40px;
        }
        .srv-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FF6B4A;
          color: #fff;
          border: none;
          padding: 13px 26px;
          border-radius: 8px;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .srv-hero-cta:hover { background: #E8512F; transform: translateY(-1px); }

        /* ── Stats strip ── */
        .srv-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
          background: #FAFAFA;
        }
        .srv-stat {
          padding: 36px 40px;
          border-right: 1px solid rgba(15, 23, 42, 0.06);
        }
        .srv-stat:last-child { border-right: none; }
        .srv-stat-value {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0F172A;
          line-height: 1;
          margin-bottom: 6px;
        }
        .srv-stat-value span { color: #FF6B4A; }
        .srv-stat-label {
          font-size: 0.8125rem;
          color: #475569;
          font-weight: 500;
        }

        /* ── Services grid ── */
        .srv-grid-section {
          padding: 80px 60px;
        }
        .srv-section-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 48px;
        }
        .srv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 16px;
          overflow: hidden;
        }
        .srv-card {
          background: #FFFFFF;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: background-color 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .srv-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,74,0), transparent);
          transition: background 0.3s;
        }
        .srv-card:hover { background: #FCFCFD; }
        .srv-card:hover::before {
          background: linear-gradient(90deg, transparent, rgba(255,107,74,0.4), transparent);
        }

        .srv-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .srv-card-tag {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF6B4A;
          background: rgba(255,107,74,0.06);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,107,74,0.15);
        }
        .srv-card-icon {
          width: 26px; height: 26px;
          color: #64748B;
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .srv-card:hover .srv-card-icon { color: #FF6B4A; }
        .srv-card-icon svg { width: 100%; height: 100%; }

        .srv-card-title {
          font-size: 1.1875rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .srv-card-desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 28px;
          flex: 1;
        }

        .srv-card-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
        }
        .srv-card-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8125rem;
          color: #64748B;
          font-weight: 500;
        }
        .srv-card-feature-dot {
          width: 4px; height: 4px;
          background: #FF6B4A;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.6;
        }

        .srv-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #FF6B4A;
          text-decoration: none;
          margin-top: auto;
          transition: gap 0.2s;
        }
        .srv-card:hover .srv-card-link { gap: 10px; }
        .srv-card-link svg { width: 14px; height: 14px; }

        /* ── CTA band ── */
        .srv-cta-band {
          margin: 0 60px 80px;
          background: #F8FAFC;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 16px;
          padding: 60px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .srv-cta-band::after {
          content: '';
          position: absolute;
          right: -60px; top: -60px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,74,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .srv-cta-title {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0F172A;
          margin-bottom: 8px;
        }
        .srv-cta-sub {
          font-size: 0.9375rem;
          color: #475569;
          line-height: 1.6;
        }
        .srv-cta-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }
        .srv-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FF6B4A;
          color: #fff;
          border: none;
          padding: 13px 26px;
          border-radius: 8px;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .srv-btn-primary:hover { background: #E8512F; }
        .srv-btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 13px 26px;
          border-radius: 8px;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: transparent;
          color: #475569;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, background-color 0.2s;
        }
        .srv-btn-ghost:hover { border-color: rgba(15, 23, 42, 0.2); color: #0F172A; background-color: rgba(0,0,0,0.01); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .srv-grid { grid-template-columns: repeat(2, 1fr); }
          .srv-stats { grid-template-columns: repeat(2, 1fr); }
          .srv-stat:nth-child(2) { border-right: none; }
          .srv-stat:nth-child(3) { border-top: 1px solid rgba(15, 23, 42, 0.06); }
          .srv-stat:nth-child(4) { border-top: 1px solid rgba(15, 23, 42, 0.06); }
          .srv-cta-band { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .srv-hero { padding: 60px 24px; }
          .srv-grid-section { padding: 60px 24px; }
          .srv-grid { grid-template-columns: 1fr; }
          .srv-stats { grid-template-columns: repeat(2, 1fr); }
          .srv-cta-band { margin: 0 24px 60px; padding: 40px 32px; }
          .srv-cta-actions { flex-direction: column; width: 100%; }
        }
      `}</style>

      <div className="srv-page">

        {/* ── Hero ── */}
        <section className="srv-hero">
          <div className="srv-hero-grid" />
          <div className="srv-hero-glow" />

          <div className="srv-eyebrow">
            <span className="srv-eyebrow-dot" />
            What we do
          </div>

          <h1 className="srv-hero-title">
            Technology services built for <em>real scale</em>
          </h1>

          <p className="srv-hero-sub">
            From a single integration to a full digital overhaul — we bring the engineering depth and strategic clarity to make it stick.
          </p>

          <a href="/contact" className="srv-hero-cta">
            Talk to our team
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </section>

        {/* ── Stats ── */}
        <div className="srv-stats">
          {stats.map((s) => (
            <div key={s.label} className="srv-stat">
              <div className="srv-stat-value">{s.value}</div>
              <div className="srv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Services grid ── */}
        <section className="srv-grid-section">
          <p className="srv-section-label">Our services</p>
          <div className="srv-grid">
            {services.map((s) => (
              <div key={s.title} className="srv-card">
                <div className="srv-card-top">
                  <span className="srv-card-tag">{s.tag}</span>
                  <span
                    className="srv-card-icon"
                    dangerouslySetInnerHTML={{ __html: s.icon }}
                  />
                </div>

                <h2 className="srv-card-title">{s.title}</h2>
                <p className="srv-card-desc">{s.description}</p>

                <div className="srv-card-features">
                  {s.features.map((f) => (
                    <div key={f} className="srv-card-feature">
                      <span className="srv-card-feature-dot" />
                      {f}
                    </div>
                  ))}
                </div>

                <a href="#" className="srv-card-link">
                  Learn more
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA band ── */}
        <div className="srv-cta-band">
          <div>
            <div className="srv-cta-title">Not sure where to start?</div>
            <p className="srv-cta-sub">
              Book a free 30-minute discovery call. We'll map out exactly what your business needs — no pitch, no pressure.
            </p>
          </div>
          <div className="srv-cta-actions">
            <a href="/contact" className="srv-btn-primary">Book a call</a>
            <a href="/work" className="srv-btn-ghost">See our work</a>
          </div>
        </div>

      </div>
    </>
  );
}