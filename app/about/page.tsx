'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ── Animation variants ────────────────────────────────────────────────────────

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

// ── Animated counter ──────────────────────────────────────────────────────────

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // split value into numeric part and trailing suffix like '+' or '%'
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix  = value.replace(/[0-9.]/g, '');

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, numeric]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl tabular-nums">
        {inView ? `${display}${suffix}` : `0${suffix}`}
      </span>
      <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    num: '01',
    title: 'Clarity over complexity',
    body: 'Every decision we make from architecture to interface starts with a simple question: does this make things clearer? We believe the best technology disappears.',
  },
  {
    num: '02',
    title: 'Long-term thinking',
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-start bg-ink-950 pb-20 pt-32">
        <Image
          src="/Images/abstract img.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/20 via-ink-950/50 to-ink-950" />

        <motion.div
          className="relative mx-auto w-full max-w-6xl px-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ember-400"
          >
            Our story
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            We started with a{' '}
            <em className="not-italic text-ember-400">frustration.</em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Too many companies were being handed polished decks and slow software.
            We left our agency jobs to build the kind of studio we always wished existed.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center gap-3 text-slate-500"
          >
            <div className="h-px w-10 bg-slate-600" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </section>
      
      {/* ── 2. ORIGIN ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">

          {/* text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              variants={fadeLeft}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400"
            >
              Founded 2019
            </motion.p>
            <motion.blockquote
              variants={fadeLeft}
              className="mb-10 border-l-2 border-ember-500 pl-6 text-2xl font-semibold leading-snug tracking-tight text-slate-900 md:text-3xl"
            >
              &ldquo;The problem was not that clients wanted too much &mdash; it was
              that studios promised everything and built very little.&rdquo;
            </motion.blockquote>
            <motion.p variants={fadeLeft} className="mb-5 leading-relaxed text-slate-500">
              Iconex IT started as two engineers, a laptop apiece, and a shared
              conviction that software consultancies had a trust problem. Clients
              received glossy presentations, then months of silence, then a product
              that did not match either.
            </motion.p>
            <motion.p variants={fadeLeft} className="leading-relaxed text-slate-500">
              We built something different: small, senior teams who stay close to the
              problem, communicate in plain language, and measure success by the
              outcomes our clients can see &mdash; not the hours we can bill.
            </motion.p>
          </motion.div>

          {/* image */}
          <motion.div
            className="relative"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src="/Images/abstract image 3.jpg"
                alt="Abstract composition representing our approach"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-ember-500/10 mix-blend-multiply" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-lg shadow-slate-200/80"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember-500 text-sm font-bold text-white">
                N
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Colombo-based</p>
                <p className="font-mono text-[11px] text-slate-400">Serving clients globally</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. MISSION ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 py-36">
        <Image
          src="/Images/abstract image 4.jpg"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-screen"
          sizes="100vw"
        />
        <motion.div
          className="relative mx-auto max-w-4xl px-6 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ember-400"
          >
            Our mission
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Build software that makes the companies we believe in{' '}
            <span className="text-ember-400">genuinely better </span> at what they
            do &mdash; and stay honest about when they do not need us.
          </motion.p>
        </motion.div>
      </section>

      
      {/* ── 4. VALUES ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400"
            >
              What guides us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-20 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl"
            >
              Three things we <br />will not compromise on.
            </motion.h2>
          </motion.div>

          <div className="divide-y divide-slate-100">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-1 gap-6 py-10 transition-colors duration-300 hover:bg-slate-50 sm:-mx-6 sm:grid-cols-[6rem_1fr] sm:gap-10 sm:rounded-2xl sm:px-6"
              >
                <motion.span
                  initial="inactive"
                  whileInView="active"
                  viewport={{ 
                    once: false, 
                    amount: "some",
                    margin: "-25% 0px -25% 0px" 
                  }}
                  variants={{
                    inactive: { 
                      color: '#E2E8F0', 
                      transition: { duration: 0.3 } 
                    },
                    active: { 
                      color: '#FB923C', 
                      transition: { duration: 0.3, ease: "easeOut" } 
                    }
                  }}
                  className="font-mono text-4xl font-medium text-slate-200 transition-colors duration-300 group-hover:text-ember-400"
                >
                  {v.num}
                </motion.span>
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">{v.title}</h3>
                  <p className="max-w-prose leading-relaxed text-slate-500">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 5. STATS ─────────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="grid grid-cols-2 gap-y-14 md:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-ember-500 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
          >
            <div>
              <motion.h2
                variants={fadeLeft}
                className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
              >
                Like what you see?
              </motion.h2>
              <motion.p variants={fadeLeft} className="mt-2 text-white/80">
                Let us talk about what you are building.
              </motion.p>
            </div>
            <motion.div variants={fadeRight}>
              <Link
                href="#contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink-950 px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
              >
                Start a conversation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
