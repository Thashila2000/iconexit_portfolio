"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TestimonialMarquee, type Testimonial } from "@/components/ui/testimonial-marquee";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    username: "sarahm_cto",
    text: "Their cloud infrastructure work cut our deployment time by 60%. The team understood our requirements perfectly and delivered beyond expectations.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "James Okafor",
    username: "jamesokafor",
    text: "Iconexit built our entire SaaS platform from scratch. The code quality is exceptional and the team is incredibly professional throughout.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Priya Nair",
    username: "priya_product",
    text: "Working with Iconexit was a game changer for our digital transformation. They delivered a robust AI powered system that our team loves.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Tom Blackwell",
    username: "tomblack_eng",
    text: "The attention to detail and the level of polish they bring to their work is remarkable. Our app's performance improved by 3x.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Elena Rousseau",
    username: "elenar_biz",
    text: "Iconexit took our vague ideas and turned them into a precise, scalable solution. I can't recommend them highly enough.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "David Chen",
    username: "davidc_founder",
    text: "The software they built drives our entire operations. Rock solid architecture and amazing support from a world class engineering team.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Amira Hassan",
    username: "amira_ops",
    text: "From consultation to deployment, every step was handled with precision. Our new platform handles 10x the traffic with zero hiccups.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#ffebeb] py-20 md:py-28 [contain:paint]"
      aria-label="Client testimonials"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />

      {/* Ambient background blobs — GPU isolated */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [contain:paint]">
        <div
          className="absolute -top-24 left-1/4 h-72 w-72 rounded-full opacity-20 transform-gpu"
          style={{
            background: "radial-gradient(circle, #0052D4 0%, transparent 70%)",
            filter: "blur(32px)",
            transform: "translate3d(0, 0, 0)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full opacity-15 transform-gpu"
          style={{
            background: "radial-gradient(circle, #00C2CE 0%, transparent 70%)",
            filter: "blur(28px)",
            transform: "translate3d(0, 0, 0)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
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
              Client Stories
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Trusted by teams who{" "}
            <em
              className="not-italic font-extrabold"
              style={{
                background: "linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              build boldly.
            </em>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-base font-semibold md:text-lg"
            style={{ fontFamily: "'Inter', sans-serif", color: "#1E293B" }}
          >
            Here&apos;s what our clients say about working with Iconexit from startups to enterprise teams.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee — full-bleed, no max-width constraint */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <TestimonialMarquee
          items={testimonials}
          variant="dual"
          speed={35}
        />
      </motion.div>
    </section>
  );
}
