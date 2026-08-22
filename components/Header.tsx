'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/content';
import { BrandMark } from './icons';

export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  /* header: transparant → crème met blur */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* menu sluiten bij Escape + scroll vergrendelen */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  /* menu sluiten na navigatie */
  useEffect(() => setOpen(false), [pathname]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className={`site-header${stuck ? ' is-stuck' : ''}`} id="header">
        <div className="wrap header-inner">
          <Link className="brand" href="/" aria-label="Tot Bloei, naar de homepage">
            <BrandMark />
            <span>
              <span className="brand-name">Tot Bloei</span>
              <span className="brand-sub">Opvoed- &amp; kindercoaching</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Hoofdnavigatie">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link className="btn header-cta" href="/contact">
            Kennismaken
          </Link>

          <button
            className="burger"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            aria-controls="mobile-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-panel${open ? ' is-open' : ''}`} id="mobile-panel" hidden={!open}>
        {nav.map((item, i) => (
          <Link key={item.href} href={item.href} style={{ '--i': i } as React.CSSProperties}>
            {item.label}
          </Link>
        ))}
        <Link className="btn" href="/contact" style={{ '--i': nav.length } as React.CSSProperties}>
          Laten we kennismaken
        </Link>
      </div>
    </>
  );
}
