import Link from 'next/link';
import styles from './Footer.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';
const CONTACT_EMAIL = 'founders@tardis-ai.com';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              TARDIS
            </Link>
            <p className={styles.tagline}>
              TARDIS is an AR furniture visualizer. Paste a product link from
              almost any store, get a true-scale 3D model, and see it in your
              room with AR — before you buy.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Product</h4>
            <a href={APP_URL} className={styles.link}>Open the app</a>
            <Link href="/#how" className={styles.link}>How it works</Link>
            <Link href="/#demo" className={styles.link}>See it live</Link>
            <Link href="/#faq" className={styles.link}>FAQ</Link>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Company</h4>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Legal</h4>
            <Link href="/privacy" className={styles.link}>Privacy policy</Link>
            <Link href="/terms" className={styles.link}>Terms of service</Link>
          </div>
        </div>

        <div className={styles.meta}>
          <span>© 2026 TARDIS · Warsaw, Poland · All rights reserved.</span>
          <span className={styles.disclaimer}>
            TARDIS is an independent product and is not affiliated with or
            endorsed by IKEA, Wayfair, CB2, or any other retailer. All
            trademarks belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  );
}
