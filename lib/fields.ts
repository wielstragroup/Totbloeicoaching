/**
 * Veldschema's
 * ------------
 * Hier staat welke velden een pagina heeft en hoe ze in de admin getoond
 * worden. Eén plek dus: voeg hier een veld toe en het formulier krijgt er
 * automatisch een rij bij. De database hoeft niet mee te veranderen, omdat de
 * paginacontent als JSONB wordt opgeslagen.
 *
 * Veldtypes:
 *   text        — één regel
 *   textarea    — meerdere regels, platte tekst
 *   rich        — meerdere regels met opmaakknoppen (vet, cursief, lijst, link)
 *   alineas     — één tekstvak; een witregel begint een nieuwe alinea
 *   herhaling   — een rijtje blokken (bijv. de zes kernwaarden), elk met eigen velden
 *   afbeelding  — kiezen uit de geüploade foto's
 */

export type Veld =
  | { naam: string; label: string; type: 'text' | 'textarea' | 'rich' | 'alineas' | 'afbeelding'; hint?: string }
  | {
      naam: string;
      label: string;
      type: 'herhaling';
      hint?: string;
      velden: { naam: string; label: string; type: 'text' | 'textarea' }[];
    };

export type Sectie = { titel: string; velden: Veld[] };

export type PaginaSchema = {
  slug: string;
  naam: string;
  url: string;
  secties: Sectie[];
};

export const paginaSchemas: PaginaSchema[] = [
  {
    slug: '/',
    naam: 'Homepage',
    url: '/',
    secties: [
      {
        titel: 'Kop van de pagina',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titelVoor', label: 'Titel — eerste deel', type: 'text', hint: 'Let op de spatie aan het eind' },
          { naam: 'titelAccent', label: 'Titel — groen deel', type: 'text' },
          { naam: 'sub', label: 'Ondertitel', type: 'textarea' },
          { naam: 'tekst', label: 'Introzin', type: 'textarea' },
          { naam: 'ctaLabel', label: 'Tekst op de knop', type: 'text' },
          { naam: 'ctaTweedeLabel', label: 'Tekst op de tweede link', type: 'text' },
          { naam: 'badge', label: 'Tekst in het witte blokje bij de foto', type: 'textarea' },
        ],
      },
      {
        titel: 'Introblok',
        velden: [
          { naam: 'introTitel', label: 'Titel', type: 'text' },
          { naam: 'introTekst', label: 'Tekst', type: 'alineas' },
        ],
      },
      {
        titel: 'Waar ik voor sta',
        velden: [
          { naam: 'waardenEyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'waardenTitel', label: 'Titel', type: 'text' },
          {
            naam: 'waarden',
            label: 'Kaartjes',
            type: 'herhaling',
            hint: 'Het icoontje hoort bij de naam: hart, loep, mensen, lijnen, pijl of tak.',
            velden: [
              { naam: 'icoon', label: 'Icoon', type: 'text' },
              { naam: 'titel', label: 'Titel', type: 'text' },
              { naam: 'tekst', label: 'Tekst', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: '/over-mij',
    naam: 'Over mij',
    url: '/over-mij',
    secties: [
      {
        titel: 'Inhoud',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titel', label: 'Titel', type: 'text' },
          { naam: 'tekst', label: 'Verhaal', type: 'alineas' },
          { naam: 'quote', label: 'Citaat onderaan', type: 'textarea' },
        ],
      },
    ],
  },

  {
    slug: '/werkwijze',
    naam: 'Werkwijze',
    url: '/werkwijze',
    secties: [
      {
        titel: 'Inhoud',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titel', label: 'Titel', type: 'text' },
          { naam: 'intro', label: 'Introtekst', type: 'textarea' },
          {
            naam: 'stappen',
            label: 'Stappen',
            type: 'herhaling',
            velden: [
              { naam: 'nummer', label: 'Nummer', type: 'text' },
              { naam: 'titel', label: 'Titel', type: 'text' },
              { naam: 'tekst', label: 'Tekst', type: 'textarea' },
            ],
          },
          { naam: 'slot', label: 'Slotzin onder de stappen', type: 'textarea' },
        ],
      },
      {
        titel: 'Wanneer Tot Bloei niet passend is',
        velden: [
          { naam: 'grenzenTitel', label: 'Titel', type: 'text' },
          { naam: 'grenzenTekst', label: 'Tekst', type: 'alineas' },
        ],
      },
    ],
  },

  {
    slug: '/voor-wie',
    naam: 'Voor wie',
    url: '/voor-wie',
    secties: [
      {
        titel: 'Inhoud',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titel', label: 'Titel', type: 'text' },
          { naam: 'intro', label: 'Introtekst', type: 'textarea' },
          {
            naam: 'themas',
            label: 'Onderwerpen',
            type: 'herhaling',
            velden: [
              { naam: 'titel', label: 'Titel', type: 'text' },
              { naam: 'tekst', label: 'Tekst', type: 'textarea' },
            ],
          },
          { naam: 'notitie', label: 'Groene notitie onderaan', type: 'textarea' },
        ],
      },
    ],
  },

  {
    slug: '/aanbod',
    naam: 'Aanbod',
    url: '/aanbod',
    secties: [
      {
        titel: 'Kop van de pagina',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titel', label: 'Titel', type: 'text' },
          { naam: 'intro', label: 'Introtekst', type: 'textarea' },
        ],
      },
    ],
  },

  {
    slug: '/praktische-info',
    naam: 'Praktische info',
    url: '/praktische-info',
    secties: [
      {
        titel: 'Kop van de pagina',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titel', label: 'Titel', type: 'text' },
          { naam: 'intro', label: 'Introtekst', type: 'textarea' },
        ],
      },
    ],
  },

  {
    slug: '/contact',
    naam: 'Contact',
    url: '/contact',
    secties: [
      {
        titel: 'Kop van de pagina',
        velden: [
          { naam: 'eyebrow', label: 'Klein bovenschrift', type: 'text' },
          { naam: 'titel', label: 'Titel', type: 'text' },
          { naam: 'intro', label: 'Introtekst', type: 'textarea' },
        ],
      },
      {
        titel: 'Groene oproepblok (staat onderaan elke pagina)',
        velden: [
          { naam: 'ctaTitel', label: 'Titel', type: 'text' },
          { naam: 'ctaTekst', label: 'Tekst', type: 'textarea' },
          { naam: 'ctaLabel', label: 'Tekst op de knop', type: 'text' },
        ],
      },
    ],
  },
];

export function schemaVoor(slug: string) {
  return paginaSchemas.find((p) => p.slug === slug);
}

/** Velden van één dienst. */
export const dienstVelden: Veld[] = [
  { naam: 'titel', label: 'Titel', type: 'text' },
  { naam: 'tag', label: 'Label boven de titel', type: 'text', hint: 'Bijvoorbeeld: Eenmalig, Voor ouders' },
  { naam: 'korte_omschrijving', label: 'Korte omschrijving', type: 'textarea', hint: 'Staat op de overzichtspagina en in de zoekresultaten.' },
  { naam: 'lange_omschrijving', label: 'Uitgebreide omschrijving', type: 'rich' },
  { naam: 'prijs', label: 'Prijs', type: 'text', hint: 'Bijvoorbeeld: € 75 of In overleg' },
  { naam: 'duur', label: 'Duur', type: 'text' },
  { naam: 'voor_wie', label: 'Voor wie', type: 'text' },
  { naam: 'cta_label', label: 'Tekst op de knop', type: 'text' },
  { naam: 'afbeelding', label: 'Afbeelding', type: 'afbeelding' },
];
