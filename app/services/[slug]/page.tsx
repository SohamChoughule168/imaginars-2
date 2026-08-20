import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { ServiceDetailContent } from './ServiceDetailContent';
import { services } from '@/lib/data';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: `${service.name} | ImaginarsClubServices`,
      description: service.description,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <MainLayout>
      <ServiceDetailContent service={service} />
    </MainLayout>
  );
}