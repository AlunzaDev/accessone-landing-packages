import type { ReactNode } from 'react';

export type IconName = 'access' | 'parking' | 'valet' | 'maintenance' | 'support' | 'design' | 'wash' | 'ticket' | 'clean' | 'clock' | 'mail' | 'phone' | 'location';

const paths: Record<IconName, ReactNode> = {
  access: <><path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"/><path d="M12 4v16"/></>,
  parking: <><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>,
  valet: <><path d="M5 17h14M7 17l1-5h8l1 5"/><path d="M9 12l1-3h4l1 3M8 20h.01M16 20h.01"/></>,
  maintenance: <><path d="M14.7 6.3a4 4 0 0 0-5-5L7 4l3 3 2.7-2.7a4 4 0 0 0 5 5L10 17l-3-3 7.7-7.7Z"/><path d="M5 13l-3 3 6 6 3-3"/></>,
  support: <><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></>,
  design: <><path d="M4 20h16M6 16l10-10 2 2L8 18H6v-2Z"/><path d="M14 4l2-2 6 6-2 2"/></>,
  wash: <><path d="M12 3s5 5.2 5 10a5 5 0 0 1-10 0c0-4.8 5-10 5-10Z"/><path d="M9 14c.5 1.2 1.4 2 3 2"/></>,
  ticket: <><path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z"/><path d="M12 8v8"/></>,
  clean: <><path d="M14 3l7 7-10 10H4v-7L14 3Z"/><path d="M11 6l7 7M4 20h16"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  phone: <><path d="M6.6 3h3l1.5 5-2 1.5a15 15 0 0 0 5.4 5.4l1.5-2 5 1.5v3c0 1.4-1.1 2.6-2.5 2.6C10.5 20 4 13.5 4 5.5 4 4.1 5.2 3 6.6 3Z"/></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
};

export interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

