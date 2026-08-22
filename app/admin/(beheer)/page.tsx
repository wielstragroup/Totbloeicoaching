import Link from 'next/link';
import { paginaSchemas } from '@/lib/fields';
import { adminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const segment = (slug: string) => (slug === '/' ? 'home' : slug.replace(/^\//, ''));

export default async function Dashboard() {
  const db = adminClient();
  const [{ count: aantalFaqs }, { count: aantalDiensten }, { count: nieuweBerichten }] =
    await Promise.all([
      db.from('faqs').select('id', { count: 'exact', head: true }),
      db.from('services').select('slug', { count: 'exact', head: true }),
      db
        .from('contact_messages')
        .select('id', { count: 'exact', head: true })
        .eq('afgehandeld', false),
    ]);

  return (
    <>
      <div className="adm-head">
        <h1>Beheer</h1>
        <p>Pas hier de teksten van de website aan. Na opslaan is de site direct bijgewerkt.</p>
      </div>

      <div className="adm-let-op">
        <strong>Let op:</strong> de tarieven, gespreksduur en locatie zijn nog conceptteksten uit de
        eerste opzet. Loop ze langs bij <em>Aanbod</em> en <em>FAQ</em> voordat de site live gaat.
      </div>

      <section className="adm-card">
        <h2>Berichten</h2>
        <div className="adm-tiles">
          <Link className="adm-tile" href="/admin/berichten">
            <strong>{nieuweBerichten ?? 0} nieuw</strong>
            <span>Via het contactformulier</span>
          </Link>
        </div>
      </section>

      <section className="adm-card">
        <h2>Pagina&apos;s</h2>
        <div className="adm-tiles">
          {paginaSchemas.map((p) => (
            <Link className="adm-tile" href={`/admin/paginas/${segment(p.slug)}`} key={p.slug}>
              <strong>{p.naam}</strong>
              <span>{p.url}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="adm-card">
        <h2>Overige inhoud</h2>
        <div className="adm-tiles">
          <Link className="adm-tile" href="/admin/aanbod">
            <strong>Aanbod</strong>
            <span>{aantalDiensten ?? 0} diensten</span>
          </Link>
          <Link className="adm-tile" href="/admin/faq">
            <strong>FAQ</strong>
            <span>{aantalFaqs ?? 0} vragen</span>
          </Link>
          <Link className="adm-tile" href="/admin/media">
            <strong>Foto&apos;s</strong>
            <span>Uploaden en beheren</span>
          </Link>
          <Link className="adm-tile" href="/admin/instellingen">
            <strong>Contactgegevens</strong>
            <span>E-mail, Instagram, KvK</span>
          </Link>
        </div>
      </section>
    </>
  );
}
