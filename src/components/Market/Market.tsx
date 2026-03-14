'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './Market.module.css';

const stats = [
  { prefix: '$', target: 270, suffix: 'K', sublabel: '/mo', label: 'Avg revenue in category', source: 'App Magic', bg: '270K' },
  { prefix: '',  target: 40,  suffix: 'M', sublabel: '+',   label: 'Downloads in category',   source: 'App Magic', bg: '40M' },
  { prefix: '',  target: 150, suffix: '%', sublabel: '+',   label: 'Year-over-year growth',    source: 'App Magic', bg: '150%' },
  { prefix: '',  target: 25,  suffix: '%', sublabel: '+',   label: 'Monthly visitor growth',   source: 'SimilarWeb', bg: '25%' },
];

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

export default function Market() {
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
          gsap.set([`.${styles.headline}`, `.${styles.card}`], { opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0 });
          return;
        }

        // ── Headline word wipe ──
        gsap.from(section.querySelectorAll(`.${styles.wordInner}`), {
          y: '105%',
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });

        // ── Background numbers parallax ──
        gsap.utils.toArray<HTMLElement>(`.${styles.bgNum}`).forEach((el, i) => {
          gsap.fromTo(el,
            { y: '15%', opacity: 0 },
            {
              y: '-8%',
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end:   'bottom top',
                scrub: 1.5 + i * 0.3,
              },
            },
          );
        });

        // ── Card clip-path reveal ──
        gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card, i) => {
          gsap.fromTo(card,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0 0% 0)',
              opacity: 1,
              duration: 0.9,
              ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: { trigger: card, start: 'top 85%' },
            },
          );
        });

      }, section);

      // ── Animated counters scrubbed to scroll ──
      const counters = section.querySelectorAll<HTMLElement>('[data-counter]');
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target   = parseInt(el.dataset.counter || '0', 10);
          const duration = prefersReduced ? 0 : 1800;
          const startTs  = performance.now();

          const tick = (now: number) => {
            const p = Math.min((now - startTs) / duration, 1);
            el.textContent = String(Math.round(easeOut(p) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          duration === 0 ? (el.textContent = String(target)) : requestAnimationFrame(tick);
          io.unobserve(el);
        });
      }, { threshold: 0.4 });

      counters.forEach(el => io.observe(el));

      return () => { ctx.revert(); io.disconnect(); };
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="market" ref={sectionRef} className={styles.section}>

      {/* Giant background numbers — one per stat, scattered */}
      <div className={styles.bgLayer} aria-hidden="true">
        {stats.map((s, i) => (
          <span key={i} className={`${styles.bgNum} ${styles[`bgNum${i}`]}`}>{s.bg}</span>
        ))}
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <ScrambleText text="The Opportunity" className={styles.eyebrow} />
          <h2 className={styles.headline} aria-label="A market already in motion.">
            {['A', 'market', 'already'].map((w, i) => (
              <span key={i} className={styles.wordWrap}>
                <span className={styles.wordInner}>{w}</span>{' '}
              </span>
            ))}
            <br />
            <span className={styles.wordWrap}>
              <span className={`${styles.wordInner} ${styles.accentWord}`}>in motion.</span>
            </span>
          </h2>
        </div>

        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.numRow}>
                <span className={styles.prefix}>{s.prefix}</span>
                <span className={styles.num} data-counter={s.target}>0</span>
                <span className={styles.suffix}>{s.suffix}</span>
                <span className={styles.sublabel}>{s.sublabel}</span>
              </div>
              <span className={styles.label}>{s.label}</span>
              <span className={styles.source}>Source: {s.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
