'use client';

import { useEffect, useRef, useState } from 'react';
import useScrambleHover from '@/hooks/useScrambleHover';
import styles from './Nav.module.css';

const LINKS = [
  { label: 'The Problem',   href: '#problem' },
  { label: 'The Solution',  href: '#how-it-works' },
  { label: 'Features',      href: '#features' },
  { label: 'Market',        href: '#market' },
  { label: 'Team',          href: '#team' },
  { label: 'Roadmap',       href: '#roadmap' },
];

export default function Nav() {
  const logoRef    = useScrambleHover<HTMLSpanElement>('TARDIS');
  const [isOpen,     setIsOpen]     = useState(false);
  const [isHidden,   setIsHidden]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!isOpen) setIsHidden(y > lastScrollY.current && y > 100);
      setIsScrolled(y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      <nav
        className={[
          styles.nav,
          isScrolled ? styles.scrolled : '',
          isHidden   ? styles.hidden   : '',
        ].join(' ')}
      >
        <span ref={logoRef} className={styles.logo}>TARDIS</span>

        <div className={styles.right}>
          <a href="#cta" className={styles.ctaBtn} onClick={handleLinkClick('#cta')}>
            Get Early Access
          </a>

          <button
            className={`${styles.menuBtn} ${isOpen ? styles.menuBtnActive : ''}`}
            onClick={() => setIsOpen(o => !o)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span className={styles.menuBtnIcon} aria-hidden="true">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </span>
            <span className={styles.menuBtnText}>{isOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </nav>

      {/* Full-screen overlay — expands from top-right like Toby */}
      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} aria-hidden={!isOpen}>
        <div className={styles.overlayInner}>
          <nav className={styles.overlayNav}>
            {LINKS.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                className={styles.overlayLink}
                style={{ transitionDelay: isOpen ? `${0.08 + i * 0.055}s` : '0s' }}
                onClick={handleLinkClick(href)}
                tabIndex={isOpen ? 0 : -1}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#cta"
            className={styles.overlayCta}
            style={{ transitionDelay: isOpen ? '0.45s' : '0s' }}
            onClick={handleLinkClick('#cta')}
            tabIndex={isOpen ? 0 : -1}
          >
            Get Early Access →
          </a>
        </div>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <rect width="14" height="1.5" fill="currentColor" />
      <rect y="4.25" width="14" height="1.5" fill="currentColor" />
      <rect y="8.5" width="14" height="1.5" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
