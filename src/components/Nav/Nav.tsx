'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useScrambleHover from '@/hooks/useScrambleHover';
import styles from './Nav.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '/try';

const SECTION_LINKS = [
  { label: 'The Problem',   hash: '#problem' },
  { label: 'How It Works',  hash: '#how-it-works' },
  { label: 'Features',      hash: '#features' },
  { label: 'Use Cases',     hash: '#use-cases' },
  { label: 'FAQ',           hash: '#faq' },
];

export default function Nav() {
  const logoRef    = useScrambleHover<HTMLSpanElement>('TARDIS');
  const [isOpen,     setIsOpen]     = useState(false);
  const [isHidden,   setIsHidden]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith('/blog');

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

  const handleSectionClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      router.push(`/${hash}`);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      setTimeout(() => {
        document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      router.push('/#cta');
    }
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
        <Link href="/" className={styles.logo}>
          <span ref={logoRef}>TARDIS</span>
        </Link>

        <div className={styles.right}>
          <Link
            href="/blog"
            className={`${styles.blogLink} ${isBlog ? styles.blogLinkActive : ''}`}
          >
            Blog
          </Link>

          <a href={APP_URL} className={styles.tryBtn}>
            Try It Free
          </a>
          <a href="#cta" className={styles.ctaBtn} onClick={handleCtaClick}>
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

      {/* Full-screen overlay — expands from top-right */}
      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} aria-hidden={!isOpen}>
        <div className={styles.overlayInner}>
          <nav className={styles.overlayNav}>
            {!isHome && (
              <Link
                href="/"
                className={styles.overlayLink}
                style={{ transitionDelay: isOpen ? '0.08s' : '0s' }}
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
                style={{ transitionDelay: isOpen ? `${0.08 + (isHome ? i : i + 1) * 0.055}s` : '0s' }}
                onClick={handleSectionClick(hash)}
                tabIndex={isOpen ? 0 : -1}
              >
                {label}
              </a>
            ))}
            <Link
              href="/blog"
              className={`${styles.overlayLink} ${isBlog ? styles.overlayLinkActive : ''}`}
              style={{ transitionDelay: isOpen ? `${0.08 + (isHome ? SECTION_LINKS.length : SECTION_LINKS.length + 1) * 0.055}s` : '0s' }}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`${styles.overlayLink} ${pathname === '/about' ? styles.overlayLinkActive : ''}`}
              style={{ transitionDelay: isOpen ? `${0.08 + (isHome ? SECTION_LINKS.length + 1 : SECTION_LINKS.length + 2) * 0.055}s` : '0s' }}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              About
            </Link>
          </nav>

          <a
            href={isHome ? '#cta' : '/#cta'}
            className={styles.overlayCta}
            style={{ transitionDelay: isOpen ? '0.5s' : '0s' }}
            onClick={handleCtaClick}
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
