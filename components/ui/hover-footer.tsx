"use client";
import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const pathname = usePathname();
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [isInView, setIsInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Reset animation whenever the user moves to another page
  useEffect(() => {
    setIsInView(false);
    setAnimKey((prev) => prev + 1);
  }, [pathname]);

  // Intersection Observer: triggers animation ONLY when user reaches the bottom section of the footer
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setAnimKey((prev) => prev + 1);
        } else {
          // Reset when scrolled away so it's armed to animate again
          setIsInView(false);
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [pathname]);

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      setCursor({ x: touch.clientX, y: touch.clientY });
      setHovered(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      setCursor({ x: touch.clientX, y: touch.clientY });
      setHovered(true);
    }
  };

  const handleTouchEnd = () => {
    setHovered(false);
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 360 85"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn("select-none uppercase cursor-pointer max-w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#0052D4" />
          <stop offset="35%" stopColor="#0070C6" />
          <stop offset="70%" stopColor="#00C2CE" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="26%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Base subtle outline — ensures structure and legibility on mobile/tablet */}
      <text
        x="50%"
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.75"
        className="fill-transparent stroke-slate-700/60 font-sans font-extrabold tracking-[0.14em]"
        style={{ fontSize: "44px" }}
      >
        {text}
      </text>

      {/* Hover outline */}
      <text
        x="50%"
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.85"
        className="fill-transparent stroke-[#00C2CE] font-sans font-extrabold tracking-[0.14em]"
        style={{
          fontSize: "44px",
          opacity: hovered ? 0.85 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        {text}
      </text>

      {/* Animated stroke-draw ("writing" effect) — triggers on scroll into view and replays cleanly */}
      {isInView && (
        <motion.text
          key={animKey}
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.95"
          className="fill-transparent stroke-[#0070C6] font-sans font-extrabold tracking-[0.14em]"
          style={{ fontSize: "44px" }}
          initial={{ strokeDashoffset: 1200, strokeDasharray: 1200 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 1200,
            fill: "rgba(0, 112, 198, 0.08)",
          }}
          transition={{
            strokeDashoffset: {
              duration: 2.6,
              ease: "easeInOut",
            },
            fill: {
              delay: 1.8,
              duration: 0.8,
            },
          }}
        >
          {text}
        </motion.text>
      )}

      {/* Interactive gradient reveal on hover / touch */}
      <text
        x="50%"
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="1"
        mask="url(#textMask)"
        className="fill-transparent font-sans font-extrabold tracking-[0.14em]"
        style={{
          fontSize: "44px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(130% 120% at 50% 0%, rgba(11, 15, 25, 0.95) 25%, rgba(0, 82, 212, 0.45) 60%, rgba(0, 112, 198, 0.35) 80%, rgba(0, 194, 206, 0.3) 100%)",
      }}
    />
  );
};
