import styles from './Retailers.module.css';

const RETAILERS = [
  { name: 'IKEA',     note: 'all SKUs' },
  { name: 'Wayfair',  note: 'live catalog' },
  { name: 'CB2',      note: '+ Crate & Barrel' },
  { name: 'West Elm', note: '+ Pottery Barn' },
  { name: 'Article',  note: 'direct import' },
  { name: 'Amazon',   note: 'any image' },
];

interface Props {
  heading?: string;
}

export default function Retailers({
  heading = 'Works with every store you already shop',
}: Props) {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">
            <span className="dot" />
            One cart, every brand
          </span>
          <p className={styles.headingText}>{heading}</p>
        </div>

        <div className={styles.strip}>
          {RETAILERS.map((r) => (
            <div key={r.name} className={styles.cell}>
              <div className={styles.name}>{r.name}</div>
              <small className={`caption ${styles.note}`}>{r.note}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
