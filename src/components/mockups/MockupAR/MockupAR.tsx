import Image from 'next/image';
import styles from './MockupAR.module.css';

// Real capture of the TARDIS AR viewer showing the product's generated 3D model.
export default function MockupAR() {
  return (
    <figure className={styles.phone}>
      <div className={styles.screen}>
        <Image
          className={styles.shot}
          src="/mockups/ar.png"
          width={557}
          height={820}
          alt="The product shown at true scale in the shopper’s space through the AR viewer"
          sizes="(max-width: 880px) 62vw, 300px"
          priority
        />
        <span className={styles.badge} aria-hidden="true">AR</span>
        <span className={`chip ${styles.chip}`}>True to scale</span>
      </div>
    </figure>
  );
}
