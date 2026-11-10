import { Icon, type IconName } from './Icon.js';

export interface ServiceCatalogCardProps {
  icon: IconName;
  sequence: string;
  title: string;
  description: string;
  items?: string[];
  brandLabel?: string;
}

export function ServiceCatalogCard({
  icon,
  sequence,
  title,
  description,
  items,
  brandLabel = 'AccessOne',
}: ServiceCatalogCardProps) {
  return (
    <article className="accessone-service-catalog-card">
      <span className="accessone-service-catalog-card__sequence">{sequence}</span>
      <span className="accessone-service-catalog-card__icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {items?.length ? (
        <ul>
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : null}
      <strong className="accessone-service-catalog-card__brand">
        {brandLabel}
        <span aria-hidden="true">{'\u2197'}</span>
      </strong>
    </article>
  );
}
