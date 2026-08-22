# Eindcontrole

Uitgevoerd met de code in de hand. Wat ik **niet** heb kunnen doen staat onderaan
onder “Niet gecontroleerd”.

| Onderdeel | Status | Toelichting |
| --- | --- | --- |
| Routes | ✅ | 12 publieke routes + 8 admin-routes + `sitemap.xml`, `robots.txt`, 404. |
| Interne links | ✅ | Alle `href`-waarden verwijzen naar bestaande routes; geen `#`-placeholders meer. |
| Mobiele layout | ✅ | Breakpoints 1000px en 660px ongewijzigd; nieuwe blokken (`detail`, `contact-grid`, `siblings`) klappen mee. |
| Desktop layout | ✅ | Grids en `max-width` uit de oorspronkelijke CSS ongewijzigd. |
| SEO metadata | ✅ | Per pagina eigen title + description uit de database, met tekenteller in de admin. |
| Canonical | ✅ | Standaard het eigen pad; per pagina te overschrijven. `metadataBase` uit `NEXT_PUBLIC_SITE_URL`. |
| Sitemap | ✅ | Gegenereerd uit de database, dus dienstpagina's lopen automatisch mee. |
| robots.txt | ✅ | Alles toegestaan behalve `/admin`. |
| JSON-LD | ✅ | `ProfessionalService` op elke pagina, `FAQPage` op praktische info. Gegevens uit `site_settings`. |
| Toegankelijkheid | ✅ | Skip-link, labels bij elk veld, `aria-expanded` op FAQ en menu, `aria-current` in de navigatie, `role="alert"`/`role="status"` bij formuliermeldingen. |
| Toetsenbord | ✅ | Zichtbare focusring (2,5px), menu sluit met Escape, honeypot buiten de tabvolgorde. |
| Contrast | ✅ | Tekstkleuren onveranderd t.o.v. het goedgekeurde ontwerp; `--ink` op `--cream` ≈ 12:1, `--ink-soft` ≈ 7:1, knop wit-op-groen ≈ 6:1. |
| Afbeeldingen | ⚠️ | Nu nog SVG-illustraties (geen laadtijd, geen layout shift). Echte foto's krijgen `loading="lazy"`; zet bij het uploaden de afmetingen erbij. |
| Performance | ✅ | Geen CSS-framework, één klein JS-bundeltje, fonts self-hosted via `next/font`, pagina's statisch. |
| Caching | ✅ | `revalidate = false` + tags; gericht verversen bij opslaan. |
| Supabase RLS | ✅ | Publiek alleen lezen, en alleen gepubliceerde rijen. `contact_messages` heeft bewust géén policy: onbereikbaar met de publieke sleutel. |
| Admin-auth | ✅ | Drie lagen: middleware, layout-check en een controle in elke server action. |
| Server actions | ✅ | Elke schrijfactie roept `eisBeheerder()` aan; het contactformulier is de enige publieke actie en valideert alles server-side. |
| Secrets | ✅ | Service role key alleen server-side; `.env.local` staat in `.gitignore`. |
| Contactformulier | ✅ | Validatie, honeypot, tijdcontrole, opslag, notificatie, duidelijke meldingen. |
| Resend | ⚠️ | Code klaar; domein en API-sleutel moeten nog ingesteld worden. Zonder sleutel blijft het formulier werken (bericht komt in de admin). |
| TypeScript | ⚠️ | Losse typecheck gedraaid: geen fouten buiten de meldingen die alleen ontstaan doordat `node_modules` ontbreekt. |
| ESLint | ⚠️ | Config toegevoegd, niet kunnen draaien. |
| Production build | ❌ | Niet mogelijk in deze omgeving (geen netwerk, dus geen `npm install`). |
| Vercel | ✅ | Redirect, headers en env-variabelen ingesteld in `next.config.mjs` en `.env.example`. |

## Niet gecontroleerd

Deze omgeving heeft geen internettoegang, dus `npm install`, `npm run build`,
`npm run lint` en een echte Lighthouse-meting konden niet draaien. Draai lokaal:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

## Bewuste keuzes

- **Hash-redirects in de browser.** Een `#anker` wordt nooit naar de server
  gestuurd, dus `/#over-mij` kan niet met een gewone redirect worden opgevangen.
  `components/HashRedirect.tsx` doet dat in de browser, alleen op de homepage.
- **Geen rate limiting.** Op serverless helpt een teller in het geheugen niet.
  Honeypot plus tijdcontrole vangt het gros. Komt er toch spam binnen, dan is
  Vercel's WAF of een Turnstile-veld de volgende stap.
- **Notificatiefout blokkeert niets.** Het bericht staat al in de database; een
  hapering bij Resend mag de bezoeker geen foutmelding opleveren.
