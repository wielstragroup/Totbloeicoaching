import type { MetadataRoute } from 'next';
import { getServices } from '@/lib/db';
import { siteUrl } from '@/lib/seo';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();

  const paden = [
    '/',
    '/over-mij',
    '/werkwijze',
    '/voor-wie',
    '/aanbod',
    ...services.map((s) => `/aanbod/${s.slug}`),
    '/praktische-info',
    '/contact',
  ];

  return paden.map((pad) => ({
    url: `${siteUrl()}${pad}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: pad === '/' ? 1 : 0.7,
  }));
}
