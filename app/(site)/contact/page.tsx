import type { Metadata } from 'next';
import { contact } from '@/lib/content';
import { getPage, getSettings } from '@/lib/db';
import { metaVoor } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';
import Crumbs from '@/components/Crumbs';

type Content = typeof contact.content;
const PAD = '/contact';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metaVoor((await getPage<Content>(PAD)).seo, PAD);
}

export default async function ContactPage() {
  const [pagina, settings] = await Promise.all([getPage<Content>(PAD), getSettings()]);
  const c = pagina.content;

  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <Crumbs items={[{ label: 'Contact' }]} />
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
        <div className="wrap contact-grid">
          <div className="reveal">
            <ContactForm email={settings.email} />
          </div>

          <div className="reveal" style={{ '--d': '.1s' } as React.CSSProperties}>
            <ul className="contact-list">
              <li>
                <span className="label">E-mail</span>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
              <li>
                <span className="label">Instagram</span>
                <a href={settings.instagram} rel="noopener">
                  {settings.instagramHandle}
                </a>
              </li>
              <li>
                <span className="label">Werkgebied</span>
                {settings.regio}
              </li>
              <li>
                <span className="label">Reactietijd</span>
                Binnen twee werkdagen
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
