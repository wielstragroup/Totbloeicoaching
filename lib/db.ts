/**
 * Datalaag
 * --------
 * De publieke pagina's lezen hier hun content op. Drie dingen om te weten:
 *
 * 1. Alles gaat door `unstable_cache` met een tag. Een pagina wordt dus één keer
 *    op de server gerenderd en daarna uit de cache geserveerd — bezoekers raken
 *    Supabase nooit aan. Na het opslaan in de admin roepen we `revalidateTag()`
 *    aan en is de pagina binnen seconden bijgewerkt.
 *
 * 2. Staat er geen Supabase ingesteld (bijvoorbeeld bij een eerste `npm run dev`
 *    zonder .env.local), dan valt alles terug op lib/content.ts. De site werkt
 *    dan gewoon, alleen niet beheerbaar.
 *
 * 3. Ontbreekt een rij in de database, dan geldt dezelfde terugval. Een lege
 *    tabel levert dus nooit een lege pagina op.
 */

import { unstable_cache } from 'next/cache';
import { publicClient, supabaseConfigured } from './supabase/server';
import * as lokaal from './content';
import type { Faq, Page, Service } from './content';

export const TAGS = {
  settings: 'settings',
  pages: 'pages',
  services: 'services',
  faqs: 'faqs',
} as const;

export type Settings = typeof lokaal.settings;

/* -------------------------------------------------------------- instellingen */

export const getSettings = unstable_cache(
  async (): Promise<Settings> => {
    if (!supabaseConfigured) return lokaal.settings;

    const { data } = await publicClient().from('site_settings').select('*').eq('id', 1).single();
    if (!data) return lokaal.settings;

    return {
      ...lokaal.settings,
      naam: data.naam ?? lokaal.settings.naam,
      ondertitel: data.ondertitel ?? lokaal.settings.ondertitel,
      email: data.email ?? lokaal.settings.email,
      instagram: data.instagram ?? lokaal.settings.instagram,
      instagramHandle: data.instagram_handle ?? lokaal.settings.instagramHandle,
      regio: data.regio ?? lokaal.settings.regio,
      kvk: data.kvk ?? '',
      footerTekst: data.footer_tekst ?? lokaal.settings.footerTekst,
    };
  },
  ['settings'],
  { tags: [TAGS.settings] }
);

/* ------------------------------------------------------------------ pagina's */

const paginaTerugval: Record<string, Page<Record<string, unknown>>> = {
  '/': lokaal.home as unknown as Page<Record<string, unknown>>,
  '/over-mij': lokaal.overMij as unknown as Page<Record<string, unknown>>,
  '/werkwijze': lokaal.werkwijze as unknown as Page<Record<string, unknown>>,
  '/voor-wie': lokaal.voorWie as unknown as Page<Record<string, unknown>>,
  '/aanbod': lokaal.aanbodPagina as unknown as Page<Record<string, unknown>>,
  '/praktische-info': lokaal.praktischePagina as unknown as Page<Record<string, unknown>>,
  '/contact': lokaal.contact as unknown as Page<Record<string, unknown>>,
};

const _getPage = unstable_cache(
  async (slug: string) => {
    if (!supabaseConfigured) return null;
    const { data } = await publicClient()
      .from('pages')
      .select('slug, seo_title, seo_description, canonical, og_image, content')
      .eq('slug', slug)
      .single();
    return data ?? null;
  },
  ['page'],
  { tags: [TAGS.pages] }
);

/**
 * Haalt één pagina op. Het type geef je mee vanuit de pagina zelf, zodat de
 * velden gecontroleerd blijven: `await getPage<typeof home.content>('/')`.
 */
export async function getPage<T>(slug: string): Promise<Page<T>> {
  const terugval = paginaTerugval[slug] as unknown as Page<T>;
  const rij = await _getPage(slug);
  if (!rij) return terugval;

  return {
    slug,
    seo: {
      title: rij.seo_title || terugval.seo.title,
      description: rij.seo_description || terugval.seo.description,
      canonical: rij.canonical || undefined,
      ogImage: rij.og_image || undefined,
    },
    // ontbrekende velden vallen terug op de lokale content
    content: { ...(terugval.content as object), ...(rij.content as object) } as T,
  };
}

/* ------------------------------------------------------------------ diensten */

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    if (!supabaseConfigured) return lokaal.services;

    const { data } = await publicClient()
      .from('services')
      .select('*')
      .eq('gepubliceerd', true)
      .order('volgorde');

    if (!data?.length) return lokaal.services;

    return data.map((r) => {
      const terugval = lokaal.services.find((s) => s.slug === r.slug);
      return {
        slug: r.slug,
        tag: r.tag ?? '',
        titel: r.titel,
        kort: r.korte_omschrijving ?? '',
        lang: splitsAlinea(r.lange_omschrijving) ?? terugval?.lang ?? [],
        langMarkdown: r.lange_omschrijving ?? terugval?.lang.join('\n\n') ?? '',
        prijs: r.prijs ?? '',
        duur: r.duur ?? '',
        voorWie: r.voor_wie ?? '',
        ctaLabel: r.cta_label || 'Plan een kennismaking',
        afbeelding: r.afbeelding ?? terugval?.afbeelding ?? 'arch',
        volgorde: r.volgorde,
        seo: {
          title: r.seo_title || terugval?.seo.title || `${r.titel} | Tot Bloei`,
          description: r.seo_description || terugval?.seo.description || (r.korte_omschrijving ?? ''),
        },
      };
    });
  },
  ['services'],
  { tags: [TAGS.services] }
);

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

/* ---------------------------------------------------------------------- FAQ */

export const getFaqs = unstable_cache(
  async (): Promise<Faq[]> => {
    if (!supabaseConfigured) return lokaal.faqs;

    const { data } = await publicClient()
      .from('faqs')
      .select('vraag, antwoord, volgorde')
      .eq('gepubliceerd', true)
      .order('volgorde');

    return data?.length ? data : lokaal.faqs;
  },
  ['faqs'],
  { tags: [TAGS.faqs] }
);

/* ------------------------------------------------------------------- hulpjes */

/** Eén tekstveld met witregels wordt een reeks alinea's. */
function splitsAlinea(tekst: string | null): string[] | null {
  if (!tekst?.trim()) return null;
  return tekst
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
