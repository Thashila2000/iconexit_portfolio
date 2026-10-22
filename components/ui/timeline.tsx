"use client";

import {
  type CSSProperties,
  useRef,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers resize the viewport as the URL bar shows/hides while
  // scrolling. Without this, every resize triggers a full refresh (= jank).
  ScrollTrigger.config({ ignoreMobileResize: true });
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  /* One pinned horizontal scroll, used on every screen size. */
  useGSAP(
    () => {
      if (reducedMotion) return;

      const section = sectionRef.current;
      const slider = sliderRef.current;
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!section || !slider || !track || !fill) return;

      const getDistance = () =>
        Math.max(0, slider.scrollWidth - window.innerWidth);

      // 1. The pan. `scrub: true` ties it 1:1 to the scroll position, so there
      //    is no smoothing delay between finger/wheel and the content.
      const move = gsap.to(slider, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2. Journey line fill (scaleX only: compositor-friendly).
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            containerAnimation: move,
            start: "left 92%",
            end: "right 100%",
            scrub: true,
          },
        }
      );

      // 3. Step reveals. Each is tied to the step's real on-screen position
      //    (containerAnimation), so it stays correct on resize/rotation
      //    without recalculating anything by hand.
      const items = gsap.utils.toArray<HTMLElement>("[data-step]", track);

      items.forEach((li) => {
        const stem = li.querySelector("[data-stem]");
        const dot = li.querySelector("[data-dot]");
        const card = li.querySelector("[data-card]");

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: li,
              containerAnimation: move,
              start: "left 92%",
              end: "left 68%",
              scrub: true,
            },
          })
          .fromTo(stem, { scaleY: 0 }, { scaleY: 1, duration: 0.5 }, 0)
          .fromTo(
            dot,
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: "back.out(2)" },
            0.15
          )
          .fromTo(
            card,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.1
          );
      });
    },
    { dependencies: [reducedMotion, steps], scope: sectionRef, revertOnUpdate: true }
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
              background:
                "linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
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
      className={`relative z-20 h-[100svh] min-h-[32rem] w-full ${
        reducedMotion
          ? "overflow-x-auto overflow-y-hidden snap-x snap-proximity"
          : "overflow-hidden"
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        /* Intro entrance: plain CSS (no JS runtime) so it can't compete with scroll work. */
        @keyframes tl-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .tl-rise {
          animation: tl-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--d, 0s);
        }
        @media (prefers-reduced-motion: reduce) {
          .tl-rise { animation: none; }
        }
      `}</style>

      <div
        ref={sliderRef}
        className="flex h-full w-max items-stretch gap-[6vw] px-[5vw] transform-gpu will-change-transform"
      >
        {/* ── Intro panel (one screen wide, so step 01 enters from the right edge) ── */}
        <div className="flex w-[90vw] shrink-0 snap-start items-center">
          <div className="mx-auto grid w-full max-w-[1200px] items-center gap-5 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:gap-14">
            <div className="max-w-xl">
              <div
                className="tl-rise mb-3 inline-flex items-center gap-2 md:mb-4"
                style={{ "--d": "0s" } as CSSProperties}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #0052D4 0%, #00C2CE 100%)",
                    boxShadow: "0 0 8px rgba(0, 194, 206, 0.6)",
                  }}
                />
                <span
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs"
                  style={{ color: "#0052D4" }}
                >
                  Our Process
                </span>
              </div>

              <h2
                id="how-we-work-title"
                className="tl-rise text-[2rem] font-extrabold leading-[1.08] tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl xl:text-6xl"
                style={
                  {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    "--d": "0.1s",
                  } as CSSProperties
                }
              >
                {renderTitle()}
              </h2>

              <p
                className="tl-rise mt-3 text-[0.95rem] font-semibold leading-[1.6] text-[#1E293B] md:mt-5 md:text-[clamp(1.02rem,1.2vw,1.15rem)] md:leading-[1.65]"
                style={
                  {
                    fontFamily: "'Inter', sans-serif",
                    "--d": "0.2s",
                  } as CSSProperties
                }
              >
                {subtitle}
              </p>
            </div>

            {/* next/image: responsive sizes + modern formats + priority load */}
            <div
              className="tl-rise relative aspect-[16/10] max-h-[32svh] w-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-xl md:max-h-[58svh]"
              style={{ "--d": "0.3s" } as CSSProperties}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                draggable={false}
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Steps track ── */}
        <ol ref={trackRef} className="relative flex h-full list-none p-0">
          {/* Journey line */}
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
              className="absolute inset-0 origin-left rounded-full will-change-transform"
              style={{
                background:
                  "linear-gradient(90deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const isTop = i % 2 === 0;
            const isLast = i === steps.length - 1;

            const card = (
              <div
                data-card
                className={`w-[min(78vw,24rem)] pl-5 will-change-[transform,opacity] sm:pl-6 ${
                  isTop ? "pb-12 md:pb-14" : "pt-12 md:pt-14"
                }`}
              >
                <p
                  className="mb-1 text-[clamp(1.5rem,2.4vw,2.25rem)] font-extrabold leading-none tabular-nums"
                  style={{ color: "var(--tl-accent)" }}
                >
                  {step.number}
                </p>
                <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-slate-900 sm:text-[0.8rem]">
                  {step.focus}
                </p>
                <h3
                  className="mb-2 text-[clamp(1.15rem,1.8vw,1.8rem)] font-extrabold leading-tight tracking-tight text-slate-900 sm:mb-3"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="max-w-[24rem] text-[0.82rem] font-medium leading-relaxed text-slate-900 sm:text-[0.925rem]"
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
                className={`absolute left-0 h-10 w-px will-change-transform md:h-12 ${
                  isTop ? "bottom-0 origin-bottom" : "top-0 origin-top"
                }`}
                style={{ backgroundColor: "var(--tl-accent)" }}
              />
            );

            return (
              <li
                key={step.id}
                data-step
                className={`grid h-full shrink-0 snap-start grid-rows-[1fr_0px_1fr] ${
                  isLast ? "w-[min(78vw,24rem)]" : "w-[min(44vw,18rem)]"
                }`}
              >
                <div className="relative flex items-end">
                  {isTop && (
                    <>
                      {stem}
                      {card}
                    </>
                  )}
                </div>

                <div className="relative">
                  <span
                    data-dot
                    aria-hidden
                    className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
                    style={{
                      backgroundColor: "var(--tl-accent)",
                      boxShadow: `0 0 0 4px ${backgroundColor}`,
                    }}
                  />
                </div>

                <div className="relative flex items-start">
                  {!isTop && (
                    <>
                      {stem}
                      {card}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Trailing space so the last card clears the screen edge */}
        <div aria-hidden className="w-[6vw] shrink-0" />
      </div>
    </section>
  );
}