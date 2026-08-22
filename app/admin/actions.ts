'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminClient, sessionClient } from '@/lib/supabase/server';
import { dienstVelden, schemaVoor } from '@/lib/fields';
import { leesVelden } from '@/lib/formdata';
import { TAGS } from '@/lib/db';

export type Resultaat = { ok: boolean; melding: string };

/* ------------------------------------------------------------- beveiliging */

/**
 * Elke schrijfactie controleert zélf of er een geldige sessie is en of het
 * e-mailadres op de lijst staat. Middleware alleen is niet genoeg: server
 * actions zijn gewoon POST-verzoeken en moeten hun eigen deur bewaken.
 */
async function eisBeheerder() {
  const supabase = await sessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Niet ingelogd');

  const toegestaan = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (toegestaan.length && !toegestaan.includes((user.email ?? '').toLowerCase())) {
    throw new Error('Geen toegang');
  }

  return user;
}

/* ------------------------------------------------- on-demand revalidatie */

/**
 * Ververst de statische pagina's die door deze wijziging geraakt worden.
 * Het groene oproepblok en de footer staan op elke pagina, dus bij contact-
 * en instellingswijzigingen verversen we de hele site.
 */
function ververs(paden: string[], tags: string[]) {
  tags.forEach((t) => revalidateTag(t, 'max'));
  paden.forEach((p) => revalidatePath(p));
  revalidatePath('/sitemap.xml');
}

const alleSitePaden = [
  '/',
  '/over-mij',
  '/werkwijze',
  '/voor-wie',
  '/aanbod',
  '/aanbod/[slug]',
  '/praktische-info',
  '/contact',
];

/* --------------------------------------------------------------- pagina's */

export async function paginaOpslaan(_vorige: Resultaat, data: FormData): Promise<Resultaat> {
  try {
    await eisBeheerder();

    const slug = String(data.get('slug') ?? '');
    const schema = schemaVoor(slug);
    if (!schema) return { ok: false, melding: 'Onbekende pagina.' };

    const content = leesVelden(
      schema.secties.flatMap((s) => s.velden),
      data,
      'content.'
    );

    const { error } = await adminClient()
      .from('pages')
      .update({
        seo_title: String(data.get('seo_title') ?? '').trim(),
        seo_description: String(data.get('seo_description') ?? '').trim(),
        canonical: String(data.get('canonical') ?? '').trim() || null,
        content,
      })
      .eq('slug', slug);

    if (error) return { ok: false, melding: `Niet opgeslagen: ${error.message}` };

    // /contact bevat het oproepblok dat op élke pagina staat
    ververs(slug === '/contact' ? alleSitePaden : [schema.url], [TAGS.pages]);

    return { ok: true, melding: 'Opgeslagen. De website is bijgewerkt.' };
  } catch (e) {
    return { ok: false, melding: foutTekst(e) };
  }
}

/* --------------------------------------------------------------- diensten */

export async function dienstOpslaan(_vorige: Resultaat, data: FormData): Promise<Resultaat> {
  try {
    await eisBeheerder();

    const slug = String(data.get('slug') ?? '');
    if (!slug) return { ok: false, melding: 'Onbekende dienst.' };

    const velden = leesVelden(dienstVelden, data);

    const { error } = await adminClient()
      .from('services')
      .update({
        ...velden,
        seo_title: String(data.get('seo_title') ?? '').trim() || null,
        seo_description: String(data.get('seo_description') ?? '').trim() || null,
        volgorde: Number(data.get('volgorde') ?? 0),
        gepubliceerd: data.get('gepubliceerd') === 'aan',
      })
      .eq('slug', slug);

    if (error) return { ok: false, melding: `Niet opgeslagen: ${error.message}` };

    ververs(['/', '/aanbod', `/aanbod/${slug}`, '/aanbod/[slug]'], [TAGS.services]);

    return { ok: true, melding: 'Opgeslagen. De website is bijgewerkt.' };
  } catch (e) {
    return { ok: false, melding: foutTekst(e) };
  }
}

/* -------------------------------------------------------------------- FAQ */

