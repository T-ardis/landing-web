'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './UseCases.module.css';

const cases = [
  {
    tag: 'Moving in',
    title: 'See your new place furnished before move-in day.',
    body: 'Visit the empty apartment once, scan every room in 60 seconds, and use the AR furniture visualizer to plan what fits where — before the keys are even yours.',
    keyword: 'see furniture in your room before moving in',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 14L16 4l12 10v14H4V14z" />
        <path d="M12 28v-8h8v8" />
        <path d="M2 16l14-12 14 12" />
      </svg>
    ),
  },
  {
    tag: 'Redecorating',
    title: 'Test new furniture against what you already own.',
    body: 'Scan your current room, keep the sofa you love, and try a new rug, coffee table, or lamp next to it. See how furniture looks in your room without moving a single thing.',
    keyword: 'visualize new furniture in your existing room',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 22h24" />
        <path d="M6 22V12c0-1 1-2 2-2h16c1 0 2 1 2 2v10" />
        <path d="M6 16h20" />
        <path d="M10 22v3M22 22v3" />
        <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="23" cy="13" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    tag: 'Renting',
    title: 'Furnish a rental without measuring twice.',
    body: 'Don\'t order a sofa that won\'t fit through the stairwell. Scan the room, place the exact IKEA, Wayfair or CB2 piece in AR, and check every clearance before you click buy.',
    keyword: 'try furniture in a rental room before buying',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="4" y="6" width="24" height="20" rx="1" />
        <path d="M4 11h24" />
        <path d="M10 6V4M22 6V4" />
        <path d="M11 18l3 3 7-7" />
      </svg>
    ),
  },
  {
    tag: 'Renovating',
    title: 'Plan an entire renovation room-by-room.',
    body: 'LiDAR-scan every room, design each space with AR furniture placement, and see how rooms flow into each other. One unified design, one multi-brand cart, one delivery window.',
    keyword: 'augmented reality furniture placement for renovation',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 16l6-12h12l6 12" />
        <path d="M4 16v12h24V16" />
        <path d="M14 28v-8h4v8" />
        <path d="M4 16h24" />
      </svg>
    ),
  },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.set([`.${styles.wordInner}`, `.${styles.card}`], { y: '0%', opacity: 1 });
          return;
        }

        gsap.from(section.querySelectorAll(`.${styles.wordInner}`), {
          y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });

        gsap.from(section.querySelectorAll(`.${styles.card}`), {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
        });
      }, section);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="use-cases" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <ScrambleText text="Use Cases" className={styles.eyebrow} />
        <h2 className={styles.headline} aria-label="Wherever you live, see it furnished first.">
          {['Wherever', 'you', 'live,'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <br />
          {['see', 'it', 'furnished'].map((w, i) => (
            <span key={`b-${i}`} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <span className={styles.wordWrap}>
            <span className={`${styles.wordInner} ${styles.accentWord}`}>first.</span>
          </span>
        </h2>

        <p className={styles.sub}>
          Four real-world reasons people use an AR furniture visualizer — and what TARDIS does about each.
        </p>

        <div className={styles.grid}>
          {cases.map((c, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">{c.icon}</span>
                <span className={styles.tag}>{c.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardBody}>{c.body}</p>
              <span className={styles.cardKeyword} aria-hidden="true">{c.keyword}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
