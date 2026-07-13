import styles from './Modes.module.css';

const MODES = [
  {
    label: 'Object AR',
    tier: 'Solved today',
    title: 'Furniture, lighting, décor',
    body: 'Each product becomes a generated 3D model your shopper places in the room. Native AR Quick Look on iOS, Scene Viewer on Android. High-fidelity and shipping today.',
  },
  {
    label: 'Surface AR',
    tier: 'Preview-grade on web',
    title: 'Wall coverings, paint, tile',
    body: 'Mapped live onto the shopper’s real wall through the camera — true colour and pattern, preview-grade on the web. Native-grade via the iOS App Clip tier.',
  },
];

export default function Modes() {
  return (
    <section id="modes" className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">Two modes, one embed</span>
          <h2 className={styles.heading}>
            Furniture and surfaces. <span className="au">Same script, one bill.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {MODES.map((m) => (
            <div key={m.label} className={`card ${styles.mode}`}>
              <div className={styles.modeHead}>
                <span className={styles.modeLabel}>{m.label}</span>
                <span className="chip">{m.tier}</span>
              </div>
              <h3 className={styles.modeTitle}>{m.title}</h3>
              <p className={styles.modeBody}>{m.body}</p>
            </div>
          ))}
        </div>

        <p className={`caption ${styles.foot}`}>
          The two modes are the pricing tiers — one integration, pay for the
          capability you use.
        </p>
      </div>
    </section>
  );
}
