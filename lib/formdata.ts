import type { Veld } from './fields';

/**
 * Leest een formulier uit aan de hand van het veldschema.
 *
 * Doordat we het schema volgen (en niet blind alles overnemen wat er binnenkomt),
 * belandt er nooit een veld in de database dat er niet hoort — ook niet als
 * iemand het formulier onderweg aanpast.
 */
export function leesVelden(velden: Veld[], data: FormData, prefix = ''): Record<string, unknown> {
  const uit: Record<string, unknown> = {};

  for (const veld of velden) {
    const sleutel = prefix + veld.naam;

    if (veld.type === 'herhaling') {
      const rijen: Record<string, string>[] = [];

      for (let i = 0; ; i++) {
        const basis = `${sleutel}.${i}.`;
        const heeftRij = veld.velden.some((sub) => data.has(basis + sub.naam));
        if (!heeftRij) break;

        const rij: Record<string, string> = {};
        for (const sub of veld.velden) rij[sub.naam] = tekst(data.get(basis + sub.naam));

        // volledig leeggemaakte rijen laten we vallen
        if (Object.values(rij).some((v) => v.trim())) rijen.push(rij);
      }

      uit[veld.naam] = rijen;
      continue;
    }

    const waarde = tekst(data.get(sleutel));

    if (veld.type === 'alineas') {
      uit[veld.naam] = waarde
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    } else {
      uit[veld.naam] = waarde;
    }
  }

  return uit;
}

/** Waarde van een veld terug naar de vorm die in het formulier hoort. */
export function toonWaarde(veld: Veld, waarde: unknown): string {
  if (waarde == null) return '';
  if (Array.isArray(waarde)) return waarde.join('\n\n');
  return String(waarde);
}

function tekst(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.replace(/\r\n/g, '\n').trim() : '';
}
