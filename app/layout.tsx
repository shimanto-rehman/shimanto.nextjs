import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import ClientLayoutWrapper from './components/ClientLayoutWrapper';
import { defaultMetadata, siteConfig } from './lib/metadata';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false, // Disabled to prevent unused preload warnings (fonts load when CSS variables are used)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false, // Disabled to reduce unused preload warnings (mono font is less critical)
});

export const metadata: Metadata = {
  ...defaultMetadata,
  // Add any additional metadata here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
