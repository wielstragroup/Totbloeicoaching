import type { Metadata } from 'next';
import { voorWie } from '@/lib/content';
import { getPage } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import { PhotoBlobB, SmallBloom } from '@/components/icons';
import Crumbs from '@/components/Crumbs';
import CtaBand from '@/components/CtaBand';

type Content = typeof voorWie.content;
const PAD = '/voor-wie';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metaVoor((await getPage<Content>(PAD)).seo, PAD);
}

export default async function VoorWiePage() {
  const c = (await getPage<Content>(PAD)).content;

  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ label: 'Voor wie' }]} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div className="split-media reveal">
            <PhotoBlobB />
          </div>

          <div>
            <div className="reveal">
              <p className="eyebrow">{c.eyebrow}</p>
              <h1>{c.titel}</h1>
              <p className="lede measure" style={{ margin: '1.4rem 0 2.4rem' }}>
                {c.intro}
              </p>
            </div>

            <div className="theme-list">
              {c.themas.map((t, i) => (
                <article
                  className="card reveal"
                  key={t.titel}
                  style={{ '--d': `${(i % 2) * 0.06}s` } as React.CSSProperties}
                >
                  <h3>{t.titel}</h3>
                  <p>{t.tekst}</p>
                </article>
              ))}
            </div>

            <p className="note reveal">
              <SmallBloom />
              {c.notitie}
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
