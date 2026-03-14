'use client';

import { useRef, useState } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';
import styles from './Cta.module.css';

export default function Cta() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const inputRef  = useRef<HTMLInputElement>(null);
  const innerRef  = useRevealOnScroll<HTMLDivElement>({ y: 50, duration: 0.9, stagger: 0.12 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xojklzyz', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className={styles.section}>
      <div ref={innerRef} className={styles.inner}>
        <ScrambleText text="Early Access" className={styles.eyebrow} />
        <h2 className={styles.headline}>
          Build your<br /><em>dream home.</em>
        </h2>
        <p className={styles.sub}>
          Join the waitlist. Be first to scan, design, and buy — all in one place.
        </p>

        {submitted ? (
          <p className={styles.success}>You&apos;re on the list. We&apos;ll be in touch.</p>
        ) : (
          <>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="email"
                name="email"
                className={styles.input}
                placeholder="your@email.com"
                required
                aria-label="Email address"
              />
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? 'Sending…' : 'Get Early Access'}
              </button>
            </form>
            <p className={styles.note}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </section>
  );
}
