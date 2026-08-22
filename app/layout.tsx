import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import { siteUrl } from '@/lib/seo';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'opsz'],
  variable: '--font-fraunces',
});

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Opvoedcoaching & kindercoaching in Friesland | Tot Bloei', template: '%s' },
  openGraph: { type: 'website', locale: 'nl_NL', siteName: 'Tot Bloei – Opvoed- & kindercoaching' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%23FBF8F3'/%3E%3Cpath d='M16 25V12' stroke='%2356705A' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M16 17c-4 0-6-2-6-5 3 0 6 1.6 6 5Z' fill='%239BB19A'/%3E%3Cpath d='M16 14c0-3.2 2.2-5 5-5 0 3.2-2 5-5 5Z' fill='%23C9D6C4'/%3E%3C/svg%3E",
  },
};

export const viewport = { themeColor: '#FBF8F3' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`js ${fraunces.variable} ${figtree.variable}`}>
      <head>
        {/* zonder JavaScript blijven de reveal-blokken gewoon zichtbaar */}
        <noscript>
          <style>{'.reveal{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
