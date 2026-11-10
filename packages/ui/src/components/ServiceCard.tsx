import { Icon, type IconName } from './Icon.js';

export interface ServiceCardProps {
  icon: IconName;
  title: string;
  description: string;
  href?: string;
}

export function ServiceCard({ icon, title, description, href = '/servicios' }: ServiceCardProps) {
  return (
    <a className="accessone-service-card" href={href}>
      <span className="accessone-service-card__icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <div className="accessone-service-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="accessone-service-card__link" aria-hidden="true">Explorar <b>↗</b></span>
    </a>
  );
}

