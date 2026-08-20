import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ImaginarsClubServices - our story, mission, values, and the team behind our digital transformation work.',
  openGraph: {
    title: 'About Us | ImaginarsClubServices',
    description: 'Learn about our story, mission, values, and team.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutContent />
    </MainLayout>
  );
}