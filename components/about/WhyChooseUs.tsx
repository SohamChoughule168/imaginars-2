'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pillars } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getScrollProgress } from '@/lib/utils';

interface WhyChooseUsProps {
  className?: string;
}

export function WhyChooseUs({ className }: WhyChooseUsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (rect.height + viewportHeight)));
      setScrollProgress(progress);

      const pillarIndex = Math.floor(progress * pillars.length * 1.2);
      setActivePillar(Math.min(Math.max(pillarIndex, 0), pillars.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden', className)}
      aria-labelledby="why-choose-us-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

      <div className="relative container mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6">
            Our Philosophy
          </span>
          <h2 id="why-choose-us-title" className="heading-1 mb-6">
            Three Pillars of
            <br />
            <span className="text-gradient-gold">Excellence</span>
          </h2>
          <p className="body-lg text-text-secondary">
            These principles guide every decision, every project, and every client relationship. They're not just values on a wall — they're how we operate daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              className={cn(
                'relative card-hover p-8 md:p-12 group',
                activePillar === index ? 'border-gold/30 shadow-glow-sm' : ''
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              style={{
                transform: activePillar === index ? 'translateY(-8px) scale(1.01)' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-normal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                    {pillar.id === 'innovation-driven' && (
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    )}
                    {pillar.id === 'results-focused' && (
                      <>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v8M8 12h8"/>
                      </>
                    )}
                    {pillar.id === 'client-centric' && (
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-gold font-display font-medium text-3xl md:text-4xl tabular-nums block mb-2">
                    {pillar.number}
                  </span>
                  <h3 className="heading-3 mb-3 text-text-primary">{pillar.title}</h3>
                  <p className="body text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activePillar === index ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <p className="body text-text-secondary mb-6">
            Ready to work with a team that puts these principles into practice?
          </p>
          <a href="/contact" className="link text-body font-medium text-gold">
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}