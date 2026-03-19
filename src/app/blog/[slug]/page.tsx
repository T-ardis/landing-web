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

/** Minimal markdown → HTML (headings, bold, italic, lists, paragraphs, links) */
function md(src: string): string {
  return src
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
    .replace(/(?:^|\n{2,})([^<\n][^\n]+)(?=\n{2,}|$)/g, '\n<p>$1</p>\n')
    .trim();
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://www.tardis-ai.com/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'TARDIS' },
    publisher: {
      '@type': 'Organization',
      name: 'TARDIS',
      url: 'https://www.tardis-ai.com',
    },
    keywords: post.tags,
  };

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
