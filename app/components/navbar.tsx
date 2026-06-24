'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 font-display motion-reduce:transition-none">
      <nav
        className={[
          'mx-auto flex max-w-6xl items-center justify-between rounded-2xl border backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none',
          scrolled
            ? 'border-slate-200/80 bg-white/70 px-6 py-3 shadow-md shadow-slate-100/40'
            : 'border-slate-100/60 bg-white/40 px-6 py-4 shadow-sm',
        ].join(' ')}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ember-500 text-white font-bold text-sm transition-transform duration-300 motion-reduce:transition-none group-hover:rotate-[-8deg]">
            I
          </span>
          <span className="text-[1.05rem] font-semibold tracking-tight text-slate-900">
            Iconex IT
          </span>
        </Link>

        {/* Desktop links with Bubble Effect wrapper */}
        <ul className="hidden md:flex items-center gap-1.5 text-sm text-slate-600">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative block rounded-full px-4 py-2 transition-all duration-300 ease-out select-none ${
                    isActive 
                      ? 'text-white font-semibold scale-105 drop-shadow-[0_4px_10px_rgba(255,107,74,0.35)]' 
                      : 'hover:text-slate-900'
                  }`}
                >
                  {/* The Bubble Background Layer */}
                  <span 
                    className={`absolute inset-0 rounded-full transition-all duration-300 ease-in-out -z-10 ${
                      isActive 
                        ? 'bg-ember-500 opacity-100 scale-100' 
                        : 'bg-white/0 opacity-0 scale-75'
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster: status + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200 bg-white/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-600 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Systems operational
          </div>

          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-ember-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ember-600"
          >
            Start a project
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="relative z-50 flex h-9 w-9 items-center justify-center md:hidden text-slate-800"
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 motion-reduce:transition-none ${
              menuOpen ? 'rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 motion-reduce:transition-none ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 motion-reduce:transition-none ${
              menuOpen ? '-rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay menu: Light-theme glass matching list links */}
      <div
        className={[
          'fixed inset-0 top-0 z-40 flex flex-col bg-white/75 backdrop-blur-2xl transition-opacity duration-300 motion-reduce:transition-none md:hidden border-b border-slate-200/40',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {/* Dedicated Mobile Header Close Area */}
        <div className="flex justify-end p-6 pt-8">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/60 text-slate-800 active:scale-95 transition-all shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Mobile nav items with conditional active state highlights */}
        <div className="flex flex-col gap-1 px-6 pt-2">
          {NAV_LINKS.map((link, i) => {
            const isMobileActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                className={`border-b border-slate-200/40 py-4 text-2xl font-medium transition-all duration-300 motion-reduce:transition-none flex items-center justify-between ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${isMobileActive ? 'text-ember-500 font-semibold' : 'text-slate-800'}`}
              >
                <span>{link.label}</span>
                {isMobileActive && (
                  <span className="h-2.5 w-2.5 rounded-full bg-ember-500 shadow-[0_0_12px_#ff6b4a]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-4 px-6 pb-10">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Systems operational
          </div>
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-ember-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-ember-600"
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}