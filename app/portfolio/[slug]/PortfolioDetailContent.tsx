'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';

interface PortfolioDetailContentProps {
  project: typeof import('@/lib/data').portfolioProjects[0];
}

export function PortfolioDetailContent({ project }: PortfolioDetailContentProps) {
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
              <Badge variant="gold" size="lg">{project.category}</Badge>
              <span className="caption text-text-muted">{project.year}</span>
            </div>
            <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
              {project.title}
            </h1>
            <p className="body-lg text-text-secondary max-w-2xl">
              {project.longDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {project.image && (
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              className="relative aspect-[16/9] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

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
                <h2 className="heading-2 mb-6">Project Overview</h2>
                <p className="body-lg text-text-secondary mb-8">{project.longDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="caption text-text-muted mb-1">Client</p>
                    <p className="body text-text-primary">{project.client}</p>
                  </div>
                  <div>
                    <p className="caption text-text-muted mb-1">Year</p>
                    <p className="body text-text-primary">{project.year}</p>
                  </div>
                  <div>
                    <p className="caption text-text-muted mb-1">Category</p>
                    <p className="body text-text-primary">{project.category}</p>
                  </div>
                </div>

                <h3 className="heading-3 mb-4">Key Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-6 card-hover"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                    >
                      <div className="text-gold font-display font-medium text-4xl md:text-5xl mb-2">{result.metric}</div>
                      <div className="caption text-text-secondary">{result.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h2 className="heading-2 mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h2 className="heading-2 mb-6">Services Applied</h2>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((serviceSlug) => {
                    const service = require('@/lib/data').services.find((s: any) => s.slug === serviceSlug);
                    return (
                      <Badge key={serviceSlug} variant="gold" size="sm">
                        {service?.name || serviceSlug}
                      </Badge>
                    );
                  })}
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
                  <CardTitle className="text-text-primary">Project Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="primary" size="md" fullWidth asChild>
                    <Link href="/contact">Start Similar Project</Link>
                  </Button>
                  <Button variant="secondary" size="md" fullWidth asChild>
                    <Link href="/portfolio">View All Projects</Link>
                  </Button>
                  <Button variant="ghost" size="md" fullWidth asChild>
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </CardContent>
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
              Have a Similar
              <br />
              <span className="text-gradient-gold">Project in Mind?</span>
            </h2>
            <p className="body-lg text-text-secondary mb-10">
              Let's discuss your requirements and explore how we can bring your vision to life.
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