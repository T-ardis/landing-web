import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './about.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export const metadata: Metadata = {
  title: 'About TARDIS — The Company Behind the AR Furniture Visualizer',
  description:
    'TARDIS gives retailers an embeddable AR furniture visualizer — one script that lets shoppers see products at true scale in their own room. Learn about the company, the product, and the founders.',
  alternates: { canonical: 'https://www.tardis-ai.com/about' },
  openGraph: {
    type: 'website',
    url: 'https://www.tardis-ai.com/about',
    siteName: 'TARDIS',
    title: 'About TARDIS — The Company Behind the AR Furniture Visualizer',
    description:
      'TARDIS gives retailers an embeddable AR furniture visualizer — one script that lets shoppers see products at true scale in their own room. Learn about the company, the product, and the founders.',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://www.tardis-ai.com/about',
  name: 'About TARDIS',
  description:
    'TARDIS builds an embeddable AR layer that lets retailers show shoppers furniture at true scale in their own room.',
  isPartOf: { '@id': 'https://www.tardis-ai.com/#website' },
  about: { '@id': 'https://www.tardis-ai.com/#organization' },
};

const FOUNDERS = [
  {
    initials: 'IL',
    name: 'Illia Lisovskyi',
    role: 'Co-founder · Finance & Strategy',
    bio: 'Previously at P&G and Deloitte. Handles strategy, finance, and go-to-market.',
    linkedin: 'https://www.linkedin.com/in/illia-lisovskyi/',
  },
  {
    initials: 'YR',
    name: 'Yevhenii Riabokin',
    role: 'Co-founder · Engineering & Growth',
    bio: 'Software engineer with a growth background. Builds the product and the pipeline behind it.',
    linkedin: 'https://www.linkedin.com/in/yevhenii-riabokin-10a104257',
  },
];

const MILESTONES = [
  {
    year: '2024',
    title: 'Founded',
    body: 'TARDIS starts with a simple frustration: you can preview a $12 phone case in AR, but not a $2,000 sofa from the store you actually shop at.',
  },
  {
    year: '2025',
    title: 'The visualizer ships',
    body: 'The web viewer goes live: turn a product into a true-scale 3D model and place it in a real room with AR — in the browser, no download.',
  },
  {
    year: '2026',
    title: 'The embeddable layer',
    body: 'The viewer becomes an embeddable product: retailers add one script and offer AR on every product page, with the 3D models generated straight from product photos.',
  },
  {
    year: 'Next',
    title: 'Native App Clip',
    body: 'A native App Clip with LiDAR room scanning is in development for higher-fidelity placement, building on the object AR that is live today.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Nav />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <span className="eyebrow">About TARDIS</span>
            <h1 className={styles.headline}>
              Every product page should let you <span className="au">see it in your room.</span>
            </h1>
            <p className={`lead ${styles.sub}`}>
              TARDIS is an embeddable AR furniture visualizer founded in 2024.
              We give retailers one script that lets their shoppers see a
              product at true scale in their own room — so the piece that
              arrives is the piece they expected.
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.inner}>
            <div className={styles.split}>
              <h2 className={styles.blockTitle}>What we believe</h2>
              <div className={styles.blockBody}>
                <p>
                  Furniture and home goods are among the largest purchases
                  people make, and almost everyone makes them blind: a product
                  photo, a tape measure, and hope. Shoppers who can&apos;t
                  picture a piece in their space hesitate, or buy and return.
                </p>
                <p>
                  We&apos;re building the missing layer: AR that lives on the
                  product page itself, dropped in with one script, so any
                  retailer can let shoppers see products at true scale in their
                  own room and buy with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.inner}>
            <h2 className={styles.sectionLabel}>The story so far</h2>
            <div className={styles.timeline}>
              {MILESTONES.map((m) => (
                <div key={m.year} className={styles.milestone}>
                  <span className={styles.year}>{m.year}</span>
                  <h3 className={styles.milestoneTitle}>{m.title}</h3>
                  <p className={styles.milestoneBody}>{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.inner}>
            <h2 className={styles.sectionLabel}>Founders</h2>
            <div className={styles.team}>
              {FOUNDERS.map((f) => (
                <div key={f.initials} className={styles.member}>
                  <div className={styles.avatar} aria-hidden="true">{f.initials}</div>
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{f.name}</h3>
                    <p className={styles.memberRole}>{f.role}</p>
                    <p className={styles.memberBio}>{f.bio}</p>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkedin}
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.inner}>
            <div className={styles.ctaCard}>
              <div>
                <h2 className={styles.ctaTitle}>See it for yourself.</h2>
                <p className={styles.ctaBody}>
                  The AR viewer is live — open the demo and place a real
                  product in a room in under a minute.
                </p>
              </div>
              <a href={`${APP_URL}demo`} className="btn btn-primary">
                See the live demo <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
