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
              TARDIS is an embeddable AR furniture visualizer for retailers.
              Add one script to your product pages and shoppers see items in
              their room at true scale, from 3D models we generate out of your
              product photos.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Product</h4>
            <Link href="/#cta" className={styles.link}>Book a demo</Link>
            <a href={`${APP_URL}demo`} className={styles.link}>See the live demo</a>
            <Link href="/#how" className={styles.link}>How it works</Link>
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
