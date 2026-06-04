import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './about.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export const metadata: Metadata = {
  title: 'About TARDIS — The Company Behind the AR Furniture Visualizer',
  description:
    'TARDIS builds AI tools that let people see furniture in their homes before they buy it. Learn about the company, the product, and the founders.',
  alternates: { canonical: 'https://www.tardis-ai.com/about' },
  openGraph: {
    type: 'website',
    url: 'https://www.tardis-ai.com/about',
    siteName: 'TARDIS',
    title: 'About TARDIS — The Company Behind the AR Furniture Visualizer',
    description:
      'TARDIS builds AI tools that let people see furniture in their homes before they buy it. Learn about the company, the product, and the founders.',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://www.tardis-ai.com/about',
  name: 'About TARDIS',
  description:
    'TARDIS builds AI tools that let people see furniture in their homes before they buy it.',
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
    body: 'The web app goes live: paste a product link or photo, get a true-scale 3D model, and place it in your room with AR. Free, no download.',
  },
  {
    year: '2026',
    title: 'Open early access',
    body: 'The visualizer is free and open to everyone while we build toward the full-room experience. The waitlist gets each new feature first.',
  },
  {
    year: 'Next',
    title: 'The full room',
    body: 'An iOS app with LiDAR room scanning is in development — scan once, let AI style the whole space across retailers, and check out in one cart.',
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
              Buying furniture shouldn&apos;t be <span className="au">a leap of faith.</span>
            </h1>
            <p className={`lead ${styles.sub}`}>
              TARDIS is an AR furniture visualizer founded in 2024. We turn a
              furniture product link into a true-scale 3D model you can see in
              your own room, so the piece that arrives is the piece you
              expected.
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.inner}>
            <div className={styles.split}>
              <h2 className={styles.blockTitle}>What we believe</h2>
              <div className={styles.blockBody}>
                <p>
                  Furniture is one of the largest purchases people make, and
                  almost everyone makes it blind: a product photo, a tape
                  measure, and hope. Retailer AR tools only show their own
                  catalog; real rooms are furnished from many stores.
                </p>
                <p>
                  We&apos;re building the missing layer: one visualizer that
                  works across stores, so you can design your actual room with
                  the actual products you&apos;re considering, and trust what
                  you see.
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
                  The visualizer is live and free — paste a product link and
                  place it in your room in under a minute.
                </p>
              </div>
              <a href={APP_URL} className="btn btn-primary">
                Open the app <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
