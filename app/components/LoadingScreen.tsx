"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Step 1 — Reveal logo
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setLogoVisible(true), 300);
    return () => clearTimeout(t);
  }, [mounted]);

  // Step 2 — Progress sequence
  useEffect(() => {
    if (!logoVisible) return;
    const startDelay = setTimeout(() => {
      const id = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(id);
            setTimeout(() => {
              setExiting(true);
              setTimeout(onComplete, 500); // faster exit
            }, 300);
            return 100;
          }
          const inc = p < 50 ? 1.0 : p < 80 ? 0.7 : p < 95 ? 0.5 : 1.2;
          return Math.min(p + inc, 100);
        });
      }, 25); // faster tick
      return () => clearInterval(id);
    }, 500);
    return () => clearTimeout(startDelay);
  }, [logoVisible, onComplete]);

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
      {/* Glow orb */}
      <div style={{
        position: "absolute",
        width: 420, height: 420,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,74,0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Logo Container ── */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          position: "relative",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0) scale(1)" : "translateY(15px) scale(0.97)",
          transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img 
          src="/iconex-logo.png" 
          alt="ICONEX IT Logo" 
          style={{
          height: "clamp(20rem, 24vw, 24rem)",
            userSelect: "none",
          }} 
        />
      </div>

      {/* ── Progress block ── */}
      <div
        style={{
          position: "absolute",
          bottom: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(640px, 88vw)",
          opacity: logoVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
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
            color: "#FF6B4A",
            transition: "color 0.3s ease",
          }}>
            {String(Math.floor(progress)).padStart(2, "0")}
            <span style={{ fontSize: "0.5em", marginLeft: 2 }}>%</span>
          </span>
        </div>

        {/* Track */}
        <div style={{
          width: "100%",
          height: 8,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 999,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "#FF6B4A",
            boxShadow: `0 0 14px rgba(255,107,74,0.55)`,
            borderRadius: 999,
            transition: "width 0.03s linear, background 0.3s ease, box-shadow 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}>
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

        {/* Phase label */}
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
            color: "#FF6B4A",
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
    </div>
  );
}
