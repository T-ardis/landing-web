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
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

export default function Cta() {
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const utmRef   = useRef<UtmParams | null>(null);

  useEffect(() => {
    utmRef.current = getUtmParams();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = inputRef.current?.value ?? '';

    // Fire-and-forget the Notion lead write — we no longer wait on it.
    const payload = JSON.stringify({ email, ...utmRef.current });
    let sent = false;
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      sent = navigator.sendBeacon('/api/waitlist', blob);
    }
    if (!sent) {
      fetch('/api/waitlist', {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }

    setSubmitted(true);
    const dest = CALENDLY_URL
      ? `${CALENDLY_URL}${CALENDLY_URL.includes('?') ? '&' : '?'}email=${encodeURIComponent(email)}`
      : `${APP_URL}?email=${encodeURIComponent(email)}`;
    setTimeout(() => {
      window.location.href = dest;
    }, 1200);
  };

  return (
    <section id="cta" className={styles.section}>
      <div className="wrap">
        <div className={styles.inner}>
          <span className="eyebrow">Book a demo</span>

          <h2 className={styles.headline}>
            See it on <span className="au">your product pages.</span>
          </h2>

          <p className={`lead ${styles.sub}`}>
            Add TARDIS to your store and let shoppers see items in their room.
            Drop your email and we&apos;ll set up a demo on your catalog.
          </p>

          {submitted ? (
            <div className={styles.success}>
              <div className={styles.checkWrap} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.5 14.5l4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className={styles.successTitle}>Thanks — we&apos;ll be in touch.</p>
              <p className={styles.successSub}>{CALENDLY_URL ? 'Opening the demo booking…' : 'Taking you to the live demo…'}</p>
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
                <button type="submit" className={styles.submit}>
                  Book a demo
                </button>
              </form>

              <div className={styles.altRow}>
                <a href={APP_URL} className={styles.altLink}>
                  Or open the live demo →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
