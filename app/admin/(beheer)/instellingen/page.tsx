import { adminClient } from '@/lib/supabase/server';
import InstellingenForm from '@/components/admin/InstellingenForm';

export const dynamic = 'force-dynamic';

export default async function Instellingen() {
  const { data } = await adminClient().from('site_settings').select('*').eq('id', 1).single();

  return (
    <>
      <div className="adm-head">
        <h1>Contactgegevens</h1>
        <p>Deze gegevens staan in de footer, op de contactpagina en in de gegevens voor Google.</p>
      </div>

      <InstellingenForm waarden={(data ?? {}) as Record<string, string | null>} />
    </>
  );
}
