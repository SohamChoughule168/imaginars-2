'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export function ServicesPageContent() {
  return (
    <React.Fragment>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,163,78,0.08)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas to-transparent" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 lg:py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6 block w-fit mx-auto">
              What We Do
            </span>
            <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
              Services That
              <br />
              <span className="text-gradient-gold">Drive Results</span>
            </h1>
            <p className="body-lg text-text-secondary">
              Six specialized disciplines, one unified standard of excellence. Each service is backed by deep expertise, proven processes, and a commitment to measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <Card variant="hover" padding="lg" className="h-full flex flex-col">
                    <CardHeader className="mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-4 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-normal">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                          {service.id === 'web-development' && <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>}
                          {service.id === 'mobile-apps' && <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></>}
                          {service.id === 'ai-solutions' && <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/><circle cx="12" cy="12" r="3"/></>}
                          {service.id === 'digital-marketing' && <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/><line x1="12" y1="2" x2="12" y2="7"/></>}
                          {service.id === 'video-editing' && <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>}
                          {service.id === 'brand-management' && <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="gold" size="sm">{service.shortName}</Badge>
                      </div>
                      <CardTitle className="text-text-primary">{service.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <CardDescription className="mb-6">{service.description}</CardDescription>

                      <ul className="space-y-3" role="list">
                        {service.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-text-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span className="body-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="pt-6 border-t border-border">
                      <Button variant="ghost" size="md" fullWidth asChild>
                        <Link href={`/services/${service.slug}`}>
                          Explore {service.shortName}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="body text-text-secondary mb-6">
              Need a solution that spans multiple disciplines?
            </p>
            <Button variant="primary" size="lg" magnetic asChild>
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </React.Fragment>
  );
}