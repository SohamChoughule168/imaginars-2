'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteConfig } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const MotionNav = motion.nav;

  return (
    <MotionNav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-normal ease-expo',
        isScrolled
          ? 'bg-canvas/80 backdrop-blur-md border-b border-border shadow-elevation-1'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-primary hover:text-gold transition-colors duration-fast font-display font-medium text-xl md:text-2xl z-10"
            aria-label={`${siteConfig.name} - Home`}
            onClick={closeMobileMenu}
          >
            <span className="text-gold">Imaginars</span>
            <span className="hidden md:inline">ClubServices</span>
            <span className="md:hidden">CS</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-body text-text-secondary hover:text-gold transition-colors duration-fast font-medium after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-gold after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-fast after:ease-expo"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="primary" size="sm" magnetic asChild>
              <Link href={navigation.cta.href}>{navigation.cta.label}</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-text-primary hover:text-gold transition-colors duration-fast z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 bg-canvas/95 backdrop-blur-md z-40 md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {navigation.main.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="text-heading-3 font-display font-medium text-text-primary hover:text-gold transition-colors duration-fast"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: navigation.main.length * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button variant="primary" size="lg" magnetic fullWidth asChild>
                  <Link href={navigation.cta.href} onClick={closeMobileMenu}>
                    {navigation.cta.label}
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className="pb-12 px-6 border-t border-border">
              <div className="flex items-center justify-center gap-6">
                {Object.entries(siteConfig.social).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-gold transition-colors duration-fast"
                    aria-label={key}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {key === 'linkedin' && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      )}
                      {key === 'twitter' && (
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      )}
                      {key === 'instagram' && (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </>
                      )}
                      {key === 'facebook' && (
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      )}
                      {key === 'dribbble' && (
                        <>
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/>
                          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/>
                          <path d="M8.56 2.75C12.9 3.67 16.63 7.08 19.73 11.76"/>
                        </>
                      )}
                      {key === 'behance' && (
                        <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9zm-9 7c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm3-11h-2.5c0-1.5.7-2.5 2-2.5s2 1 2 2.5H15z"/>
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionNav>
  );
}