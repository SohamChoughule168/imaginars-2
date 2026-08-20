'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { portfolioProjects, services } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface PortfolioProps {
  className?: string;
}

export function Portfolio({ className }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...services.map(s => s.id)];

  const filteredProjects = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.services.includes(activeCategory));

  return (
    <section
      className={cn('relative overflow-hidden', className)}
      aria-labelledby="portfolio-title"
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
            Selected Work
          </span>
          <h2 id="portfolio-title" className="heading-1 mb-6">
            Projects That
            <br />
            <span className="text-gradient-gold">Speak Volumes</span>
          </h2>
          <p className="body-lg text-text-secondary">
            A curated collection of our most impactful work. Each project represents a unique challenge solved with precision and creativity.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 md:mb-16" role="tablist" aria-label="Project categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full font-medium transition-all duration-fast ease-expo',
                activeCategory === category
                  ? 'bg-gold text-text-inverse shadow-glow-sm'
                  : 'bg-white/5 border border-border text-text-secondary hover:border-gold/50 hover:text-text-primary'
              )}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`panel-${category}`}
            >
              {category === 'all' ? 'All Projects' : services.find(s => s.id === category)?.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            id={`panel-${activeCategory}`}
            role="tabpanel"
            aria-label={`${activeCategory === 'all' ? 'All' : services.find(s => s.id === activeCategory)?.name} projects`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.slug}
                className="group relative card-hover overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
              >
                <Link href={`/portfolio/${project.slug}`} className="block" aria-label={`View ${project.title} case study`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold/10 via-transparent to-transparent flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold/50" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" aria-hidden="true" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-normal ease-expo">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="gold" size="sm">{project.category}</Badge>
                          <p className="caption text-text-secondary mt-1">{project.year}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-text-inverse group-hover:scale-110 transition-transform duration-fast" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="heading-3 mb-3 text-text-primary group-hover:text-gold transition-colors duration-fast">
                      {project.title}
                    </h3>
                    <p className="body text-text-secondary mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4" aria-label="Technologies used">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-micro text-text-muted bg-white/5 border border-border rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="caption text-text-muted">{project.client}</span>
                      <div className="flex items-center gap-1" aria-label="Results">
                        {project.results.slice(0, 1).map((result, i) => (
                          <span key={i} className="text-gold font-display font-medium text-body-sm">
                            {result.metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="body text-text-secondary mb-6">No projects found in this category.</p>
            <Button variant="ghost" onClick={() => setActiveCategory('all')}>
              View All Projects
            </Button>
          </motion.div>
        )}

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button variant="primary" size="lg" magnetic asChild>
            <Link href="/portfolio">View All Case Studies</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}