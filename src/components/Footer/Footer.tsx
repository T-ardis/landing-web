import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.brand}>TARDIS</Link>
          <nav className={styles.links} aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={styles.link}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copy}>&copy; 2026 TARDIS. All rights reserved.</span>
          <a href="mailto:tardis.ai.com@gmail.com" className={styles.email}>tardis.ai.com@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
