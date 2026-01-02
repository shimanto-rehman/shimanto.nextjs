// SEO Metadata Configuration
// Optimized for search rankings for "Shimanto Rehman" and "S.M. Obaydur Rahman"

export const siteConfig = {
  name: "Shimanto",
  title: "Shimanto Rehman - Full-Stack Software Developer & Data Science Enthusiast",
  description: "S.M. Obaydur Rahman (Shimanto Rehman) - Full-Stack Software Developer, Database Administrator, and Data Science Enthusiast. Currently working at Mutual Trust Bank PLC. Expert in Next.js, React, PHP, Laravel, Python, Oracle Database, and System Architecture.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shimanto.info",
  keywords: [
    "Shimanto Rehman",
    "S.M. Obaydur Rahman",
    "Full-Stack Developer",
    "Software Engineer",
    "Data Science",
    "Database Administrator",
    "Next.js Developer",
    "React Developer",
    "PHP Developer",
    "Laravel Developer",
    "Python Developer",
    "Oracle Database",
    "Mutual Trust Bank",
    "Dana Fintech",
    "V Shipping",
    "SUST",
    "Bangladesh Software Developer",
    "System Architecture",
    "Machine Learning Enthusiast",
    "Full-Stack Software Developer Bangladesh"
  ],
  author: {
    name: "S.M. Obaydur Rahman",
    alternateName: "Shimanto Rehman",
    email: "shimanto.rehman.bd@gmail.com",
    url: "https://shimanto.info",
    jobTitle: "Full-Stack Software Developer",
    worksFor: {
      name: "Mutual Trust Bank PLC",
      department: "Satellite & Digital Ecosystem Development Unit"
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shimanto Rehman Portfolio",
    images: [
      {
        url: "/images/profile.webp",
        width: 1200,
        height: 630,
        alt: "Shimanto Rehman - S.M. Obaydur Rahman"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shimanto_rehman",
    site: "@shimanto_rehman"
  }
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url
    }
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: siteConfig.openGraph.type,
    locale: siteConfig.openGraph.locale,
    url: siteConfig.url,
    siteName: siteConfig.openGraph.siteName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: siteConfig.openGraph.images,
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
    images: siteConfig.openGraph.images,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

// Page-specific metadata generators
export const getPageMetadata = (page: string, custom?: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
}) => {
  const path = custom?.path || `/pages/${page}`;
  const fullUrl = `${siteConfig.url}${path}`;
  
  const title = custom?.title || `${page.charAt(0).toUpperCase() + page.slice(1)} | ${siteConfig.name}`;
  const description = custom?.description || `${siteConfig.description} - Explore ${page} section.`;
  const keywords = custom?.keywords || [...siteConfig.keywords, page];
  const image = custom?.image || siteConfig.openGraph.images[0].url;

  return {
    title,
    description,
    keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: fullUrl,
      images: [{ ...siteConfig.openGraph.images[0], url: image }],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};

