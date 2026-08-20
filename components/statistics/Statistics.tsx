'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statistics } from '@/lib/data';
import { cn } from '@/lib/utils';
import { countUp } from '@/lib/animations/gsap';

interface StatisticsProps {
  className?: string;
}

export function Statistics({ className }: StatisticsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const counters = containerRef.current?.querySelectorAll('[data-counter]');
    counters?.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);

      setTimeout(() => {
        countUp(counter as HTMLElement, target, {
          duration: 2,
          decimals,
          suffix,
          prefix,
        });
      }, index * 200);
    });
  };

  return (
    <section
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      aria-label="Company statistics"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

      <div className="relative container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            >
              <div className="relative mb-4">
                <span
                  className="text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-display font-medium tabular-nums text-text-primary"
                  data-counter
                  data-target={parseInt(stat.value.replace(/[^0-9]/g, ''), 10)}
                  data-suffix={stat.suffix}
                  data-decimals={0}
                >
                  0{stat.suffix}
                </span>
                {index < statistics.length - 1 && (
                  <div className="absolute top-1/2 right-0 w-px h-1/2 bg-border md:w-1/2 md:h-px md:top-auto md:right-auto md:bottom-0 md:left-1/2" aria-hidden="true" />
                )}
              </div>
              <p className="caption text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}