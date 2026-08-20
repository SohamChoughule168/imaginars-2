'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ConstellationCanvas } from '@/components/3d/Constellation';
import { cn } from '@/lib/utils';

interface FinalCTAProps {
  className?: string;
}

export function FinalCTA({ className }: FinalCTAProps) {
  return (
    <section
      className={cn('relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden', className)}
      aria-labelledby="final-cta-title"
    >
      <div className="absolute inset-0 bg-canvas" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.06)_0%,transparent_70%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,14,20,1)_100%)]" aria-hidden="true" />

      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <ConstellationCanvas scrollProgress={1} activeService={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-8 block w-fit mx-auto">
            Ready to Begin?
          </span>

          <h2 id="final-cta-title" className="heading-1 mb-8">
            Ready to Transform Your
            <br />
            <span className="text-gradient-gold">Digital Presence?</span>
          </h2>

          <p className="body-lg text-text-secondary mb-12">
            Let's build something exceptional together. Whether you're launching a new product, scaling an existing platform, or reimagining your brand — we're ready to help.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <Button variant="primary" size="lg" magnetic asChild>
              <a href="/contact">Get Started</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/portfolio">View Our Work</a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 flex items-center justify-center gap-8 md:gap-16 text-text-muted"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-body-sm">NDA & IP protection</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span className="text-body-sm">24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <span className="text-body-sm">98% satisfaction</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}