// Structured Data (JSON-LD) for SEO - Person Schema
'use client';

import { siteConfig } from '@/app/lib/metadata';

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "S.M. Obaydur Rahman",
    "alternateName": "Shimanto Rehman",
    "url": siteConfig.url,
    "image": `${siteConfig.url}/images/profile.webp`,
    "sameAs": [
      "https://github.com/shimanto-rehman",
      "https://www.linkedin.com/in/shimanto-rehman/",
      "https://twitter.com/shimanto_rehman",
      "https://www.facebook.com/s.m.shimanto.rehman/",
      "https://www.instagram.com/shimanto_rehman/",
      "https://open.spotify.com/user/349lvs5diwiulbqihpt61x1vg"
    ],
    "jobTitle": "Full-Stack Software Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Mutual Trust Bank PLC",
      "department": "Satellite & Digital Ecosystem Development Unit"
    },
    "email": "shimanto.rehman.bd@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Shahjalal University of Science and Technology (SUST)",
        "sameAs": "https://www.sust.edu/"
      }
    ],
    "knowsAbout": [
      "Software Development",
      "Full-Stack Development",
      "Database Administration",
      "Data Science",
      "System Architecture",
      "Next.js",
      "React",
      "PHP",
      "Laravel",
      "Python",
      "Oracle Database",
      "Machine Learning"
    ],
    "description": siteConfig.description
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "author": {
      "@type": "Person",
      "name": "S.M. Obaydur Rahman",
      "alternateName": "Shimanto Rehman"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/pages/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const professionalProfileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "S.M. Obaydur Rahman",
      "alternateName": "Shimanto Rehman",
      "jobTitle": "Full-Stack Software Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Mutual Trust Bank PLC"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalProfileSchema) }}
      />
    </>
  );
}

