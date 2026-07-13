import styles from './Why.module.css';

const POINTS = [
  {
    title: 'Auto-generated assets',
    body: '3D from a photo, not a modelling studio — catalogue-wide, not just hero SKUs.',
  },
  {
    title: 'Object + surface in one',
    body: 'Furniture and wall coverings from a single embed and key.',
  },
  {
    title: 'No app, no SDK',
    body: 'One script for you; nothing to install for the shopper.',
  },
];

export default function Why() {
  return (
    <section id="why" className={styles.section}>
      <div className="wrap">
        <div className={styles.intro}>
          <span className="eyebrow">Why TARDIS</span>
          <h2 className={styles.heading}>
            The AR is easy. The <span className="au">assets</span> are the hard part.
          </h2>
          <p className={`lead ${styles.lead}`}>
            Roomvo covers surfaces. Cylindo and Threekit make beautiful
            furniture 3D — by hand, per SKU. That manual pipeline is why AR
            usually stops at your hero products. TARDIS generates the asset
            straight from a product photo, so AR reaches the whole catalogue —
            and it&apos;s the only embed that does object <span className="au">and</span> surface
            from one script.
          </p>
        </div>

        <div className={styles.points}>
          {POINTS.map((p) => (
            <div key={p.title} className={`card-flat ${styles.point}`}>
              <h3 className={styles.pointTitle}>{p.title}</h3>
              <p className={styles.pointBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
