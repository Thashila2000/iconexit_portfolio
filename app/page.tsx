import HeroSection from '@/app/components/HeroSection';
import HomeServices from '@/app/components/HomeServices';
import MissionVisionSection from '@/app/components/MissionVisionSection';
import Portfolio9 from '@/components/ui/block-portfolio-9';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import HowWeWorkTimeline from '@/components/ui/timeline';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-[#ffebeb] selection:bg-ember-500/30 selection:text-slate-900 antialiased">
      {/* Hero + Services wrapper: confines sticky hero strictly to the initial overlap */}
      <div className="relative w-full">
        {/* Sticky Hero section: pinned in place as the user scrolls */}
        <div className="sticky top-0 z-[1] h-screen w-full overflow-hidden">
          <HeroSection />
        </div>

        {/* Services section: slides up, overlaps and fully lays on the hero section */}
        <div className="relative z-[10] w-full bg-[#ffebeb] shadow-[0_-12px_30px_rgba(0,0,0,0.12)] sm:shadow-[0_-24px_60px_rgba(0,0,0,0.22)] transform-gpu">
          <HomeServices />
        </div>
      </div>

      {/* Mission & Vision Section: Google Labs styled statement section */}
      <div className="relative z-[10] w-full bg-[#ffebeb]">
        <MissionVisionSection />
      </div>

      {/* Business Solutions Section */}
      <div className="relative z-[10] w-full bg-[#ffebeb] border-t border-slate-200/60">
        <Portfolio9
          badge="Business Solutions"
          title={
            <>
              Tailored business solutions<br />
              engineered for <em>digital growth.</em>
            </>
          }
          subtitle="From high-availability cloud foundations to bespoke AI and software platforms, we engineer systems that empower modern business operations."
          buttonText="Explore Portfolio"
          buttonHref="/work"
        />
      </div>

      {/* How We Work — Process timeline */}
      <div className="relative z-[10] w-full bg-[#ffebeb]">
        <HowWeWorkTimeline
          title="How We Work"
          subtitle="Four deliberate phases that take your product from a rough idea to a live, scalable platform without surprises."
          backgroundColor="#ffebeb"
          textColor="#0F172A"
          mutedTextColor="#1E293B"
          activeColor="#0066EE"
          imageUrl="/Images/our_process.png"
        />
      </div>

      {/* Testimonials Marquee Section */}
      <div className="relative z-[10] w-full bg-[#ffebeb] border-t border-slate-200/60">
        <TestimonialsSection />
      </div>

    </div>
  );
}