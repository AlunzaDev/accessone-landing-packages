import { useEffect, useRef, useState } from 'react';
import { Icon, type IconName } from './Icon.js';

export interface ServiceCatalogItem {
  icon: IconName;
  title: string;
  description: string;
  items?: string[];
}

export interface ServiceCatalogProps {
  services: ServiceCatalogItem[];
  /** Texto del botón del modal. */
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Catálogo de servicios: cards del mismo tamaño con efecto glass.
 * Al hacer clic en una card se abre un modal con la información completa.
 */
export function ServiceCatalog({
  services,
  ctaLabel = 'Conversemos sobre tu proyecto',
  ctaHref = '/contacto',
}: ServiceCatalogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<ServiceCatalogItem | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  const close = () => setActive(null);

  return (
    <div className="accessone-glass-catalog">
      <div className="accessone-glass-catalog__grid">
        {services.map((service) => (
          <button
            key={service.title}
            type="button"
            className="accessone-glass-card"
            onClick={() => setActive(service)}
            aria-haspopup="dialog"
          >
            <span className="accessone-glass-card__icon" aria-hidden="true">
              <Icon name={service.icon} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="accessone-glass-card__more">
              Ver detalle <b aria-hidden="true">{'→'}</b>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="accessone-glass-modal"
        aria-labelledby="accessone-glass-modal-title"
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {active ? (
          <div className="accessone-glass-modal__panel">
            <button type="button" className="accessone-glass-modal__close" onClick={close} aria-label="Cerrar">
              {'×'}
            </button>
            <span className="accessone-glass-card__icon" aria-hidden="true">
              <Icon name={active.icon} />
            </span>
            <h3 id="accessone-glass-modal-title">{active.title}</h3>
            <p>{active.description}</p>
            {active.items?.length ? (
              <ul>
                {active.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            <a className="accessone-glass-modal__cta" href={ctaHref}>
              {ctaLabel} <b aria-hidden="true">{'↗'}</b>
            </a>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
