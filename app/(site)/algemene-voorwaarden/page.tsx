import Crumbs from '@/components/Crumbs';

export const metadata = {
  title: 'Algemene voorwaarden | Tot Bloei',
  robots: { index: false, follow: false }, // concept — noindex tot de tekst definitief is
};

export default function Page() {
  return (
    <section className="section page-head" style={{ paddingBottom: 'var(--section)' }}>
      <div className="wrap">
        <Crumbs items={[{ label: 'Algemene voorwaarden' }]} />
        <h1>Algemene voorwaarden</h1>
        <div className="prose lede" style={{ marginTop: '1.8rem' }}>
          <p>
            Deze pagina is nog een concept en staat daarom op <code>noindex</code>. De definitieve
            tekst komt straks uit de beheeromgeving.
          </p>
        </div>
      </div>
    </section>
  );
}
