import Link from 'next/link';
import Crumbs from '@/components/Crumbs';

export const metadata = {
  title: 'Privacyverklaring | Tot Bloei',
  robots: { index: false, follow: false }, // concept — noindex tot de tekst definitief is
};

export default function Privacy() {
  return (
    <section className="section page-head" style={{ paddingBottom: 'var(--section)' }}>
      <div className="wrap">
        <Crumbs items={[{ label: 'Privacyverklaring' }]} />
        <h1>Privacyverklaring</h1>

        <div className="prose lede" style={{ marginTop: '1.8rem' }}>
          <p>
            <strong>Deze pagina is nog een concept</strong> en staat daarom op{' '}
            <code>noindex</code>. De definitieve tekst moet nog worden opgesteld en juridisch
            gecontroleerd.
          </p>

          <p>
            Wat hieronder staat is geen juridische verklaring, maar een feitelijke beschrijving van
            wat de website technisch doet — bedoeld als vertrekpunt voor die tekst.
          </p>

          <ul>
            <li>
              Vul je het contactformulier in, dan worden je naam, e-mailadres en bericht opgeslagen
              in de database van deze website en doorgestuurd naar het e-mailadres van de praktijk.
            </li>
            <li>
              Er worden geen IP-adressen, browsergegevens of andere kenmerken bij dat bericht
              bewaard.
            </li>
            <li>De website gebruikt geen cookies voor advertenties of tracking.</li>
            <li>De lettertypen worden vanaf de eigen server geladen, niet vanaf Google.</li>
          </ul>

          <p>
            Vragen hierover? Neem gerust <Link href="/contact">contact op</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
