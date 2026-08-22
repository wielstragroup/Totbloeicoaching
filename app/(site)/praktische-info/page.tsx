import type { Metadata } from 'next';
import { praktischePagina } from '@/lib/content';
import { getFaqs, getPage, getSettings } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import Faq from '@/components/Faq';
import Crumbs from '@/components/Crumbs';
import CtaBand from '@/components/CtaBand';

type Content = typeof praktischePagina.content;
const PAD = '/praktische-info';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metaVoor((await getPage<Content>(PAD)).seo, PAD);
}

export default async function PraktischeInfoPage() {
  const [pagina, faqs, settings] = await Promise.all([getPage<Content>(PAD), getFaqs(), getSettings()]);
  const c = pagina.content;

  /* FAQ-schema: geeft kans op uitgeklapte vragen in Google. */
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.vraag,
      acceptedAnswer: { '@type': 'Answer', text: f.antwoord },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ label: 'Praktische info' }]} />
          <div className="reveal">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1>{c.titel}</h1>
            <p className="lede measure" style={{ marginTop: '1.5rem' }}>
              {c.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(24px,3vw,44px)' }}>
        <div className="wrap">
          <Faq items={faqs} />
          <p className="form-note reveal" style={{ margin: '2.4rem auto 0', textAlign: 'center' }}>
            Andere vraag? Mail gerust naar <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
