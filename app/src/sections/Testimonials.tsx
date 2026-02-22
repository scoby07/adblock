import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Finally, a clean web.',
    content: 'I forgot how fast news sites could load. This is essential for anyone who values their time.',
    author: 'Alex M.',
    role: 'Software Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    rating: 5,
  },
  {
    quote: 'Privacy without the paranoia.',
    content: 'I just wanted fewer ads. I got peace of mind too. The privacy features are a great bonus.',
    author: 'Sarah L.',
    role: 'Marketing Director',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    rating: 5,
  },
  {
    quote: 'Works everywhere.',
    content: 'YouTube, Reddit, random blogs—just works. No config needed. Set it and forget it.',
    author: 'Jordan T.',
    role: 'Content Creator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    rating: 5,
  },
];

export function Testimonials() {
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
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
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
      <div className="w-[92vw] max-w-[1100px] mx-auto">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Loved by <span className="text-gradient">thousands</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="testimonial-card p-6 rounded-2xl bg-navy-100/50 border border-white/5 hover:border-cyan/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan text-cyan" />
                ))}
              </div>

              {/* Quote */}
              <h3 className="text-xl font-bold text-white mb-3">"{testimonial.quote}"</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full bg-navy-200"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
