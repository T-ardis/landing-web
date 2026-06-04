import styles from './Why.module.css';

const POINTS = [
  {
    title: 'True to scale',
    body: 'Models carry the product’s real dimensions. The sofa you place is the sofa that arrives — width, height, and depth.',
  },
  {
    title: 'Any store, one tool',
    body: 'Retailer AR tools only show their own catalog. TARDIS works with links from almost anywhere, so you can compare an IKEA sofa next to a CB2 chair in the same room.',
  },
  {
    title: 'Nothing to install',
    body: 'Runs in Safari and Chrome. AR placement uses the native AR systems already on your phone — no app required.',
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
              Furniture is the biggest purchase people make without trying it first.
            </h2>
            <p className={`lead ${styles.lead}`}>
              A product photo can&apos;t tell you whether that sofa will fit
              your room or overwhelm it. Returns are slow, expensive, and often
              impossible. Seeing a piece at true scale in your own space before
              checkout removes the guesswork.
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
            An iOS app with LiDAR room scanning is in development — scan your
            room once, let AI style the whole space, and check out across
            brands in one cart.
          </p>
        </div>
      </div>
    </section>
  );
}
