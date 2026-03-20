import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.tardis-ai.com/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://www.tardis-ai.com/blog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

/** Minimal markdown → HTML (headings, bold, italic, lists, paragraphs, links, numbered lists) */
function md(src: string): string {
  return src
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => {
      if (m.includes('<ul>')) return m;
      return `<ol>${m}</ol>`;
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
    .replace(/(?:^|\n{2,})([^<\n][^\n]+)(?=\n{2,}|$)/g, '\n<p>$1</p>\n')
    .trim();
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  /* ── Structured data ── */
  const jsonLdGraph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `https://www.tardis-ai.com/blog/${post.slug}`,
      image: `https://www.tardis-ai.com/blog/${post.slug}/opengraph-image`,
      author: { '@type': 'Organization', name: 'TARDIS', url: 'https://www.tardis-ai.com' },
      publisher: {
        '@type': 'Organization',
        name: 'TARDIS',
        url: 'https://www.tardis-ai.com',
        logo: { '@type': 'ImageObject', url: 'https://www.tardis-ai.com/apple-touch-icon.png' },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.tardis-ai.com/blog/${post.slug}`,
      },
      keywords: post.tags.join(', '),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tardis-ai.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.tardis-ai.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.tardis-ai.com/blog/${post.slug}` },
      ],
    },
  ];

  if (post.faqs && post.faqs.length > 0) {
    jsonLdGraph.push({
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  const jsonLd = { '@context': 'https://schema.org', '@graph': jsonLdGraph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/blog" className={styles.back}>
              &larr; All posts
            </Link>
            <div className={styles.meta}>
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
            <h1 className={styles.headline}>{post.title}</h1>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: md(post.content) }}
          />

          {/* FAQ section — visible to users, matches FAQPage schema */}
          {post.faqs && post.faqs.length > 0 && (
            <section className={styles.faqSection}>
              <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
              <dl className={styles.faqList}>
                {post.faqs.map((faq) => (
                  <div key={faq.question} className={styles.faqItem}>
                    <dt className={styles.faqQuestion}>{faq.question}</dt>
                    <dd className={styles.faqAnswer}>{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Related posts — internal linking */}
          {relatedPosts.length > 0 && (
            <section className={styles.relatedSection}>
              <h2 className={styles.relatedHeading}>Keep Reading</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className={styles.relatedCard}
                  >
                    <span className={styles.relatedTitle}>{rp.title}</span>
                    <span className={styles.relatedMeta}>{rp.readTime}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className={styles.articleFooter}>
            <Link href="/blog" className={styles.back}>
              &larr; All posts
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
