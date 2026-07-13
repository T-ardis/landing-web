import styles from './Problem.module.css';

export default function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.head}>
            <span className="eyebrow">The problem</span>
            <h2 className={styles.heading}>
              Product photos sell the dream. Then the sofa arrives.
            </h2>
          </div>

          <div className={styles.body}>
            <p>
              A studio photo can&apos;t answer the one question that matters:{' '}
              <em>will it work in my room?</em> So shoppers guess — and when the
              scale, colour, or fit is off, they send it back. US furniture
              returns run about $30 billion a year, and the retailer pays twice:
              the lost sale and the reverse-logistics bill.
            </p>
            <p>
              AR moves that moment of truth to before checkout. 66% of shoppers
              say they&apos;re less likely to return an item after seeing it in
              AR (Snap/Publicis, 2025).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
