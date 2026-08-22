import { adminClient } from '@/lib/supabase/server';
import FaqForm from '@/components/admin/FaqForm';

export const dynamic = 'force-dynamic';

export default async function FaqBeheer() {
  const { data } = await adminClient()
    .from('faqs')
    .select('id, vraag, antwoord, volgorde, gepubliceerd')
    .order('volgorde');

  return (
    <>
      <div className="adm-head">
        <h1>Veelgestelde vragen</h1>
        <p>Deze vragen staan op de pagina Praktische info.</p>
      </div>

      {!data?.length && <p className="adm-leeg">Er staan nog geen vragen in de database.</p>}

      <FaqForm items={data ?? []} />
    </>
  );
}
