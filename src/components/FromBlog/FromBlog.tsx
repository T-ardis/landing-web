import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import styles from './FromBlog.module.css';

export default function FromBlog() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <span className="eyebrow">From the blog</span>
            <h2 className={styles.heading}>
              Guides on AR furniture shopping.
            </h2>
          </div>
          <Link href="/blog" className={styles.all}>
            All posts →
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.meta}>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.desc}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
