import Link from 'next/link';
import { nav } from '@/lib/content';
import { getSettings } from '@/lib/db';
import { BrandMark } from './icons';

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/" style={{ marginRight: 0 }}>
              <BrandMark withBloom={false} />
              <span>
                <span className="brand-name">{settings.naam}</span>
                <span className="brand-sub">Opvoed- &amp; kindercoaching</span>
              </span>
            </Link>
            <p>{settings.footerTekst}</p>
          </div>

          <nav aria-label="Footernavigatie">
            <p className="footer-title">Navigatie</p>
            <ul className="footer-list">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer-title">Contact</p>
            <ul className="footer-list">
              <li>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
              <li>
                <a href={settings.instagram} rel="noopener">
                  Instagram · {settings.instagramHandle}
                </a>
              </li>
              <li>{settings.regio}</li>
              {settings.kvk && <li>KvK {settings.kvk}</li>}
            </ul>
          </div>
        </div>

<div className="footer-bottom">
  <p style={{ margin: 0 }}>
    © {new Date().getFullYear()} {settings.naam} · Website gemaakt door{' '}
    <a
      href="https://wielstragroup.nl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Wielstra Group
    </a>
  </p>

  <nav aria-label="Juridisch">
            <Link href="/privacy">Privacy</Link>
            <Link href="/algemene-voorwaarden">Algemene voorwaarden</Link>
            <Link href="/klachtenregeling">Klachtenregeling</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
