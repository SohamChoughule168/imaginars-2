'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { AdvancedConstellationCanvas, useConstellationScroll } from '@/components/3d/AdvancedConstellation';
import { useAdvancedCursor, CursorRenderer } from '@/components/cursor/AdvancedCursor';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const { scrollProgress, activeService } = useConstellationScroll();
  const { 
    position, 
    isVisible, 
    isHovering, 
    clickEffect, 
    trail, 
    clickRipples 
  } = useAdvancedCursor();

  // Scroll-based hero content animation
  const [heroProgress, setHeroProgress] = useState(0);
  
  useEffect(() => {
    setHeroProgress(scrollProgress * 2); // Hero animates in first 50% of scroll
  }, [scrollProgress]);

  const scrollDownVariants = {
    animate: {
      y: [0, 10, 0],
      opacity: [1, 0.5, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section
      className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,163,78,0.08)_0%,transparent_70%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/50" aria-hidden="true" />

      {/* Advanced 3D Constellation */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <AdvancedConstellationCanvas 
          scrollProgress={scrollProgress} 
          activeService={activeService}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: 1 - heroProgress * 2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-caption font-medium text-gold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" aria-hidden="true" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" aria-hidden="true" />
              </span>
              Flagship Digital Experience
            </span>
          </motion.div>

          {/* Headline with scroll-linked animation */}
          <motion.h1
            id="hero-title"
            className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ 
              transform: `translateY(${heroProgress * -50}px) scale(${1 - heroProgress * 0.1})`,
              opacity: Math.max(0, 1 - heroProgress * 2),
            }}
          >
            Transform Your
            <br />
            <span className="text-gradient-gold">Digital Vision</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="body-lg text-text-secondary max-w-2xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ opacity: Math.max(0, 1 - heroProgress * 2) }}
          >
            We craft premium digital experiences, intelligent technology solutions, and strategic creative work that transforms businesses. From AI-powered platforms to award-winning brand identities.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ opacity: Math.max(0, 1 - heroProgress * 2) }}
          >
            <Button variant="primary" size="lg" magnetic asChild>
              <a href="/contact">Get Started</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/portfolio">View Our Work</a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{ opacity: Math.max(0, 1 - heroProgress * 2) }}
          >
            <div className="flex items-center gap-2 text-text-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-body-sm">Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span className="text-body-sm">24/7 dedicated support</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <span className="text-body-sm">98% client satisfaction</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        animate={scrollDownVariants.animate}
        style={{ animationDelay: '1.5s', opacity: Math.max(0, 1 - heroProgress * 3) }}
        aria-hidden="true"
      >
        <span className="text-caption uppercase tracking-widest">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </motion.div>

      {/* Advanced Cursor Renderer */}
      <CursorRenderer
        position={position}
        isVisible={isVisible}
        isHovering={isHovering}
        clickEffect={clickEffect}
        trail={trail}
        clickRipples={clickRipples}
      />
    </section>
  );
}