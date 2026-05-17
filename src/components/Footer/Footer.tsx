import Link from 'next/link';
import styles from './Footer.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.headRow}>
          <h2 className={styles.headline}>
            Scan it. <span className="italic">Style it.</span> Own it.
          </h2>
          <div className={styles.headCta}>
            <p className={`lead ${styles.headLead}`}>
              Join the waitlist. Be first to scan, design, and buy — all in one place.
            </p>
            <a href="#cta" className="btn btn-primary">
              Get early access <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.col}>
            <Link href="/" className={styles.brand}>
              <span className={styles.mark} aria-hidden="true" />
              <span>TARDIS</span>
            </Link>
            <p className={styles.tagline}>
              Home design, finally solved. LiDAR scan → AI furniture placement → one-tap multi-brand checkout.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Product</h4>
            <a href={APP_URL} className={styles.link}>
              AR Viewer <span className={styles.linkBadge}>live</span>
            </a>
            <a href="#scan" className={styles.link}>
              3D Room Scan <span className={styles.linkBadgeSoon}>soon</span>
            </a>
            <a href="#studio" className={styles.link}>
              Visualization Tool <span className={styles.linkBadgeSoon}>soon</span>
            </a>
            <a href="#view" className={styles.link}>View in Room</a>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Compatibility</h4>
            <a href="#" className={styles.link}>IKEA</a>
            <a href="#" className={styles.link}>Wayfair</a>
            <a href="#" className={styles.link}>CB2</a>
            <a href="#" className={styles.link}>West Elm</a>
            <a href="#" className={styles.link}>Article</a>
            <a href="#" className={styles.link}>Amazon</a>
          </div>

          <div className={styles.col}>
            <h4 className={styles.h4}>Company</h4>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/blog"  className={styles.link}>Blog</Link>
            <a href="mailto:tardis.ai.com@gmail.com" className={styles.link}>Press</a>
            <a href="mailto:tardis.ai.com@gmail.com" className={styles.link}>For brands</a>
          </div>
        </div>

        <div className={styles.meta}>
          <span>© 2026 TARDIS — patent pending</span>
          <a href="mailto:tardis.ai.com@gmail.com" className={styles.metaEmail}>
            tardis.ai.com@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
