import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>TARDIS</span>
        <span className={styles.copy}>© 2025 TARDIS. All rights reserved.</span>
        <a href="mailto:hello@tardis.app" className={styles.email}>hello@tardis.app</a>
      </div>
    </footer>
  );
}
