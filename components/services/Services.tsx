'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/lib/data';
import { AdvancedConstellationCanvas, useConstellationScroll } from '@/components/3d/AdvancedConstellation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ServicesProps {
  className?: string;
}

export function Services({ className }: ServicesProps) {
  const { scrollProgress, activeService } = useConstellationScroll();
  const servicesRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={servicesRef}
      className={cn('relative overflow-hidden', className)}
      aria-labelledby="services-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[200vh]">
        {/* Advanced 3D Constellation - Fixed background */}
        <div className="fixed left-0 top-0 w-full h-screen z-0 pointer-events-none" aria-hidden="true">
          <AdvancedConstellationCanvas
            scrollProgress={scrollProgress}
            activeService={activeService}
          />
        </div>

        {/* Content - Scrollable */}
        <div className="relative z-10 w-full pt-24 md:pt-32 lg:pt-40">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              className="text-center mb-16 md:mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6">
                Our Expertise
              </span>
              <h2 id="services-title" className="heading-1 mb-6">
                Services That
                <br />
                <span className="text-gradient-gold">Drive Results</span>
              </h2>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                Six specialized disciplines, one unified standard of excellence. Each service is backed by deep expertise, proven processes, and a commitment to measurable outcomes.
              </p>
            </motion.div>

            <div
              className="space-y-8 md:space-y-12 lg:space-y-16"
              role="list"
              aria-label="Services"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  style={{
                    backgroundColor: activeService === index ? 'rgba(201, 163, 78, 0.03)' : 'transparent',
                    borderLeft: activeService === index ? '3px solid #C9A34E' : 'none',
                    transition: 'background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-right lg:pr-8">
                      <div className="mb-6">
                        <span className="text-gold font-display font-medium text-4xl md:text-5xl lg:text-6xl tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="heading-2 mb-4 text-text-primary">
                        {service.name}
                      </h3>
                      <p className="body text-text-secondary mb-6">
                        {service.description}
                      </p>
                      <Button variant="ghost" size="md" asChild>
                        <a href={`/services/${service.slug}`}>
                          Explore {service.shortName}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </a>
                      </Button>
                    </div>

                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            className="card-hover p-4 md:p-6 group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: featureIndex * 0.05 }}
                          >
                            <h4 className="heading-4 text-text-primary mb-2 group-hover:text-gold transition-colors duration-fast">
                              {feature}
                            </h4>
                            <div className="h-[1px] bg-border group-hover:bg-gold/50 transition-colors duration-fast w-full" aria-hidden="true" />
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap gap-2" aria-label={`${service.name} technologies`}>
                        {service.technologies.slice(0, 8).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-caption text-text-secondary bg-white/5 border border-border rounded-full hover:border-gold/50 hover:text-gold transition-all duration-fast"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-32 lg:pb-40">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="body text-text-secondary mb-6">
            Need a custom solution that spans multiple disciplines?
          </p>
          <Button variant="primary" size="lg" magnetic asChild>
            <a href="/contact">Discuss Your Project</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}