export async function faqOpslaan(_vorige: Resultaat, data: FormData): Promise<Resultaat> {
  try {
    await eisBeheerder();
    const db = adminClient();

    /* bestaande items bijwerken */
    const ids = data.getAll('id').map(String);
    for (const [i, id] of ids.entries()) {
      const vraag = String(data.get(`vraag.${id}`) ?? '').trim();
      const antwoord = String(data.get(`antwoord.${id}`) ?? '').trim();
      const verwijderen = data.get(`verwijder.${id}`) === 'aan';

      if (verwijderen) {
        await db.from('faqs').delete().eq('id', id);
        continue;
      }
      if (!vraag || !antwoord) continue;

      await db
        .from('faqs')
        .update({
          vraag,
          antwoord,
          volgorde: i + 1,
          gepubliceerd: data.get(`gepubliceerd.${id}`) === 'aan',
        })
        .eq('id', id);
    }

    /* nieuw item onderaan */
    const nieuweVraag = String(data.get('nieuw.vraag') ?? '').trim();
    const nieuwAntwoord = String(data.get('nieuw.antwoord') ?? '').trim();
    if (nieuweVraag && nieuwAntwoord) {
      await db.from('faqs').insert({
        vraag: nieuweVraag,
        antwoord: nieuwAntwoord,
        volgorde: ids.length + 1,
        gepubliceerd: true,
      });
    }

    ververs(['/praktische-info'], [TAGS.faqs]);
    return { ok: true, melding: 'Opgeslagen. De website is bijgewerkt.' };
  } catch (e) {
    return { ok: false, melding: foutTekst(e) };
  }
}

/* ------------------------------------------------------------ instellingen */

export async function instellingenOpslaan(_vorige: Resultaat, data: FormData): Promise<Resultaat> {
  try {
    await eisBeheerder();

    const { error } = await adminClient()
      .from('site_settings')
      .update({
        naam: String(data.get('naam') ?? '').trim(),
        ondertitel: String(data.get('ondertitel') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        instagram: String(data.get('instagram') ?? '').trim() || null,
        instagram_handle: String(data.get('instagram_handle') ?? '').trim() || null,
        regio: String(data.get('regio') ?? '').trim() || null,
        kvk: String(data.get('kvk') ?? '').trim() || null,
        footer_tekst: String(data.get('footer_tekst') ?? '').trim() || null,
      })
      .eq('id', 1);

    if (error) return { ok: false, melding: `Niet opgeslagen: ${error.message}` };

    // adresgegevens staan in de footer en dus op élke pagina
    ververs(alleSitePaden, [TAGS.settings]);

    return { ok: true, melding: 'Opgeslagen. De hele website is bijgewerkt.' };
  } catch (e) {
    return { ok: false, melding: foutTekst(e) };
  }
}

/* ------------------------------------------------------------------- media */

export async function fotoUploaden(_vorige: Resultaat, data: FormData): Promise<Resultaat> {
  try {
    await eisBeheerder();

    const bestand = data.get('bestand');
    const alt = String(data.get('alt') ?? '').trim();

    if (!(bestand instanceof File) || !bestand.size) {
      return { ok: false, melding: 'Kies eerst een bestand.' };
    }
    if (!alt) {
      return { ok: false, melding: 'Vul een omschrijving in — die is nodig voor voorlezers en Google.' };
    }
    if (bestand.size > 5_000_000) {
      return { ok: false, melding: 'Het bestand is groter dan 5 MB. Verklein de foto eerst.' };
    }

    const naam = bestand.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '-')
      .replace(/^-|-$/g, '');
    const pad = `${Date.now()}-${naam}`;

    const db = adminClient();
    const { error } = await db.storage
      .from('media')
      .upload(pad, bestand, { contentType: bestand.type, upsert: false });

    if (error) return { ok: false, melding: `Uploaden mislukt: ${error.message}` };

    await db.from('media').insert({ pad, alt });

    revalidatePath('/admin/media');
    return { ok: true, melding: 'Foto toegevoegd.' };
  } catch (e) {
    return { ok: false, melding: foutTekst(e) };
  }
}

export async function fotoVerwijderen(data: FormData) {
  await eisBeheerder();
  const pad = String(data.get('pad') ?? '');
  const db = adminClient();
  await db.storage.from('media').remove([pad]);
  await db.from('media').delete().eq('pad', pad);
  revalidatePath('/admin/media');
}

/* --------------------------------------------------------------- berichten */

export async function berichtAfhandelen(data: FormData) {
  await eisBeheerder();
  await adminClient()
    .from('contact_messages')
    .update({ afgehandeld: true })
    .eq('id', String(data.get('id') ?? ''));
  revalidatePath('/admin/berichten');
}

export async function berichtVerwijderen(data: FormData) {
  await eisBeheerder();
  await adminClient()
    .from('contact_messages')
    .delete()
    .eq('id', String(data.get('id') ?? ''));
  revalidatePath('/admin/berichten');
}

/* ---------------------------------------------------------------- uitloggen */

export async function uitloggen() {
  const supabase = await sessionClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

/* -------------------------------------------------------------------------- */

function foutTekst(e: unknown) {
  const m = e instanceof Error ? e.message : 'Onbekende fout';
  if (m === 'Niet ingelogd' || m === 'Geen toegang') {
    return 'Je sessie is verlopen. Log opnieuw in en probeer het nog een keer.';
  }
  return `Er ging iets mis: ${m}`;
}
