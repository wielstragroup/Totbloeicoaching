import { NextResponse, type NextRequest } from 'next/server';
import { sessionClient } from '@/lib/supabase/server';

/** Wisselt de code uit de inloglink om voor een sessie-cookie. */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const naar = request.nextUrl.searchParams.get('van') ?? '/admin';

  if (!code) {
    return NextResponse.redirect(new URL('/admin/login?fout=link', request.url));
  }

  const supabase = await sessionClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/admin/login?fout=link', request.url));
  }

  return NextResponse.redirect(new URL(naar, request.url));
}
