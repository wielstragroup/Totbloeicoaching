import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Is Supabase geconfigureerd? Zo niet, valt de site terug op lib/content.ts. */
export const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** Leesclient zonder sessie — voor de publieke, gecachete pagina's. */
export function publicClient() {
  return createClient(url, anon, { auth: { persistSession: false } });
}

/** Client met de sessie van de ingelogde beheerder (cookies). */
export async function sessionClient() {
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // aanroep vanuit een server component: cookies zijn dan read-only
        }
      },
    },
  });
}

/** Schrijfclient voor de admin. Gebruikt de service role key — alleen server-side. */
export function adminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY ontbreekt');
  return createClient(url, key, { auth: { persistSession: false } });
}
