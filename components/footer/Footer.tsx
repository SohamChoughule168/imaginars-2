'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig, navigation, services } from '@/lib/data';
import { cn } from '@/lib/utils';

const footerLinks = {
  quick: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
  })),
};

const socialIcons = {
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  dribbble: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75C12.9 3.67 16.63 7.08 19.73 11.76"/>
    </svg>
  ),
  behance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9zm-9 7c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm3-11h-2.5c0-1.5.7-2.5 2-2.5s2 1 2 2.5H15z"/>
    </svg>
  ),
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill="#C9A34E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="flex items-center gap-2 text-text-primary font-display font-medium text-3xl md:text-4xl mb-6 block">
              <span className="text-gold">Imaginars</span>
              <span>ClubServices</span>
            </Link>
            <p className="body text-text-secondary mb-8 max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-6">
              {Object.entries(siteConfig.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-gold transition-colors duration-fast"
                  aria-label={key}
                >
                  {socialIcons[key as keyof typeof socialIcons]}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.nav
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            aria-label="Quick links"
          >
            <h3 className="heading-4 mb-6">Quick Links</h3>
            <ul className="space-y-4" role="list">
              {footerLinks.quick.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link text-body text-text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            aria-label="Services"
          >
            <h3 className="heading-4 mb-6">Services</h3>
            <ul className="space-y-4" role="list">
              {footerLinks.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link text-body text-text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <h3 className="heading-4 mb-6">Contact</h3>
            <address className="not-italic space-y-4 text-text-secondary">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href={`tel:${siteConfig.phone}`} className="link">{siteConfig.phoneFormatted}</a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href={`mailto:${siteConfig.email}`} className="link">{siteConfig.email}</a>
              </div>
            </address>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="body-sm text-text-muted">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="link text-body-sm text-text-muted">Privacy Policy</Link>
              <Link href="/terms" className="link text-body-sm text-text-muted">Terms of Service</Link>
              <Link href="/cookies" className="link text-body-sm text-text-muted">Cookie Policy</Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-8 text-gold font-display font-medium text-2xl md:text-3xl opacity-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          aria-hidden="true"
        >
          ImaginarsClubServices
        </motion.div>
      </div>
    </footer>
  );
}