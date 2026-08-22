'use client';

import { useActionState } from 'react';
import { dienstOpslaan, type Resultaat } from '@/app/admin/actions';
import { dienstVelden } from '@/lib/fields';
import { VeldRij } from './Velden';
import SaveBar from './SaveBar';
import Teller from './Teller';

const leeg: Resultaat = { ok: true, melding: '' };

export type Dienst = Record<string, unknown> & { slug: string };

export default function DienstForm({
  dienst,
  media,
  mediaBasis,
}: {
  dienst: Dienst;
  media: { pad: string; alt: string }[];
  mediaBasis: string;
}) {
  const [status, actie] = useActionState(dienstOpslaan, leeg);

  return (
    <form action={actie}>
      <input type="hidden" name="slug" value={dienst.slug} />

      <section className="adm-card">
        <h2>Inhoud</h2>
        {dienstVelden.map((veld) => (
          <VeldRij
            key={veld.naam}
            veld={veld}
            waarde={dienst[veld.naam]}
            media={media}
            publiekeUrl={(pad) => `${mediaBasis}/${pad}`}
          />
        ))}
      </section>

      <section className="adm-card">
        <h2>Vindbaarheid in Google</h2>
        <div className="adm-field">
          <label htmlFor="seo_title">Titel in de zoekresultaten</label>
          <Teller id="seo_title" naam="seo_title" waarde={String(dienst.seo_title ?? '')} max={60} />
        </div>
        <div className="adm-field">
          <label htmlFor="seo_description">Omschrijving in de zoekresultaten</label>
          <Teller
            id="seo_description"
            naam="seo_description"
            waarde={String(dienst.seo_description ?? '')}
            max={155}
            meerregelig
          />
        </div>
      </section>

      <section className="adm-card">
        <h2>Weergave</h2>
        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="volgorde">Volgorde op de aanbodpagina</label>
            <input
              id="volgorde"
              type="text"
              inputMode="numeric"
              name="volgorde"
              defaultValue={String(dienst.volgorde ?? 0)}
            />
          </div>
          <div className="adm-field">
            <label htmlFor="gepubliceerd">Zichtbaar op de website</label>
            <select id="gepubliceerd" name="gepubliceerd" defaultValue={dienst.gepubliceerd ? 'aan' : 'uit'}>
              <option value="aan">Ja, toon deze dienst</option>
              <option value="uit">Nee, verberg deze dienst</option>
            </select>
          </div>
        </div>
      </section>

      <SaveBar status={status} bekijk={`/aanbod/${dienst.slug}`} />
    </form>
  );
}
