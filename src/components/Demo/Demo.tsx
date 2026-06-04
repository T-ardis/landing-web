import Image from 'next/image';
import styles from './Demo.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Demo() {
  return (
    <section id="demo" className={styles.section}>
      <div className="wrap">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className="eyebrow">Live right now</span>
            <h2 className={styles.heading}>
              This isn&apos;t a mockup. <span className="au">It&apos;s the live app.</span>
            </h2>
            <p className={`lead ${styles.lead}`}>
              The furniture visualizer is live and free. Spin a real 3D model,
              paste your own product link, and place it in your room. No
              signup, no download.
            </p>
            <div className={styles.ctaRow}>
              <a href={APP_URL} className="btn btn-primary">
                Open the app <span className="arrow">→</span>
              </a>
            </div>
            <p className={styles.note}>Works on desktop, iPhone, and Android</p>
          </div>

          <a href={APP_URL} className={styles.browser} aria-label="Open the TARDIS app">
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
