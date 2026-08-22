import { adminClient } from '@/lib/supabase/server';
import { berichtAfhandelen, berichtVerwijderen } from '../../actions';

export const dynamic = 'force-dynamic';

const datum = (iso: string) =>
  new Date(iso).toLocaleString('nl-NL', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

export default async function Berichten() {
  const { data } = await adminClient()
    .from('contact_messages')
    .select('id, naam, email, bericht, afgehandeld, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  const berichten = data ?? [];

  return (
    <>
      <div className="adm-head">
        <h1>Berichten</h1>
        <p>Alles wat via het contactformulier binnenkomt. Je krijgt hiervan ook een e-mail.</p>
      </div>

      {!berichten.length && <p className="adm-leeg">Nog geen berichten ontvangen.</p>}

      {berichten.map((b) => (
        <section className="adm-card" key={b.id}>
          <div className="adm-rij-kop">
            <span>
              {datum(b.created_at)}
              {b.afgehandeld ? ' · afgehandeld' : ''}
            </span>
          </div>

          <p style={{ marginTop: 0 }}>
            <strong>{b.naam}</strong> —{' '}
            <a href={`mailto:${b.email}?subject=${encodeURIComponent('Je bericht aan Tot Bloei')}`}>
              {b.email}
            </a>
          </p>

          <p style={{ whiteSpace: 'pre-wrap' }}>{b.bericht}</p>

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            {!b.afgehandeld && (
              <form action={berichtAfhandelen}>
                <input type="hidden" name="id" value={b.id} />
                <button className="adm-knop stil klein" type="submit">
                  Markeer als afgehandeld
                </button>
              </form>
            )}
            <form action={berichtVerwijderen}>
              <input type="hidden" name="id" value={b.id} />
              <button className="adm-knop stil klein" type="submit">
                Verwijderen
              </button>
            </form>
          </div>
        </section>
      ))}
    </>
  );
}
