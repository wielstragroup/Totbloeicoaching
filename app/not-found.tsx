import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Pagina niet gevonden | Tot Bloei', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="section notfound">
          <div className="wrap">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              404
            </p>
            <h1>Deze pagina bestaat niet (meer)</h1>
            <p className="lede" style={{ maxWidth: '46ch', margin: '1.4rem auto 0' }}>
              Misschien is de link verouderd of is er een typefout geslopen in het adres.
            </p>
            <Link className="btn" href="/">
              Terug naar de homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
