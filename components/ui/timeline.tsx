"use client";

import {
  type CSSProperties,
  useRef,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ────────────────────────────── Types & data ────────────────────────────── */

export type TimelineStep = {
  id: string;
  number: string;
  title: string;
  focus: string;
  content: string;
};

export const DEFAULT_STEPS: TimelineStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery & Strategy",
    focus: "Requirement mapping & system analysis",
    content:
      "We analyze your business operations, map out user workflows, and establish clear technical requirements to ensure a strong foundation before writing any code.",
  },
  {
    id: "architecture",
    number: "02",
    title: "Architecture & Design",
    focus: "UI/UX & system blueprint",
    content:
      "We design intuitive, modern interfaces while architecting robust, multi-tenant databases and API structures tailored for performance and scale.",
  },
  {
    id: "engineering",
    number: "03",
    title: "Agile Engineering",
    focus: "Development & integration",
    content:
      "Using modern technology stacks, we build your solution through iterative development sprints with strict type safety, real-time data handling, and thorough testing.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch & Continuous Scaling",
    focus: "Cloud deployment & optimization",
    content:
      "We deploy your system to secure, high-availability cloud infrastructure with automated monitoring, ensuring zero-downtime releases and long-term scalability.",
  },
];

/* ───────────────────────────── Reduced motion ───────────────────────────── */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(cb: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );
}

/* ──────────────────────── Animation Variants ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageFade = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─────────────────────────────── Component ──────────────────────────────── */

export type TimelineProps = {
  title?: string;
  subtitle?: string;
  steps?: TimelineStep[];
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
};

