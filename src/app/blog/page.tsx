import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tips on home renovation, AI interior design, LiDAR room scanning, and smart furniture shopping — from the TARDIS team.',
  alternates: {
    canonical: 'https://www.tardis-ai.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.tardis-ai.com/blog#blog',
    url: 'https://www.tardis-ai.com/blog',
    name: 'TARDIS Blog',
    description: metadata.description,
    publisher: {
      '@type': 'Organization',
      name: 'TARDIS',
      url: 'https://www.tardis-ai.com',
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://www.tardis-ai.com/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className={styles.main}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Blog</span>
            <h1 className={styles.headline}>Ideas &amp; Insights</h1>
            <p className={styles.sub}>
              On home renovation, AI design, and building the future of how
              people furnish their spaces.
            </p>
          </header>

          <div className={styles.grid}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.card}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardMeta}>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardDesc}>{post.description}</p>
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={styles.cardArrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
