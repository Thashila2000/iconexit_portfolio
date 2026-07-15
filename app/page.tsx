import HeroSection from '@/app/components/HeroSection';
import HomeServices from '@/app/components/HomeServices';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-white selection:bg-ember-500/30 selection:text-slate-900 antialiased">
      <HeroSection />
      <HomeServices />
    </div>
  );
}