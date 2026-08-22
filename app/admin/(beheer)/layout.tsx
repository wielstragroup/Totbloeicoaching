import Link from 'next/link';
import { redirect } from 'next/navigation';
import { sessionClient, supabaseConfigured } from '@/lib/supabase/server';
import { paginaSchemas } from '@/lib/fields';
import AdminNav from '@/components/admin/AdminNav';
import { uitloggen } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) {
    return (
      <div className="adm-login">
        <div className="doos">
          <h1>Nog niet ingesteld</h1>
          <p>
            Vul eerst <code>NEXT_PUBLIC_SUPABASE_URL</code> en{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code> in, voer{' '}
            <code>supabase/schema.sql</code> uit en draai <code>npm run seed</code>.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await sessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /* Niet ingelogd? Dan toont de loginpagina zichzelf (die valt buiten dit
     onderdeel via haar eigen layout-check hieronder). */
  if (!user) redirect('/admin/login');

  const toegestaan = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (toegestaan.length && !toegestaan.includes((user.email ?? '').toLowerCase())) {
    await supabase.auth.signOut();
    redirect('/admin/login?fout=geen-toegang');
  }

  return (
    <div className="adm">
      <aside className="adm-side">
        <Link className="adm-brand" href="/admin">
          <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 34V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M20 24c-5.4 0-8.4-2.8-8.4-7.2 4.4 0 8.4 2.4 8.4 7.2Z" fill="#9FB79C" />
            <path d="M20 19.4c0-4.6 3.1-7.4 7.6-7.4 0 4.6-3 7.4-7.6 7.4Z" fill="#CEDCC9" />
          </svg>
          <strong>Beheer</strong>
        </Link>

        <AdminNav paginas={paginaSchemas.map((p) => ({ slug: p.slug, naam: p.naam }))} />

        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener">
            Website bekijken ↗
          </a>
          <span>{user.email}</span>
          <form action={uitloggen}>
            <button type="submit">Uitloggen</button>
          </form>
        </div>
      </aside>

      <div className="adm-main">{children}</div>
    </div>
  );
}
