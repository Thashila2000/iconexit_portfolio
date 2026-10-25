"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { motion } from "motion/react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

// Custom SVG social icons
const LinkedIn = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const Instagram = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const Facebook = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TikTok = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home",     href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Our Work", href: "/work" },
      { label: "Contact",  href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Cloud & Infrastructure", href: "/services" },
      { label: "Mobile App Development", href: "/services" },
      { label: "Software Development",   href: "/services" },
      { label: "AI & Data Analytics",    href: "/services" },
      { label: "IT Consulting",          href: "/services" },
      { label: "Managed IT Support",     href: "/services" },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={16} className="text-[#00C2CE] flex-shrink-0 mt-0.5" />,
    text: "iconexxit@gmail.com",
    href: "mailto:iconexxit@gmail.com",
  },
  {
    icon: <Phone size={16} className="text-[#00C2CE] flex-shrink-0 mt-0.5" />,
    text: "+94 81 234 5678",
    href: "tel:+94812345678",
  },
  {
    icon: <MapPin size={16} className="text-[#00C2CE] flex-shrink-0 mt-0.5" />,
    text: "142/5, Dalada Veediya, Kandy 20000, Sri Lanka",
  },
  {
    icon: <Globe size={16} className="text-[#00C2CE] flex-shrink-0 mt-0.5" />,
    text: "iconexit.com",
    href: "https://iconexit.com",
  },
];

const socialLinks = [
  { icon: <LinkedIn />, label: "LinkedIn",  href: "https://linkedin.com/company/iconexit" },
  { icon: <Instagram />, label: "Instagram", href: "https://instagram.com/iconex" },
  { icon: <Facebook />, label: "Facebook",  href: "https://facebook.com/iconexit" },
  { icon: <TikTok />,   label: "TikTok",    href: "https://tiktok.com/@iconex" },
];

/*
  Footer background, matched to the "Live Project Deployment" banner:
  a very dark navy base, a soft teal glow in the upper right, a faint blue
  glow lower right, and a slightly lighter blue haze on the left edge.
  Glows use fixed pixel radii so they keep the same shape on tall footers.
*/
const FOOTER_BACKGROUND = [
  // Teal glow, upper right (the round glow in the banner)
  "radial-gradient(circle 420px at 92% 10%, rgba(0, 194, 206, 0.20) 0%, rgba(0, 150, 180, 0.09) 50%, transparent 100%)",
  // Faint blue glow, lower right
  "radial-gradient(circle 520px at 90% 92%, rgba(0, 82, 212, 0.14) 0%, transparent 100%)",
  // Soft blue haze, left edge
  "radial-gradient(circle 600px at 0% 45%, rgba(24, 44, 96, 0.38) 0%, transparent 100%)",
  // Base: very dark navy
  "linear-gradient(135deg, #0B1228 0%, #090F1F 55%, #0A1325 100%)",
].join(", ");

export default function IconexFooter() {
  const pathname = usePathname();
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#090F1F" }}
    >
      {/* ── Background gradient field (matches the project banner) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: FOOTER_BACKGROUND }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 pt-20 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <span
                className="text-2xl font-extrabold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #0052D4 0%, #0070C6 50%, #00C2CE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Iconex IT
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-xs">
                Enterprise technology partner delivering cloud, security, software, and AI-driven solutions for modern businesses worldwide.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-[#00C2CE] hover:border-[#00C2CE]/40 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer nav links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#00C2CE] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-slate-400 hover:text-[#00C2CE] transition-colors duration-200 leading-snug"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400 leading-snug">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Iconex IT (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-slate-600">·</span>
            <span>Mon–Fri 09:00–18:00 LKT</span>
          </div>
        </div>
      </div>

      {/* ── Large hover text effect ── */}
      <motion.div
        key={pathname}
        className="w-full flex justify-center items-center relative z-10 px-4"
        style={{
          height: "clamp(5rem, 16vw, 13rem)",
          marginTop: "clamp(0rem, -2vw, -2.5rem)",
          marginBottom: "clamp(0.5rem, 1.5vw, 1.5rem)",
        }}
        initial={{ opacity: 0.35, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35, margin: "0px 0px -30px 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <TextHoverEffect key={pathname} text="ICONEX IT" />
      </motion.div>

      {/* ── Background gradient ── */}
      <FooterBackgroundGradient />
    </footer>
  );
}
