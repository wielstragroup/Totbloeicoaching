import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getService, getServices } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import { markdownNaarHtml } from '@/lib/markdown';
import { OfferMark, Photo } from '@/components/icons';
import Crumbs from '@/components/Crumbs';
import CtaBand from '@/components/CtaBand';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = false;
/** Onbekende slugs geven een 404 in plaats van een lege pagina. */
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return metaVoor(service.seo, `/aanbod/${service.slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, alle] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();

  const anderen = alle.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ href: '/aanbod', label: 'Aanbod' }, { label: service.titel }]} />
          <div className="reveal">
            <p className="eyebrow">{service.tag}</p>
            <h1>{service.titel}</h1>
            <p className="lede measure" style={{ marginTop: '1.5rem' }}>
              {service.kort}
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(24px,3vw,44px)' }}>
        <div className="wrap detail">
          <div className="reveal">
            <div
              className="prose lede"
              dangerouslySetInnerHTML={{
                __html: markdownNaarHtml(service.langMarkdown ?? service.lang.join('\n\n')),
              }}
            />
            <div style={{ maxWidth: 460, marginTop: 'clamp(28px,3.4vw,44px)' }}>
              <Photo variant={service.afbeelding} label={`Sfeerbeeld bij ${service.titel}`} />
            </div>
          </div>

          <aside className="detail-aside reveal" style={{ '--d': '.1s' } as React.CSSProperties}>
            <dl className="facts">
              {service.prijs && (
                <div>
                  <dt>Prijs</dt>
                  <dd>{service.prijs}</dd>
                </div>
              )}
              {service.duur && (
                <div>
                  <dt>Duur</dt>
                  <dd>{service.duur}</dd>
                </div>
              )}
              {service.voorWie && (
                <div>
                  <dt>Voor wie</dt>
                  <dd>{service.voorWie}</dd>
                </div>
              )}
            </dl>
            <Link className="btn" href="/contact">
              {service.ctaLabel}
            </Link>
            <p className="form-note">
              Twijfel je of dit past? Tijdens de gratis kennismaking van 20 minuten kijken we daar
              samen naar.
            </p>
          </aside>
        </div>

        <div className="wrap">
          <div className="siblings">
            {anderen.map((s) => (
              <article className="offer reveal" key={s.slug}>
                <OfferMark slug={s.slug} />
                <span className="offer-tag">{s.tag}</span>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '.6rem' }}>{s.titel}</h2>
                <p>{s.kort}</p>
                <Link className="link-arrow" href={`/aanbod/${s.slug}`}>
                  Lees meer <span aria-hidden="true">→</span>
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
