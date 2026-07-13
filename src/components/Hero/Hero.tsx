import Image from 'next/image';
import styles from './Hero.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Hero() {
  return (
    <header id="hero" className={styles.hero}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className="eyebrow">Embeddable AR for product pages</span>
            <h1 className={styles.headline}>
              Let shoppers see it <span className="au">in their room</span> — right on your product page.
            </h1>
            <p className={`lead ${styles.lead}`}>
              TARDIS is an embeddable AR furniture visualizer. Drop one script
              onto your product pages and shoppers tap to see items at true
              scale in their space — object AR for furniture, preview-grade
              surface AR for rugs and wall coverings. No app, no SDK.
            </p>

            <div className={styles.ctaRow}>
              <a href="#cta" className="btn btn-primary">
                Book a demo <span className="arrow">→</span>
              </a>
              <a href={APP_URL} className="btn btn-ghost">
                See it live
              </a>
            </div>

            <ul className={styles.facts} aria-label="Product highlights">
              <li>One script tag</li>
              <li>Object + surface AR</li>
              <li>No app to install</li>
            </ul>
          </div>

          <div className={styles.visual}>
            <div className={styles.glow} aria-hidden="true" />

            <figure className={styles.phone}>
              <div className={styles.phoneScreen}>
                <Image
                  src="/screens/app-viewer.png"
                  alt="The TARDIS app showing an interactive 3D model of a sofa"
                  width={390}
                  height={844}
                  priority
                  sizes="(max-width: 880px) 78vw, 320px"
                />
              </div>
            </figure>

            <figure className={styles.floatCard}>
              <Image
                src="/screens/app-product.png"
                alt="A product card in TARDIS with exact sofa dimensions"
                width={375}
                height={478}
                sizes="(max-width: 880px) 44vw, 200px"
              />
            </figure>
          </div>
        </div>
      </div>
    </header>
  );
}
