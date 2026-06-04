'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cta.module.css';

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  referrer: string;
}

function getUtmParams(): UtmParams {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get('utm_source')   ?? '',
    utm_medium:   p.get('utm_medium')   ?? '',
    utm_campaign: p.get('utm_campaign') ?? '',
    utm_term:     p.get('utm_term')     ?? '',
    utm_content:  p.get('utm_content')  ?? '',
    referrer:     document.referrer     ?? '',
  };
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Cta() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const utmRef   = useRef<UtmParams | null>(null);

  useEffect(() => {
    utmRef.current = getUtmParams();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const email = inputRef.current?.value ?? '';
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email, ...utmRef.current }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.href = `${APP_URL}?email=${encodeURIComponent(email)}`;
        }, 2000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className={styles.section}>
      <div className="wrap">
        <div className={styles.inner}>
          <span className="eyebrow">Early access</span>

          <h2 className={styles.headline}>
            Stop guessing. <span className="au">Start placing.</span>
          </h2>

          <p className={`lead ${styles.sub}`}>
            The visualizer is free today. Join the waitlist to get room
            scanning and full-room AI styling as they ship.
          </p>

          {submitted ? (
            <div className={styles.success}>
              <div className={styles.checkWrap} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.5 14.5l4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className={styles.successTitle}>You&apos;re on the list.</p>
              <p className={styles.successSub}>Redirecting you to the app…</p>
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
                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? 'Sending…' : 'Get early access'}
                </button>
              </form>

              <div className={styles.altRow}>
                <a href={APP_URL} className={styles.altLink}>
                  Or try the visualizer free — no signup
                </a>
              </div>
            </>
          )}

          {error && <p className={styles.errorNote}>Something went wrong — please try again.</p>}
        </div>
      </div>
    </section>
  );
}
