import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { BlogPageContent } from './BlogPageContent';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on web development, AI, mobile apps, digital marketing, video production, and brand strategy from our team of experts.',
  openGraph: {
    title: 'Blog | ImaginarsClubServices',
    description: 'Insights on technology, design, and digital strategy.',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <MainLayout>
      <BlogPageContent />
    </MainLayout>
  );
}