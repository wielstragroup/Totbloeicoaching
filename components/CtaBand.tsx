import Link from 'next/link';
import { contact } from '@/lib/content';
import { getPage, getSettings } from '@/lib/db';
import { Botanic } from './icons';

export default async function CtaBand() {
  const [pagina, settings] = await Promise.all([
    getPage<typeof contact.content>('/contact'),
    getSettings(),
  ]);
  const c = pagina.content;
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="cta-band reveal">
          <Botanic variant="one" />
          <Botanic variant="two" />
          <h2>{c.ctaTitel}</h2>
          <p style={{ marginTop: '1.3rem' }}>{c.ctaTekst}</p>
          <div className="cta-actions">
            <Link className="btn btn-cream" href="/contact">
              {c.ctaLabel}
            </Link>
            <p className="cta-note">
              Of <a href={`mailto:${settings.email}`}>stuur gerust een bericht</a> als je eerst iets
              wilt vragen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
