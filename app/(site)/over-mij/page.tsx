import type { Metadata } from 'next';
import { overMij } from '@/lib/content';
import { getPage } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import { PhotoPortret } from '@/components/icons';
import Crumbs from '@/components/Crumbs';
import CtaBand from '@/components/CtaBand';

type Content = typeof overMij.content;
const PAD = '/over-mij';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metaVoor((await getPage<Content>(PAD)).seo, PAD);
}

export default async function OverMijPage() {
  const c = (await getPage<Content>(PAD)).content;

  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ label: 'Over mij' }]} />
          <div className="reveal">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1>{c.titel}</h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(30px,4vw,60px)' }}>
        <div className="wrap">
          <div className="about-grid">
            <div className="about-media reveal">
              <PhotoPortret />
            </div>

            <div className="reveal" style={{ '--d': '.1s' } as React.CSSProperties}>
              <div className="lede measure">
                {c.tekst.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <blockquote className="quote reveal">{c.quote}</blockquote>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
