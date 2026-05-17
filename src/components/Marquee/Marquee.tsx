import styles from './Marquee.module.css';

interface Props {
  items?: string[];
  reverse?: boolean;
}

const DEFAULT = [
  'LiDAR scan',
  'AI room styling',
  'AR in browser',
  'IKEA · Wayfair · CB2',
  'One cart, every brand',
  'Free to try',
];

export default function Marquee({ items = DEFAULT, reverse = false }: Props) {
  const all = [...items, ...items, ...items];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {all.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.sep}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
