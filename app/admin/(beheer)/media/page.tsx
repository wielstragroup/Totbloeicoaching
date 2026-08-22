import { adminClient } from '@/lib/supabase/server';
import MediaForm from '@/components/admin/MediaForm';
import { fotoVerwijderen } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function Media() {
  const { data } = await adminClient()
    .from('media')
    .select('pad, alt')
    .order('created_at', { ascending: false });

  const basis = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`;

  return (
    <>
      <div className="adm-head">
        <h1>Foto&apos;s</h1>
        <p>Geüploade foto&apos;s kun je daarna bij een dienst kiezen.</p>
      </div>

      <MediaForm />

      <section className="adm-card">
        <h2>In gebruik</h2>
        {!data?.length ? (
          <p className="adm-leeg">Nog geen foto&apos;s geüpload.</p>
        ) : (
          <div className="adm-media">
            {data.map((m) => (
              <figure key={m.pad}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${basis}/${m.pad}`} alt={m.alt} />
                <figcaption>
                  {m.alt}
                  <form action={fotoVerwijderen} style={{ marginTop: 6 }}>
                    <input type="hidden" name="pad" value={m.pad} />
                    <button className="adm-knop stil klein" type="submit">
                      Verwijderen
                    </button>
                  </form>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
