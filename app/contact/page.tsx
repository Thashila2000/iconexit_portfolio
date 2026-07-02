"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ElectricBorder from "@/app/components/ElectricBoarder";

type Status = "idle" | "sending" | "sent";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function LiveClock() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const tick = () => {
      const str = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit", second: "2-digit",
      });
      setTime(str);
      const h = parseInt(str.split(":")[0] ?? "0", 10);
      setIsOpen(h >= 9 && h < 18);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", display: "inline-block", flexShrink: 0, background: isOpen ? "#22C55E" : "#EF4444", boxShadow: isOpen ? "0 0 6px rgba(34,197,94,0.8)" : "0 0 6px rgba(239,68,68,0.8)" }} />
      <span style={{ color: isOpen ? "#16A34A" : "#DC2626", fontWeight: 600 }}>{isOpen ? "Open" : "Closed"}</span>
      <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
      <span style={{ color: "rgba(255,255,255,0.5)" }}>{time} LKT</span>
    </div>
  );
}

function InfoItem({ icon, label, value, href, delay }: {
  icon: React.ReactNode; label: string; value: string; href?: string; delay: number;
}) {
  return (
    <motion.div custom={delay} variants={fadeUp} initial="hidden" animate="show"
      style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: "rgba(255,107,74,0.12)", border: "1px solid rgba(255,107,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF8466" }}>{icon}</div>
      <div>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 3, fontFamily: "var(--font-space-grotesk), sans-serif" }}>{label}</div>
        {href
          ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => (e.currentTarget.style.color = "#FF8466")} onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>{value}</a>
          : <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500 }}>{value}</span>
        }
      </div>
    </motion.div>
  );
}

