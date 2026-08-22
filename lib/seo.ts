import type { Metadata } from 'next';
import type { Seo } from './content';

/** Zet de SEO-velden uit de database om in Next-metadata. */
export function metaVoor(seo: Seo, pad: string): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical || pad },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: pad,
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

/** Basis-URL van de site. In Vercel via NEXT_PUBLIC_SITE_URL in te stellen. */
export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://totbloeicoaching.nl').replace(/\/$/, '');
}
