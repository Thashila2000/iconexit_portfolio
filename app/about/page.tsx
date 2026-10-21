'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix  = value.replace(/[0-9.]/g, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, numeric]);

  return (
    <motion.div ref={ref} variants={fadeUp} className="flex flex-col items-center gap-2">
      <span className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl tabular-nums">
        {inView ? `${display}${suffix}` : `0${suffix}`}
      </span>
      <span className="font-mono text-xs uppercase tracking-wider text-slate-600 font-semibold">
        {label}
      </span>
    </motion.div>
  );
}

const VALUES = [
  {
    num: '01',
    title: 'Clarity over complexity',
    body: 'Every decision we make from architecture to interface starts with a simple question: does this make things clearer? We believe the best technology disappears.',
  },
  {
    num: '02',
    title: 'Long term thinking',
    body: 'We turn down fast work that creates slow problems. The code we ship today needs to be maintainable in five years, by a team that has not met us yet.',
  },
  {
    num: '03',
    title: 'Ownership without ego',
    body: 'We treat every project as if our name is on it because it is. That means raising hard questions early, shipping carefully, and standing behind what we build.',
  },
];

const STATS = [
  { value: '6+',  label: 'Years building'    },
  { value: '40+', label: 'Projects shipped'  },
  { value: '18',  label: 'Industries served' },
  { value: '97%', label: 'Client retention'  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">

      {/* ── 1. HERO ── */}
      <section className="relative flex min-h-[520px] items-start bg-[#0A101D] pb-20 pt-36 md:min-h-[620px] md:pb-28 md:pt-44 overflow-hidden">
        <Image
          src="/Images/abstract img.jpg"
          alt="About hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
        {/* Dark shadow overlay same as mission section */}
        <div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D]/90 via-transparent to-[#0A101D]/90 pointer-events-none" />

        <motion.div
          className="relative z-10 w-full max-w-6xl px-6 md:px-14 text-left"
          variants={staggerContainer} initial="hidden" animate="show"
        >
          <motion.p variants={fadeUp} className="mb-2 font-mono text-xs uppercase tracking-[0.2em] md:mb-3 font-semibold"
            style={{ color: '#00C2CE' }}>
            Our story
          </motion.p>

          <motion.h1 variants={fadeUp}
            className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            We started with a{' '}
            <em className="not-italic" style={{
              background: 'linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>frustration.</em>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:mt-5 md:text-lg">
            Too many companies were being handed polished decks and slow software.
            We left our agency jobs to build the kind of studio we always wished existed.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3 text-slate-500 md:mt-8" />
        </motion.div>
      </section>

      {/* ── 2. ORIGIN ── */}
      <section className="bg-[#ffebeb] py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
            <motion.p variants={fadeLeft} className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
              Founded 2019
            </motion.p>
            <motion.blockquote variants={fadeLeft}
              className="mb-10 pl-6 text-2xl font-semibold leading-snug tracking-tight text-slate-900 md:text-3xl"
              style={{ borderLeft: '3px solid #0066EE' }}>
              &ldquo;The problem was not that clients wanted too much, it was
              that studios promised everything and built very little.&rdquo;
            </motion.blockquote>
            <motion.p variants={fadeLeft} className="mb-5 leading-relaxed text-slate-700">
              Iconex IT started as four engineers, a laptop apiece, and a shared
              conviction that software consultancies had a trust problem. Clients
              received glossy presentations, then months of silence, then a product
              that did not match either.
            </motion.p>
            <motion.p variants={fadeLeft} className="leading-relaxed text-slate-700">
              We built something different: small, senior teams who stay close to the
              problem, communicate in plain language, and measure success by the
              outcomes our clients can see not the hours we can bill.
            </motion.p>
          </motion.div>

          <motion.div className="relative" variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src="/Images/abstract image 3.jpg"
                alt="Abstract composition representing our approach"
                fill className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'rgba(0,102,238,0.08)' }} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }} viewport={{ once: true }}
              className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-lg shadow-slate-200/80"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #0052D4, #0070C6)' }}>
                N
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Kandy based</p>
                <p className="font-mono text-[11px] text-slate-400">Serving clients globally</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. MISSION ── */}
      <section className="relative overflow-hidden bg-[#0A101D] py-36">
        <Image
          src="/Images/abstract image 4.jpg"
          alt="Our mission abstract background"
          fill
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
        {/* Dark shadow overlay to make fonts stand out with high contrast */}
        <div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D]/90 via-transparent to-[#0A101D]/90 pointer-events-none" />

        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: '#00C2CE' }}>
            Our mission
          </motion.p>
          <motion.p variants={fadeUp}
            className="text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl">
            Build software that makes the companies we believe in{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>genuinely better </span> at what they
            do and stay honest about when they do not need us.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 4. VALUES ── */}
      <section className="relative overflow-hidden bg-[#ffebeb] py-28 sm:py-32 [contain:paint]">
        {/* ── Left Soft Blue/Cyan Organic Shape (matching Mission & Vision) ── */}
        <motion.div
          animate={{
            x: [0, 22, -14, 0],
            y: [0, -18, 12, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-16 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-70 transform-gpu will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 206, 0.35) 0%, rgba(0, 112, 198, 0.18) 38%, rgba(0, 112, 198, 0.05) 60%, transparent 75%)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        />

        {/* ── Right Pink/Magenta Organic Blob Shape (matching Mission & Vision) ── */}
        <motion.div
          animate={{
            x: [0, -24, 18, 0],
            y: [0, 22, -16, 0],
            scale: [1, 1.06, 0.95, 1],
            rotate: [0, 4, -3, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-16 -right-12 w-80 h-96 sm:w-[480px] sm:h-[500px] pointer-events-none opacity-80 transform-gpu will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(255, 140, 210, 0.55) 0%, rgba(244, 114, 182, 0.38) 45%, rgba(251, 113, 133, 0.12) 65%, transparent 75%)",
            borderRadius: "62% 38% 70% 30% / 45% 58% 42% 55%",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        />

        {/* ── Crisp Vector Organic Accent Blob ── */}
        <motion.svg
          animate={{
            rotate: [0, 6, -5, 0],
            scale: [1, 1.05, 0.98, 1],
            y: [0, -14, 8, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-10 -right-8 w-64 h-80 sm:w-96 sm:h-[420px] pointer-events-none opacity-40 hidden sm:block transform-gpu will-change-transform"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#F472B6"
            d="M48.2,-64.3C61.3,-55.8,70.2,-41.2,74.5,-25.6C78.9,-10,78.8,6.5,73.6,21.1C68.4,35.6,58.2,48.1,45.4,57.4C32.6,66.6,17.3,72.6,1.4,70.7C-14.5,68.8,-28.9,59,-42.6,49C-56.3,39,-69.1,28.8,-74.6,14.7C-80.1,0.5,-78.2,-17.6,-70,-31.6C-61.9,-45.6,-47.4,-55.6,-33.1,-63.5C-18.7,-71.3,-4.5,-77.1,9.4,-75.7C23.3,-74.3,35.1,-72.8,48.2,-64.3Z"
            transform="translate(140 100)"
          />
        </motion.svg>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0070C6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070C6] shadow-[0_0_8px_#00C2CE]" />
              What guides us
            </motion.div>
            <motion.h2 variants={fadeUp} className="mb-14 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Three things we <br />will not compromise on.
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-1 gap-6 p-7 sm:p-9 rounded-2xl bg-white/90 sm:bg-white/70 backdrop-blur-none sm:backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:bg-white/95 hover:shadow-[0_12px_36px_rgba(0,102,238,0.08)] hover:border-[#0066EE]/30 transition-[background-color,border-color,box-shadow] duration-300 sm:grid-cols-[6rem_1fr] sm:gap-10 [contain:content]"
              >
                <motion.span
                  initial="inactive"
                  whileInView="active"
                  viewport={{ once: false, amount: 0.35, margin: '-15% 0px -15% 0px' }}
                  variants={{
                    inactive: { color: '#CBD5E1', transition: { duration: 0.35 } },
                    active:   { color: '#0066EE', transition: { duration: 0.35, ease: 'easeOut' } },
                  }}
                  className="font-mono text-4xl sm:text-5xl font-bold group-hover:text-[#00C2CE]"
                >
                  {v.num}
                </motion.span>
                <div>
                  <h3 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    {v.title}
                  </h3>
                  <p className="max-w-prose text-base sm:text-[1.0625rem] font-medium leading-relaxed text-slate-700">
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STATS ── */}
      <section className="border-y border-pink-200/50 bg-[#ffebeb] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="grid grid-cols-2 gap-y-14 md:grid-cols-4"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          >
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} />
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}