import type { Veld } from '@/lib/fields';
import { toonWaarde } from '@/lib/formdata';
import RichText from './RichText';

type Media = { pad: string; alt: string };

/** Tekent één veld uit het schema. */
export function VeldRij({
  veld,
  waarde,
  prefix = '',
  media = [],
  publiekeUrl,
}: {
  veld: Veld;
  waarde: unknown;
  prefix?: string;
  media?: Media[];
  publiekeUrl?: (pad: string) => string;
}) {
  const naam = prefix + veld.naam;
  const id = naam.replace(/\./g, '-');

  if (veld.type === 'herhaling') {
    const rijen = Array.isArray(waarde) ? (waarde as Record<string, string>[]) : [];
    // altijd één lege rij extra, zodat er iets bij kan
    const alle = [...rijen, Object.fromEntries(veld.velden.map((v) => [v.naam, '']))];

    return (
      <div className="adm-field">
        <label>{veld.label}</label>
        {veld.hint && <span className="hint">{veld.hint}</span>}

        {alle.map((rij, i) => (
          <div className="adm-rij" key={i}>
            <div className="adm-rij-kop">
              <span>
                {veld.label} {i + 1}
                {i === alle.length - 1 ? ' — nieuw' : ''}
              </span>
              {i < alle.length - 1 && <span>leegmaken = verwijderen</span>}
            </div>
            {veld.velden.map((sub) => {
              const subNaam = `${naam}.${i}.${sub.naam}`;
              const subId = subNaam.replace(/\./g, '-');
              return (
                <div className="adm-field" key={sub.naam}>
                  <label htmlFor={subId}>{sub.label}</label>
                  {sub.type === 'textarea' ? (
                    <textarea id={subId} name={subNaam} defaultValue={rij?.[sub.naam] ?? ''} />
                  ) : (
                    <input
                      id={subId}
                      type="text"
                      name={subNaam}
                      defaultValue={rij?.[sub.naam] ?? ''}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (veld.type === 'afbeelding') {
    const huidig = String(waarde ?? '');
    return (
      <div className="adm-field">
        <label htmlFor={id}>{veld.label}</label>
        <select id={id} name={naam} defaultValue={huidig}>
          <optgroup label="Tijdelijke illustraties">
            <option value="blobA">Illustratie — organische vorm</option>
            <option value="blobB">Illustratie — bloemen</option>
            <option value="arch">Illustratie — boogvorm</option>
          </optgroup>
          {media.length > 0 && (
            <optgroup label="Eigen foto's">
              {media.map((m) => (
                <option key={m.pad} value={m.pad}>
                  {m.alt} ({m.pad})
                </option>
              ))}
            </optgroup>
          )}
        </select>
        {publiekeUrl && huidig && !['blobA', 'blobB', 'arch'].includes(huidig) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publiekeUrl(huidig)}
            alt=""
            style={{ maxWidth: 220, borderRadius: 12, marginTop: 8 }}
          />
        )}
        <span className="hint">
          Foto&apos;s toevoegen doe je bij <em>Foto&apos;s</em> in het menu.
        </span>
      </div>
    );
  }

  const tekst = toonWaarde(veld, waarde);

  return (
    <div className="adm-field">
      <label htmlFor={id}>{veld.label}</label>
      {veld.hint && <span className="hint">{veld.hint}</span>}

      {veld.type === 'rich' ? (
        <RichText id={id} naam={naam} waarde={tekst} />
      ) : veld.type === 'textarea' ? (
        <textarea id={id} name={naam} defaultValue={tekst} />
      ) : veld.type === 'alineas' ? (
        <>
          <textarea id={id} name={naam} className="groot" defaultValue={tekst} />
          <span className="hint">Laat een regel leeg om een nieuwe alinea te beginnen.</span>
        </>
      ) : (
        <input id={id} type="text" name={naam} defaultValue={tekst} />
      )}
    </div>
  );
}
