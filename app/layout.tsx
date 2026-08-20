import type { Metadata, Viewport } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-clash',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'ImaginarsClubServices | Transform Your Digital Vision',
    template: '%s | ImaginarsClubServices',
  },
  description: 'A leading technology and digital transformation company specializing in web development, mobile apps, AI solutions, digital marketing, video editing, and brand management.',
  keywords: ['web development', 'mobile apps', 'AI solutions', 'digital marketing', 'video editing', 'brand management', 'technology company', 'digital transformation'],
  authors: [{ name: 'ImaginarsClubServices' }],
  creator: 'ImaginarsClubServices',
  publisher: 'ImaginarsClubServices',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://www.imaginarsclubservices.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.imaginarsclubservices.com',
    siteName: 'ImaginarsClubServices',
    title: 'ImaginarsClubServices | Transform Your Digital Vision',
    description: 'A leading technology and digital transformation company specializing in web development, mobile apps, AI solutions, digital marketing, video editing, and brand management.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ImaginarsClubServices - Transform Your Digital Vision',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImaginarsClubServices | Transform Your Digital Vision',
    description: 'A leading technology and digital transformation company.',
    images: ['/images/og-image.jpg'],
    creator: '@imaginarsclub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon-16x16.png',
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0A0E14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-canvas text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}