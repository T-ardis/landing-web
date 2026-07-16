import Image from 'next/image';
import styles from './MockupAdmin.module.css';

const ROWS = [
  { sku: 'HAL-SEC-OAT', product: 'Halden Sectional', thumb: '/mockups/thumb-sofa.webp' },
  { sku: 'HAL-3S-OAT', product: 'Halden Sofa', thumb: '/mockups/thumb-sofa.webp' },
  { sku: 'HAL-LOV-OAT', product: 'Halden Loveseat', thumb: '/mockups/thumb-sofa.webp' },
];

// Stylised control-plane view: the product→model catalog with live AR analytics
// and the install snippet — content modelled on the real HAVEN demo products.
export default function MockupAdmin() {
  return (
    <div className={`frame ${styles.frame}`}>
      <div className="frameBar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="urlbar">admin.tardis-ai.com/catalog</span>
      </div>

      <div className={styles.body}>
        <nav className={styles.nav} aria-hidden="true">
          <span className={styles.brand}>TARDIS</span>
          <span className={`${styles.navItem} ${styles.active}`}>Catalog</span>
          <span className={styles.navItem}>Embed</span>
          <span className={styles.navItem}>Analytics</span>
          <span className={styles.navItem}>Billing</span>
        </nav>

        <div className={styles.main}>
          <div className={styles.stat}>
            <span className="statnum">12,480</span>
            <span className="statlab">AR opens this week</span>
          </div>

          <ul className={styles.list}>
            {ROWS.map((r) => (
              <li key={r.sku} className={styles.item}>
                <Image className={styles.thumb} src={r.thumb} width={40} height={40} alt="" sizes="40px" />
                <span className={styles.pinfo}>
                  <span className={styles.pname}>{r.product}</span>
                  <span className={styles.meta}>{r.sku}</span>
                </span>
                <span className={styles.status}>
                  <i aria-hidden="true" />
                  Ready
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.snippet}>
            <span className={styles.snipLabel}>Install</span>
            <code>&lt;script src=&quot;https://cdn.tardis-ai.com/embed.js&quot; data-key=&quot;pk_live_…&quot; async&gt;&lt;/script&gt;</code>
          </div>
        </div>
      </div>
    </div>
  );
}
