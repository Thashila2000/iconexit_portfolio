"use client";

import {
  type CSSProperties,
  useRef,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers resize the viewport as the URL bar shows/hides while
  // scrolling. Without this, every resize triggers a full refresh (= jank).
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Types & data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Reduced motion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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

const BRAND_GRADIENT =
  "linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)";

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
  const headRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const section = sectionRef.current;
      const slider = sliderRef.current;
      const track = trackRef.current;
      const fill = fillRef.current;
      const head = headRef.current;
      if (!section || !slider || !track || !fill || !head) return;

      /* 0 ── Intro entrance: plays ONCE, only when the section scrolls into view. */
      gsap.fromTo(
        "[data-intro]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true,
          },
        }
      );

      const getDistance = () =>
        Math.max(0, slider.scrollWidth - window.innerWidth);

      // Light scrub smoothing on touch/mobile dampens inertial scroll jitter
      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      const scrubSpeed = isTouch ? 0.35 : 0.6;

      /* 1 ── The pinned pan across horizontal phases ── */
      const move = gsap.to(slider, {
        x: () => -getDistance(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: scrubSpeed,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* 2 ── Journey line: fill + glowing head travel together (transforms only). */
      gsap
        .timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: {
            trigger: track,
            containerAnimation: move,
            start: "left 92%",
            end: "right 100%",
            scrub: scrubSpeed,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(fill, { scaleX: 0 }, { scaleX: 1 }, 0)
        .fromTo(head, { x: 0 }, { x: () => track.offsetWidth }, 0);

      /* 3 ── Step reveals, tied to each step's real on-screen position. */
      const items = gsap.utils.toArray<HTMLElement>("[data-step]", track);

      items.forEach((li) => {
        const stem = li.querySelector("[data-stem]");
        const dot = li.querySelector("[data-dot]");
        const card = li.querySelector("[data-card]");

        gsap
          .timeline({
            defaults: { ease: "none", force3D: true },
            scrollTrigger: {
              trigger: li,
              containerAnimation: move,
              start: "left 92%",
              end: "left 70%",
              scrub: scrubSpeed,
            },
          })
          .fromTo(stem, { scaleY: 0 }, { scaleY: 1, duration: 0.5 }, 0)
          .fromTo(
            dot,
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: "power1.out" },
            0.15
          )
          .fromTo(
            card,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power1.out" },
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

  // Hidden until the scroll trigger plays them (skipped for reduced motion).
  const introHidden = reducedMotion ? "" : "tl-intro-hidden";

  const renderTitle = () => {
    if (title === "How We Work") {
      return (
        <>
          How We{" "}
          <span
            style={{
              background: BRAND_GRADIENT,
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
      className={`relative z-20 h-screen min-h-[32rem] w-full ${
        reducedMotion
          ? "overflow-x-auto overflow-y-hidden snap-x snap-proximity"
          : "overflow-hidden"
      }`}
    >
      <style>{`
        .tl-intro-hidden { opacity: 0; transform: translate3d(0, 28px, 0); }
      `}</style>

      <div
        ref={sliderRef}
        className="relative z-10 flex h-full w-max items-stretch gap-[6vw] px-[5vw] pt-[78px] sm:pt-[84px] lg:pt-20 pb-4 will-change-transform"
      >
        {/* ── Intro panel (moved upward on mobile/tab with safe clearance below navbar) ── */}
        <div className="flex w-[90vw] shrink-0 snap-start items-start pt-2 sm:pt-4 lg:items-center lg:pt-0">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 sm:gap-8 md:grid-cols-[0.88fr_1.12fr] lg:grid-cols-[0.82fr_1.18fr] xl:grid-cols-[0.78fr_1.22fr] md:gap-10 lg:gap-16">
            <div className="max-w-xl">
              <div
                data-intro
                className={`${introHidden} mb-2.5 inline-flex items-center gap-2`}
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
                  id="how-we-work-badge"
                  className="font-mono text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#0052D4" }}
                >
                  Our Process
                </span>
              </div>

              {/* Exact heading font size, weight, line-height */}
              <h2
                id="how-we-work-title"
                data-intro
                className={`${introHidden} font-extrabold text-[#0F172A]`}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                {renderTitle()}
              </h2>

              {/* Exact description */}
              <p
                id="how-we-work-desc"
                data-intro
                className={`${introHidden} font-semibold text-[#1E293B]`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                  fontWeight: 600,
                  lineHeight: 1.6,
                  marginTop: "10px",
                }}
              >
                {subtitle}
              </p>

              <div
                data-intro
                className={`${introHidden} mt-4 sm:mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold`}
                style={{ color: "var(--tl-accent)", fontFamily: "'Inter', sans-serif" }}
              >
                <span>Scroll to explore the phases</span>
                <ArrowRight className="size-4 animate-pulse" aria-hidden />
              </div>
            </div>

            {/* Image framed with a brand-gradient edge - significantly enlarged in desktop view */}
            <div
              data-intro
              className={`${introHidden} rounded-[1.6rem] sm:rounded-[2rem] p-[3px] shadow-[0_16px_36px_rgba(0,112,198,0.2)] max-w-md sm:max-w-lg md:max-w-none w-full`}
              style={{ background: BRAND_GRADIENT }}
            >
              <div className="relative aspect-[16/10] max-h-[22svh] sm:max-h-[28svh] md:max-h-[50svh] lg:max-h-[64svh] xl:max-h-[70svh] w-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] bg-white">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  draggable={false}
                  sizes="(min-width: 1280px) 55vw, (min-width: 768px) 50vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Steps track ── */}
        <ol ref={trackRef} className="relative flex h-full list-none p-0">
          {/* Journey line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "rgba(0, 82, 212, 0.15)" }}
            />
            <div
              ref={fillRef}
              className="absolute inset-0 origin-left rounded-full will-change-transform"
              style={{
                background:
                  "linear-gradient(90deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
                boxShadow: "0 0 12px rgba(0, 194, 206, 0.6)",
              }}
            />
          </div>

          {/* Glowing head that leads the line */}
          <div
            ref={headRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 h-0 w-0 will-change-transform"
          >
            <span
              className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white"
              style={{
                background: "#00C2CE",
                boxShadow:
                  "0 0 0 5px rgba(0,194,206,0.35), 0 0 20px rgba(0,194,206,0.9)",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const isTop = i % 2 === 0;
            const isLast = i === steps.length - 1;

            const card = (
              <div
                data-card
                className={`w-[min(78vw,24.5rem)] ml-3 sm:ml-4 rounded-2xl border border-slate-800/90 p-5 sm:p-6 will-change-[transform,opacity] ${
                  isTop ? "mb-3 md:mb-4" : "mt-3 md:mt-4"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #0F172A 0%, #0B0F19 100%)",
                  boxShadow:
                    "0 20px 45px -12px rgba(11, 15, 25, 0.45), 0 8px 24px -6px rgba(0, 82, 212, 0.25)",
                }}
              >
                {/* Large gradient numeral with luminous cyan glow */}
                <p
                  className="mb-1 text-[clamp(2.15rem,3.4vw,3.15rem)] font-extrabold leading-none tracking-tight tabular-nums"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: "linear-gradient(135deg, #00C2CE 0%, #0070C6 50%, #60A5FA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 8px rgba(0,194,206,0.35))",
                  }}
                >
                  {step.number}
                </p>

                {/* Focus area as a luminous pill */}
                <p
                  className="mb-2.5 inline-block rounded-full border border-cyan-400/30 bg-cyan-950/50 px-3 py-0.5 text-[0.72rem] font-semibold text-cyan-300 sm:text-[0.76rem] shadow-[0_0_12px_rgba(0,194,206,0.15)]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step.focus}
                </p>

                <h3
                  className="mb-2 text-[clamp(1.15rem,1.6vw,1.55rem)] font-extrabold leading-tight tracking-tight text-white sm:mb-2.5"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="max-w-[23rem] text-[0.82rem] font-normal leading-relaxed text-slate-300 sm:text-[0.88rem]"
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
                className={`absolute left-0 w-[2px] will-change-transform ${
                  isTop ? "bottom-0 h-6 md:h-8 origin-bottom" : "top-0 h-6 md:h-8 origin-top"
                }`}
                style={{
                  background: isTop
                    ? "linear-gradient(0deg, #00C2CE, #0052D4)"
                    : "linear-gradient(180deg, #00C2CE, #0052D4)",
                  boxShadow: "0 0 8px rgba(0, 194, 206, 0.4)",
                }}
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

                {/* Node: white core, cyan border, dark halo with glow */}
                <div className="relative">
                  <span
                    data-dot
                    aria-hidden
                    className="absolute left-0 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
                    style={{
                      background: "#FFFFFF",
                      border: "3.5px solid #00C2CE",
                      boxShadow: "0 0 0 4px rgba(11, 15, 25, 0.9), 0 0 16px rgba(0, 194, 206, 0.8)",
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

