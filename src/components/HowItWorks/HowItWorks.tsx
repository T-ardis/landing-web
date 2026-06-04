import Image from 'next/image';
import styles from './HowItWorks.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

const STEPS = [
  {
    num: '01',
    label: 'Paste',
    title: 'Drop in a product link.',
    body: 'Found a sofa on IKEA, Wayfair, or almost anywhere else? Paste the URL, or upload a photo. No account needed.',
    image: '/screens/app-home.png',
    alt: 'TARDIS app screen for pasting a product link or uploading a photo',
    position: 'top center',
  },
  {
    num: '02',
    label: 'Generate',
    title: 'Get a true-scale 3D model.',
    body: 'Our AI reads the product and builds an interactive 3D model with exact dimensions: width, height, depth.',
    image: '/screens/app-product.png',
    alt: 'TARDIS product card showing a sofa with exact dimensions',
    position: 'top center',
  },
  {
    num: '03',
    label: 'Place',
    title: 'See it in your room with AR.',
    body: 'Walk around it at real size, in your real light, in your actual room, on iPhone or Android — right from the browser.',
    image: '/screens/app-viewer.png',
    alt: 'Interactive 3D sofa model in the TARDIS viewer',
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
            Three steps to see furniture in your room.
          </h2>
          <p className={`lead ${styles.headLead}`}>
            From product page to your living room in under a minute.
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
          <a href={APP_URL} className="btn btn-primary">
            Try it yourself <span className="arrow">→</span>
          </a>
          <p className={styles.footNote}>Free · no signup · the screenshots above are the actual product</p>
        </div>
      </div>
    </section>
  );
}
