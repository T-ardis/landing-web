'use client';

import { useEffect, useRef } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle(styles.scrolled, window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={navRef} className={styles.nav}>
      <span className={styles.logo}>TARDIS</span>
      <a href="#cta" className={styles.cta}>Get Early Access</a>
    </nav>
  );
}
