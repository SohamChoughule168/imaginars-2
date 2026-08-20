import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with ImaginarsClubServices. We\'d love to hear about your project and explore how we can help.',
  openGraph: {
    title: 'Contact Us | ImaginarsClubServices',
    description: 'Get in touch with our team.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactPageContent />
    </MainLayout>
  );
}