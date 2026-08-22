/**
 * Alle SVG's uit de oorspronkelijke one-pager, ongewijzigd overgenomen.
 * De fotoplaceholders (PhotoBlobA/B, PhotoArch) vervang je later door <Image>.
 */

export function BrandMark({ withBloom = true }: { withBloom?: boolean }) {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 34V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M20 24c-5.4 0-8.4-2.8-8.4-7.2 4.4 0 8.4 2.4 8.4 7.2Z" fill="#9FB79C" />
      <path d="M20 19.4c0-4.6 3.1-7.4 7.6-7.4 0 4.6-3 7.4-7.6 7.4Z" fill="#CEDCC9" />
      {withBloom && (
        <path d="M20 13.6c-1.9-1.4-2.2-3.6-.6-5 1.7 1 2.2 3.3.6 5Z" fill="#E7CBC6" />
      )}
    </svg>
  );
}

export function Sprig() {
  return (
    <svg className="hero-sprig" viewBox="0 0 120 40" fill="none" aria-hidden="true">
      <path d="M2 32c26-2 44-10 58-20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 28c-1-5 1-8 5-9 1 5-1 8-5 9Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M40 22c-2-4-1-8 3-10 2 4 1 8-3 10Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M55 15c-3-3-3-7 0-10 3 3 3 7 0 10Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M76 30c3-4 9-4 11 0-2 4-8 4-11 0Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M100 26c4-3 9-1 9 3-4 2-8 1-9-3Z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------- iconen kernwaarden */

const cardIcons: Record<string, React.ReactNode> = {
  hart: (
    <path
      d="M12 20s-7-4.3-7-9a3.9 3.9 0 0 1 7-2.4A3.9 3.9 0 0 1 19 11c0 4.7-7 9-7 9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  loep: (
    <>
      <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m15.6 15.6 4 4M11 8.4v5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  mensen: (
    <>
      <circle cx="8.5" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 19c.6-3 2.6-4.6 5-4.6s4.4 1.6 5 4.6M14 19c.3-1.8 1.4-2.8 2.8-2.8 1.3 0 2.4 1 2.7 2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  lijnen: (
    <path d="M4 8.5h16M4 13h11M4 17.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  ),
  pijl: (
    <>
      <path d="M5 19c2.5-3 5-4.5 7.5-4.5S17.5 16 20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 14V5m0 0L9 8m3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  tak: (
    <>
      <path d="M12 20V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 14c-4 0-6-2.2-6-5.6 3.4 0 6 1.9 6 5.6Zm0-2.6c0-3.4 2.4-5.4 5.8-5.4 0 3.4-2.4 5.4-5.8 5.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function CardIcon({ name }: { name: string }) {
  return (
    <div className="card-icon">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {cardIcons[name] ?? cardIcons.tak}
      </svg>
    </div>
  );
}

export function SmallBloom() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 15.5c-3.4 0-5.2-1.9-5.2-4.9 3 0 5.2 1.7 5.2 4.9Zm0-2.3c0-3 2.1-4.7 5.1-4.7 0 3-2.1 4.7-5.1 4.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11.4v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8.1" r="1.05" fill="currentColor" />
    </svg>
  );
}

/* -------------------------------------------------- iconen bij de diensten */

const offerMarks: Record<string, React.ReactNode> = {
  opvoedconsult: (
    <>
      <path d="M16 27V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 20c-6 0-9-3-9-8 5 0 9 2.7 9 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
  oudercoaching: (
    <>
      <path d="M16 27V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16 20c-6 0-9-3-9-8 5 0 9 2.7 9 8Zm0-4c0-5 3.6-8 8.6-8 0 5-3.6 8-8.6 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </>
  ),
  kindercoaching: (
    <>
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 27c1.4-5 4.6-7.6 9-7.6s7.6 2.6 9 7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  'ouder-en-kind': (
    <>
      <circle cx="11" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="22" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 26c1.2-4.2 3.8-6.4 7-6.4s5.8 2.2 7 6.4M19 26c.5-2.6 2-4 3.8-4s3.3 1.4 3.8 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
};

export function OfferMark({ slug }: { slug: string }) {
  return (
    <svg className="offer-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {offerMarks[slug] ?? offerMarks.opvoedconsult}
    </svg>
  );
}

export function Botanic({ variant }: { variant: 'one' | 'two' }) {
  return (
    <svg className={`cta-botanic ${variant}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path d={variant === 'one' ? 'M100 190V50' : 'M100 190V60'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {variant === 'one' ? (
        <>
          <path d="M100 140c-42 0-64-22-64-56 34 0 64 20 64 56Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M100 108c0-34 24-56 58-56 0 34-24 56-58 56Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M100 170c-28 0-42-14-42-36 22 0 42 14 42 36Z" stroke="currentColor" strokeWidth="1.8" />
        </>
      ) : (
        <>
          <path d="M100 150c-34 0-52-18-52-46 28 0 52 16 52 46Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M100 118c0-28 20-46 48-46 0 28-20 46-48 46Z" stroke="currentColor" strokeWidth="1.8" />
        </>
      )}
    </svg>
  );
}

export function LeafFloat({ style }: { style?: React.CSSProperties }) {
  return (
    <svg className="leaf-float" style={style} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M8 52C8 26 26 10 52 8c2 26-16 44-44 44Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 52C20 40 34 26 52 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------- fotoplaceholders */
/* Vervangen door een echte foto:
   <div className="photo photo-blob-a">
     <Image src="..." alt="..." width={1040} height={1100} />
   </div>                                                                    */

export function PhotoBlobA() {
  return (
    <div className="photo photo-blob-a">
      <svg
        className="ph"
        viewBox="0 0 520 550"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Warme sfeerafbeelding van een ouder en kind in zacht daglicht"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2=".4" y2="1">
            <stop offset="0" stopColor="#F3DCC8" />
            <stop offset=".55" stopColor="#EFE2D2" />
            <stop offset="1" stopColor="#DCE6D6" />
          </linearGradient>
        </defs>
        <rect width="520" height="550" fill="url(#g1)" />
        <circle cx="368" cy="128" r="74" fill="#F7EDE0" opacity=".85" />
        <path d="M0 402c118-56 214-40 292 6 46 27 122 34 228 20v122H0Z" fill="#CEDCC9" opacity=".75" />
        <path d="M0 470c130-44 226-30 300 12 42 24 118 28 220 14v54H0Z" fill="#9FB79C" opacity=".55" />
        <g stroke="#4F6B55" strokeWidth="1.6" fill="none" opacity=".5" strokeLinecap="round">
          <path d="M108 500V352" />
          <path d="M108 420c-38 0-58-20-58-52 32 0 58 18 58 52Z" />
          <path d="M108 388c0-34 22-54 56-54 0 34-22 54-56 54Z" />
          <path d="M414 502V386" />
          <path d="M414 438c26-2 40-18 38-42-24 2-40 18-38 42Z" />
        </g>
        <circle cx="258" cy="268" r="9" fill="#E7CBC6" opacity=".9" />
      </svg>
    </div>
  );
}

export function PhotoArch({ label }: { label?: string }) {
  return (
    <div className="photo photo-arch">
      <svg
        className="ph"
        viewBox="0 0 420 500"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={label ?? 'Rustig interieur met daglicht, hout en planten'}
      >
        <defs>
          <linearGradient id="g2" x1=".2" y1="0" x2=".8" y2="1">
            <stop offset="0" stopColor="#E7EEE3" />
            <stop offset=".6" stopColor="#EFE2D2" />
            <stop offset="1" stopColor="#E7CBC6" />
          </linearGradient>
        </defs>
        <rect width="420" height="500" fill="url(#g2)" />
        <circle cx="212" cy="150" r="96" fill="#FBF8F3" opacity=".62" />
        <path d="M0 372c96-40 168-24 244 14 34 17 96 20 176 8v106H0Z" fill="#CEDCC9" opacity=".8" />
        <g stroke="#4F6B55" strokeWidth="1.5" fill="none" opacity=".48" strokeLinecap="round">
          <path d="M212 470V210" />
          <path d="M212 320c-44-4-66-30-62-70 42 4 66 30 62 70Z" />
          <path d="M212 268c4-42 32-64 74-60-4 42-32 64-74 60Z" />
          <path d="M212 392c-32-2-48-20-46-48 30 2 48 20 46 48Z" />
        </g>
      </svg>
    </div>
  );
}

export function PhotoPortret() {
  return (
    <div className="photo photo-arch">
      <svg
        className="ph"
        viewBox="0 0 430 510"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Portret van Marieke, opvoed- en kindercoach bij Tot Bloei"
      >
        <defs>
          <linearGradient id="g4" x1=".1" y1="0" x2=".9" y2="1">
            <stop offset="0" stopColor="#E7CBC6" />
            <stop offset=".45" stopColor="#EFE2D2" />
            <stop offset="1" stopColor="#E7EEE3" />
          </linearGradient>
        </defs>
        <rect width="430" height="510" fill="url(#g4)" />
        <circle cx="215" cy="196" r="104" fill="#FBF8F3" opacity=".55" />
        <path d="M0 396c98-46 172-30 250 10 36 19 100 22 180 8v96H0Z" fill="#CEDCC9" opacity=".72" />
        <g stroke="#4F6B55" strokeWidth="1.5" fill="none" opacity=".45" strokeLinecap="round">
          <path d="M340 480V330" />
          <path d="M340 400c-30 0-46-16-46-42 26 0 46 16 46 42Z" />
          <path d="M340 366c0-26 18-42 44-42 0 26-18 42-44 42Z" />
          <path d="M74 484V392" />
          <path d="M74 434c-22-2-32-16-30-36 20 2 32 16 30 36Z" />
        </g>
      </svg>
    </div>
  );
}

export function PhotoBlobB() {
  return (
    <div className="photo photo-blob-b">
      <svg
        className="ph"
        viewBox="0 0 460 470"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Kind dat buiten speelt tussen gras en bloemen"
      >
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2=".6" y2="1">
            <stop offset="0" stopColor="#EFE2D2" />
            <stop offset=".5" stopColor="#E7EEE3" />
            <stop offset="1" stopColor="#CEDCC9" />
          </linearGradient>
        </defs>
        <rect width="460" height="470" fill="url(#g3)" />
        <circle cx="120" cy="112" r="62" fill="#F7EDE0" opacity=".8" />
        <path d="M0 330c110-44 190-26 262 16 40 23 106 28 198 14v110H0Z" fill="#9FB79C" opacity=".5" />
        <g stroke="#4F6B55" strokeWidth="1.5" fill="none" opacity=".5" strokeLinecap="round">
          <path d="M136 440v-96M96 440v-64M176 440v-72" />
          <path d="M136 372c-24 0-36-12-36-32 20 0 36 12 36 32Z" />
          <path d="M176 388c18-2 28-14 26-30-18 2-28 14-26 30Z" />
        </g>
        <g fill="#E7CBC6" opacity=".9">
          <circle cx="330" cy="300" r="7" />
          <circle cx="352" cy="286" r="7" />
          <circle cx="352" cy="314" r="7" />
          <circle cx="374" cy="300" r="7" />
        </g>
        <circle cx="352" cy="300" r="4.5" fill="#F3DCC8" />
      </svg>
    </div>
  );
}

const placeholders = ['blobA', 'blobB', 'arch'];

/**
 * Toont óf een tijdelijke illustratie (blobA/blobB/arch) óf een echte foto uit
 * Supabase Storage. De organische uitsnede zit op de omliggende div en blijft
 * in beide gevallen hetzelfde.
 */
export function Photo({
  variant,
  label,
  vorm = 'blob-a',
}: {
  variant: string;
  label?: string;
  vorm?: 'blob-a' | 'blob-b' | 'arch';
}) {
  if (placeholders.includes(variant)) {
    if (variant === 'blobA') return <PhotoBlobA />;
    if (variant === 'blobB') return <PhotoBlobB />;
    return <PhotoArch label={label} />;
  }

  const basis = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`
    : '';

  return (
    <div className={`photo photo-${vorm}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basis}/${variant}`} alt={label ?? ''} loading="lazy" decoding="async" />
    </div>
  );
}
