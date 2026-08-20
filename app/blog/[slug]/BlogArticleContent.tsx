'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';
import { blogPosts } from '@/lib/data';

interface BlogArticleContentProps {
  post: typeof import('@/lib/data').blogPosts[0];
}

export function BlogArticleContent({ post }: BlogArticleContentProps) {
  return (
    <>
      <article className="relative">
        <header className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,163,78,0.08)_0%,transparent_70%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas to-transparent" aria-hidden="true" />

          {post.image && (
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          )}

          <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 lg:py-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="gold" size="lg">{post.category}</Badge>
                <Badge variant="outline" size="sm">{post.readTime} read</Badge>
              </div>
              <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-text-secondary">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  <span className="caption">{post.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  </svg>
                  <span className="caption">{post.author}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="prose prose-invert max-w-none"
              >
                <div className="body-lg text-text-secondary mb-12 pb-8 border-b border-border leading-relaxed">
                  {post.excerpt}
                </div>

                <div className="space-y-8 text-text-secondary leading-relaxed">
                  <p className="body">
                    In today's rapidly evolving digital landscape, businesses face unprecedented challenges and opportunities. The convergence of artificial intelligence, cloud computing, and user-centered design has created a new paradigm for how organizations approach technology.
                  </p>
                  <p className="body">
                    Our experience working with companies across industries has revealed a common thread: the most successful digital transformations aren't driven by technology alone. They're driven by a clear understanding of business objectives, user needs, and the strategic application of the right tools.
                  </p>

                  <h2 className="heading-2 text-text-primary mt-4 mb-4">The Strategic Framework</h2>
                  <p className="body">
                    Every project we undertake follows a rigorous strategic framework that ensures alignment between technology decisions and business outcomes. This framework consists of five key phases:
                  </p>

                  <ol className="space-y-4 list-decimal list-inside pl-4">
                    <li className="body"><strong>Discovery & Alignment</strong> - Understanding the business context, success metrics, and stakeholder expectations.</li>
                    <li className="body"><strong>Architecture & Design</strong> - Creating technical architecture and user experience designs that serve the strategy.</li>
                    <li className="body"><strong>Development & Iteration</strong> - Building with modern practices, continuous integration, and regular feedback loops.</li>
                    <li className="body"><strong>Testing & Validation</strong> - Comprehensive quality assurance across devices, browsers, and user scenarios.</li>
                    <li className="body"><strong>Launch & Optimization</strong> - Production deployment with monitoring, analytics, and continuous improvement.</li>
                  </ol>

                  <h2 className="heading-2 text-text-primary mt-8 mb-4">Technology Choices That Matter</h2>
                  <p className="body">
                    The technology stack you choose has long-term implications for maintainability, scalability, and team productivity. We advocate for boring technology choices — proven, well-supported tools that solve real problems.
                  </p>
                  <p className="body">
                    Our standard stack includes React and Next.js for frontend, TypeScript for type safety, PostgreSQL for data, and cloud-native deployment on Vercel or AWS. These choices aren't arbitrary — they're based on years of production experience and community support.
                  </p>

                  <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-text-secondary">
                    "The best technology decision is the one that lets your team focus on business logic, not infrastructure complexity."
                  </blockquote>

                  <h2 className="heading-2 text-text-primary mt-8 mb-4">Measuring What Matters</h2>
                  <p className="body">
                    Success metrics should be defined before a single line of code is written. We work with clients to establish clear KPIs: conversion rates, user engagement, performance benchmarks, and business outcomes.
                  </p>
                  <p className="body">
                    Post-launch, we implement comprehensive analytics and monitoring to track these metrics in real-time, enabling data-driven iteration and continuous improvement.
                  </p>

                  <h2 className="heading-2 text-text-primary mt-8 mb-4">Looking Ahead</h2>
                  <p className="body">
                    The pace of technological change isn't slowing down. Organizations that thrive will be those that build adaptable systems, invest in their teams' capabilities, and maintain a relentless focus on user value.
                  </p>
                  <p className="body">
                    We're committed to being a partner in that journey — not just a vendor. If you're thinking about your next digital initiative, we'd love to explore how we can help.
                  </p>
                </div>

                <Separator className="my-12" />

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="sticky top-24 space-y-8"
              >
                <Card variant="elevated" padding="lg">
                  <CardHeader className="mb-6">
                    <CardTitle className="text-text-primary">Author</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="heading-4 text-text-primary">{post.author}</p>
                      <p className="caption text-gold">Team</p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" padding="lg">
                  <CardHeader className="mb-6">
                    <CardTitle className="text-text-primary">Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {blogPosts
                      .filter(p => p.category === post.category && p.slug !== post.slug)
                      .slice(0, 3)
                      .map((related) => (
                        <Link key={related.slug} href={`/blog/${related.slug}`} className="block group">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded-lg bg-gold/10 border border-gold/30 flex-shrink-0 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-normal">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="body-sm text-text-primary group-hover:text-gold transition-colors duration-fast line-clamp-2">{related.title}</p>
                              <p className="caption text-text-muted">{related.readTime} read</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </CardContent>
                </Card>

                <Card variant="elevated" padding="lg">
                  <CardHeader className="mb-6">
                    <CardTitle className="text-text-primary">Stay Updated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="body text-text-secondary mb-4">
                      Get our latest insights delivered to your inbox. No spam, just quality content.
                    </p>
                    <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="input"
                        aria-label="Email address"
                      />
                      <Button variant="primary" size="sm" fullWidth type="submit">
                        Subscribe
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </aside>
          </div>
        </div>

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
                Have a Project
                <br />
                <span className="text-gradient-gold">In Mind?</span>
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
      </article>
    </>
  );
}