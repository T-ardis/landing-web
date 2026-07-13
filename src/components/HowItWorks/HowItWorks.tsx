import Image from 'next/image';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: '01',
    label: 'Embed',
    title: 'Drop in one script tag.',
    body: 'Add a single <script> to your product-page template. No SDK, no rebuild, and no new dependencies on the page — the widget stays isolated and fail-safe.',
    image: '/screens/app-home.png',
    alt: 'A product page with the TARDIS AR button embedded',
    position: 'top center',
  },
  {
    num: '02',
    label: 'Map',
    title: 'Point it at your catalog.',
    body: 'Match each product to a generated true-scale 3D model (furniture) or a preview-grade surface (rugs, wall coverings), managed from your dashboard.',
    image: '/screens/app-product.png',
    alt: 'A product mapped to a true-scale 3D model with exact dimensions',
    position: 'top center',
  },
  {
    num: '03',
    label: 'Shoppers see it',
    title: 'Shoppers view it in their room.',
    body: 'A shopper taps the AR button and sees the item at real size in their space — object AR for furniture, preview-grade surface AR for wall coverings. Native AR on iPhone and Android, right in the browser.',
    image: '/screens/app-viewer.png',
    alt: 'A shopper viewing a true-scale 3D model in AR through the browser',
    position: 'center 58%',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">How it works</span>
          <h2 className={styles.heading}>
            Three steps to AR on every product page.
          </h2>
          <p className={`lead ${styles.headLead}`}>
            From one script tag to shoppers placing your products in their
            own room.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s) => (
            <article key={s.num} className={styles.step}>
              <div className={styles.shot}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  width={390}
                  height={s.image.includes('product') ? 478 : 844}
                  sizes="(max-width: 880px) 90vw, 360px"
                  style={{ objectPosition: s.position }}
                />
              </div>
              <div className={styles.stepHead}>
                <span className={styles.num}>{s.num}</span>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </article>
          ))}
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
