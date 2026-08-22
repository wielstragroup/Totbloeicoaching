'use client';

import { useState } from 'react';
import type { Faq as FaqItem } from '@/lib/content';

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div className="faq-item reveal" key={item.vraag}>
            <button
              className="faq-q"
              id={`q${i}`}
              aria-expanded={expanded}
              aria-controls={`a${i}`}
              onClick={() => setOpen(expanded ? null : i)}
            >
              {item.vraag}
              <span className="faq-icon" aria-hidden="true" />
            </button>
            <div className="faq-a" id={`a${i}`} role="region" aria-labelledby={`q${i}`}>
              <div>
                <p>{item.antwoord}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
