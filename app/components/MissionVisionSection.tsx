"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function MissionVisionSection() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const missionWords = [
    { text: "Build", isGradient: false },
    { text: "software", isGradient: false },
    { text: "that", isGradient: false },
    { text: "makes", isGradient: false },
    { text: "the", isGradient: false },
    { text: "companies", isGradient: false },
    { text: "we", isGradient: false },
    { text: "believe", isGradient: false },
    { text: "in", isGradient: false },
    { text: "genuinely better", isGradient: true },
    { text: "at", isGradient: false },
    { text: "what", isGradient: false },
    { text: "they", isGradient: false },
    { text: "do", isGradient: false },
    { text: "and", isGradient: false },
    { text: "stay", isGradient: false },
    { text: "honest", isGradient: false },
    { text: "about", isGradient: false },
    { text: "when", isGradient: false },
    { text: "they", isGradient: false },
    { text: "do", isGradient: false },
    { text: "not", isGradient: false },
    { text: "need", isGradient: false },
    { text: "us.", isGradient: false },
  ];

  const visionWords = [
    { text: "Pioneer", isGradient: false },
    { text: "resilient", isGradient: false },
    { text: "cloud", isGradient: false },
    { text: "foundations", isGradient: false },
    { text: "and", isGradient: false },
    { text: "intelligent", isGradient: false },
    { text: "systems", isGradient: false },
    { text: "that", isGradient: false },
    { text: "empower", isGradient: false },
    { text: "enterprises", isGradient: false },
    { text: "to", isGradient: false },
    { text: "scale fearlessly", isGradient: true },
    { text: "and", isGradient: false },
    { text: "shape", isGradient: false },
    { text: "tomorrow.", isGradient: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      y: -14,
      filter: "blur(6px)",
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .mv-section {
          position: relative;
          background-color: #ffebeb;
          overflow: hidden;
          padding: 130px 24px;
        }

        @media (max-width: 768px) {
          .mv-section {
            padding: 85px 20px;
          }
        }

        /* ── Big Center Typography matching Google Labs style ── */
        .mv-headline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4.4vw, 3.85rem);
          font-weight: 800;
          line-height: 1.24;
          letter-spacing: -0.035em;
          color: #0F172A;
          margin: 0 auto;
          max-width: 1040px;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 0.28em;
          row-gap: 0.06em;
        }

        .mv-gradient-text {
          background: linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          position: relative;
        }

        /* ── Pill switcher bar ── */
        .mv-switcher-wrap {
          display: inline-flex;
          align-items: center;
          padding: 4px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(15, 23, 42, 0.07);
          border-radius: 9999px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .mv-tab-btn {
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 8px 22px;
          border-radius: 9999px;
          cursor: pointer;
          border: none;
          background: transparent;
          outline: none;
          user-select: none;
          transition: color 0.22s ease;
          z-index: 1;
        }
      `}</style>

      <section ref={sectionRef} className="mv-section">
        {/* ── Left Soft Blue/Cyan Organic Shape ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: 0.6,
                  x: [0, 22, -14, 0],
                  y: [0, -18, 12, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 1.2 },
            x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -top-16 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 206, 0.32) 0%, rgba(0, 112, 198, 0.14) 50%, transparent 75%)",
            filter: "blur(36px)",
          }}
        />

        {/* ── Right Pink/Magenta Organic Blob Shape ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: 0.8,
                  x: [0, -24, 18, 0],
                  y: [0, 22, -16, 0],
                  scale: [1, 1.06, 0.95, 1],
                  rotate: [0, 4, -3, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 1.2 },
            x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-16 -right-12 w-80 h-96 sm:w-[480px] sm:h-[500px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 140, 210, 0.55) 0%, rgba(244, 114, 182, 0.48) 50%, rgba(251, 113, 133, 0.28) 100%)",
            borderRadius: "62% 38% 70% 30% / 45% 58% 42% 55%",
            filter: "blur(42px)",
          }}
        />

        {/* ── Crisp Vector Organic Accent Blob ── */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: 0.4,
                  rotate: [0, 6, -5, 0],
                  scale: [1, 1.05, 0.98, 1],
                  y: [0, -14, 8, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 1.2 },
            rotate: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-10 -right-8 w-64 h-80 sm:w-96 sm:h-[420px] pointer-events-none hidden sm:block"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#F472B6"
            d="M48.2,-64.3C61.3,-55.8,70.2,-41.2,74.5,-25.6C78.9,-10,78.8,6.5,73.6,21.1C68.4,35.6,58.2,48.1,45.4,57.4C32.6,66.6,17.3,72.6,1.4,70.7C-14.5,68.8,-28.9,59,-42.6,49C-56.3,39,-69.1,28.8,-74.6,14.7C-80.1,0.5,-78.2,-17.6,-70,-31.6C-61.9,-45.6,-47.4,-55.6,-33.1,-63.5C-18.7,-71.3,-4.5,-77.1,9.4,-75.7C23.3,-74.3,35.1,-72.8,48.2,-64.3Z"
            transform="translate(140 100)"
          />
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center"
        >
          {/* ── Magnetic Sliding Pill Switcher ── */}
          <div className="mv-switcher-wrap mb-10 sm:mb-14">
            <button
              type="button"
              onClick={() => setActiveTab("mission")}
              className={`mv-tab-btn ${
                activeTab === "mission" ? "text-white" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {activeTab === "mission" && (
                <motion.div
                  layoutId="mvActivePill"
                  className="absolute inset-0 rounded-full bg-[#0F172A] shadow-md -z-10"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              Our Mission
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("vision")}
              className={`mv-tab-btn ${
                activeTab === "vision" ? "text-white" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {activeTab === "vision" && (
                <motion.div
                  layoutId="mvActivePill"
                  className="absolute inset-0 rounded-full bg-[#0F172A] shadow-md -z-10"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              Our Vision
            </button>
          </div>

          {/* ── Kinetic Typography Word-by-Word Reveal (Only triggers when section is in view) ── */}
          <div className="min-h-[190px] sm:min-h-[230px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {activeTab === "mission" ? (
                <motion.h2
                  key="mission-statement"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  exit="exit"
                  className="mv-headline"
                >
                  {missionWords.map((word, i) => (
                    <motion.span
                      key={`${word.text}-${i}`}
                      variants={wordVariants}
                      className={word.isGradient ? "mv-gradient-text" : "inline-block"}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </motion.h2>
              ) : (
                <motion.h2
                  key="vision-statement"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  exit="exit"
                  className="mv-headline"
                >
                  {visionWords.map((word, i) => (
                    <motion.span
                      key={`${word.text}-${i}`}
                      variants={wordVariants}
                      className={word.isGradient ? "mv-gradient-text" : "inline-block"}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </>
  );
}
