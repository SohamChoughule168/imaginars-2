'use client';

import { motion } from 'framer-motion';
import { team, companyTimeline, siteConfig, pillars } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function AboutContent() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,163,78,0.08)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas to-transparent" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6 block w-fit mx-auto">
                Our Story
              </span>
              <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
                Building Digital
                <br />
                <span className="text-gradient-gold">Excellence Since 2018</span>
              </h1>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                We started as a boutique web development studio in Mumbai with a simple belief: technology should serve business goals, not the other way around. Today, we're a full-service digital transformation partner with 200+ projects delivered across 12 countries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6 block w-fit mx-auto">
              Our Philosophy
            </span>
            <h2 className="heading-1 mb-6">
              Three Pillars That
              <br />
              <span className="text-gradient-gold">Guide Everything</span>
            </h2>
            <p className="body-lg text-text-secondary">
              These aren't just values on a wall. They're the lens through which we evaluate every decision, every project, and every client relationship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                className="card-hover p-8 md:p-12 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                    {pillar.id === 'innovation-driven' && <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>}
                    {pillar.id === 'results-focused' && <><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></>}
                    {pillar.id === 'client-centric' && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>}
                  </svg>
                </div>
                <span className="text-gold font-display font-medium text-4xl md:text-5xl tabular-nums block mb-4">{pillar.number}</span>
                <h3 className="heading-3 mb-4 text-text-primary">{pillar.title}</h3>
                <p className="body text-text-secondary">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6 block w-fit mx-auto">
              Our Journey
            </span>
            <h2 className="heading-1 mb-6">
              Milestones That
              <br />
              <span className="text-gradient-gold">Define Us</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {companyTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative flex gap-8 md:gap-12 pb-12 md:pb-16 last:pb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              >
                <div className="relative flex-shrink-0 w-12">
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border" aria-hidden="true" />
                  <div className="relative z-10 w-10 h-10 rounded-full bg-canvas border-2 border-gold flex items-center justify-center mx-auto">
                    <span className="text-gold font-display font-medium text-lg">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="heading-4 text-text-primary mb-2">{item.title}</h3>
                  <p className="body text-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6 block w-fit mx-auto">
              Leadership Team
            </span>
            <h2 className="heading-1 mb-6">
              The People Behind
              <br />
              <span className="text-gradient-gold">The Work</span>
            </h2>
            <p className="body-lg text-text-secondary">
              Experienced leaders who've built products at scale. We don't just manage — we build, architect, and create alongside our teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                className="group card-hover text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl mb-6">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gold/10 via-transparent to-transparent flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold/50" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" aria-hidden="true" />
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast p-3 bg-gold/10 border border-gold/30 rounded-full text-gold hover:bg-gold/20"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <h3 className="heading-4 text-text-primary mb-1">{member.name}</h3>
                <p className="caption text-gold mb-3">{member.role}</p>
                <p className="body-sm text-text-secondary">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.06)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-1 mb-6">
              Ready to Work
              <br />
              <span className="text-gradient-gold">With Us?</span>
            </h2>
            <p className="body-lg text-text-secondary mb-10">
              Whether you have a defined project or just an idea, we'd love to hear from you. Let's explore what we can build together.
            </p>
            <Button variant="primary" size="lg" magnetic asChild>
              <a href="/contact">Start a Conversation</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}