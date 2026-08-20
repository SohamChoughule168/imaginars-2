import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { ServicesPageContent } from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our six core service offerings: Web Development, Mobile Apps, AI Solutions, Digital Marketing, Video Editing, and Brand Management.',
  openGraph: {
    title: 'Services | ImaginarsClubServices',
    description: 'Explore our six core service offerings.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <MainLayout>
      <ServicesPageContent />
    </MainLayout>
  );
}