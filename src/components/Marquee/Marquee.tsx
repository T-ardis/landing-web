import styles from './Marquee.module.css';

interface Props {
  items?: string[];
  reverse?: boolean;
}

const DEFAULT = ['SCAN', 'STYLE', 'OWN', 'TARDIS', 'LIDAR', 'AI DESIGN', 'ONE CHECKOUT'];

export default function Marquee({ items = DEFAULT, reverse = false }: Props) {
  // Duplicate for seamless loop
  const all = [...items, ...items, ...items];

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {all.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
