import Link from 'next/link';
import { adminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AanbodOverzicht() {
  const { data } = await adminClient()
    .from('services')
    .select('slug, titel, tag, prijs, gepubliceerd, volgorde')
    .order('volgorde');

  return (
    <>
      <div className="adm-head">
        <h1>Aanbod</h1>
        <p>Kies een dienst om de tekst, prijs, duur en afbeelding aan te passen.</p>
      </div>

      <div className="adm-let-op">
        De prijzen en gespreksduur zijn nog conceptwaarden uit de eerste opzet — controleer ze
        voordat de site live gaat.
      </div>

      <div className="adm-tiles">
        {(data ?? []).map((s) => (
          <Link className="adm-tile" href={`/admin/aanbod/${s.slug}`} key={s.slug}>
            <strong>{s.titel}</strong>
            <span>
              {s.prijs || 'geen prijs'} · {s.gepubliceerd ? 'zichtbaar' : 'verborgen'}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
