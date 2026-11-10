import type { LandingBrandConfig } from '../config.js';
import { BrandLogo } from './BrandLogo.js';

export interface FooterProps {
  brand: LandingBrandConfig;
}

export function Footer({ brand }: FooterProps) {
  return <footer>
    <a className="brand" href="/" aria-label={`${brand.name}, inicio`}>
      <BrandLogo brand={brand} background="dark" />
    </a>
    <p>{brand.name}</p>
    <span>© {new Date().getFullYear()}</span>
  </footer>;
}

