import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    description: 'Block ads on websites',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Block ads on websites',
      'Basic tracker blocking',
      'Standard filter lists',
      'Community support',
    ],
    cta: 'Install',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Block ads + trackers, custom filters, priority support',
    monthlyPrice: 3,
    yearlyPrice: 28,
    features: [
      'Everything in Free',
      'Advanced tracker blocking',
      'Custom filter lists',
      'Privacy protection tools',
      'Priority support',
      'Sync across devices',
    ],
    cta: 'Start Pro',
    popular: true,
  },
  {
    name: 'Teams',
    description: 'Pro for up to 5 users + centralized policy',
    monthlyPrice: 8,
    yearlyPrice: 78,
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Centralized policy management',
      'Admin dashboard',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(false);

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
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.98 },
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
      <div className="w-[92vw] max-w-[1040px] mx-auto">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Choose your <span className="text-gradient">plan</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
            Start free. Upgrade when you want more control.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-text-secondary'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-cyan"
            />
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-text-secondary'}`}>
              Yearly
              <span className="ml-2 text-xs text-cyan">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative p-6 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-navy-100/80 border-2 border-cyan/50 scale-105 shadow-glow'
                  : 'bg-navy-100/50 border border-white/5 hover:border-cyan/30'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan text-navy text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-text-secondary">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-text-secondary">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
                {isYearly && plan.yearlyPrice > 0 && (
                  <p className="text-sm text-cyan mt-1">
                    Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full rounded-full py-5 font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-cyan hover:bg-cyan-600 text-navy hover:shadow-glow'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
