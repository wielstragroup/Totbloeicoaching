'use server';

import { headers } from 'next/headers';
import { sessionClient } from '@/lib/supabase/server';
import type { Resultaat } from '../actions';

/**
 * Stuurt een inloglink. `shouldCreateUser: false` zorgt ervoor dat er geen
 * nieuwe accounts ontstaan: alleen adressen die in Supabase → Authentication
 * als gebruiker bestaan, krijgen een link.
 *
 * De melding is bewust altijd hetzelfde, zodat je van buitenaf niet kunt
 * aflezen welke adressen toegang hebben.
 */
export async function linkVersturen(_vorige: Resultaat, data: FormData): Promise<Resultaat> {
  const email = String(data.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (!email.includes('@')) {
    return { ok: false, melding: 'Vul een geldig e-mailadres in.' };
  }

  const toegestaan = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const stuur = !toegestaan.length || toegestaan.includes(email);

  if (stuur) {
    const host = (await headers()).get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';
    const supabase = await sessionClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: `${host}/admin/auth/callback` },
    });
  }

  return {
    ok: true,
    melding: 'Als dit adres toegang heeft, staat er nu een inloglink in de mailbox.',
  };
}
