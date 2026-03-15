'use client';

import { useRef, useState } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';
import styles from './Cta.module.css';

export default function Cta() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(false);
  const inputRef  = useRef<HTMLInputElement>(null);
  const innerRef  = useRevealOnScroll<HTMLDivElement>({ y: 50, duration: 0.9, stagger: 0.12 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const email = inputRef.current?.value ?? '';
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
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
          <div className={styles.successState}>
            <div className={styles.checkWrap} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8.5 14.5l4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className={styles.successTitle}>You&apos;re on the list.</p>
            <p className={styles.successSub}>We&apos;ll reach out when early access opens.</p>
          </div>
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
            {error
              ? <p className={styles.errorNote}>Something went wrong — please try again.</p>
              : <p className={styles.note}>No spam. Unsubscribe anytime.</p>
            }
          </>
        )}
      </div>
    </section>
  );
}
