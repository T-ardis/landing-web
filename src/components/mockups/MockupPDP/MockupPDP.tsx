import styles from './MockupPDP.module.css';

export default function MockupPDP() {
  return (
    <div className={`frame ${styles.frame}`}>
      <div className="frameBar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="urlbar">shop.example.com/halden-sectional-sofa</span>
      </div>

      <div className={styles.page}>
        <div className={styles.media} aria-hidden="true">
          <span className={styles.hero} />
          <span className={styles.strip}>
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className={styles.info}>
          <span className={styles.brand}>Living Room · Sectionals</span>
          <h3 className={styles.title}>Halden Sectional Sofa</h3>
          <div className={styles.price}>$1,899</div>
          <p className={styles.desc}>
            Deep four-seat sectional in oat bouclé. Kiln-dried hardwood frame,
            feather-blend cushions.
          </p>
          <span className={`arpill ${styles.pill}`}>
            <span className={styles.cube} aria-hidden="true" />
            View in your room
          </span>
          <span className={styles.buy}>Add to cart</span>
        </div>
      </div>
    </div>
  );
}
