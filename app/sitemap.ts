import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/data';
import { services } from '@/lib/data';
import { portfolioProjects } from '@/lib/data';
import { blogPosts } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const serviceRoutes = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const portfolioRoutes = portfolioProjects.map(project => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.year, 0, 1),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}