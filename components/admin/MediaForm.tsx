'use client';

import { useActionState } from 'react';
import { fotoUploaden, type Resultaat } from '@/app/admin/actions';
import SaveBar from './SaveBar';

const leeg: Resultaat = { ok: true, melding: '' };

export default function MediaForm() {
  const [status, actie] = useActionState(fotoUploaden, leeg);

  return (
    <form action={actie}>
      <section className="adm-card">
        <h2>Foto toevoegen</h2>

        <div className="adm-field">
          <label htmlFor="bestand">Bestand</label>
          <input id="bestand" type="file" name="bestand" accept="image/*" />
          <span className="hint">JPG of WebP, bij voorkeur onder de 250 kB.</span>
        </div>

        <div className="adm-field">
          <label htmlFor="alt">Omschrijving van de foto</label>
          <input id="alt" type="text" name="alt" />
          <span className="hint">
            Beschrijf wat er te zien is, bijvoorbeeld “Kind speelt buiten in het gras”. Voorlezers
            en Google gebruiken deze tekst.
          </span>
        </div>
      </section>

      <SaveBar status={status} label="Uploaden" />
    </form>
  );
}
