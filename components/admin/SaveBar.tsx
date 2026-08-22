'use client';

import { useFormStatus } from 'react-dom';
import type { Resultaat } from '@/app/admin/actions';

function Knop({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="adm-knop" type="submit" disabled={pending}>
      {pending ? 'Bezig met opslaan…' : label}
    </button>
  );
}

export default function SaveBar({
  status,
  label = 'Opslaan',
  bekijk,
}: {
  status: Resultaat;
  label?: string;
  bekijk?: string;
}) {
  return (
    <div className="adm-bar">
      <Knop label={label} />
      {bekijk && (
        <a className="adm-knop stil klein" href={bekijk} target="_blank" rel="noopener">
          Bekijk pagina ↗
        </a>
      )}
      {status.melding && (
        <span className={`adm-melding${status.ok ? '' : ' fout'}`} role="status">
          {status.melding}
        </span>
      )}
    </div>
  );
}
