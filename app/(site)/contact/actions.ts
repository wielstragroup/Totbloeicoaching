'use server';

import { adminClient, supabaseConfigured } from '@/lib/supabase/server';
import { getSettings } from '@/lib/db';

export type Verzonden = { ok: boolean; melding: string };

const MAX = { naam: 80, email: 120, bericht: 3000 };
const MIN = { naam: 2, bericht: 10 };

/** Eenvoudige, ruime controle — geen poging om alle geldige adressen te vangen. */
const lijktOpEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function berichtVersturen(_vorige: Verzonden, data: FormData): Promise<Verzonden> {
  /* ------------------------------------------------------- spamfilter */
  // Onzichtbaar veld: mensen zien het niet, bots vullen het vaak wel in.
  if (String(data.get('website') ?? '').trim()) {
    // Stilletjes doen alsof het gelukt is — dan probeert de bot het niet opnieuw.
    return { ok: true, melding: 'Bedankt voor je bericht. Ik reageer binnen twee werkdagen.' };
  }

  // Een formulier dat binnen twee seconden is ingevuld, is niet door een mens ingevuld.
  const gestart = Number(data.get('gestart') ?? 0);
  if (gestart && Date.now() - gestart < 2000) {
    return { ok: false, melding: 'Neem even de tijd en probeer het daarna opnieuw.' };
  }

  /* -------------------------------------------------------- validatie */
  const naam = String(data.get('naam') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const bericht = String(data.get('bericht') ?? '').trim();

  if (naam.length < MIN.naam) return fout('Vul je naam in.');
  if (naam.length > MAX.naam) return fout('Die naam is wel erg lang.');
  if (!lijktOpEmail(email)) return fout('Controleer je e-mailadres — daar kan ik je antwoord niet op sturen.');
  if (email.length > MAX.email) return fout('Dat e-mailadres is te lang.');
  if (bericht.length < MIN.bericht) return fout('Schrijf iets meer, dan kan ik je beter helpen.');
  if (bericht.length > MAX.bericht) return fout('Je bericht is te lang. Vat het kort samen, de rest bespreken we.');

  /* --------------------------------------------------------- opslaan */
  if (!supabaseConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return fout('Het formulier is nog niet ingesteld. Stuur je bericht voorlopig per e-mail.');
  }

  const { error } = await adminClient()
    .from('contact_messages')
    .insert({ naam, email, bericht });

  if (error) {
    console.error('contactformulier — opslaan mislukt:', error.message);
    return fout('Er ging iets mis bij het versturen. Probeer het zo nog eens of stuur een e-mail.');
  }

  /* ------------------------------------------------------ notificatie */
  // Het bericht staat al veilig in de database. Lukt de mail niet, dan is dat
  // vervelend maar niet erg genoeg om de bezoeker een foutmelding te geven.
  await stuurNotificatie({ naam, email, bericht }).catch((e) =>
    console.error('contactformulier — notificatie mislukt:', e)
  );

  return { ok: true, melding: 'Bedankt voor je bericht. Ik reageer binnen twee werkdagen.' };
}

function fout(melding: string): Verzonden {
  return { ok: false, melding };
}

/* ---------------------------------------------------------------- Resend */

async function stuurNotificatie(b: { naam: string; email: string; bericht: string }) {
  const sleutel = process.env.RESEND_API_KEY;
  if (!sleutel) return; // nog niet ingesteld: bericht staat alleen in de database

  const settings = await getSettings();
  const naarAdres = process.env.CONTACT_TO || settings.email;
  const vanAdres = process.env.CONTACT_FROM || 'Tot Bloei <website@totbloeicoaching.nl>';

  const antwoord = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sleutel}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: vanAdres,
      to: [naarAdres],
      reply_to: b.email,
      subject: `Nieuw bericht via de website — ${b.naam}`,
      text: [
        `Naam:    ${b.naam}`,
        `E-mail:  ${b.email}`,
        '',
        b.bericht,
        '',
        '— Verstuurd via het contactformulier op totbloeicoaching.nl',
      ].join('\n'),
    }),
  });

  if (!antwoord.ok) {
    throw new Error(`Resend gaf ${antwoord.status}: ${await antwoord.text()}`);
  }
}
