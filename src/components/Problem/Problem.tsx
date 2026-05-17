import styles from './Problem.module.css';

export default function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.sticky}>
            <span className="eyebrow">
              <span className="dot" />
              The problem
            </span>
            <h2 className={styles.title}>
              <span className="italic">87%</span>
              <br />
              buy on faith.
            </h2>
          </div>

          <div className={styles.copy}>
            <p className={`${styles.line} ${styles.firstLine}`}>
              Furniture is the biggest purchase you make blind.
            </p>
            <p className={styles.line}>
              The sectional won&apos;t clear the door. The dining table eats the walkway.
              The brass lamp clashes with the floor. You find out the day it arrives.
            </p>
            <p className={`${styles.line} ${styles.terraLine}`}>
              We&apos;re done with that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
