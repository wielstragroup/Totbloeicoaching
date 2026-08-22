import { notFound } from 'next/navigation';
import { paginaSchemas } from '@/lib/fields';
import { adminClient } from '@/lib/supabase/server';
import PaginaForm from '@/components/admin/PaginaForm';

export const dynamic = 'force-dynamic';

const naarSlug = (segment: string) => (segment === 'home' ? '/' : `/${segment}`);


export default async function PaginaBewerken({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: segment } = await params;
  const slug = naarSlug(segment);
  const schema = paginaSchemas.find((p) => p.slug === slug);
  if (!schema) notFound();

  const { data } = await adminClient().from('pages').select('*').eq('slug', slug).single();
  if (!data) {
    return (
      <>
        <div className="adm-head">
          <h1>{schema.naam}</h1>
        </div>
        <div className="adm-card">
          <p>
            Deze pagina staat nog niet in de database. Draai <code>npm run seed</code> om de
            bestaande teksten in te laden.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="adm-head">
        <h1>{schema.naam}</h1>
        <p className="adm-view">{schema.url}</p>
      </div>

      <PaginaForm
        slug={slug}
        url={schema.url}
        secties={schema.secties}
        content={(data.content ?? {}) as Record<string, unknown>}
        seo={{
          title: data.seo_title ?? '',
          description: data.seo_description ?? '',
          canonical: data.canonical ?? '',
        }}
      />
    </>
  );
}
