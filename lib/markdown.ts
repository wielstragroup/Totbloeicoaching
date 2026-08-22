/**
 * Piepkleine markdown-renderer — geen dependency.
 *
 * Ondersteunt precies wat de knoppen in de admin kunnen maken:
 *   **vet**, *cursief*, [link](https://...), lijsten met "- " en alinea's.
 *
 * Veiligheid: eerst wordt álle HTML ge-escaped, daarna pas de markdown omgezet.
 * Wat een beheerder intypt kan dus nooit als HTML of script uitgevoerd worden.
 */

function escape(tekst: string) {
  return tekst
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(tekst: string) {
  return escape(tekst)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*)\)/g,
      '<a href="$2">$1</a>'
    );
}

export function markdownNaarHtml(bron: string): string {
  if (!bron?.trim()) return '';

  return bron
    .split(/\n\s*\n/)
    .map((blok) => blok.trim())
    .filter(Boolean)
    .map((blok) => {
      const regels = blok.split('\n');

      if (regels.every((r) => /^\s*[-*]\s+/.test(r))) {
        const items = regels
          .map((r) => `<li>${inline(r.replace(/^\s*[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }

      return `<p>${regels.map(inline).join('<br />')}</p>`;
    })
    .join('');
}

/** Markdown terug naar platte tekst — voor meta descriptions en schema.org. */
export function markdownNaarTekst(bron: string): string {
  return bron
    .replace(/\*\*|\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}
