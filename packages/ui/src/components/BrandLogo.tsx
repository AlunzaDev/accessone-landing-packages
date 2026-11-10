import type { LandingBrandConfig } from '../config.js';

export interface BrandLogoProps {
  brand: LandingBrandConfig;
  background?: 'light' | 'dark';
  className?: string;
}

export function BrandLogo({ brand, background = 'light', className }: BrandLogoProps) {
  const src = background === 'light' ? brand.logos.onLight : brand.logos.onDark;

  return <img className={className} src={src} alt={brand.name} />;
}

