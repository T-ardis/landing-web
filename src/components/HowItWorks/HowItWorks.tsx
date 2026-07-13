import MockupPDP from '@/components/mockups/MockupPDP/MockupPDP';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: '01',
    label: 'Embed',
    title: 'Drop in one script.',
    body: 'Paste a single <script> tag into your product-page template. No SDK, no rebuild, nothing for shoppers to install.',
  },
  {
    num: '02',
    label: 'Map',
    title: 'Point it at your catalog.',
    body: 'We auto-generate a 3D model from each product photo — object AR for furniture, surface AR for wall coverings. No manual per-SKU modelling.',
  },
  {
    num: '03',
    label: 'Shoppers see it',
    title: 'Shoppers view it in their room.',
    body: 'A “View in your room” button appears in the buy box. Tap it and the product is there, at true scale, right in the browser.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">How it works</span>
          <h2 className={styles.heading}>
            Live in an afternoon, not a quarter.
          </h2>
          <p className={`lead ${styles.headLead}`}>
            One script tag, your existing catalog, and a button in the buy box —
            no rebuild, no per-SKU modelling.
          </p>
        </div>

        <div className={styles.body}>
          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.num} className={styles.step}>
                <div className={styles.stepHead}>
                  <span className={styles.num}>{s.num}</span>
                  <span className={styles.stepLabel}>{s.label}</span>
                </div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </li>
            ))}
          </ol>

          <div className={styles.visual}>
            <div className={styles.glow} aria-hidden="true" />
            <MockupPDP />
          </div>
        </div>

        <div className={styles.foot}>
          <a href="#cta" className="btn btn-primary">
            Book a demo <span className="arrow">→</span>
          </a>
          <p className={styles.footNote}>Object AR is live · surface AR is preview-grade · see it running in the demo</p>
        </div>
      </div>
    </section>
  );
}
