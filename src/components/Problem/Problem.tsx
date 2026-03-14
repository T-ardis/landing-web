'use client';

import { useEffect, useRef } from 'react';
import styles from './Problem.module.css';

const quotes = [
  {
    text: 'House renovations are making me depressed. I am doing everything by myself. Every step forward, five steps back.',
    source: 'r/HomeImprovement',
    upvotes: '4.2k upvotes',
  },
  {
    text: 'Got scammed by a designer. After paying upfront, he charged an extra $2,500 just to release the files.',
    source: 'r/InteriorDesign',
    upvotes: '2.8k upvotes',
  },
  {
    text: 'Does this kitchen layout make sense? I\'ve been staring at it for three weeks and I genuinely can\'t tell anymore.',
    source: 'r/malelivingspace',
    upvotes: '1.9k upvotes',
  },
];

export default function Problem() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const sticky  = stickyRef.current;
      if (!wrapper || !sticky) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set([`.${styles.headline}`, `.${styles.card}`, `.${styles.note}`], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' });
        return;
      }

      const ctx = gsap.context(() => {
        // ── Headline word-by-word wipe-up ──
        const words = wrapper.querySelectorAll<HTMLElement>(`.${styles.wordInner}`);
        gsap.from(words, {
          scrollTrigger: { trigger: wrapper, start: 'top 80%' },
          y: '105%',
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.06,
        });

        // ── Background "BROKEN" parallax ──
        gsap.to(`.${styles.bgWord}`, {
          scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: 2 },
          y: '-15%',
        });

        // ── Quotes: sequential clip-path reveal scrubbed to scroll ──
        const TOTAL_SCROLL = wrapper.offsetHeight - window.innerHeight;
        quotes.forEach((_, i) => {
          const card = wrapper.querySelector<HTMLElement>(`.${styles.card}[data-index="${i}"]`);
          if (!card) return;
          // stagger entry start at 20%, 42%, 64% of total scroll
          const startPct = 0.18 + i * 0.22;
          const endPct   = startPct + 0.18;

          gsap.fromTo(card,
            { clipPath: 'inset(0 0 100% 0)', y: 30, opacity: 0 },
            {
              clipPath: 'inset(0 0 0% 0)',
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: wrapper,
                start: `top+=${TOTAL_SCROLL * startPct} top`,
                end:   `top+=${TOTAL_SCROLL * endPct}   top`,
                scrub: 1.5,
              },
            },
          );
        });

        // ── Bottom note ──
        gsap.fromTo(`.${styles.note}`,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: `.${styles.note}`, start: 'top 88%' },
          },
        );
      }, wrapper);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} id="problem">
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.inner}>

          {/* Background parallax word */}
          <span className={styles.bgWord} aria-hidden="true">BROKEN</span>

          <div className={styles.left}>
            <span className={styles.eyebrow}>The Problem</span>
            <h2 className={styles.headline} aria-label="Home renovation is broken.">
              {['Home', 'renovation', 'is'].map((w, i) => (
                <span key={i} className={styles.wordWrap}>
                  <span className={styles.wordInner}>{w}</span>
                  {' '}
                </span>
              ))}
              <span className={styles.wordWrap}>
                <span className={`${styles.wordInner} ${styles.accentWord}`}>broken.</span>
              </span>
            </h2>
          </div>

          <div className={styles.right}>
            {quotes.map((q, i) => (
              <blockquote key={i} className={styles.card} data-index={i}>
                <p className={styles.cardText}>&ldquo;{q.text}&rdquo;</p>
                <div className={styles.cardMeta}>
                  <span className={styles.cardSource}>{q.source}</span>
                  <span className={styles.cardUpvotes}>{q.upvotes}</span>
                </div>
              </blockquote>
            ))}
          </div>

        </div>
      </div>

      {/* Note below the sticky area */}
      <div className={styles.noteWrap}>
        <div className={styles.noteInner}>
          <p className={styles.note}>
            People spend thousands on renovation.<br />
            They still get it <em>wrong.</em> Every time.
          </p>
        </div>
      </div>
    </div>
  );
}
