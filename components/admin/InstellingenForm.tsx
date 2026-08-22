'use client';

import { useActionState } from 'react';
import { instellingenOpslaan, type Resultaat } from '@/app/admin/actions';
import SaveBar from './SaveBar';

const leeg: Resultaat = { ok: true, melding: '' };

export type Instellingen = Record<string, string | null>;

const velden: { naam: string; label: string; hint?: string }[] = [
  { naam: 'naam', label: 'Naam van de praktijk' },
  { naam: 'ondertitel', label: 'Ondertitel', hint: 'Staat klein onder de naam in de header.' },
  { naam: 'email', label: 'E-mailadres' },
  { naam: 'instagram', label: 'Instagram — volledige link' },
  { naam: 'instagram_handle', label: 'Instagram — weergavenaam' },
  { naam: 'regio', label: 'Werkgebied' },
  { naam: 'kvk', label: 'KvK-nummer', hint: 'Leeg laten verbergt de regel in de footer.' },
];

export default function InstellingenForm({ waarden }: { waarden: Instellingen }) {
  const [status, actie] = useActionState(instellingenOpslaan, leeg);

  return (
    <form action={actie}>
      <section className="adm-card">
        <h2>Gegevens</h2>
        {velden.map((v) => (
          <div className="adm-field" key={v.naam}>
            <label htmlFor={v.naam}>{v.label}</label>
            {v.hint && <span className="hint">{v.hint}</span>}
            <input id={v.naam} type="text" name={v.naam} defaultValue={waarden[v.naam] ?? ''} />
          </div>
        ))}

        <div className="adm-field">
          <label htmlFor="footer_tekst">Tekst in de footer</label>
          <textarea id="footer_tekst" name="footer_tekst" defaultValue={waarden.footer_tekst ?? ''} />
        </div>
      </section>

      <SaveBar status={status} bekijk="/" />
    </form>
  );
}
