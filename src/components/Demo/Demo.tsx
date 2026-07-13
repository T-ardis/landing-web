import Image from 'next/image';
import styles from './Demo.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Demo() {
  return (
    <section id="demo" className={styles.section}>
      <div className="wrap">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className="eyebrow">Live demo</span>
            <h2 className={styles.heading}>
              This isn&apos;t a mockup. <span className="au">It&apos;s the live viewer.</span>
            </h2>
            <p className={`lead ${styles.lead}`}>
              The AR viewer your shoppers get is live today. Open the demo,
              spin a real true-scale 3D model, and place it in a room — the
              same experience that runs from one script on a product page.
            </p>
            <div className={styles.ctaRow}>
              <a href={APP_URL} className="btn btn-primary">
                Open the live demo <span className="arrow">→</span>
              </a>
            </div>
            <p className={styles.note}>Object AR live · preview-grade surface AR · desktop, iPhone, and Android</p>
          </div>

          <a href={APP_URL} className={styles.browser} aria-label="Open the TARDIS live demo">
            <span className={styles.browserBar} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.urlBar}>app.tardis-ai.com</span>
            </span>
            <Image
              src="/screens/app-desktop.jpeg"
              alt="The TARDIS web app on desktop"
              width={1440}
              height={900}
              sizes="(max-width: 880px) 92vw, 620px"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
