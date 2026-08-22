import './admin.css';

export const metadata = { title: 'Beheer | Tot Bloei', robots: { index: false, follow: false } };

/** Alleen de opmaak — de inlogcontrole zit in (beheer)/layout.tsx. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
