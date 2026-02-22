import { useEffect, useRef } from 'react';
import { LayoutDashboard, Shield, Filter, BarChart3, Settings, Check, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: false },
  { icon: Shield, label: 'Privacy', active: true },
  { icon: Filter, label: 'Filters', active: false },
  { icon: BarChart3, label: 'Stats', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const toggles = [
  { label: 'Block trackers', enabled: true, description: 'Stop analytics and ad beacons' },
  { label: 'Hide referrers', enabled: true, description: 'Prevent sites from seeing where you came from' },
  { label: 'Block WebRTC', enabled: false, description: 'Prevent IP leaks during video calls' },
  { label: 'Fingerprint defense', enabled: true, description: 'Reduce identifiable browser signals' },
];

export function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 bg-grid-white"
    >
      {/* Headline */}
      <div ref={headlineRef} className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
          Everything you need,{' '}
          <span className="text-gradient">one clean dashboard</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-xl mx-auto">
          Turn protections on in a click. No jargon. No clutter.
        </p>
      </div>

      {/* Dashboard Card */}
      <div
        ref={cardRef}
        className="relative w-[92vw] max-w-[1140px] rounded-3xl border border-white/10 bg-navy-200/90 backdrop-blur-xl overflow-hidden shadow-card"
      >
        <div className="flex flex-col lg:flex-row min-h-[480px]">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-navy-100/50 border-b lg:border-b-0 lg:border-r border-white/5 p-4">
            <div className="flex items-center gap-3 px-4 py-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan" />
              </div>
              <span className="font-semibold text-white">AdBlock Pro</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? 'bg-cyan/10 text-cyan border border-cyan/30'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">Privacy</h3>
              <p className="text-text-secondary">Control how sites track and identify you</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {toggles.map((toggle, index) => (
                <div
                  key={toggle.label}
                  className="p-5 rounded-2xl bg-navy-100/50 border border-white/5 hover:border-cyan/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${
                        toggle.enabled ? 'bg-cyan' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                          toggle.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </div>
                    {toggle.enabled ? (
                      <Check className="w-5 h-5 text-cyan" />
                    ) : (
                      <X className="w-5 h-5 text-text-secondary" />
                    )}
                  </div>
                  <h4 className="font-semibold text-white mb-1">{toggle.label}</h4>
                  <p className="text-sm text-text-secondary">{toggle.description}</p>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan">154K</p>
                <p className="text-sm text-text-secondary">Ads blocked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan">89K</p>
                <p className="text-sm text-text-secondary">Trackers blocked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan">2.4GB</p>
                <p className="text-sm text-text-secondary">Data saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
