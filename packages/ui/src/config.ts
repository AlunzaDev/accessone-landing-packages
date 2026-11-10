export interface BrandLogoSet {
  /** Logo para colocarse sobre fondos claros. */
  onLight: string;
  /** Logo para colocarse sobre fondos oscuros. */
  onDark: string;
}

export interface LandingContact {
  email?: string;
  phone?: string;
  location?: string;
}

export interface NavigationLink {
  href: string;
  label: string;
}

export interface LandingBrandConfig {
  name: string;
  region: string;
  locale: string;
  logos: BrandLogoSet;
  contact?: LandingContact;
}

