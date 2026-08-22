import type { Metadata } from 'next';
import Link from 'next/link';
import { aanbodPagina } from '@/lib/content';
import { getPage, getServices } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import { OfferMark } from '@/components/icons';
import Crumbs from '@/components/Crumbs';
import CtaBand from '@/components/CtaBand';

type Content = typeof aanbodPagina.content;
const PAD = '/aanbod';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metaVoor((await getPage<Content>(PAD)).seo, PAD);
}

export default async function AanbodPage() {
  const [pagina, services] = await Promise.all([getPage<Content>(PAD), getServices()]);
  const c = pagina.content;

  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ label: 'Aanbod' }]} />
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
          <div className="cards cards-2">
            {services.map((s, i) => (
              <article
                className="offer reveal"
                key={s.slug}
                style={{ '--d': `${(i % 2) * 0.07}s` } as React.CSSProperties}
              >
                <OfferMark slug={s.slug} />
                <span className="offer-tag">{s.tag}</span>
                <h2 style={{ fontSize: 'clamp(1.35rem,1.9vw,1.65rem)', marginBottom: '.7rem' }}>
                  {s.titel}
                </h2>
                <p>{s.kort}</p>
                <Link className="link-arrow" href={`/aanbod/${s.slug}`}>
                  Meer over {s.titel.toLowerCase()} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
