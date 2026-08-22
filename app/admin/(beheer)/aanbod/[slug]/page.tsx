import { notFound } from 'next/navigation';
import { adminClient } from '@/lib/supabase/server';
import DienstForm from '@/components/admin/DienstForm';

export const dynamic = 'force-dynamic';

export default async function DienstBewerken({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = adminClient();

  const [{ data: dienst }, { data: media }] = await Promise.all([
    db.from('services').select('*').eq('slug', slug).single(),
    db.from('media').select('pad, alt').order('created_at', { ascending: false }),
  ]);

  if (!dienst) notFound();

  const mediaBasis = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`;

  return (
    <>
      <div className="adm-head">
        <h1>{dienst.titel}</h1>
        <p className="adm-view">/aanbod/{dienst.slug}</p>
      </div>

      <DienstForm dienst={dienst} media={media ?? []} mediaBasis={mediaBasis} />
    </>
  );
}
