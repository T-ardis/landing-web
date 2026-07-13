import styles from './MockupAdmin.module.css';

const ROWS = [
  { sku: 'HAL-3S-OAT', product: 'Halden Sofa', mode: 'Object', status: 'Ready' },
  { sku: 'ARLO-SAGE', product: 'Arlo Wallpaper', mode: 'Surface', status: 'Ready' },
  { sku: 'FEN-RUG-2X3', product: 'Fenwick Rug', mode: 'Surface', status: 'Ready' },
];

export default function MockupAdmin() {
  return (
    <div className={`frame ${styles.frame}`}>
      <div className="frameBar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
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

          <table className={styles.table}>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.sku}>
                  <td className={styles.sku}>{r.sku}</td>
                  <td>{r.product}</td>
                  <td>
                    <span className={styles.mode}>{r.mode}</span>
                  </td>
                  <td>
                    <span className={styles.status}>
                      <i aria-hidden="true" />
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.snippet}>
            <span className={styles.snipLabel}>Install</span>
            <code>&lt;script src=&quot;https://cdn.tardis-ai.com/embed.js&quot; data-key=&quot;pk_live_…&quot; async&gt;&lt;/script&gt;</code>
          </div>
        </div>
      </div>
    </div>
  );
}
