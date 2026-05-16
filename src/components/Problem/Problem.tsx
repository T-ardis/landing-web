'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './Problem.module.css';

const quotes = [
  {
    text: 'Got scammed by a designer. After paying upfront, he charged an extra $2,500 just to release the files.',
    source: 'r/InteriorDesign',
    upvotes: '2.8k upvotes',
    href: 'https://www.reddit.com/r/InteriorDesign/comments/1akbhqr/got_scammed_by_a_designer/',
  },
  {
    text: 'Does this kitchen layout make sense? I\'ve been staring at it for three weeks and I genuinely can\'t tell anymore.',
    source: 'r/kitchens',
    upvotes: '1.9k upvotes',
    href: 'https://www.reddit.com/r/kitchens/comments/1rioli0/does_this_kitchen_layout_make_sense/',
  },
  {
    text: 'House renovations are making me depressed. I am doing everything by myself. Every step forward, five steps back.',
    source: 'r/DIYUK',
    upvotes: '4.2k upvotes',
    href: 'https://www.reddit.com/r/DIYUK/comments/1ciqed2/house_renovations_are_making_me_depressed/',
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
      const isMobile = window.innerWidth <= 768;

      if (prefersReduced || isMobile) {
        // On mobile, CSS handles card visibility (clip-path: none !important)
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
    <section ref={wrapperRef} className={styles.wrapper} id="problem">
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.inner}>

          {/* Background parallax word */}
          <span className={styles.bgWord} aria-hidden="true">BROKEN</span>

          <div className={styles.left}>
            <ScrambleText text="The Problem" className={styles.eyebrow} />
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
                  <a
                    href={q.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardSource}
                  >{q.source}</a>
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
          <p className={styles.noteSub}>
            Buying furniture online is guesswork. Product photos lie about scale, color, and light.
            Without an AR furniture visualizer to see furniture in your room before you click buy,
            every purchase is a $30B-a-year gamble — and most people just live with the mistake.
          </p>
        </div>
      </div>
    </section>
  );
}
