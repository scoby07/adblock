import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, Chrome, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Does it block YouTube ads?',
    answer:
      'Yes! AdBlock Pro blocks all types of YouTube ads including pre-roll, mid-roll, and overlay ads. You can enjoy uninterrupted video streaming without any configuration.',
  },
  {
    question: 'Will it break websites?',
    answer:
      "AdBlock Pro is designed to be non-intrusive. While some sites may detect ad blockers, we maintain filter lists that minimize breakage. You can also whitelist specific sites if needed, and our 'Allow acceptable ads' option supports non-intrusive advertising.",
  },
  {
    question: 'Do you collect browsing data?',
    answer:
      "Absolutely not. We have a strict no-logs policy. Your browsing history never leaves your device. We don't track what sites you visit, what you search for, or any personal information. Privacy is our core mission.",
  },
  {
    question: 'Can I use it on mobile?',
    answer:
      'Yes! AdBlock Pro works on mobile browsers that support extensions, including Firefox for Android and Safari on iOS. We also offer a standalone iOS app with system-wide ad blocking capabilities.',
  },
  {
    question: 'How do I cancel Pro?',
    answer:
      "You can cancel your Pro subscription at any time from your account dashboard. There's no commitment, and you'll continue to have access until the end of your billing period. We also offer a 30-day money-back guarantee.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      // Accordion animation
      gsap.fromTo(
        accordionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-grid-white">
      <div className="w-[92vw] max-w-[800px] mx-auto">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Questions? <span className="text-gradient">Answered.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-xl bg-navy-100/50 px-6 overflow-hidden data-[state=open]:border-cyan/30"
              >
                <AccordionTrigger className="text-left text-white hover:text-cyan py-5 text-lg font-semibold [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-navy-100 to-navy-200 text-center"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-cyan/5 blur-xl" />

          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready for a cleaner internet?
            </h3>
            <Button
              size="lg"
              className="bg-cyan hover:bg-cyan-600 text-navy font-semibold px-8 py-6 rounded-full text-base transition-all duration-300 hover:shadow-glow mb-4"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Add to Chrome — It's free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-sm text-text-secondary">
              Also available for{' '}
              <span className="inline-flex items-center gap-2 ml-2">
                <Globe className="w-4 h-4" />
                Firefox
              </span>
              <span className="inline-flex items-center gap-2 ml-3">
                <Globe className="w-4 h-4" />
                Safari
              </span>
              <span className="inline-flex items-center gap-2 ml-3">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Edge
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
