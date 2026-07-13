import styles from './MockupAR.module.css';

type Props = {
  variant?: 'object' | 'surface';
};

export default function MockupAR({ variant = 'object' }: Props) {
  const isObject = variant === 'object';

  return (
    <figure className={styles.phone}>
      <div className={styles.screen}>
        {isObject ? (
          <div className={`${styles.scene} ${styles.room}`} aria-hidden="true">
            <span className={styles.floor} />
            <span className={styles.sofa}>
              <span className={styles.back} />
              <span className={styles.seat} />
              <span className={styles.armL} />
              <span className={styles.armR} />
            </span>
            <span className={styles.shadow} />
            <span className={styles.reticle} />
          </div>
        ) : (
          <div className={`${styles.scene} ${styles.wall}`} aria-hidden="true">
            <span className={styles.pattern} />
            <span className={styles.seam} />
          </div>
        )}

        <span className={styles.badge} aria-hidden="true">AR</span>
        <span className={`chip ${styles.chip}`}>
          {isObject ? 'True to scale' : 'Preview-grade'}
        </span>
      </div>
    </figure>
  );
}
