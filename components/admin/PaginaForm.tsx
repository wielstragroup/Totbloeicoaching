'use client';

import { useActionState } from 'react';
import { paginaOpslaan, type Resultaat } from '@/app/admin/actions';
import type { Sectie } from '@/lib/fields';
import { VeldRij } from './Velden';
import SaveBar from './SaveBar';
import Teller from './Teller';

const leeg: Resultaat = { ok: true, melding: '' };

export default function PaginaForm({
  slug,
  url,
  secties,
  content,
  seo,
}: {
  slug: string;
  url: string;
  secties: Sectie[];
  content: Record<string, unknown>;
  seo: { title: string; description: string; canonical: string };
}) {
  const [status, actie] = useActionState(paginaOpslaan, leeg);

  return (
    <form action={actie}>
      <input type="hidden" name="slug" value={slug} />

      {secties.map((sectie) => (
        <section className="adm-card" key={sectie.titel}>
          <h2>{sectie.titel}</h2>
          {sectie.velden.map((veld) => (
            <VeldRij key={veld.naam} veld={veld} waarde={content[veld.naam]} prefix="content." />
          ))}
        </section>
      ))}

      <section className="adm-card">
        <h2>Vindbaarheid in Google</h2>

        <div className="adm-field">
          <label htmlFor="seo_title">Titel in de zoekresultaten</label>
          <Teller id="seo_title" naam="seo_title" waarde={seo.title} max={60} />
        </div>

        <div className="adm-field">
          <label htmlFor="seo_description">Omschrijving in de zoekresultaten</label>
          <Teller
            id="seo_description"
            naam="seo_description"
            waarde={seo.description}
            max={155}
            meerregelig
          />
        </div>

        <div className="adm-field">
          <label htmlFor="canonical">Canonical URL</label>
          <span className="hint">Alleen invullen als je weet waarom. Meestal leeg laten.</span>
          <input id="canonical" type="text" name="canonical" defaultValue={seo.canonical} />
        </div>
      </section>

      <SaveBar status={status} bekijk={url} />
    </form>
  );
}
