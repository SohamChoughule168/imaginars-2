'use client';

import { motion } from 'framer-motion';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';

type Service = typeof services[0];

interface ServiceDetailContentProps {
  service: Service;
}

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,163,78,0.08)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas to-transparent" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="gold" size="lg">{service.shortName}</Badge>
              <span className="caption text-text-muted">Service</span>
            </div>
            <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
              {service.name}
            </h1>
            <p className="body-lg text-text-secondary max-w-2xl">
              {service.longDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              className="lg:col-span-2 space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <h2 className="heading-2 mb-6">Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="card-hover p-6 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                    >
                      <h3 className="heading-4 text-text-primary mb-2 group-hover:text-gold transition-colors duration-fast">
                        {feature}
                      </h3>
                      <Separator variant="gold" className="w-12" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="heading-2 mb-6">Our Process</h2>
                <div className="space-y-8">
                  {service.process.map((step, index) => (
                    <motion.div
                      key={step.step}
                      className="flex gap-6"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-display font-medium text-xl">
                        {step.step}
                      </div>
                      <div className="pt-1">
                        <h3 className="heading-4 text-text-primary mb-2">{step.title}</h3>
                        <p className="body text-text-secondary">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="heading-2 mb-6">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      className="flex items-start gap-3 p-4 card-hover"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span className="body-sm text-text-secondary">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card variant="elevated" padding="lg" className="sticky top-24">
                <CardHeader className="mb-6">
                  <CardTitle className="text-text-primary">Technologies We Use</CardTitle>
                </CardHeader>
                <CardContent className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="lg" magnetic fullWidth asChild>
                    <a href="/contact">{service.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-1 mb-6">
              Ready to Start Your
              <br />
              <span className="text-gradient-gold">{service.name} Project?</span>
            </h2>
            <p className="body-lg text-text-secondary mb-10">
              Let's discuss your requirements and explore how we can help you achieve your goals.
            </p>
            <Button variant="primary" size="lg" magnetic asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}