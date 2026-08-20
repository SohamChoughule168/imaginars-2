'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = dragStart - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const current = testimonials[activeIndex];
  const prev = testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length];
  const next = testimonials[(activeIndex + 1) % testimonials.length];

  return (
    <section
      className={cn('relative overflow-hidden', className)}
      aria-labelledby="testimonials-title"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
            Client Stories
          </span>
          <h2 id="testimonials-title" className="heading-1 mb-6">
            Trusted by
            <br />
            <span className="text-gradient-gold">Industry Leaders</span>
          </h2>
          <p className="body-lg text-text-secondary">
            Real results from real partnerships. Our clients' success is the only metric that matters.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="perspective-1000" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="relative transform-style-3d"
                initial={{ opacity: 0, y: 30, rotateX: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, rotateX: -10, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-hover p-8 md:p-12 lg:p-16 relative overflow-hidden">
                  <div className="absolute top-6 right-6 text-gold/20 font-display font-medium text-6xl md:text-7xl" aria-hidden="true">
                    &
                  </div>

                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center overflow-hidden">
                      {current.avatar ? (
                        <img
                          src={current.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="heading-4 text-text-primary">{current.author}</p>
                      <p className="caption text-gold">{current.role}, {current.company}</p>
                    </div>
                  </div>

                  <blockquote className="relative">
                    <p className="body-lg text-text-primary mb-6 leading-relaxed">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2" aria-hidden="true">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="#C9A34E"
                            className="flex-shrink-0"
                            aria-hidden="true"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        ))}
                      </div>
                      <span className="caption text-text-muted">{current.project}</span>
                    </div>
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between pointer-events-none -mx-8 md:-mx-16 lg:-mx-24">
              <button
                onClick={goToPrev}
                className="pointer-events-auto p-4 bg-canvas/80 backdrop-blur-sm border border-border rounded-full hover:border-gold/50 hover:bg-canvas transition-all duration-fast"
                aria-label="Previous testimonial"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary hover:text-gold transition-colors" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="pointer-events-auto p-4 bg-canvas/80 backdrop-blur-sm border border-border rounded-full hover:border-gold/50 hover:bg-canvas transition-all duration-fast"
                aria-label="Next testimonial"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary hover:text-gold transition-colors" aria-hidden="true">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all duration-fast ease-expo',
                  index === activeIndex
                    ? 'bg-gold w-8'
                    : 'bg-border hover:bg-text-muted'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === activeIndex}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}