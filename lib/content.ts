/**
 * TIJDELIJKE CONTENTBRON
 * ----------------------
 * Alle teksten van de site staan hier op één plek. De vorm van deze objecten is
 * bewust gelijk aan de tabellen die straks in Supabase komen (site_settings,
 * pages, services, faqs). In stap 3 vervangen we de imports door database-
 * queries; de pagina's zelf hoeven dan niet te veranderen.
 *
 * Teksten die nog gecontroleerd moeten worden staan gemarkeerd met // CONTROLEREN
 */

/* ----------------------------------------------------------- site_settings */

export const settings = {
  naam: 'Tot Bloei',
  ondertitel: 'Opvoed- & kindercoaching',
  email: 'hallo@totbloeicoaching.nl',
  instagram: 'https://www.instagram.com/totbloeicoaching',
  instagramHandle: '@totbloeicoaching',
  regio: 'Regio Friesland',
  kvk: '', // CONTROLEREN — laat leeg tot het nummer bekend is
  domein: 'https://totbloeicoaching.nl',
  footerTekst:
    'Warme, praktische begeleiding voor ouders en kinderen van 2 tot 12 jaar in Friesland.',
};

/* ------------------------------------------------------------------- types */

export type Seo = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
};

export type Page<T> = { slug: string; seo: Seo; content: T };

/* ------------------------------------------------------------- navigatie */

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/over-mij', label: 'Over mij' },
  { href: '/werkwijze', label: 'Werkwijze' },
  { href: '/voor-wie', label: 'Voor wie' },
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/praktische-info', label: 'Praktische info' },
  { href: '/contact', label: 'Contact' },
];

/* ------------------------------------------------------------------- home */

export const home: Page<{
  eyebrow: string;
  titelVoor: string;
  titelAccent: string;
  sub: string;
  tekst: string;
  ctaLabel: string;
  ctaTweedeLabel: string;
  badge: string;
  introTitel: string;
  introTekst: string[];
  waardenEyebrow: string;
  waardenTitel: string;
  waarden: { icoon: string; titel: string; tekst: string }[];
}> = {
  slug: '/',
  seo: {
    title: 'Opvoedcoaching & kindercoaching in Friesland | Tot Bloei',
    description:
      'Opvoedcoaching en kindercoaching in Friesland voor ouders en kinderen van 2 tot 12 jaar. Hulp bij gedrag, emoties, overprikkeling, zelfvertrouwen en opvoedvragen.',
  },
  content: {
    eyebrow: 'Opvoed- & kindercoaching',
    titelVoor: 'Ruimte voor ',
    titelAccent: 'groei, rust en verbinding',
    sub: 'Opvoed- en kindercoaching voor ouders en kinderen van 2 tot 12 jaar.',
    tekst:
      'Wanneer opvoeden even niet vanzelf gaat, kijken we samen naar wat er speelt en wat kan helpen.',
    ctaLabel: 'Laten we kennismaken',
    ctaTweedeLabel: 'Ontdek hoe ik werk',
    badge: 'Een warme en veilige plek voor jou en je gezin',
    introTitel: 'Soms loopt het even anders dan je had gehoopt',
    introTekst: [
      'Soms merk je als ouder dat je steeds tegen hetzelfde aanloopt. Je kind wordt snel boos, slaapt onrustig, eet moeilijk, voelt veel, is onzeker of laat gedrag zien dat je lastig kunt plaatsen.',
      'Je wilt graag helpen, maar weet niet altijd wat werkt.',
      'Bij Tot Bloei kijken we samen naar wat er achter gedrag kan spelen en wat jullie als gezin nodig hebben om weer meer rust, vertrouwen en verbinding te ervaren.',
    ],
    waardenEyebrow: 'Waar ik voor sta',
    waardenTitel: 'Begeleiding die begint bij rust en vertrouwen',
    waarden: [
      {
        icoon: 'hart',
        titel: 'Warm & betrokken',
        tekst: 'Een veilige plek zonder oordeel, waar jij jezelf mag zijn.',
      },
      {
        icoon: 'loep',
        titel: 'Kijken naar de kern',
        tekst: 'We gaan verder dan alleen het gedrag en onderzoeken wat er echt speelt.',
      },
      {
        icoon: 'mensen',
        titel: 'Kind én ouder',
        tekst: 'We betrekken zowel het kind als de ouder in het proces.',
      },
      {
        icoon: 'lijnen',
        titel: 'Rust & overzicht',
        tekst: 'We brengen rust, inzicht en duidelijkheid in wat even overweldigend voelt.',
      },
      {
        icoon: 'pijl',
        titel: 'Praktisch & nuchter',
        tekst: 'Geen perfecte plaatjes, maar realistische stappen die passen bij jullie.',
      },
      {
        icoon: 'tak',
        titel: 'Groei op eigen tempo',
        tekst: 'Elk kind, elke ouder en elk gezin is uniek. We gaan in jullie tempo.',
      },
    ],
  },
};

