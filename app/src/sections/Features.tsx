import { useEffect, useRef } from 'react';
import { Shield, Eye, Zap, Fingerprint, Radio, Sliders } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: 'Block Ads',
    description: 'Removes banners, pop-ups, and video ads from every website you visit.',
    color: 'cyan',
  },
  {
    icon: Eye,
    title: 'Stop Trackers',
    description: 'Blocks analytics and ad beacons before they can collect your data.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'Speed Boost',
    description: 'Cuts heavy scripts; pages load up to 3× faster without ads.',
    color: 'yellow',
  },
  {
    icon: Fingerprint,
    title: 'Fingerprint Defense',
    description: 'Reduces identifiable signals sites can use to track you.',
    color: 'green',
  },
  {
    icon: Radio,
    title: 'WebRTC Shield',
    description: 'Prevents IP leaks during video calls and peer-to-peer connections.',
    color: 'pink',
  },
  {
    icon: Sliders,
    title: 'Custom Filters',
    description: 'Add your own rules or import trusted filter lists.',
    color: 'orange',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
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
      <div className="w-[92vw] max-w-[1200px] mx-auto">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Built for <span className="text-gradient">speed and privacy</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Six tools. One toggle each. Zero compromise.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group relative p-6 rounded-2xl bg-navy-100/50 border border-white/5 hover:border-cyan/30 transition-all duration-300 min-h-[260px]"
            >
              {/* Corner arc decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-25">
                <div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full border-2 border-cyan"
                  style={{ transform: 'rotate(-45deg)' }}
                />
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  feature.color === 'cyan'
                    ? 'bg-cyan/20'
                    : feature.color === 'purple'
                      ? 'bg-purple-500/20'
                      : feature.color === 'yellow'
                        ? 'bg-yellow-500/20'
                        : feature.color === 'green'
                          ? 'bg-green-500/20'
                          : feature.color === 'pink'
                            ? 'bg-pink-500/20'
                            : 'bg-orange-500/20'
                }`}
              >
                <feature.icon
                  className={`w-6 h-6 ${
                    feature.color === 'cyan'
                      ? 'text-cyan'
                      : feature.color === 'purple'
                        ? 'text-purple-400'
                        : feature.color === 'yellow'
                          ? 'text-yellow-400'
                          : feature.color === 'green'
                            ? 'text-green-400'
                            : feature.color === 'pink'
                              ? 'text-pink-400'
                              : 'text-orange-400'
                  }`}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
