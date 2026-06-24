import React from 'react';
import HeroSection from '@/app/components/HeroSection';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-white selection:bg-ember-500/30 selection:text-slate-900 antialiased">
      <HeroSection />
    </main>
  );
}