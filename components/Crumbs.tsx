import Link from 'next/link';
import { Fragment } from 'react';

export default function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Kruimelpad">
      <Link href="/">Home</Link>
      {items.map((item) => (
        <Fragment key={item.label}>
          <span aria-hidden="true">/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
