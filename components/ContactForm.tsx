'use client';

import { useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { berichtVersturen, type Verzonden } from '@/app/(site)/contact/actions';

const leeg: Verzonden = { ok: true, melding: '' };

function Knop() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? 'Versturen…' : 'Versturen'}
      {!pending && (
        <span className="arw" aria-hidden="true">
          →
        </span>
      )}
    </button>
  );
}

export default function ContactForm({ email }: { email: string }) {
  const [status, actie] = useActionState(berichtVersturen, leeg);
  const gestart = useRef(Date.now());

  /* Gelukt? Dan geen formulier meer tonen, alleen de bevestiging. */
  if (status.ok && status.melding) {
    return (
      <div className="form-dank" role="status">
        <p className="lede" style={{ marginBottom: '.6rem' }}>
          {status.melding}
        </p>
        <p className="form-note">
          Komt er niets binnen? Mail dan gerust rechtstreeks naar{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="form" action={actie}>
      <div className="field">
        <label htmlFor="naam">Je naam</label>
        <input id="naam" name="naam" type="text" autoComplete="name" required maxLength={80} />
      </div>

      <div className="field">
        <label htmlFor="email">E-mailadres</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={120} />
      </div>

      <div className="field">
        <label htmlFor="bericht">Waar loop je tegenaan?</label>
        <textarea id="bericht" name="bericht" required maxLength={3000} />
        <span className="hint">Een paar zinnen is genoeg — de rest bespreken we telefonisch.</span>
      </div>

      {/* Onzichtbaar voor mensen, zichtbaar voor bots. Niet met display:none:
          sommige bots slaan verborgen velden juist over. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Laat dit veld leeg</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="gestart" value={gestart.current} />

      <Knop />

      {!status.ok && status.melding && (
        <p className="form-fout" role="alert">
          {status.melding}
        </p>
      )}

      <p className="form-note">
        Je gegevens worden alleen gebruikt om te reageren op je bericht en niet gedeeld met
        anderen. Lees hoe dat werkt in de <a href="/privacy">privacyverklaring</a>.
      </p>
    </form>
  );
}