/* --------------------------------------------------------------- over mij */

export const overMij: Page<{
  eyebrow: string;
  titel: string;
  tekst: string[];
  quote: string;
}> = {
  slug: '/over-mij',
  seo: {
    title: 'Over mij — Marieke, opvoed- en kindercoach | Tot Bloei',
    description:
      'Marieke is moeder van drie en pedagogisch medewerker. Vanuit haar werk én het moederschap begeleidt zij ouders en kinderen in Friesland, zonder oordeel.',
  },
  content: {
    eyebrow: 'Over mij',
    titel: 'Samen kijken, zonder oordeel',
    tekst: [
      'Ik ben Marieke, moeder van drie kinderen en al jarenlang werkzaam als pedagogisch medewerker.',
      'In mijn werk begeleid ik jonge kinderen in hun ontwikkeling en ondersteun ik ouders bij vragen rondom opvoeding en ontwikkeling.',
      'Door mijn werk én door het moederschap heb ik ervaren dat er niet één manier van opvoeden is die bij ieder kind of ieder gezin past.',
      'Juist dat maakt dit werk voor mij zo waardevol: samen kijken, zonder oordeel, naar wat een kind en ouder nodig hebben.',
      'Vanuit die gedachte is Tot Bloei ontstaan.',
    ],
    quote: 'Ruimte om te groeien — op je eigen manier en in je eigen tempo.',
  },
};

/* -------------------------------------------------------------- werkwijze */

export const werkwijze: Page<{
  eyebrow: string;
  titel: string;
  intro: string;
  stappen: { nummer: string; titel: string; tekst: string }[];
  slot: string;
  grenzenTitel: string;
  grenzenTekst: string[];
}> = {
  slug: '/werkwijze',
  seo: {
    title: 'Werkwijze — hoe een traject verloopt | Tot Bloei',
    description:
      'Van kennismaking en intake tot coaching en evaluatie: zo verloopt een traject bij Tot Bloei. Geen standaardprogramma, maar begeleiding die past bij jullie gezin.',
  },
  content: {
    eyebrow: 'Werkwijze',
    titel: 'Hoe werkt een traject?',
    intro:
      'Elk gezin is anders, dus elk traject is anders. Toch verloopt de begeleiding meestal in vier rustige stappen, zodat je steeds weet waar je aan toe bent.',
    stappen: [
      {
        nummer: '01',
        titel: 'Kennismaken',
        tekst: 'We bespreken kort waar jullie tegenaan lopen en of Tot Bloei passend is.',
      },
      {
        nummer: '02',
        titel: 'Intake',
        tekst:
          'We nemen rustig de tijd om jullie situatie, hulpvraag en wat al geprobeerd is te bespreken.',
      },
      {
        nummer: '03',
        titel: 'Coaching',
        tekst:
          'We onderzoeken wat er speelt en zoeken naar praktische handvatten die passen bij jullie gezin.',
      },
      {
        nummer: '04',
        titel: 'Evalueren',
        tekst:
          'We kijken wat veranderd is, wat werkt en wat jullie zelf verder kunnen voortzetten.',
      },
    ],
    slot: 'Geen standaardprogramma, maar begeleiding die aansluit bij jullie situatie.',
    grenzenTitel: 'Wanneer Tot Bloei niet passend is',
    grenzenTekst: [
      'Tot Bloei biedt coaching en opvoedondersteuning. Er wordt geen diagnostiek of behandeling van psychische stoornissen aangeboden.',
      'Wanneer tijdens een traject blijkt dat andere of specialistische hulp nodig is, denk ik met ouders mee over een passende vervolgstap of verwijzing.',
    ],
  },
};

/* --------------------------------------------------------------- voor wie */

