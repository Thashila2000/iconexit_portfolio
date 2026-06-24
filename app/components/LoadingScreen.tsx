"use client";

import { useEffect, useState } from "react";

const LETTERS = ["I", "C", "O", "N", "E", "X", " ", "I", "T"];

// interpolate hex colour based on progress 0–100
function getBarColor(p: number): string {
  // 0%   → red    #FF2D2D
  // 50%  → orange #FF6B4A (brand ember)
  // 100% → green  #22C55E

  let r: number, g: number, b: number;

  if (p <= 50) {
    const t = p / 50;
    r = Math.round(255 + (255 - 255) * t);           // 255 → 255
    g = Math.round(45  + (107 - 45)  * t);           // 45  → 107
    b = Math.round(45  + (74  - 45)  * t);           // 45  → 74
  } else {
    const t = (p - 50) / 50;
    r = Math.round(255 + (34  - 255) * t);           // 255 → 34
    g = Math.round(107 + (197 - 107) * t);           // 107 → 197
    b = Math.round(74  + (94  - 74)  * t);           // 74  → 94
  }

  return `rgb(${r},${g},${b})`;
}

function getGlowColor(p: number): string {
  if (p <= 50) return `rgba(255,${Math.round(45 + (107-45)*(p/50))},45,0.55)`;
  const t = (p - 50) / 50;
  return `rgba(${Math.round(255+(34-255)*t)},${Math.round(107+(197-107)*t)},${Math.round(74+(94-74)*t)},0.55)`;
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Step 1 — reveal letters one by one sliding from right
  useEffect(() => {
    if (!mounted) return;
    if (visibleCount >= LETTERS.length) return;
    const delay = visibleCount === 0 ? 400 : 180;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [mounted, visibleCount]);

  // Step 2 — progress bar starts after all letters are visible
  useEffect(() => {
    if (visibleCount < LETTERS.length) return;
    const startDelay = setTimeout(() => {
      const id = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(id);
            setTimeout(() => {
              setExiting(true);
              setTimeout(onComplete, 700);
            }, 500);
            return 100;
          }
          const inc = p < 50 ? 0.55 : p < 80 ? 0.35 : p < 95 ? 0.2 : 0.45;
          return Math.min(p + inc, 100);
        });
      }, 30);
      return () => clearInterval(id);
    }, 300);
    return () => clearTimeout(startDelay);
  }, [visibleCount, onComplete]);

  const barColor   = getBarColor(progress);
  const glowColor  = getGlowColor(progress);
  const allIn      = visibleCount >= LETTERS.length;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "#0B0F19",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease",
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,107,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,74,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        pointerEvents: "none",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute",
        width: 420, height: 420,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,74,0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Letters ── */}
      <div style={{ display: "flex", alignItems: "baseline", position: "relative" }}>
        {LETTERS.map((char, i) => {
          const isVisible = i < visibleCount;
          const isSpace   = char === " ";
          const isIT      = i >= 7;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: isSpace ? 0 : "clamp(3.5rem, 9vw, 8rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: isIT ? "#FF6B4A" : "#FFFFFF",
                marginRight: isSpace ? "clamp(10px, 2vw, 22px)" : 0,
                fontFamily: "var(--font-space-grotesk), sans-serif",
                userSelect: "none",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(80px)",
                transition: isVisible
                  ? "opacity 0.5s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)"
                  : "none",
              }}
            >
              {isSpace ? "\u00A0" : char}
            </span>
          );
        })}

        {/* Underline sweep */}
        <div style={{
          position: "absolute",
          bottom: -8, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #FF6B4A 40%, #FF8466 60%, transparent)",
          transformOrigin: "left center",
          transform: allIn ? "scaleX(1)" : "scaleX(0)",
          opacity: allIn ? 1 : 0,
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.4s ease 0.1s",
        }} />
      </div>

      {/* ── Progress block ── */}
      <div
        style={{
          position: "absolute",
          bottom: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(640px, 88vw)",
          opacity: allIn ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
        }}
      >
        {/* Labels row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 14,
        }}>
          <span style={{
            fontSize: "0.7rem",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#4B5563",
            fontWeight: 500,
            fontFamily: "var(--font-space-grotesk), sans-serif",
          }}>
            Initialising system
          </span>

          {/* Percentage counter */}
          <span style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: barColor,
            transition: "color 0.3s ease",
          }}>
            {String(Math.floor(progress)).padStart(2, "0")}
            <span style={{ fontSize: "0.5em", marginLeft: 2 }}>%</span>
          </span>
        </div>

        {/* ── Track ── */}
        <div style={{
          width: "100%",
          height: 8,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 999,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* Filled portion */}
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: barColor,
            boxShadow: `0 0 14px ${glowColor}`,
            borderRadius: 999,
            transition: "width 0.03s linear, background 0.3s ease, box-shadow 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* shimmer sweep */}
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              width: "60px",
              right: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25))",
              borderRadius: 999,
            }} />
          </div>
        </div>

        {/* Colour legend — shows phase label */}
        <div style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: barColor,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}>
            {progress < 33
              ? "● Loading assets"
              : progress < 66
              ? "● Configuring modules"
              : progress < 100
              ? "● Finalising setup"
              : "✓ Ready"}
          </span>
          <span style={{
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            color: "#374151",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}>
            iconex.it / v2.0
          </span>
        </div>
      </div>

      {/* Corner marks */}
      {[
        { top: 20, left: 20, borderTop: "1px solid rgba(255,107,74,0.2)", borderLeft: "1px solid rgba(255,107,74,0.2)" },
        { top: 20, right: 20, borderTop: "1px solid rgba(255,107,74,0.2)", borderRight: "1px solid rgba(255,107,74,0.2)" },
        { bottom: 20, left: 20, borderBottom: "1px solid rgba(255,107,74,0.2)", borderLeft: "1px solid rgba(255,107,74,0.2)" },
        { bottom: 20, right: 20, borderBottom: "1px solid rgba(255,107,74,0.2)", borderRight: "1px solid rgba(255,107,74,0.2)" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 14, height: 14, ...s }} />
      ))}
    </div>
  );
}