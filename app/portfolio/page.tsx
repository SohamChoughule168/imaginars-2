import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { PortfolioPageContent } from './PortfolioPageContent';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our selected work across web development, mobile apps, AI solutions, digital marketing, video editing, and brand management.',
  openGraph: {
    title: 'Portfolio | ImaginarsClubServices',
    description: 'Explore our selected work across six disciplines.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <MainLayout>
      <PortfolioPageContent />
    </MainLayout>
  );
}