export const voorWie: Page<{
  eyebrow: string;
  titel: string;
  intro: string;
  themas: { titel: string; tekst: string }[];
  notitie: string;
}> = {
  slug: '/voor-wie',
  seo: {
    title: 'Voor wie — opvoedvragen, gedrag en emoties | Tot Bloei',
    description:
      'Voor ouders en kinderen van 2 tot 12 jaar met vragen over emoties, gedrag, overprikkeling, zelfvertrouwen, samen spelen, opvoeden en veranderingen in het gezin.',
  },
  content: {
    eyebrow: 'Voor wie',
    titel: 'Voor wie is Tot Bloei bedoeld?',
    intro:
      'Bij Tot Bloei kun je terecht met vragen rondom opvoeding, gedrag, emoties en ontwikkeling.',
    themas: [
      {
        titel: 'Emoties & gedrag',
        tekst: 'Boosheid, verdriet, driftbuien of gedrag dat je moeilijk kunt plaatsen.',
      },
      {
        titel: 'Overprikkeling',
        tekst: 'Veel voelen, snel overweldigd raken of moeilijk tot rust komen.',
      },
      {
        titel: 'Zelfvertrouwen',
        tekst: 'Onzekerheid, faalangst of moeite om voor zichzelf op te komen.',
      },
      {
        titel: 'Samen spelen & sociale vaardigheden',
        tekst: 'Moeite met contact maken, delen, samenspelen of grenzen aangeven.',
      },
      {
        titel: 'Opvoeden',
        tekst: 'Twijfel aan grenzen, luisteren, structuur, consequent zijn of verbinding houden.',
      },
      {
        titel: 'Veranderingen',
        tekst:
          'Bijvoorbeeld een scheiding, verhuizing, nieuwe school of verandering binnen het gezin.',
      },
    ],
    notitie:
      'Ook bij vragen over slapen, eten, zindelijkheid, overgangen, angst, spanning en zelfstandigheid kan ik met jullie meedenken.',
  },
};

/* ---------------------------------------------------------------- diensten */

export type Service = {
  slug: string;
  tag: string;
  titel: string;
  kort: string;
  lang: string[];
  /** Zelfde tekst als `lang`, maar met opmaak (markdown). Komt uit de database. */
  langMarkdown?: string;
  prijs: string;
  duur: string;
  voorWie: string;
  ctaLabel: string;
  /** 'blobA' | 'blobB' | 'arch' (tijdelijke illustratie) of een pad naar een geüploade foto. */
  afbeelding: string;
  volgorde: number;
  seo: Seo;
};

