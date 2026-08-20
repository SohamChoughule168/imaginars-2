import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { PortfolioDetailContent } from './PortfolioDetailContent';
import { portfolioProjects } from '@/lib/data';

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find(p => p.slug === slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ImaginarsClubServices`,
      description: project.description,
      type: 'website',
      images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: project.title }] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <MainLayout>
      <PortfolioDetailContent project={project} />
    </MainLayout>
  );
}