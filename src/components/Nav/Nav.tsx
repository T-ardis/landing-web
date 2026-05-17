'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Nav.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

const SECTION_LINKS = [
  { label: 'Scan',     hash: '#scan' },
  { label: 'Studio',   hash: '#studio' },
  { label: 'View',     hash: '#view' },
  { label: 'FAQ',      hash: '#faq' },
];

export default function Nav() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isHidden, setIsHidden]   = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith('/blog');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!isOpen) setIsHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSectionClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      router.push(`/${hash}`);
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${isHidden ? styles.hidden : ''}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="TARDIS home">
            <span className={styles.mark} aria-hidden="true" />
            <span className={styles.brandName}>TARDIS</span>
          </Link>

          <div className={styles.links}>
            {SECTION_LINKS.map(({ label, hash }) => (
              <a
                key={hash}
                href={isHome ? hash : `/${hash}`}
                onClick={handleSectionClick(hash)}
                className={`${styles.link} ${styles.hideSm}`}
              >
                {label}
              </a>
            ))}
            <Link
              href="/blog"
              className={`${styles.link} ${styles.hideSm} ${isBlog ? styles.linkActive : ''}`}
            >
              Blog
            </Link>
            <a href={APP_URL} className={styles.pill}>
              Try free <span className={styles.pillArrow}>→</span>
            </a>

            <button
              className={`${styles.menuBtn} ${isOpen ? styles.menuBtnActive : ''}`}
              onClick={() => setIsOpen(o => !o)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span aria-hidden="true">
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} aria-hidden={!isOpen}>
        <div className={styles.overlayInner}>
          <nav className={styles.overlayNav}>
            {!isHome && (
              <Link
                href="/"
                className={styles.overlayLink}
                style={{ transitionDelay: isOpen ? '0.05s' : '0s' }}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                Home
              </Link>
            )}
            {SECTION_LINKS.map(({ label, hash }, i) => (
              <a
                key={hash}
                href={isHome ? hash : `/${hash}`}
                className={styles.overlayLink}
                style={{ transitionDelay: isOpen ? `${0.05 + (isHome ? i : i + 1) * 0.05}s` : '0s' }}
                onClick={handleSectionClick(hash)}
                tabIndex={isOpen ? 0 : -1}
              >
                {label}
              </a>
            ))}
            <Link
              href="/blog"
              className={`${styles.overlayLink} ${isBlog ? styles.overlayLinkActive : ''}`}
              style={{ transitionDelay: isOpen ? `${0.05 + (isHome ? SECTION_LINKS.length : SECTION_LINKS.length + 1) * 0.05}s` : '0s' }}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`${styles.overlayLink} ${pathname === '/about' ? styles.overlayLinkActive : ''}`}
              style={{ transitionDelay: isOpen ? `${0.05 + (isHome ? SECTION_LINKS.length + 1 : SECTION_LINKS.length + 2) * 0.05}s` : '0s' }}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              About
            </Link>
          </nav>

          <a
            href={APP_URL}
            className={styles.overlayCta}
            style={{ transitionDelay: isOpen ? '0.42s' : '0s' }}
            tabIndex={isOpen ? 0 : -1}
          >
            Try the AR viewer free →
          </a>
        </div>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <rect width="14" height="1.4" fill="currentColor" />
      <rect y="4.3" width="14" height="1.4" fill="currentColor" />
      <rect y="8.6" width="14" height="1.4" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
