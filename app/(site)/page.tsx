import type { Metadata } from 'next';
import Link from 'next/link';
import { home } from '@/lib/content';
import { getPage, getServices } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import { CardIcon, Heart, LeafFloat, PhotoArch, PhotoBlobA, Sprig, OfferMark } from '@/components/icons';
import CtaBand from '@/components/CtaBand';
import HashRedirect from '@/components/HashRedirect';

type Content = typeof home.content;

/* Statisch gerenderd; wordt vernieuwd zodra er in de admin iets wordt opgeslagen. */
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await getPage<Content>('/');
  return metaVoor(pagina.seo, '/');
}

export default async function HomePage() {
  const [pagina, services] = await Promise.all([getPage<Content>('/'), getServices()]);
  const c = pagina.content;

  return (
    <>
      {/* oude ankerlinks (#over-mij, #aanbod, …) naar de nieuwe pagina's */}
      <HashRedirect />

      {/* ---------------------------------------------------------- hero */}
      <section className="section hero">
        <div className="wrap hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1>
              {c.titelVoor}
              <span className="accent">{c.titelAccent}</span>
            </h1>
            <p className="hero-sub">{c.sub}</p>
            <p className="hero-text">{c.tekst}</p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                {c.ctaLabel}
              </Link>
              <Link className="link-arrow" href="/werkwijze">
                {c.ctaTweedeLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Sprig />
          </div>

          <div className="hero-media reveal" style={{ '--d': '.16s' } as React.CSSProperties}>
            <PhotoBlobA />
            <p className="hero-badge">
              <Heart className="heart" />
              {c.badge}
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- intro */}
      <section className="section">
        <div className="wrap intro-grid">
          <div className="reveal">
            <h2>{c.introTitel}</h2>
            <div className="lede measure" style={{ marginTop: '1.6rem' }}>
              {c.introTekst.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="intro-media reveal" style={{ '--d': '.12s' } as React.CSSProperties}>
            <LeafFloat style={{ top: -34, left: -26, width: 66 }} />
            <PhotoArch />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- waarden */}
      <section className="section">
        <div className="wrap">
          <div className="values-head reveal">
            <p className="eyebrow">{c.waardenEyebrow}</p>
            <h2>{c.waardenTitel}</h2>
          </div>

          <div className="cards cards-3">
            {c.waarden.map((w, i) => (
              <article
                className="card reveal"
                key={w.titel}
                style={{ '--d': `${(i % 3) * 0.06}s` } as React.CSSProperties}
              >
                <CardIcon name={w.icoon} />
                <h3>{w.titel}</h3>
                <p>{w.tekst}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- aanbod */}
      <section className="section">
        <div className="wrap">
          <div className="values-head reveal">
            <p className="eyebrow">Aanbod</p>
            <h2>Manieren waarop we samen kunnen werken</h2>
          </div>

          <div className="cards cards-2">
            {services.map((s, i) => (
              <article
                className="offer reveal"
                key={s.slug}
                style={{ '--d': `${(i % 2) * 0.07}s` } as React.CSSProperties}
              >
                <OfferMark slug={s.slug} />
                <span className="offer-tag">{s.tag}</span>
                <h3>{s.titel}</h3>
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
