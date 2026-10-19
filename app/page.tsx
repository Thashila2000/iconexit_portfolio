import HeroSection from '@/app/components/HeroSection';
import HomeServices from '@/app/components/HomeServices';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-[#ffebeb] selection:bg-ember-500/30 selection:text-slate-900 antialiased">
      {/* Sticky Hero section: pinned in place as the user scrolls */}
      <div className="sticky top-0 z-[1] h-screen w-full overflow-hidden">
        <HeroSection />
      </div>

      {/* Services section: slides up, overlaps and fully lays on the hero section */}
      <div className="relative z-[10] w-full bg-[#ffebeb] shadow-[0_-24px_60px_rgba(0,0,0,0.22)]">
        <HomeServices />
      </div>
    </div>
  );
}