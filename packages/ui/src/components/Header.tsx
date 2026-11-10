import { useEffect, useState } from 'react';
import type { LandingBrandConfig, NavigationLink } from '../config.js';
import { BrandLogo } from './BrandLogo.js';

export interface HeaderProps {
  brand: LandingBrandConfig;
  links: readonly NavigationLink[];
  revealAfterScene?: boolean;
}

export function Header({ brand, links, revealAfterScene = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(!revealAfterScene);
  const [docked, setDocked] = useState(!revealAfterScene);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/');
    updatePath();
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  useEffect(() => {
    if (!revealAfterScene) return;

    const updateHeader = () => {
      const sceneEnd = window.innerHeight;
      setVisible(window.scrollY >= sceneEnd - 150);
      setDocked(window.scrollY >= sceneEnd);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, [revealAfterScene]);

  const headerClass = [
    revealAfterScene ? 'home-header' : '',
    visible ? 'is-visible' : '',
    docked ? 'is-docked' : '',
  ].filter(Boolean).join(' ');

  return <header className={headerClass}>
    <a className="brand" href="/" aria-label={`${brand.name}, inicio`}>
      <BrandLogo brand={brand} background="dark" />
    </a>
    <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation">
      {open ? 'Cerrar' : 'Menú'}
    </button>
    <nav id="main-navigation" className={open ? 'open' : ''} aria-label="Navegación principal">
      {links.map(({ href, label }) => {
        const isCurrent = currentPath === href;
        return <a key={href} href={href} aria-current={isCurrent ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>;
      })}
    </nav>
  </header>;
}

