import type { Metadata } from 'next';
import { werkwijze } from '@/lib/content';
import { getPage } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import { InfoIcon } from '@/components/icons';
import Crumbs from '@/components/Crumbs';
import CtaBand from '@/components/CtaBand';

type Content = typeof werkwijze.content;
const PAD = '/werkwijze';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metaVoor((await getPage<Content>(PAD)).seo, PAD);
}

export default async function WerkwijzePage() {
  const c = (await getPage<Content>(PAD)).content;

  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ label: 'Werkwijze' }]} />
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
          <ol className="timeline" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {c.stappen.map((s, i) => (
              <li
                className="step reveal"
                key={s.nummer}
                style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}
              >
                <div className="step-dot" aria-hidden="true">
                  {s.nummer}
                </div>
                <h3>{s.titel}</h3>
                <p>{s.tekst}</p>
              </li>
            ))}
          </ol>

          <p className="timeline-foot reveal">{c.slot}</p>
        </div>
      </section>

      <section className="section" style={{ paddingBlock: 0 }}>
        <div className="wrap">
          <div className="limits reveal">
            <div className="limits-icon" aria-hidden="true">
              <InfoIcon />
            </div>
            <div>
              <h2>{c.grenzenTitel}</h2>
              {c.grenzenTekst.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