export const services: Service[] = [
  {
    slug: 'opvoedconsult',
    tag: 'Eenmalig',
    titel: 'Opvoedconsult',
    kort: 'Voor ouders die graag één keer willen sparren over een concrete opvoedvraag.',
    lang: [
      'Niet elke vraag vraagt om een heel traject. Soms zit je met één ding: het slapengaan dat elke avond uitloopt, de driftbuien in de supermarkt, of de twijfel of je wel streng genoeg bent.',
      'In een opvoedconsult nemen we die ene vraag rustig door. We kijken wat er mogelijk onder het gedrag zit, wat je al geprobeerd hebt en wat daarvan wél werkte. Je gaat naar huis met een paar concrete handvatten die passen bij jouw kind en jouw gezin.',
      'Wil je daarna toch verder, dan kan dat altijd. Het consult verplicht je tot niets.',
    ],
    prijs: '€ 75', // CONTROLEREN
    duur: '60 minuten', // CONTROLEREN
    voorWie: 'Ouders met één concrete opvoedvraag',
    ctaLabel: 'Plan een opvoedconsult',
    afbeelding: 'arch',
    volgorde: 1,
    seo: {
      title: 'Opvoedconsult — eenmalig sparren over een opvoedvraag | Tot Bloei',
      description:
        'Een eenmalig opvoedconsult van 60 minuten voor ouders met een concrete opvoedvraag. Praktische handvatten die passen bij jouw kind en gezin.',
    },
  },
  {
    slug: 'oudercoaching',
    tag: 'Voor ouders',
    titel: 'Oudercoaching',
    kort:
      'Voor ouders die merken dat ze steeds in dezelfde patronen terechtkomen en behoefte hebben aan begeleiding.',
    lang: [
      'Je weet eigenlijk wel hoe je het zou willen doen, maar in het moment zelf gaat het toch weer anders. Je hoort jezelf dingen zeggen die je niet wilde zeggen, en achteraf baal je ervan.',
      'Bij oudercoaching kijken we naar die patronen: wat gebeurt er in jou op zo\'n moment, wat vraagt jouw kind precies, en waar loopt het steeds vast. Van daaruit zoeken we een aanpak die bij jou past — niet bij een boek.',
      'We werken in een aantal gesprekken, met tijd tussendoor om dingen uit te proberen. Wat we bespreken, blijft tussen ons.',
    ],
    prijs: 'In overleg', // CONTROLEREN
    duur: '60 minuten per gesprek', // CONTROLEREN
    voorWie: 'Ouders van kinderen van 2 tot 12 jaar',
    ctaLabel: 'Plan een kennismaking',
    afbeelding: 'blobA',
    volgorde: 2,
    seo: {
      title: 'Oudercoaching in Friesland — uit vaste patronen komen | Tot Bloei',
      description:
        'Oudercoaching voor ouders die steeds tegen dezelfde patronen aanlopen. Samen kijken wat er speelt en een aanpak vinden die bij jou en je kind past.',
    },
  },
  {
    slug: 'kindercoaching',
    tag: 'Voor kinderen',
    titel: 'Kindercoaching',
    kort:
      'Voor kinderen die ondersteuning kunnen gebruiken rondom emoties, zelfvertrouwen, spanning of gedrag.',
    lang: [
      'Kinderen praten zelden rechtstreeks over wat hen dwarszit. Ze laten het zien: in hun gedrag, hun spel, hun lijf. Daarom werken we vooral spelend, tekenend en bewegend — soms binnen, soms lekker buiten.',
      'We geven een naam aan wat een kind voelt, en oefenen met wat er dan kan helpen. Zo bouwt een kind aan vertrouwen in zichzelf, in zijn eigen tempo.',
      'Ouders blijven altijd betrokken. Voor en na de sessies blikken we samen terug, zodat jullie thuis verder kunnen met wat er ontstaat.',
    ],
    prijs: 'In overleg', // CONTROLEREN
    duur: '45 minuten per sessie', // CONTROLEREN
    voorWie: 'Kinderen van 2 tot 12 jaar',
    ctaLabel: 'Plan een kennismaking',
    afbeelding: 'blobB',
    volgorde: 3,
    seo: {
      title: 'Kindercoaching in Friesland — emoties, spanning en zelfvertrouwen | Tot Bloei',
      description:
        'Kindercoaching voor kinderen van 2 tot 12 jaar. Spelend werken aan emoties, zelfvertrouwen, spanning en gedrag — met ouders nauw betrokken.',
    },
  },
  {
    slug: 'ouder-en-kind',
    tag: 'Samen',
    titel: 'Ouder & kind',
    kort: 'Een combinatie van begeleiding van ouder en kind, afhankelijk van wat passend is.',
    lang: [
      'Soms zit de sleutel niet bij het kind of bij de ouder, maar in wat er tussen jullie gebeurt. Dan werkt het het best om samen aan de slag te gaan.',
      'We wisselen af: sessies met het kind, gesprekken met jou als ouder, en momenten waarop we samen oefenen. Wat de verhouding is, bepalen we onderweg — dat hangt af van wat er nodig blijkt.',
      'Het doel is niet dat het gedrag verdwijnt, maar dat jullie elkaar weer beter verstaan.',
    ],
    prijs: 'In overleg', // CONTROLEREN
    duur: 'Wisselend, in overleg', // CONTROLEREN
    voorWie: 'Ouder en kind samen',
    ctaLabel: 'Plan een kennismaking',
    afbeelding: 'blobA',
    volgorde: 4,
    seo: {
      title: 'Ouder & kind — samen begeleiding bij Tot Bloei',
      description:
        'Begeleiding waarin ouder en kind samen aan de slag gaan. Afwisselend sessies met het kind, gesprekken met de ouder en momenten samen.',
    },
  },
];

export const aanbodPagina: Page<{ eyebrow: string; titel: string; intro: string }> = {
  slug: '/aanbod',
  seo: {
    title: 'Aanbod — opvoedconsult, ouder- en kindercoaching | Tot Bloei',
    description:
      'Vier manieren waarop we samen kunnen werken: een eenmalig opvoedconsult, oudercoaching, kindercoaching of begeleiding van ouder en kind samen.',
  },
  content: {
    eyebrow: 'Aanbod',
    titel: 'Manieren waarop we samen kunnen werken',
    intro:
      'Wat passend is, hangt af van jullie vraag. Tijdens de kennismaking kijken we samen welke vorm het beste aansluit — je hoeft dat niet vooraf te weten.',
  },
};

/* ------------------------------------------------------------------- FAQ */

export type Faq = { vraag: string; antwoord: string; volgorde: number };