function Field({ label, name, type = "text", required = false, textarea = false }: {
  label: string; name: string; type?: string; required?: boolean; textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;
  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none", outline: "none",
    color: "#0B0F19", fontSize: "0.9375rem",
    fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500,
    paddingTop: 20, paddingBottom: 8, resize: "none",
  };
  return (
    <div style={{ position: "relative", marginBottom: 28 }}>
      <label htmlFor={name} style={{ position: "absolute", top: active ? 2 : 14, left: 0, fontSize: active ? "0.6rem" : "0.875rem", fontWeight: active ? 700 : 500, letterSpacing: active ? "0.12em" : "0", textTransform: active ? "uppercase" : "none", color: focused ? "#FF6B4A" : "#94A3B8", transition: "all 0.22s ease", pointerEvents: "none", fontFamily: "var(--font-space-grotesk), sans-serif" }}>{label}</label>
      {textarea
        ? <textarea id={name} name={name} required={required} rows={4} value={value} style={inputStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={e => setValue(e.target.value)} />
        : <input id={name} name={name} type={type} required={required} value={value} style={inputStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={e => setValue(e.target.value)} />
      }
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: focused ? "#FF6B4A" : "#E2E8F0", transition: "background 0.22s" }} />
      {focused && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#FF6B4A", boxShadow: "0 0 8px rgba(255,107,74,0.5)" }} />}
    </div>
  );
}

const SERVICES = ["Cloud", "Cybersecurity", "Development", "AI & Data", "Consulting", "Support"];

function ServiceChips() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (s: string) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 10, fontFamily: "var(--font-space-grotesk), sans-serif" }}>
        I&apos;m interested in
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SERVICES.map(s => {
          const on = selected.includes(s);
          return (
            <button key={s} type="button" onClick={() => toggle(s)} style={{ padding: "6px 14px", borderRadius: 999, cursor: "pointer", border: on ? "1.5px solid #FF6B4A" : "1.5px solid #E2E8F0", background: on ? "rgba(255,107,74,0.07)" : "transparent", color: on ? "#E8512F" : "#64748B", fontSize: "0.8rem", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, transition: "all 0.2s" }}>{s}</button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => { setStatus("sent"); formRef.current?.reset(); }, 2000);
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* Prevent the ElectricBorder canvas from causing horizontal scroll */
        html, body { overflow-x: hidden; }

        .cp-wrap {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 480px 1fr;
          font-family: var(--font-space-grotesk), sans-serif;
        }

        /* ── Left dark panel ── */
        .cp-left {
          background: #0B0F19;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 64px 52px;
          min-height: 100vh;
        }
        .cp-left-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,107,74,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,74,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 100% 100% at 0% 0%, black 30%, transparent 80%);
        }
        .cp-left-glow {
          position: absolute; top: -80px; left: -80px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,74,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cp-left-glow2 {
          position: absolute; bottom: -60px; right: -60px;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .cp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #FF8466; margin-bottom: 32px;
        }
        .cp-badge-dot { width: 5px; height: 5px; background: #FF6B4A; border-radius: 50%; animation: blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .cp-big-text {
          font-size: clamp(3.2rem, 4.5vw, 5rem); font-weight: 700;
          letter-spacing: -0.04em; line-height: 0.92; color: #fff; margin-bottom: 24px;
        }
        .cp-big-text .ember { color: #FF6B4A; }

        .cp-tagline { font-size: 0.9rem; line-height: 1.75; color: rgba(255,255,255,0.4); max-width: 320px; margin-bottom: 48px; }
        .cp-info-stack { display: flex; flex-direction: column; gap: 24px; margin-bottom: 36px; }

        .cp-social-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 12px; font-family: var(--font-space-grotesk), sans-serif; }
        .cp-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 40px; }
        .cp-social-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); text-decoration: none; transition: all 0.22s ease; }
        .cp-social-item:hover { background: rgba(255,107,74,0.06); border-color: rgba(255,107,74,0.25); }
        .cp-social-icon { width: 28px; height: 28px; border-radius: 6px; background: rgba(255,107,74,0.12); display: flex; align-items: center; justify-content: center; color: #FF8466; flex-shrink: 0; transition: color 0.2s; }
        .cp-social-item:hover .cp-social-icon { color: #FF6B4A; }
        .cp-social-name { font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.6); font-family: var(--font-space-grotesk), sans-serif; transition: color 0.2s; }
        .cp-social-item:hover .cp-social-name { color: rgba(255,255,255,0.9); }
        .cp-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 8px 0 24px; }

        /* ── Right white panel ── */
        .cp-right {
          background: #FFFFFF;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          /* clip-path prevents the ElectricBorder canvas from triggering
             horizontal scroll while still letting the glow visually spill
             into the white area */
          padding: 60px 60px 80px;
          position: relative;
          overflow: clip;
        }
        .cp-right-inner { width: 100%; max-width: 520px; }

        /* The electric border wrapper needs visible overflow on desktop so the
           canvas glow shows — we restore it only above mobile breakpoint */
        .cp-border-shell { overflow: visible; }

        .cp-formwrap {
          padding: 48px 44px;
          background: #fff;
          border-radius: 20px;
          /* No static border — ElectricBorder handles the visual edge */
           border: 3px solid #f59e0b; 
        }

        .cp-form-header { margin-bottom: 40px; }
        .cp-form-tag { display: inline-block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #FF6B4A; background: rgba(255,107,74,0.08); border: 1px solid rgba(255,107,74,0.2); padding: 4px 10px; border-radius: 999px; margin-bottom: 16px; }
        .cp-form-title { font-size: clamp(1.6rem, 2.5vw, 2.25rem); font-weight: 700; letter-spacing: -0.03em; color: #0B0F19; line-height: 1.1; margin-bottom: 10px; }
        .cp-form-sub { font-size: 0.9rem; color: #64748B; line-height: 1.6; }
        .cp-tworow { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }

        .cp-submit { width: 100%; padding: 15px 28px; background: #0B0F19; color: #fff; border: none; border-radius: 10px; font-family: var(--font-space-grotesk), sans-serif; font-size: 0.9375rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s, transform 0.15s; margin-top: 8px; position: relative; overflow: hidden; }
        .cp-submit::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(255,107,74,0.15)); transition: opacity 0.3s; }
        .cp-submit:hover:not(:disabled) { background: #FF6B4A; transform: translateY(-1px); }
        .cp-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .cp-privacy { margin-top: 14px; font-size: 0.7rem; color: #CBD5E1; text-align: center; }

        .cp-success { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 40px 0; text-align: center; }
        .cp-success-ring { width: 64px; height: 64px; border-radius: 50%; background: rgba(34,197,94,0.08); border: 1.5px solid #22C55E; display: flex; align-items: center; justify-content: center; color: #22C55E; }
        .cp-success-title { font-size: 1.375rem; font-weight: 700; color: #0B0F19; letter-spacing: -0.02em; }
        .cp-success-body { font-size: 0.875rem; color: #64748B; line-height: 1.65; max-width: 300px; }
        .cp-reset { margin-top: 8px; background: transparent; border: 1.5px solid #E2E8F0; color: #64748B; padding: 10px 22px; border-radius: 8px; font-family: var(--font-space-grotesk), sans-serif; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .cp-reset:hover { border-color: #0B0F19; color: #0B0F19; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        /* ── Tablet (≤ 960px): stack vertically ── */
        @media (max-width: 960px) {
          .cp-wrap {
            grid-template-columns: 1fr;
          }
          .cp-left {
            min-height: auto;
            padding: 56px 32px 48px;
          }
          .cp-right {
            padding: 52px 32px 72px;
            /* Clip is fine here — glow is mostly decorative on mobile */
            overflow: hidden;
          }
          .cp-big-text {
            font-size: clamp(2.8rem, 8vw, 4rem);
          }
        }

        /* ── Mobile (≤ 600px) ── */
        @media (max-width: 600px) {
          .cp-left {
            padding: 40px 20px 40px;
          }
          .cp-big-text {
            font-size: clamp(2.4rem, 10vw, 3.2rem);
            margin-bottom: 16px;
          }
          .cp-tagline {
            font-size: 0.85rem;
            margin-bottom: 32px;
          }
          .cp-right {
            padding: 36px 16px 56px;
          }
          .cp-right-inner {
            max-width: 100%;
          }
          .cp-formwrap {
            padding: 28px 20px;
          }
          .cp-tworow {
            grid-template-columns: 1fr;
          }
          .cp-social-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .cp-form-title {
            font-size: 1.4rem;
          }
          /* Make info items a bit tighter on small screens */
          .cp-info-stack {
            gap: 18px;
            margin-bottom: 28px;
          }
          /* Reduce badge margin */
          .cp-badge {
            margin-bottom: 20px;
          }
        }

        /* ── Very small (≤ 380px) ── */
        @media (max-width: 380px) {
          .cp-social-grid {
            grid-template-columns: 1fr;
          }
          .cp-left {
            padding: 36px 16px 36px;
          }
          .cp-formwrap {
            padding: 24px 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="cp-wrap">

        {/* ══ LEFT ══════════════════════════════════════════════════════════ */}
        <div className="cp-left">
          <div className="cp-left-grid" />
          <div className="cp-left-glow" />
          <div className="cp-left-glow2" />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div className="cp-badge" custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span className="cp-badge-dot" />
              Get in touch
            </motion.div>

            <motion.h1 className="cp-big-text" custom={0.1} variants={fadeUp} initial="hidden" animate="show">
              Let&apos;s<br />build<br />something<br /><span className="ember">great.</span>
            </motion.h1>

            <motion.p className="cp-tagline" custom={0.2} variants={fadeUp} initial="hidden" animate="show">
              Drop us a message and we&apos;ll respond within one business day &mdash; with a concrete plan, not a pitch.
            </motion.p>

            <div className="cp-divider" />

            <div className="cp-info-stack">
              <InfoItem delay={0.28} label="Email" value="hello@iconex.it" href="mailto:hello@iconex.it"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              />
              <InfoItem delay={0.34} label="Phone" value="+94 81 234 5678" href="tel:+94812345678"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.05 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>}
              />
              <InfoItem delay={0.40} label="Office" value="142/5, Dalada Veediya, Kandy 20000, Sri Lanka"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
              />
            </div>

            <motion.div custom={0.44} variants={fadeUp} initial="hidden" animate="show">
              <div className="cp-social-label">Connect with us</div>
              <div className="cp-social-grid">
                <a href="https://linkedin.com/company/iconexit" target="_blank" rel="noopener noreferrer" className="cp-social-item">
                  <div className="cp-social-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div>
                  <span className="cp-social-name">LinkedIn</span>
                </a>
                <a href="https://instagram.com/iconex" target="_blank" rel="noopener noreferrer" className="cp-social-item">
                  <div className="cp-social-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div>
                  <span className="cp-social-name">Instagram</span>
                </a>
                <a href="https://facebook.com/iconexit" target="_blank" rel="noopener noreferrer" className="cp-social-item">
                  <div className="cp-social-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
                  <span className="cp-social-name">Facebook</span>
                </a>
                <a href="https://tiktok.com/@iconex" target="_blank" rel="noopener noreferrer" className="cp-social-item">
                  <div className="cp-social-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></div>
                  <span className="cp-social-name">TikTok</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div custom={0.52} variants={fadeUp} initial="hidden" animate="show" style={{ position: "relative", zIndex: 1 }}>
            <LiveClock />
            <div style={{ marginTop: 20, fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
              Mon &ndash; Fri &middot; 09:00&ndash;18:00 LKT
            </div>
          </motion.div>
        </div>

        {/* ══ RIGHT ═════════════════════════════════════════════════════════ */}
        <div className="cp-right">
          <motion.div className="cp-right-inner" custom={0.2} variants={fadeUp} initial="hidden" animate="show">
            <ElectricBorder color="#FF6B4A" speed={0.8} chaos={0.10} borderRadius={20}>
              <div className="cp-formwrap">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div key="success" className="cp-success"
                      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      <div className="cp-success-ring">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div className="cp-success-title">Message received</div>
                      <p className="cp-success-body">We&apos;ll come back within one business day with a clear next step. Keep an eye on your inbox.</p>
                      <button className="cp-reset" onClick={() => setStatus("idle")}>Send another message</button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="cp-form-header">
                        <div className="cp-form-tag">New enquiry</div>
                        <div className="cp-form-title">Send us a message</div>
                        <p className="cp-form-sub">Tell us about your project and we&apos;ll get back to you shortly.</p>
                      </div>

                      <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="cp-tworow">
                          <Field label="First name" name="first_name" required />
                          <Field label="Last name" name="last_name" />
                        </div>
                        <Field label="Work email" name="email" type="email" required />
                        <Field label="Company" name="company" />
                        <ServiceChips />
                        <Field label="How can we help?" name="message" required textarea />

                        <motion.button type="submit" className="cp-submit" disabled={status === "sending"}
                          whileHover={status === "idle" ? { scale: 1.01 } : {}}
                          whileTap={status === "idle" ? { scale: 0.98 } : {}}
                        >
                          {status === "sending" ? (
                            <><svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Sending&hellip;</>
                          ) : (
                            <>Send message<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                          )}
                        </motion.button>
                        <p className="cp-privacy">We respect your privacy. No spam, ever.</p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ElectricBorder>
          </motion.div>
        </div>

      </div>
    </>
  );
}
