import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the TARDIS team — product questions, press, and partnership inquiries.',
  alternates: { canonical: 'https://www.tardis-ai.com/contact' },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://www.tardis-ai.com/contact',
  name: 'Contact TARDIS',
  isPartOf: { '@id': 'https://www.tardis-ai.com/#website' },
  about: { '@id': 'https://www.tardis-ai.com/#organization' },
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://www.tardis-ai.com/#organization',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warsaw',
      addressCountry: 'PL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'founders@tardis-ai.com',
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Nav />
      <main className={styles.main}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <span className="eyebrow">Contact</span>
            <h1 className={styles.title}>
              Talk to the <span className="au">team.</span>
            </h1>
            <p className={`lead ${styles.sub}`}>
              We&apos;re a two-person team and we answer our own email.
              Whatever you&apos;re writing about, you&apos;ll hear back from a
              founder within one to two business days.
            </p>
          </header>

          <div className={styles.grid}>
            <a href="mailto:founders@tardis-ai.com" className={`${styles.card} ${styles.cardWide}`}>
              <h2 className={styles.cardLabel}>Email</h2>
              <p className={styles.cardBody}>
                Product questions, feedback, press, and partnerships all land
                in one inbox, read by both founders.
              </p>
              <span className={styles.cardEmail}>founders@tardis-ai.com</span>
            </a>

            <div className={styles.card}>
              <h2 className={styles.cardLabel}>Based in</h2>
              <p className={styles.cardBody}>
                Warsaw, Poland — working with users and retail catalogs
                worldwide.
              </p>
              <span className={styles.cardEmail}>Response within 1–2 business days</span>
            </div>
          </div>

          <div className={styles.founders}>
            <h2 className={styles.foundersTitle}>Founders</h2>
            <div className={styles.foundersRow}>
              <a
                href="https://www.linkedin.com/in/illia-lisovskyi/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.founder}
              >
                Illia Lisovskyi <span className={styles.founderRole}>Co-founder</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yevhenii-riabokin-10a104257"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.founder}
              >
                Yevhenii Riabokin <span className={styles.founderRole}>Co-founder</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
