import { siteConfig } from '@/lib/data';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

export function generateSEO(props: SEOProps = {}) {
  const title = props.title ? `${props.title} | ${siteConfig.name}` : siteConfig.name;
  const description = props.description || siteConfig.description;
  const image = props.image || siteConfig.ogImage;
  const url = props.url || siteConfig.url;
  const type = props.type || 'website';

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: 'en_IN',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime: props.publishedTime,
        modifiedTime: props.modifiedTime,
        authors: props.authors,
        section: props.section,
        tags: props.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@imaginarsclub',
    },
    robots: {
      index: !props.noIndex,
      follow: !props.noFollow,
      googleBot: {
        index: !props.noIndex,
        follow: !props.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400042',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.1176,
      longitude: 72.906,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$$',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Credit Card, Bank Transfer, UPI',
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: service.provider,
    },
    serviceType: service.name,
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: service.url,
    },
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  publisherName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}