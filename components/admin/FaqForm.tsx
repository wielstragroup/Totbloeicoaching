'use client';

import { useActionState } from 'react';
import { faqOpslaan, type Resultaat } from '@/app/admin/actions';
import SaveBar from './SaveBar';

const leeg: Resultaat = { ok: true, melding: '' };

export type FaqRij = {
  id: number;
  vraag: string;
  antwoord: string;
  volgorde: number;
  gepubliceerd: boolean;
};

export default function FaqForm({ items }: { items: FaqRij[] }) {
  const [status, actie] = useActionState(faqOpslaan, leeg);

  return (
    <form action={actie}>
      {items.map((item, i) => (
        <section className="adm-card" key={item.id}>
          <div className="adm-rij-kop">
            <span>Vraag {i + 1}</span>
          </div>
          <input type="hidden" name="id" value={item.id} />

          <div className="adm-field">
            <label htmlFor={`vraag-${item.id}`}>Vraag</label>
            <input
              id={`vraag-${item.id}`}
              type="text"
              name={`vraag.${item.id}`}
              defaultValue={item.vraag}
            />
          </div>

          <div className="adm-field">
            <label htmlFor={`antwoord-${item.id}`}>Antwoord</label>
            <textarea
              id={`antwoord-${item.id}`}
              name={`antwoord.${item.id}`}
              defaultValue={item.antwoord}
            />
          </div>

          <div className="adm-grid2">
            <div className="adm-field">
              <label htmlFor={`zichtbaar-${item.id}`}>Zichtbaar</label>
              <select
                id={`zichtbaar-${item.id}`}
                name={`gepubliceerd.${item.id}`}
                defaultValue={item.gepubliceerd ? 'aan' : 'uit'}
              >
                <option value="aan">Ja</option>
                <option value="uit">Nee, tijdelijk verbergen</option>
              </select>
            </div>
            <div className="adm-field">
              <label htmlFor={`verwijder-${item.id}`}>Verwijderen</label>
              <select id={`verwijder-${item.id}`} name={`verwijder.${item.id}`} defaultValue="uit">
                <option value="uit">Nee, bewaren</option>
                <option value="aan">Ja, verwijder bij opslaan</option>
              </select>
            </div>
          </div>
        </section>
      ))}

      <section className="adm-card">
        <h2>Nieuwe vraag toevoegen</h2>
        <div className="adm-field">
          <label htmlFor="nieuw-vraag">Vraag</label>
          <input id="nieuw-vraag" type="text" name="nieuw.vraag" />
        </div>
        <div className="adm-field">
          <label htmlFor="nieuw-antwoord">Antwoord</label>
          <textarea id="nieuw-antwoord" name="nieuw.antwoord" />
        </div>
      </section>

      <p className="hint" style={{ marginBottom: 8 }}>
        De volgorde hierboven is ook de volgorde op de website.
      </p>

      <SaveBar status={status} bekijk="/praktische-info" />
    </form>
  );
}
