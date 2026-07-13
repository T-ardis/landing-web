import styles from './ForYourStack.module.css';

const PLATFORMS = ['Shopify', 'Magento', 'BigCommerce', 'WooCommerce', 'Custom'];

export default function ForYourStack() {
  return (
    <section id="stack" className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">For your stack</span>
          <h2 className={styles.heading}>Works on the store you already run.</h2>
          <p className={`lead ${styles.lead}`}>
            Shopify, Magento, BigCommerce, or a custom front end — if you can
            add a script tag to your product template, you can add TARDIS.
          </p>
        </div>

        <div className={styles.codeCard}>
          <div className="frameBar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="urlbar">product-template.liquid</span>
          </div>
          <pre className={styles.code}>
            <code>
              <span className={styles.line}>
                <span className={styles.pun}>&lt;</span>
                <span className={styles.tag}>script</span>{' '}
                <span className={styles.attr}>src</span>
                <span className={styles.pun}>=</span>
                <span className={styles.str}>
                  &quot;https://cdn.tardis-ai.com/v1/embed.js&quot;
                </span>{' '}
                <span className={styles.attr}>data-tardis-key</span>
                <span className={styles.pun}>=</span>
                <span className={styles.str}>&quot;pk_live_…&quot;</span>
                <span className={styles.pun}>&gt;&lt;/</span>
                <span className={styles.tag}>script</span>
                <span className={styles.pun}>&gt;</span>
              </span>
              <span className={styles.line}>
                <span className={styles.pun}>&lt;</span>
                <span className={styles.tag}>button</span>{' '}
                <span className={styles.attr}>data-tardis</span>{' '}
                <span className={styles.attr}>data-product</span>
                <span className={styles.pun}>=</span>
                <span className={styles.str}>&quot;SKU-123&quot;</span>
                <span className={styles.pun}>&gt;</span>
                <span className={styles.txt}>View in your room</span>
                <span className={styles.pun}>&lt;/</span>
                <span className={styles.tag}>button</span>
                <span className={styles.pun}>&gt;</span>
              </span>
            </code>
          </pre>
        </div>

        <ul className={styles.platforms} aria-label="Supported platforms">
          {PLATFORMS.map((p) => (
            <li key={p} className="chip">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
