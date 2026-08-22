'use client';

import { useRef } from 'react';

/**
 * Tekstvak met opmaakknoppen. De knoppen zetten markdown in de tekst
 * (**vet**, *cursief*, - lijst, [link](url)) — dat is bewust geen HTML,
 * zodat er nooit code in de teksten belandt.
 */
export default function RichText({
  naam,
  waarde,
  id,
}: {
  naam: string;
  waarde: string;
  id: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const omhul = (voor: string, na = voor, standaard = 'tekst') => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const selectie = value.slice(a, b) || standaard;
    el.value = value.slice(0, a) + voor + selectie + na + value.slice(b);
    el.focus();
    el.setSelectionRange(a + voor.length, a + voor.length + selectie.length);
  };

  const lijst = () => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const blok = value.slice(a, b) || 'Eerste punt';
    const nieuw = blok
      .split('\n')
      .map((r) => (r.trim() ? `- ${r.replace(/^\s*[-*]\s*/, '')}` : r))
      .join('\n');
    el.value = value.slice(0, a) + nieuw + value.slice(b);
    el.focus();
  };

  const link = () => {
    const url = window.prompt('Naar welk adres moet de link wijzen?', 'https://');
    if (url) omhul('[', `](${url})`, 'linktekst');
  };

  return (
    <>
      <div className="adm-toolbar">
        <button type="button" onClick={() => omhul('**')} title="Vet" aria-label="Vet">
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => omhul('*')} title="Cursief" aria-label="Cursief">
          <em>I</em>
        </button>
        <span className="scheiding" aria-hidden="true" />
        <button type="button" onClick={lijst} title="Lijst" aria-label="Lijst">
          • Lijst
        </button>
        <button type="button" onClick={link} title="Link" aria-label="Link">
          Link
        </button>
      </div>
      <textarea id={id} name={naam} className="groot" defaultValue={waarde} ref={ref} />
      <span className="hint">
        Een lege regel begint een nieuwe alinea. **vet**, *cursief* en lijsten met “- ” werken.
      </span>
    </>
  );
}
