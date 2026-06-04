import Image from 'next/image';
import styles from './Hero.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Hero() {
  return (
    <header id="hero" className={styles.hero}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className="eyebrow">AR furniture visualizer</span>
            <h1 className={styles.headline}>
              See any furniture <span className="au">in your room</span> before you buy it.
            </h1>
            <p className={`lead ${styles.lead}`}>
              Paste a product link from IKEA, Wayfair, CB2, or almost any other
              store. TARDIS builds a true-scale 3D model you can walk around in
              your home with AR. Free, in your browser.
            </p>

            <div className={styles.ctaRow}>
              <a href={APP_URL} className="btn btn-primary">
                Try it free <span className="arrow">→</span>
              </a>
              <a href="#how" className="btn btn-ghost">
                How it works
              </a>
            </div>

            <ul className={styles.facts} aria-label="Product highlights">
              <li>True-scale 3D</li>
              <li>Any store link</li>
              <li>No download</li>
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
