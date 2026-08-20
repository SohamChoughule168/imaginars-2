'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { cn, formatPhone } from '@/lib/utils';

export function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const featuredPost = blogPosts.find(p => p.featured);
  const otherPosts = blogPosts.filter(p => !p.featured);

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
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full caption font-medium text-gold uppercase tracking-wider mb-6">
              Insights & Thinking
            </span>
            <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
              Ideas That
              <br />
              <span className="text-gradient-gold">Move Us Forward</span>
            </h1>
            <p className="body-lg text-text-secondary">
              Deep dives into technology, design, and strategy. Written by the practitioners who build these solutions every day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 md:mb-24"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block" aria-label={`Read ${featuredPost.title}`}>
                <Card variant="hover" padding="none" className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {featuredPost.image ? (
                        <img
                          src={featuredPost.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 ease-expo hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gold/10 via-transparent to-transparent flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold/50" aria-hidden="true">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="gold" size="sm">Featured</Badge>
                        <Badge variant="outline" size="sm">{featuredPost.category}</Badge>
                      </div>
                      <h2 className="heading-1 mb-4 text-text-primary hover:text-gold transition-colors duration-fast">
                        {featuredPost.title}
                      </h2>
                      <p className="body text-text-secondary mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-text-muted">
                          <span className="caption">{featuredPost.readTime} read</span>
                          <span className="caption">{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gold font-medium group-hover:gap-4 transition-all duration-fast">
                          <span>Read Article</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.article>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-12 md:mb-16" role="tablist" aria-label="Blog categories">
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
                {category === 'all' ? 'All Articles' : category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              id={`panel-${activeCategory}`}
              role="tabpanel"
              aria-label={`${activeCategory === 'all' ? 'All' : activeCategory} articles`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredPosts.filter(p => p.slug !== featuredPost?.slug).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}`} className="block" aria-label={`Read ${post.title}`}>
                    <Card variant="hover" padding="none" className="overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 ease-expo hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gold/10 via-transparent to-transparent flex items-center justify-center">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold/50" aria-hidden="true">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <CardContent className="flex-1 p-6 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" size="sm">{post.category}</Badge>
                        </div>
                        <CardTitle className="text-text-primary mb-3 hover:text-gold transition-colors duration-fast line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                        <CardFooter className="pt-0 border-t border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-text-muted">
                              <span className="caption">{post.readTime} read</span>
                              <span className="caption">{post.author}</span>
                            </div>
                            <span className="text-gold font-medium text-sm">Read More</span>
                          </div>
                        </CardFooter>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="body text-text-secondary mb-6">No articles found in this category.</p>
              <Button variant="ghost" onClick={() => setActiveCategory('all')}>
                View All Articles
              </Button>
            </motion.div>
          )}

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button variant="primary" size="lg" magnetic asChild>
              <Link href="/blog">View All Articles</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}