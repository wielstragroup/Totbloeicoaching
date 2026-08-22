import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { getSettings } from '@/lib/db';
import { siteUrl } from '@/lib/seo';

/** Structured data — de gegevens komen uit site_settings. */
function structuredData(settings: Awaited<ReturnType<typeof getSettings>>) {
  const basis = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${basis}/#business`,
    name: `${settings.naam} – ${settings.ondertitel}`,
    alternateName: settings.naam,
    url: `${basis}/`,
    description:
      'Tot Bloei biedt opvoedcoaching en kindercoaching in Friesland voor ouders en kinderen van 2 tot 12 jaar.',
    email: settings.email,
    image: `${basis}/og-tot-bloei.jpg`,
    founder: { '@type': 'Person', name: 'Marieke' },
    address: { '@type': 'PostalAddress', addressRegion: 'Friesland', addressCountry: 'NL' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Friesland' },
      { '@type': 'AdministrativeArea', name: 'Noordoost-Friesland' },
    ],
    sameAs: [settings.instagram],
    knowsAbout: ['opvoedcoaching', 'kindercoaching', 'opvoedondersteuning', 'oudercoaching'],
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 12 },
    priceRange: '€€',
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(settings)) }}
      />
      <a className="skip" href="#main">
        Naar de inhoud
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Reveal />
    </>
  );
}
