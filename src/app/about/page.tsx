import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Market from '@/components/Market/Market';
import BusinessModel from '@/components/BusinessModel/BusinessModel';
import Team from '@/components/Team/Team';
import Roadmap from '@/components/Roadmap/Roadmap';
import Footer from '@/components/Footer/Footer';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About TARDIS — Company, Team, and Roadmap',
  description:
    'The team, market opportunity, business model, and roadmap behind TARDIS — the AR furniture visualizer for iPhone.',
  alternates: { canonical: 'https://www.tardis-ai.com/about' },
  openGraph: {
    type: 'website',
    url: 'https://www.tardis-ai.com/about',
    siteName: 'TARDIS',
    title: 'About TARDIS — Company, Team, and Roadmap',
    description:
      'The team, market opportunity, business model, and roadmap behind TARDIS — the AR furniture visualizer for iPhone.',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://www.tardis-ai.com/about',
  name: 'About TARDIS',
  description:
    'The company, team, market opportunity, and roadmap behind TARDIS — the AR furniture visualizer for iPhone.',
  isPartOf: { '@id': 'https://www.tardis-ai.com/#website' },
  about: { '@id': 'https://www.tardis-ai.com/#app' },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Nav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>About TARDIS</p>
            <h1 className={styles.headline}>
              An AR furniture visualizer, <br />
              <em>built to ship.</em>
            </h1>
            <p className={styles.sub}>
              The market we&apos;re entering, how we make money, who we are, and what&apos;s next.
              For product details, head back to the <a href="/" className={styles.link}>homepage</a>.
            </p>
          </div>
        </section>

        <Market />
        <BusinessModel />
        <Team />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
