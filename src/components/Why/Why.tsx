import styles from './Why.module.css';

const POINTS = [
  {
    title: 'One script, any page',
    body: 'Drop a single tag onto your existing product pages. No SDK, no rebuild, and no page dependencies — the widget stays isolated and fail-safe.',
  },
  {
    title: 'True to scale',
    body: 'Models carry each product’s real dimensions, so the piece a shopper places is the piece that ships — width, height, and depth.',
  },
  {
    title: 'Object and surface AR',
    body: 'Object AR for furniture and décor is live today; preview-grade surface AR previews rugs and wall coverings in the room. Native AR on iPhone and Android, right in the browser — no app required.',
  },
];

export default function Why() {
  return (
    <section id="why" className={styles.section}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.intro}>
            <span className="eyebrow">Why TARDIS</span>
            <h2 className={styles.heading}>
              Shoppers buy with confidence when they can see it in their room.
            </h2>
            <p className={`lead ${styles.lead}`}>
              Furniture and home goods are among the biggest purchases people
              make without trying them first — and a product photo can&apos;t
              tell them whether a piece fits. AR that lives on your product
              page, not in a separate app, builds confidence and cuts returns,
              without asking shoppers to download anything.
            </p>
          </div>

          <div className={styles.points}>
            {POINTS.map((p, i) => (
              <div key={p.title} className={styles.point}>
                <span className={styles.pointNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.pointTitle}>{p.title}</h3>
                  <p className={styles.pointBody}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.roadmap}>
          <span className={styles.roadmapLabel}>On the roadmap</span>
          <p className={styles.roadmapText}>
            A native App Clip with LiDAR room scanning is in development for
            even higher-fidelity placement. Object AR and preview-grade
            surface AR are live on the web today.
          </p>
        </div>
      </div>
    </section>
  );
}
