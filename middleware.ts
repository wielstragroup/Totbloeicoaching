import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Vernieuwt de Supabase-sessie en houdt /admin dicht voor wie niet ingelogd is.
 * De echte controle gebeurt óók in app/admin/layout.tsx — middleware alleen is
 * niet genoeg als beveiliging.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pad = request.nextUrl.pathname;
  const openbaar = pad.startsWith('/admin/login') || pad.startsWith('/admin/auth');

  if (pad.startsWith('/admin') && !openbaar && !user) {
    const naarLogin = request.nextUrl.clone();
    naarLogin.pathname = '/admin/login';
    naarLogin.searchParams.set('van', pad);
    return NextResponse.redirect(naarLogin);
  }

  return response;
}

export const config = { matcher: ['/admin/:path*'] };
