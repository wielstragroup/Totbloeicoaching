'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * De oude site was één pagina met ankers (#over-mij, #aanbod, …). Een hash
 * wordt nooit naar de server gestuurd, dus die links kun je niet met een
 * gewone redirect opvangen — dat moet hier, in de browser.
 *
 * Staat alleen op de homepage: alleen daar kwamen die links op uit.
 */
const paden: Record<string, string> = {
  '#over-mij': '/over-mij',
  '#werkwijze': '/werkwijze',
  '#voor-wie': '/voor-wie',
  '#aanbod': '/aanbod',
  '#praktisch': '/praktische-info',
  '#praktische-info': '/praktische-info',
  '#contact': '/contact',
  '#grenzen': '/werkwijze',
  '#waarden': '/',
  '#intro': '/',
  '#top': '/',
};

export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const doel = paden[window.location.hash];
    if (doel && doel !== '/') router.replace(doel);
  }, [router]);

  return null;
}
