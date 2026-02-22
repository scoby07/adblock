import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bigStats = {
  value: '3×',
  label: 'Faster page loads',
  description: 'on ad-heavy sites',
};

const supportingStats = [
  { value: '10,000+', label: 'Trackers blocked', description: 'per week (average user)' },
  { value: 'Zero', label: 'Data collection', description: "We don't sell your browsing history" },
  { value: '<1%', label: 'CPU usage', description: 'Designed to stay lightweight' },
];

export function Performance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bigCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Big card animation
      gsap.fromTo(
        bigCardRef.current,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Supporting stats animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-grid-white">
      <div className="w-[92vw] max-w-[900px] mx-auto">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Feel the <span className="text-gradient">difference</span>
          </h2>
        </div>

        {/* Big Stat Card */}
        <div
          ref={bigCardRef}
          className="relative w-full max-w-[720px] mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-navy-100 to-navy-200 p-10 md:p-16 text-center mb-8 shadow-card"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-cyan/5 blur-2xl" />

          <div className="relative">
            <p className="text-7xl md:text-8xl lg:text-9xl font-bold text-gradient mb-4">
              {bigStats.value}
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-white mb-2">{bigStats.label}</p>
            <p className="text-lg text-text-secondary">{bigStats.description}</p>
          </div>
        </div>

        {/* Supporting Stats */}
        <div ref={statsRef} className="grid sm:grid-cols-3 gap-4">
          {supportingStats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card p-6 rounded-2xl bg-navy-100/50 border border-white/5 text-center hover:border-cyan/30 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-cyan mb-2">{stat.value}</p>
              <p className="font-semibold text-white mb-1">{stat.label}</p>
              <p className="text-sm text-text-secondary">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
