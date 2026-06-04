import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from './Legal.module.css';

interface LegalProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function Legal({ title, updated, children }: LegalProps) {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.updated}>Last updated: {updated}</p>
          </header>
          <article className={styles.body}>{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