export default function HowWeWorkTimeline({
  title = "How We Work",
  subtitle = "Four deliberate phases that take your product from a rough idea to a live, scalable platform without surprises.",
  steps = DEFAULT_STEPS,
  textColor = "#0F172A",
  mutedTextColor = "#1E293B",
  activeColor = "#0066EE",
  backgroundColor = "#ffebeb",
  imageUrl = "/Images/our_process1.jpg",
  imageAlt = "Team collaborating on a project",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const introRef = useRef<HTMLDivElement>(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.2 });

  const reducedMotion = usePrefersReducedMotion();

  // Desktop GSAP horizontal pinned scroll
  useGSAP(
    () => {
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      // Only enable pinned horizontal scroll on desktop (>= 768px)
      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const slider = sliderRef.current;
        const track = trackRef.current;
        const fill = fillRef.current;

        if (!section || !slider || !track || !fill) return;

        const getDistance = () => Math.max(0, slider.scrollWidth - window.innerWidth);

        // Single master timeline: silky-smooth, instant-response, no 800ms lag delay
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.25, // Fast responsive scrub eliminating the heavy sluggish delay
            invalidateOnRefresh: true,
          },
        });

        // 1. Pinned horizontal movement
        tl.to(
          slider,
          {
            x: () => -getDistance(),
            ease: "none",
            duration: 1,
          },
          0
        );

        // 2. Animated journey line fill across viewport
        tl.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            duration: 1,
          },
          0
        );

        // 3. Step reveals synchronized smoothly on the unified timeline
        const items = gsap.utils.toArray<HTMLElement>("[data-step]", track);

        items.forEach((li) => {
          const stem = li.querySelector("[data-stem]");
          const dot = li.querySelector("[data-dot]");
          const card = li.querySelector("[data-card]");

          const dist = getDistance();
          const liOffset = li.getBoundingClientRect().left - slider.getBoundingClientRect().left;

          // Progress point along the timeline where this step enters view from the right
          const startProgress =
            dist > 0
              ? Math.max(0.01, Math.min(0.85, (liOffset - window.innerWidth * 0.88) / dist))
              : 0;
          const dur =
            dist > 0
              ? Math.max(0.08, Math.min(0.18, (window.innerWidth * 0.22) / dist))
              : 0.15;

          if (stem && dot) {
            tl.fromTo(
              stem,
              { scaleY: 0 },
              { scaleY: 1, ease: "none", duration: dur * 0.65 },
              startProgress
            );
            tl.fromTo(
              dot,
              { scale: 0 },
              { scale: 1, ease: "back.out(2)", duration: dur * 0.55 },
              startProgress + dur * 0.2
            );
          }

          if (card) {
            tl.fromTo(
              card,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: dur,
                ease: "power2.out",
              },
              startProgress
            );
          }
        });
      });

      return () => mm.revert();
    },
    { dependencies: [reducedMotion, steps], scope: sectionRef }
  );

  const vars = {
    "--tl-text": textColor,
    "--tl-muted": mutedTextColor,
    "--tl-accent": activeColor,
    color: textColor,
    backgroundColor,
  } as CSSProperties;

  const renderTitle = () => {
    if (title === "How We Work") {
      return (
        <>
          How We{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Work
          </span>
        </>
      );
    }
    return title;
  };

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-labelledby="how-we-work-title"
      style={vars}
      className="relative z-20 w-full overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      {/* ────────────────────────── DESKTOP VIEW (Pinned horizontal scroll) ────────────────────────── */}
      <div
        ref={desktopContainerRef}
        className="hidden md:block h-[100svh] min-h-[38rem] w-full overflow-hidden"
      >
        <div
          ref={sliderRef}
          className="flex h-full w-max items-stretch gap-[6vw] px-[5vw] transform-gpu"
        >
          {/* Intro Panel */}
          <div className="flex w-[88vw] max-w-[1200px] shrink-0 items-center">
            <motion.div
              ref={introRef}
              initial="hidden"
              animate={isIntroInView ? "visible" : "hidden"}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid w-full items-center gap-8 md:grid-cols-[1.1fr_1fr] lg:gap-14"
            >
              <div className="max-w-xl">
                {/* Eyebrow */}
                <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #0052D4 0%, #00C2CE 100%)",
                      boxShadow: "0 0 8px rgba(0, 194, 206, 0.6)",
                    }}
                  />
                  <span
                    className="font-mono text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "#0052D4" }}
                  >
                    Our Process
                  </span>
                </motion.div>

                {/* Title with black and gradient */}
                <motion.h2
                  variants={fadeUp}
                  id="how-we-work-title"
                  className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0F172A] lg:text-5xl xl:text-6xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {renderTitle()}
                </motion.h2>

                {/* Subtitle matching block portfolio description font */}
                <motion.p
                  variants={fadeUp}
                  className="mt-5 text-[clamp(1.02rem,1.2vw,1.15rem)] leading-[1.65] font-semibold text-[#1E293B]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {subtitle}
                </motion.p>
              </div>

              {/* Intro Image */}
              <motion.div variants={imageFade} className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-200/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  draggable={false}
                  decoding="async"
                  onLoad={() => ScrollTrigger.refresh()}
                  className="aspect-[16/10] max-h-[58svh] w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Steps Horizontal Track */}
          <ol ref={trackRef} className="relative flex h-full list-none p-0">
            {/* Center Journey Line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2"
            >
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{ backgroundColor: "var(--tl-accent)" }}
              />
              <div
                ref={fillRef}
                className="absolute inset-0 origin-left rounded-full"
                style={{
                  background: "linear-gradient(90deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
                }}
              />
            </div>

            {steps.map((step, i) => {
              const isTop = i % 2 === 0;
              const isLast = i === steps.length - 1;

              const cardContent = (
                <div
                  data-card
                  className={`w-[min(80vw,24rem)] pl-6 ${
                    isTop ? "pb-14" : "pt-14"
                  }`}
                >
                  <p
                    className="mb-1 text-[clamp(1.75rem,2.4vw,2.25rem)] font-extrabold leading-none tabular-nums"
                    style={{ color: "var(--tl-accent)" }}
                  >
                    {step.number}
                  </p>
                  <p
                    className="mb-2 text-[0.8rem] font-bold tracking-wider uppercase text-slate-900"
                  >
                    {step.focus}
                  </p>
                  <h3
                    className="mb-3 text-[clamp(1.3rem,1.8vw,1.8rem)] font-extrabold leading-tight tracking-tight text-slate-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="max-w-[24rem] text-[0.925rem] leading-relaxed font-medium text-slate-900"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {step.content}
                  </p>
                </div>
              );

              const stem = (
                <div
                  data-stem
                  aria-hidden
                  className={`absolute left-0 h-12 w-px ${
                    isTop ? "bottom-0 origin-bottom" : "top-0 origin-top"
                  }`}
                  style={{ backgroundColor: "var(--tl-accent)" }}
                />
              );

              return (
                <li
                  key={step.id}
                  data-step
                  className={`grid h-full shrink-0 grid-rows-[1fr_0px_1fr] ${
                    isLast ? "w-[min(80vw,24rem)]" : "w-[min(44vw,18rem)]"
                  }`}
                >
                  {/* Top Cell */}
                  <div className="relative flex items-end">
                    {isTop && (
                      <>
                        {stem}
                        {cardContent}
                      </>
                    )}
                  </div>

                  {/* Dot Cell */}
                  <div className="relative">
                    <span
                      data-dot
                      aria-hidden
                      className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        backgroundColor: "var(--tl-accent)",
                        boxShadow: `0 0 0 4px ${backgroundColor}`,
                      }}
                    />
                  </div>

                  {/* Bottom Cell */}
                  <div className="relative flex items-start">
                    {!isTop && (
                      <>
                        {stem}
                        {cardContent}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Trailing space */}
          <div aria-hidden className="w-[6vw] shrink-0" />
        </div>
      </div>

      {/* ────────────────────────── MOBILE VIEW (Smooth vertical native flow) ────────────────────────── */}
      <div className="block md:hidden px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-xl">
          {/* Mobile Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            {/* Eyebrow */}
            <div className="mb-3 inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #0052D4 0%, #00C2CE 100%)",
                  boxShadow: "0 0 8px rgba(0, 194, 206, 0.6)",
                }}
              />
              <span
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#0052D4" }}
              >
                Our Process
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {renderTitle()}
            </h2>

            {/* Subtitle */}
            <p
              className="mt-3.5 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-[1.6] font-semibold text-[#1E293B]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {subtitle}
            </p>

            {/* Image */}
            <div className="mt-6 overflow-hidden rounded-2xl shadow-md border border-slate-200/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={imageAlt}
                draggable={false}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Vertical Step Progression */}
          <div className="relative pl-6 sm:pl-8">
            {/* Continuous Vertical Spine */}
            <div
              className="absolute left-[7px] sm:left-[9px] top-3 bottom-6 w-0.5"
              style={{
                background: "linear-gradient(180deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
                opacity: 0.35,
              }}
            />

            <div className="flex flex-col gap-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group"
                >
                  {/* Glowing Node Dot */}
                  <div
                    className="absolute -left-[27px] sm:-left-[31px] top-1.5 size-4 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #0052D4 0%, #00C2CE 100%)",
                      boxShadow: "0 0 10px rgba(0, 102, 238, 0.45)",
                    }}
                  >
                    <div className="size-1.5 rounded-full bg-white" />
                  </div>

                  {/* Card Content */}
                  <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-5 border border-slate-200/80 shadow-sm transition-all duration-300 group-hover:bg-white/90 group-hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider text-slate-900"
                      >
                        {step.focus}
                      </span>
                      <span
                        className="font-mono text-sm font-extrabold"
                        style={{ color: "var(--tl-accent)" }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-extrabold text-slate-900 mb-2 leading-snug"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-xs sm:text-sm leading-relaxed font-medium text-slate-900"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {step.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}