export const faqs: Faq[] = [
  {
    volgorde: 1,
    vraag: 'Waar vinden de gesprekken plaats?',
    antwoord:
      'De gesprekken vinden plaats in de praktijk in Friesland, in een rustige ruimte met daglicht. Een oudergesprek kan in overleg ook bij jullie thuis of online plaatsvinden. Voor kinderen kiezen we de plek waar zij zich het prettigst voelen — soms is dat binnen, soms lekker buiten.', // CONTROLEREN
  },
  {
    volgorde: 2,
    vraag: 'Hoe lang duurt een gesprek?',
    antwoord:
      'Een oudergesprek duurt ongeveer 60 minuten. Bij kinderen houd ik een sessie van 45 minuten aan, omdat dat voor de meeste kinderen prettig werkt. Na afloop is er kort ruimte om samen terug te blikken.', // CONTROLEREN
  },
  {
    volgorde: 3,
    vraag: 'Wat kost een traject?',
    antwoord:
      'Een los opvoedconsult van 60 minuten kost € 75. Een traject bestaat meestal uit een intake en drie tot vijf vervolggesprekken; wat passend is bespreken we tijdens de kennismaking, zodat je vooraf weet waar je aan toe bent. Je ontvangt altijd een duidelijk overzicht voordat we starten.', // CONTROLEREN
  },
  {
    volgorde: 4,
    vraag: 'Kan ik eerst vrijblijvend kennismaken?',
    antwoord:
      'Ja, graag zelfs. We plannen een telefonisch kennismakingsgesprek van ongeveer 20 minuten. Je vertelt kort waar jullie tegenaan lopen en ik vertel hoe ik werk. Daarna bepaal je in alle rust of je verder wilt. Deze kennismaking is gratis en verplicht tot niets.',
  },
  {
    volgorde: 5,
    vraag: 'Kan ik ook alleen advies vragen?',
    antwoord:
      'Zeker. Niet elke vraag vraagt om een heel traject. Bij een opvoedconsult kijken we in één gesprek naar jouw concrete vraag en ga je naar huis met een paar praktische handvatten. Wil je daarna toch verder, dan kan dat altijd.',
  },
  {
    volgorde: 6,
    vraag: 'Wordt de begeleiding vergoed?',
    antwoord:
      'Coaching valt niet onder de basisverzekering. Sommige aanvullende verzekeringen, gemeenten of werkgevers vergoeden een deel van de kosten. Het loont om dit vooraf even na te vragen; ik denk graag mee over wat er in jullie situatie mogelijk is.',
  },
  {
    volgorde: 7,
    vraag: 'Hoe snel kan ik terecht?',
    antwoord:
      'Op berichten reageer ik binnen twee werkdagen. Een kennismakingsgesprek is meestal binnen een week te plannen. Gesprekken vinden overdag en op afgesproken avonden plaats, zodat het naast werk en schooltijden past.', // CONTROLEREN
  },
];

export const praktischePagina: Page<{ eyebrow: string; titel: string; intro: string }> = {
  slug: '/praktische-info',
  seo: {
    title: 'Praktische info — locatie, tarieven en vergoeding | Tot Bloei',
    description:
      'Waar de gesprekken plaatsvinden, hoe lang ze duren, wat een traject kost, hoe de kennismaking werkt en of coaching vergoed wordt.',
  },
  content: {
    eyebrow: 'Praktische info',
    titel: 'Goed om te weten',
    intro:
      'De meestgestelde vragen op een rij. Staat jouw vraag er niet bij, stel hem gerust — ik antwoord binnen twee werkdagen.',
  },
};

/* --------------------------------------------------------------- contact */

export const contact: Page<{
  eyebrow: string;
  titel: string;
  intro: string;
  ctaTitel: string;
  ctaTekst: string;
  ctaLabel: string;
}> = {
  slug: '/contact',
  seo: {
    title: 'Contact — plan een vrijblijvende kennismaking | Tot Bloei',
    description:
      'Neem contact op met Tot Bloei voor een vrijblijvend kennismakingsgesprek van 20 minuten. Bereikbaar per e-mail; reactie binnen twee werkdagen.',
  },
  content: {
    eyebrow: 'Contact',
    titel: 'Laten we kennismaken',
    intro:
      'Twijfel je of Tot Bloei iets voor jullie kan betekenen? Stuur gerust een bericht. We plannen een telefonisch kennismakingsgesprek van ongeveer 20 minuten — gratis en zonder verplichting.',
    ctaTitel: 'Benieuwd of Tot Bloei iets voor jullie kan betekenen?',
    ctaTekst: 'Je bent van harte welkom voor een vrijblijvende kennismaking.',
    ctaLabel: 'Plan een kennismaking',
  },
};
