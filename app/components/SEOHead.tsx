// SEO Head Component with comprehensive metadata
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { siteConfig, getPageMetadata } from '@/app/lib/metadata';

export default function SEOHead({ 
  title,
  description,
  keywords,
  image,
  path
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
}) {
  const pathname = usePathname();
  const currentPath = path || pathname;
  
  // Get page-specific metadata
  const pageName = currentPath.split('/').filter(Boolean).pop() || 'home';
  const pageMetadata = getPageMetadata(pageName, {
    title,
    description,
    keywords,
    image,
    path: currentPath
  });

  const fullTitle = title ? `${title} | ${siteConfig.name}` : pageMetadata.title;
  const metaDescription = description || pageMetadata.description;
  const metaKeywords = keywords || pageMetadata.keywords;
  const metaImage = image || `${siteConfig.url}${siteConfig.openGraph.images[0].url}`;
  const canonicalUrl = `${siteConfig.url}${currentPath}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update meta tags
    updateMetaTag('title', fullTitle);
    updateMetaTag('description', metaDescription);
    updateMetaTag('keywords', metaKeywords.join(', '));
    updateMetaTag('author', siteConfig.author.name);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Open Graph
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', metaDescription, true);
    updateMetaTag('og:image', metaImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', siteConfig.openGraph.siteName, true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', metaImage);
    updateMetaTag('twitter:creator', siteConfig.twitter.creator);
    updateMetaTag('twitter:site', siteConfig.twitter.site);
  }, [fullTitle, metaDescription, metaKeywords, metaImage, canonicalUrl]);

  return null;
}

