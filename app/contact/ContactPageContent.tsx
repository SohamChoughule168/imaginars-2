'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { services } from '@/lib/data';
import { siteConfig } from '@/lib/data';
import { cn, validateEmail, validatePhone } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().refine(val => !val || validatePhone(val), 'Please enter a valid phone number'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPageContent() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormState('success');
      reset();
    } catch (error) {
      setFormState('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

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
              Let's Talk
            </span>
            <h1 className="heading-display text-hero-desktop md:text-hero-tablet lg:text-hero-desktop font-medium tracking-tight text-text-primary mb-8">
              Start Your
              <br />
              <span className="text-gradient-gold">Project Today</span>
            </h1>
            <p className="body-lg text-text-secondary">
              Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,163,78,0.04)_0%,transparent_70%)]" aria-hidden="true" />

        <div className="relative container mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="elevated" padding="lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      error={errors.name?.message}
                      {...register('name')}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@company.com"
                      error={errors.email?.message}
                      {...register('email')}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      placeholder="+91 93728 09022"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Input
                      label="Company"
                      placeholder="Acme Inc."
                      {...register('company')}
                    />
                  </div>

                  <Select
                    label="Service of Interest"
                    placeholder="Select a service"
                    options={[
                      { value: '', label: 'Select a service' },
                      ...services.map(s => ({ value: s.id, label: s.name })),
                    ]}
                    error={errors.service?.message}
                    {...register('service')}
                  />

                  <Textarea
                    label="Project Details"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    rows={6}
                    error={errors.message?.message}
                    {...register('message')}
                    required
                  />

                  {formState === 'error' && (
                    <motion.div
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                      <motion.div
                        key="success"
                        className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3" aria-hidden="true">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <p className="body">Thank you! Your message has been sent. We'll get back to you within 24 hours.</p>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit"
                        type="submit"
                        disabled={formState === 'submitting'}
                        className={cn(
                          'w-full md:w-auto',
                          formState === 'submitting' && 'opacity-70 cursor-wait'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="primary" size="lg" magnetic fullWidth={false} loading={formState === 'submitting'}>
                          {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card variant="elevated" padding="lg" className="sticky top-24 mb-8">
                <CardHeader className="mb-6">
                  <CardTitle className="text-text-primary">Direct Contact</CardTitle>
                  <CardDescription>Prefer to reach out directly?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <a href={`tel:${siteConfig.phone}`} className="link flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-normal flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="caption text-text-muted">Call Us</p>
                      <p className="body text-text-primary">{siteConfig.phoneFormatted}</p>
                    </div>
                  </a>

                  <a href={`mailto:${siteConfig.email}`} className="link flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-normal flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <p className="caption text-text-muted">Email Us</p>
                      <p className="body text-text-primary">{siteConfig.email}</p>
                    </div>
                  </a>

                  <address className="not-italic link flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-normal flex-shrink-0 mt-0.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <p className="caption text-text-muted">Visit Us</p>
                      <p className="body text-text-primary">{siteConfig.address}</p>
                    </div>
                  </address>
                </CardContent>
              </Card>

              <Card variant="elevated" padding="lg" className="sticky top-24">
                <CardHeader className="mb-6">
                  <CardTitle className="text-text-primary">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM IST' },
                    { day: 'Saturday', hours: '10:00 AM – 2:00 PM IST' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between text-text-secondary">
                      <span className="body-sm">{item.day}</span>
                      <span className="body-sm text-text-primary">{item.hours}</span>
                    </div>
                  ))}
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
              Frequently Asked
              <br />
              <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="body-lg text-text-secondary mb-10">
              Quick answers to common questions. Can't find what you're looking for? <a href="/contact" className="link text-gold">Contact us directly</a>.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto text-left">
            {[
              { q: 'What is your typical project timeline?', a: 'Timelines vary by project scope. A typical web application takes 8-16 weeks, mobile apps 12-24 weeks, and brand identity projects 6-12 weeks. We provide detailed timelines during the discovery phase.' },
              { q: 'Do you work with startups and enterprises?', a: 'Yes, we work with organizations of all sizes — from early-stage startups to large enterprises. Our processes scale to match your needs and budget.' },
              { q: 'What is your pricing model?', a: 'We offer both fixed-price and time-and-materials engagements. For well-defined projects, we prefer fixed-price. For exploratory or evolving projects, time-and-materials works better.' },
              { q: 'Do you provide ongoing support?', a: 'Yes, we offer maintenance and support retainers for all our projects. This includes monitoring, updates, security patches, and feature enhancements.' },
              { q: 'Can you work with our existing team?', a: 'Absolutely. We frequently augment client teams or collaborate with in-house developers, designers, and product managers. We adapt to your workflows and tools.' },
              { q: 'What technologies do you specialize in?', a: 'Our core stack includes React, Next.js, TypeScript, React Native, Flutter, Python, Node.js, PostgreSQL, and cloud platforms (AWS, Vercel, GCP). We choose the right tool for each job.' },
            ].map((faq, index) => (
              <motion.details
                key={index}
                className="card-hover mb-4 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="heading-4 text-text-primary group-hover:text-gold transition-colors duration-fast">{faq.q}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold transition-transform duration-fast group-open:rotate-180" aria-hidden="true">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-text-secondary">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}