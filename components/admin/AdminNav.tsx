'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const segment = (slug: string) => (slug === '/' ? 'home' : slug.replace(/^\//, ''));

export default function AdminNav({ paginas }: { paginas: { slug: string; naam: string }[] }) {
  const pathname = usePathname();
  const huidig = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const link = (href: string, label: string) => (
    <Link key={href} href={href} aria-current={huidig(href) ? 'page' : undefined}>
      {label}
    </Link>
  );

  return (
    <nav className="adm-nav" aria-label="Beheernavigatie">
      {link('/admin', 'Dashboard')}
      {link('/admin/berichten', 'Berichten')}

      <p>Pagina&apos;s</p>
      {paginas.map((p) => link(`/admin/paginas/${segment(p.slug)}`, p.naam))}

      <p>Inhoud</p>
      {link('/admin/aanbod', 'Aanbod')}
      {link('/admin/faq', 'FAQ')}
      {link('/admin/media', "Foto's")}

      <p>Algemeen</p>
      {link('/admin/instellingen', 'Contactgegevens')}
    </nav>
  );
}
