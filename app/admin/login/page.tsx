import LoginForm from '@/components/admin/LoginForm';

export const metadata = { title: 'Inloggen | Tot Bloei', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LoginPagina({
  searchParams,
}: {
  searchParams: Promise<{ fout?: string }>;
}) {
  const { fout } = await searchParams;

  return (
    <div className="adm-login">
      <div className="doos">
        <h1>Inloggen</h1>
        <p>
          Vul je e-mailadres in. Je krijgt een link toegestuurd waarmee je direct binnen bent —
          geen wachtwoord nodig.
        </p>

        {fout === 'geen-toegang' && (
          <p className="adm-melding fout">Dit e-mailadres heeft geen toegang tot het beheer.</p>
        )}
        {fout === 'link' && (
          <p className="adm-melding fout">
            De link is verlopen of al gebruikt. Vraag hieronder een nieuwe aan.
          </p>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
