// components/SocialLinks.tsx
"use client";
import React from 'react';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export default function SocialLinks({ 
  links, 
  className = "glass-rectangle social-tab home-social-container" 
}: SocialLinksProps) {
  return (
    <div className={className}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <i className={`fab fa-${link.icon} social-icon`}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}