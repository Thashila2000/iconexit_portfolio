'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/',         label: 'Home'    },
  { href: '/services', label: 'Services' },
  { href: '/work',     label: 'Work'    },
  { href: '/about',    label: 'About'   },
  { href: '/contact',  label: 'Contact' },
];

// Pages with dark hero backgrounds — navbar will use dark mode on these
const DARK_BG_PAGES: string[] = [];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [darkBg,    setDarkBg]    = useState(false);
  const pathname = usePathname();

  // Detect if we are over a dark background section
  useEffect(() => {
    const detect = () => {
      // After scrolling past ~80px everything is content — use light mode
      if (window.scrollY > 80) { setDarkBg(false); return; }
      // Check if current page has a dark hero
      setDarkBg(DARK_BG_PAGES.includes(pathname));
    };
    detect();
    window.addEventListener('scroll', detect, { passive: true });
    return () => window.removeEventListener('scroll', detect);
  }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Derived styles
  const isDark = darkBg && !scrolled;

  const navBg = scrolled
    ? 'rgba(255,255,255,0.92)'
    : isDark
      ? 'rgba(11,15,25,0.75)'
      : 'rgba(255,255,255,0.75)';

  const navBorder = scrolled
    ? 'rgba(15,23,42,0.1)'
    : isDark
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(15,23,42,0.08)';

  const navShadow = scrolled
    ? '0 4px 24px -4px rgba(15,23,42,0.08)'
    : 'none';

  const linkColor = isDark && !scrolled ? 'rgba(255,255,255,0.7)' : '#475569';
  const linkHover = isDark && !scrolled ? '#FFFFFF' : '#0B0F19';

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          display: block;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          color: inherit;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--link-hover); background: var(--link-hover-bg); }
        .nav-link.active {
          font-weight: 600;
          color: #fff !important;
        }
        .nav-link.active .nav-bubble {
          opacity: 1; transform: scale(1);
        }
        .nav-bubble {
          position: absolute; inset: 0; border-radius: 999px;
          background: #F15C31;
          opacity: 0; transform: scale(0.8);
          transition: opacity 0.25s, transform 0.25s;
          z-index: 0;
        }
        .nav-link-label { position: relative; z-index: 1; }

        /* hamburger line */
        .ham-line {
          position: absolute; height: 1.5px; width: 20px;
          background: currentColor; border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        /* mobile overlay */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 40;
          display: flex; flex-direction: column;
          transition: opacity 0.3s;
        }
        .mobile-overlay.closed { opacity: 0; pointer-events: none; }
        .mobile-overlay.open   { opacity: 1; pointer-events: all;  }

        .mobile-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid rgba(15,23,42,0.06);
          font-size: 1.5rem; font-weight: 600;
          color: #0B0F19; text-decoration: none;
          transition: color 0.2s, transform 0.3s, opacity 0.3s;
        }
        .mobile-nav-link.active { color: #F15C31; }
        .mobile-nav-link:hover  { color: #F15C31; }

        /* stagger in */
        .mobile-overlay.open  .mobile-nav-link { transform: translateY(0); opacity: 1; }
        .mobile-overlay.closed .mobile-nav-link { transform: translateY(12px); opacity: 0; }
      `}</style>

      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 50, padding: '8px 16px',
          fontFamily: 'var(--font-space-grotesk), sans-serif',
        }}
      >
        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 20px',
            borderRadius: 14,
            border: `1px solid ${navBorder}`,
            background: navBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: navShadow,
            transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
          }}
        >
          {/* ── Image Logo (Reduced height wrapper) ── */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div 
              style={{ 
                position: 'relative', 
                width: 150, 
                height: 48,
                marginLeft: '-4px' 
              }}
            >
              <Image
                src="/Images/iconex-logo.png"
                alt="Iconex IT Logo"
                fill
                priority
                sizes="150px" 
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left center', 
                }}
              />
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <ul style={{
            display: 'flex', alignItems: 'center', gap: 2,
            listStyle: 'none', margin: 0, padding: 0,
          }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map(link => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link${active ? ' active' : ''}`}
                    style={{
                      color: active ? undefined : linkColor,
                      // @ts-ignore css var
                      '--link-hover':    linkHover,
                      '--link-hover-bg': isDark && !scrolled
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(11,15,25,0.05)',
                    }}
                  >
                    <span className="nav-bubble" />
                    <span className="nav-link-label">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── CTA ── */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#FF6B4A', color: '#fff',
                padding: '8px 16px', borderRadius: 8,
                fontSize: '0.8125rem', fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.background = '#F15C31';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.background = '#F15C31';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Start a project
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="show-mobile"
            style={{
              position: 'relative', zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, background: 'transparent', border: 'none',
              cursor: 'pointer',
              color: isDark && !scrolled ? '#fff' : '#0B0F19',
            }}
          >
            <span className="ham-line" style={{ transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)' }} />
            <span className="ham-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="ham-line" style={{ transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)' }} />
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      <div className={`mobile-overlay ${menuOpen ? 'open' : 'closed'}`}
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        {/* Close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '28px 28px 0' }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1px solid rgba(15,23,42,0.1)',
              background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0B0F19',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Logo in overlay */}
        <div style={{ padding: '24px 28px 8px' }}>
         
        </div>

        {/* Links */}
        <nav style={{ padding: '0 28px', flex: 1 }}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
              style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
            >
              {link.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div style={{ padding: '24px 28px 48px' }}>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#FF6B4A', color: '#fff',
              padding: '14px 24px', borderRadius: 12,
              fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none',
            }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Responsive visibility helpers */}
      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none  !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex  !important; }
        }
      `}</style>
    </>
  );
}