import styles from './ProofBand.module.css';

const STATS = [
  {
    num: '+94%',
    lab: 'average conversion lift for products with 3D/AR (Shopify)',
  },
  {
    num: '−40%',
    lab: 'fewer returns with AR/3D visualization (industry studies)',
  },
  {
    num: '+28%',
    lab: "higher average order value — Wayfair 'View in Room'",
  },
];

export default function ProofBand() {
  return (
    <section id="proof" className={styles.section}>
      <div className="wrap">
        <ul className={styles.grid}>
          {STATS.map((s) => (
            <li key={s.num} className={styles.stat}>
              <span className="statnum">{s.num}</span>
              <span className="statlab">{s.lab}</span>
            </li>
          ))}
        </ul>
        <p className={`caption ${styles.foot}`}>
          Figures from published industry studies — Shopify, Wayfair, IKEA
          Place, Snap/Publicis 2025. Not TARDIS&apos;s own results.
        </p>
      </div>
    </section>
  );
}
