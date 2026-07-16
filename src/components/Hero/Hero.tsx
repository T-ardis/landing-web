import MockupAR from '@/components/mockups/MockupAR/MockupAR';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header id="hero" className={styles.hero}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className="eyebrow">Embeddable AR for product pages</span>
            <h1 className={styles.headline}>
              Shoppers buy what they can{' '}
              <span className="au">see in their room.</span>
            </h1>
            <p className={`lead ${styles.lead}`}>
              TARDIS adds true-to-scale AR to every product page with one
              script. Shoppers tap, point their phone, and see your furniture
              standing in their own space. We generate the 3D model from a
              photo. No app. No SDK. No per-SKU 3D bill.
            </p>

            <div className={styles.ctaRow}>
              <a href="#cta" className="btn btn-primary">
                Book a demo <span className="arrow">→</span>
              </a>
              <a href="#showcase" className="btn btn-ghost">
                See it live
              </a>
            </div>

            <ul className={styles.facts} aria-label="Product highlights">
              <li>One script tag</li>
              <li>3D from a photo</li>
              <li>No app to install</li>
            </ul>
          </div>

          <div className={styles.visual}>
            <div className={styles.glow} aria-hidden="true" />
            <MockupAR />
          </div>
        </div>
      </div>
    </header>
  );
}
