'use client';

import { useState } from 'react';

/** Laat zien hoeveel tekens een SEO-veld heeft — Google kapt langere teksten af. */
export default function Teller({
  naam,
  waarde,
  id,
  max,
  meerregelig,
}: {
  naam: string;
  waarde: string;
  id: string;
  max: number;
  meerregelig?: boolean;
}) {
  const [lengte, setLengte] = useState(waarde.length);

  const gedeeld = {
    id,
    name: naam,
    defaultValue: waarde,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setLengte(e.target.value.length),
  };

  return (
    <>
      {meerregelig ? <textarea {...gedeeld} /> : <input type="text" {...gedeeld} />}
      <span className={`adm-teller${lengte > max ? ' te-lang' : ''}`}>
        {lengte} van ongeveer {max} tekens
      </span>
    </>
  );
}
