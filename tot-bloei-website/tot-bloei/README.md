# Tot Bloei — website

Statische website voor **Tot Bloei – Opvoed- & kindercoaching**. Geen build-stap, geen framework: alleen HTML, CSS en een klein beetje JavaScript. Dat maakt hem snel, goedkoop te hosten en makkelijk te onderhouden.

---

## Pagina's

| URL | Bestand |
| --- | --- |
| `/` | `index.html` |
| `/over-mij` | `over-mij.html` |
| `/werkwijze` | `werkwijze.html` |
| `/voor-wie` | `voor-wie.html` |
| `/aanbod` | `aanbod/index.html` |
| `/aanbod/opvoedconsult` | `aanbod/opvoedconsult.html` |
| `/aanbod/oudercoaching` | `aanbod/oudercoaching.html` |
| `/aanbod/kindercoaching` | `aanbod/kindercoaching.html` |
| `/aanbod/ouder-en-kind` | `aanbod/ouder-en-kind.html` |
| `/praktische-info` | `praktische-info.html` |
| `/contact` | `contact.html` |
| `/privacy`, `/algemene-voorwaarden`, `/klachtenregeling` | juridische pagina's (concept) |
| 404 | `404.html` |

Gedeelde bestanden: `assets/css/styles.css`, `assets/js/main.js`, `assets/img/`.

---

## Lokaal bekijken

De links in de site zijn *extensieloos* (`/over-mij` in plaats van `/over-mij.html`), zoals ze op Vercel werken. Daarom moet je de site via een lokale server openen — dubbelklikken op `index.html` laat de navigatie niet werken.

```bash
npx serve .
# of, met de Vercel CLI (dichtst bij productie):
npx vercel dev
```

---

## Naar GitHub

```bash
cd tot-bloei
git init
git add .
git commit -m "Eerste versie website Tot Bloei"
git branch -M main
git remote add origin https://github.com/<jouw-gebruikersnaam>/tot-bloei.git
git push -u origin main
```

## Naar Vercel

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de GitHub-repository.
2. Framework preset: **Other**. Build command en output directory laat je leeg — het is een statische site.
3. Klik op **Deploy**.
4. Voeg onder *Settings → Domains* het eigen domein toe (bijvoorbeeld `totbloeicoaching.nl`).

Vanaf dat moment gaat elke `git push` naar `main` automatisch live. Pull requests krijgen een eigen preview-URL.

`vercel.json` regelt de schone URL's, cache-headers voor `/assets/` en een paar veiligheidsheaders.

---

## Nog invullen vóór livegang

- [ ] **Domein** — vervang `https://www.totbloeicoaching.nl` in `sitemap.xml`, `robots.txt` en in de `canonical` + `og:url` van elke pagina.
- [ ] **E-mailadres** — nu overal `hallo@totbloeicoaching.nl`.
- [ ] **Adres / plaats** — staat nu als "Regio Friesland" in de footer, op `/contact` en in de structured data.
- [ ] **KvK-nummer** — uitgecommentarieerd in de footer van elke pagina.
- [ ] **Tarieven en gesprekduur** — in `praktische-info.html` en op de aanbodpagina's staan realistische *voorbeelden* (€ 75 per opvoedconsult, 60/45 minuten). Controleer deze.
- [ ] **Contactformulier** — `contact.html` heeft `action="https://formspree.io/f/VERVANG-DIT"`. Maak een gratis endpoint aan bij [Formspree](https://formspree.io) of gebruik een alternatief, en plak de URL erin.
- [ ] **Juridische pagina's** — `privacy`, `algemene-voorwaarden` en `klachtenregeling` zijn concepten met `[placeholders]` en staan op `noindex`. Laat ze controleren voordat je de `noindex` weghaalt.
- [ ] **Deelafbeelding** — plaats een `og-tot-bloei.jpg` (1200×630) in `assets/img/` voor mooie previews op WhatsApp en social media.

## Foto's vervangen

In `assets/img/` staan tijdelijke SVG-illustraties in de huisstijlkleuren. Vervangen gaat zo:

1. Zet de echte foto in `assets/img/`, bijvoorbeeld `ouder-en-kind.jpg`.
2. Zoek in de HTML naar `placeholder-ouder-kind.svg` en verander de `src` naar `/assets/img/ouder-en-kind.jpg`.
3. Pas de `alt`-tekst aan zodat die beschrijft wat er écht op de foto staat.
4. Zet `width` en `height` op de echte pixelafmetingen (voorkomt dat de pagina verspringt tijdens het laden).

De organische uitsnede zit op de omliggende `div` (`photo-blob-a`, `photo-arch`, enzovoort) en blijft dus gewoon werken. Gebruik bij voorkeur `.webp` of `.jpg` van maximaal ~250 kB per foto.

---

## Onderhoud

Header en footer staan in elk HTML-bestand. Pas je iets aan in de navigatie, doe dat dan in alle pagina's (zoeken-en-vervangen over de hele map werkt prima). Wordt de site groter, dan is het moment gekomen om over te stappen op Astro of Eleventy — dan staat de header nog maar op één plek.

Kleuren, typografie en spacing staan als CSS-variabelen bovenin `assets/css/styles.css`. Eén waarde aanpassen verandert de hele site.
