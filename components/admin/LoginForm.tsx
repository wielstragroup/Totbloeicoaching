'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { linkVersturen } from '@/app/admin/login/actions';
import type { Resultaat } from '@/app/admin/actions';

const leeg: Resultaat = { ok: true, melding: '' };

function Knop() {
  const { pending } = useFormStatus();
  return (
    <button className="adm-knop" type="submit" disabled={pending}>
      {pending ? 'Bezig…' : 'Stuur mij een inloglink'}
    </button>
  );
}

export default function LoginForm() {
  const [status, actie] = useActionState(linkVersturen, leeg);

  return (
    <form action={actie}>
      <div className="adm-field">
        <label htmlFor="email">E-mailadres</label>
        <input id="email" type="email" name="email" autoComplete="email" required />
      </div>

      <Knop />

      {status.melding && (
        <p className={`adm-melding${status.ok ? '' : ' fout'}`} role="status" style={{ marginTop: 12 }}>
          {status.melding}
        </p>
      )}
    </form>
  );
}
