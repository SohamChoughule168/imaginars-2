import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/hero/Hero';
import { Statistics } from '@/components/statistics/Statistics';
import { Services } from '@/components/services/Services';
import { WhyChooseUs } from '@/components/about/WhyChooseUs';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { Portfolio } from '@/components/portfolio/Portfolio';
import { FinalCTA } from '@/components/hero/FinalCTA';

export const metadata: Metadata = {
  title: 'Transform Your Digital Vision',
  description: 'A leading technology and digital transformation company specializing in web development, mobile apps, AI solutions, digital marketing, video editing, and brand management.',
  openGraph: {
    title: 'ImaginarsClubServices | Transform Your Digital Vision',
    description: 'A leading technology and digital transformation company.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Statistics />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Portfolio />
      <FinalCTA />
    </MainLayout>
  );
}