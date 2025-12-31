import { MetadataRoute } from 'next';
import { siteConfig } from './lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Define all routes
  const routes = [
    '',
    '/pages/about',
    '/pages/blog',
    '/pages/publications',
    '/pages/projects',
    '/pages/repositories',
    '/pages/certifications',
    '/pages/resources',
    '/pages/people',
    '/pages/teaching',
    '/pages/gallery',
    '/pages/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}

