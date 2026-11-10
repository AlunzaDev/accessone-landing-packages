import { useState, type ReactNode } from 'react';

export interface IdentitySection {
  id: string;
  title: string;
  eyebrow: string;
  content: ReactNode;
}

export interface IdentityTabsProps {
  sections: IdentitySection[];
  tag?: string;
  title?: string;
  description?: string;
  ariaLabel?: string;
}

export function IdentityTabs({
  sections,
  tag = 'Lo que nos define',
  title = 'Conoce nuestra esencia.',
  description = 'Recorre cada principio a tu ritmo para descubrir cómo pensamos, trabajamos y generamos valor.',
  ariaLabel = 'Identidad AccessOne',
}: IdentityTabsProps) {
  const [index, setIndex] = useState(0);
  const active = sections[index];

  if (!active) return null;

  const go = (next: number, focus = false) => {
    const nextIndex = (next + sections.length) % sections.length;
    setIndex(nextIndex);
    if (focus) {
      requestAnimationFrame(() => {
        document.getElementById(`tab-${sections[nextIndex].id}`)?.focus();
      });
    }
  };

  return (
    <section className="accessone-identity" aria-labelledby="accessone-identity-title">
      <div className="accessone-identity__heading">
        <p className="accessone-identity__tag">{tag}</p>
        <h2 id="accessone-identity-title">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="accessone-identity__explorer">
        <div className="accessone-identity__nav" role="tablist" aria-label={ariaLabel}>
          {sections.map((section, sectionIndex) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              id={`tab-${section.id}`}
              aria-selected={sectionIndex === index}
              aria-controls={`panel-${section.id}`}
              tabIndex={sectionIndex === index ? 0 : -1}
              onClick={() => go(sectionIndex)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                  event.preventDefault();
                  go(index + 1, true);
                }
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  go(index - 1, true);
                }
                if (event.key === 'Home') {
                  event.preventDefault();
                  go(0, true);
                }
                if (event.key === 'End') {
                  event.preventDefault();
                  go(sections.length - 1, true);
                }
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
        <article
          className="accessone-identity__card"
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          key={active.id}
        >
          <header className="accessone-identity__card-heading">
            <h3>{active.title}</h3>
            <p>{active.eyebrow}</p>
          </header>
          <div className="accessone-identity__body">{active.content}</div>
        </article>
      </div>
    </section>
  );
}
