import MockupPDP from '@/components/mockups/MockupPDP/MockupPDP';
import MockupAR from '@/components/mockups/MockupAR/MockupAR';
import MockupAdmin from '@/components/mockups/MockupAdmin/MockupAdmin';
import styles from './Showcase.module.css';

export default function Showcase() {
  return (
    <section id="showcase" className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">See it</span>
          <h2 className={styles.heading}>
            What your shoppers — and your team — actually see.
          </h2>
        </div>

        <div className={styles.grid}>
          <figure className={styles.item}>
            <div className={styles.stage}>
              <MockupPDP />
            </div>
            <figcaption className={styles.caption}>
              On the product page — a &ldquo;View in your room&rdquo; button in
              the buy box.
            </figcaption>
          </figure>

          <figure className={styles.item}>
            <div className={styles.stage}>
              <MockupAR />
            </div>
            <figcaption className={styles.caption}>
              In the shopper&apos;s space — true-scale AR, right in the browser.
            </figcaption>
          </figure>

          <figure className={styles.item}>
            <div className={styles.stage}>
              <MockupAdmin />
            </div>
            <figcaption className={styles.caption}>
              In your dashboard — catalogue, embed config, and live AR
              analytics.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
