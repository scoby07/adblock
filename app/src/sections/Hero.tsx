import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Chrome, Globe, ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(illustrationRef.current, {
        opacity: 0,
        x: 40,
        scale: 0.98,
      });
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.98,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
        .to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          subheadlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          illustrationRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-grid-white"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.22) 0%, rgba(0,0,0,0) 65%)',
          }}
        />
      </div>

      {/* Ambient lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,229,255,0)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.35)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0)" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="30%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="70%" y1="20%" x2="90%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="5%" y1="80%" x2="25%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="75%" y1="80%" x2="95%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" />
      </svg>

      {/* Main hero card */}
      <div
        ref={cardRef}
        className="relative z-10 w-[90vw] max-w-[1100px] min-h-[520px] rounded-3xl border border-white/10 bg-navy-200/80 backdrop-blur-xl p-8 md:p-12 shadow-card"
      >
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-cyan/60" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan/60" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-cyan/60" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-cyan/60" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/30 w-fit">
              <Shield className="w-4 h-4 text-cyan" />
              <span className="text-sm font-medium text-cyan">Trusted by 2M+ users</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1]"
            >
              Block ads.{' '}
              <span className="text-gradient">Speed up</span> sites. Protect your privacy.
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-lg text-text-secondary leading-relaxed max-w-md"
            >
              A lightweight extension that removes clutter, trackers, and heavy scripts—so pages
              load instantly.
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button
                size="lg"
                className="bg-cyan hover:bg-cyan-600 text-navy font-semibold px-8 py-6 rounded-full text-base transition-all duration-300 hover:shadow-glow"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Add to Chrome — It's free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-6 rounded-full text-base"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Browser icons */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-text-secondary">Also available for:</span>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-text-secondary hover:text-cyan transition-colors cursor-pointer" />
                <Globe className="w-5 h-5 text-text-secondary hover:text-cyan transition-colors cursor-pointer" />
                <svg
                  className="w-5 h-5 text-text-secondary hover:text-cyan transition-colors cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right illustration */}
          <div ref={illustrationRef} className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              {/* Glow ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-2 border-cyan/30 animate-pulse-glow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-cyan/20" />
              </div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan/20 to-cyan/5 border border-cyan/30 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-cyan" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-navy-100/90 border border-white/10 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-white">Ads Blocked</span>
                </div>
                <p className="text-xl font-bold text-cyan mt-1">154,320</p>
              </div>

              <div
                className="absolute bottom-12 left-0 px-4 py-2 rounded-xl bg-navy-100/90 border border-white/10 shadow-lg animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan" />
                  <span className="text-sm text-white">Trackers Blocked</span>
                </div>
                <p className="text-xl font-bold text-cyan mt-1">89,340</p>
              </div>

              <div
                className="absolute top-1/2 -right-4 px-4 py-2 rounded-xl bg-navy-100/90 border border-white/10 shadow-lg animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-sm text-white">Data Saved</span>
                </div>
                <p className="text-xl font-bold text-cyan mt-1">2.4 GB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
