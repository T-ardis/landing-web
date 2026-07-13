import styles from './LogoStrip.module.css';

const RETAILERS = ['IKEA', 'Wayfair', 'CB2', 'West Elm', 'Article', 'Amazon'];

export default function LogoStrip() {
  return (
    <section className={styles.strip} aria-label="Compatible retailers">
      <div className="wrap">
        <p className={styles.label}>Works with product pages from stores like</p>
        <ul className={styles.list}>
          {RETAILERS.map((name) => (
            <li key={name} className={styles.item}>{name}</li>
          ))}
          <li className={`${styles.item} ${styles.more}`}>+ most other stores</li>
        </ul>
      </div>
    </section>
  );
}
