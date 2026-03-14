'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './BusinessModel.module.css';

const streams = [
  { pct: 0.40, label: '40%', title: 'Subscription', desc: 'Premium features for power users and design enthusiasts. Recurring revenue with strong retention mechanics.' },
  { pct: 0.30, label: '30%', title: 'Commerce',     desc: 'Revenue share on every product sold through the platform. Scales directly with user purchase volume.' },
  { pct: 0.20, label: '20%', title: 'B2B SaaS',     desc: 'White-label tools for furniture brands and retailers. High-margin enterprise contracts.' },
  { pct: 0.10, label: '10%', title: 'Advertising',  desc: 'Native brand partnerships within the design experience. Value-add placements, not noise.' },
];

export default function BusinessModel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Word-by-word headline wipe
        gsap.from(sectionRef.current!.querySelectorAll(`.${styles.wordInner}`), {
          y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });

        gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card, i) => {
          gsap.fromTo(card,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0 0% 0)', opacity: 1,
              duration: 0.8, ease: 'power2.out', delay: i * 0.11,
              scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 82%' },
            },
          );

          const fill = card.querySelector<HTMLElement>(`.${styles.barFill}`);
          const pct = parseFloat(card.dataset.pct || '0');
          if (fill) {
            gsap.to(fill, {
              scrollTrigger: { trigger: card, start: 'top 85%' },
              scaleX: pct, duration: 1.3, ease: 'power2.out', delay: 0.3 + i * 0.1,
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="business-model" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <ScrambleText text="Business Model" className={styles.eyebrow} />
        <h2 className={styles.headline} aria-label="Four streams. One platform.">
          {['Four', 'streams.'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <br />
          {['One', 'platform.'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          {streams.map((s, i) => (
            <div key={i} className={styles.card} data-pct={s.pct}>
              <div className={styles.cardPct}>{s.label}</div>
              <div className={styles.cardTitle}>{s.title}</div>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.bar}>
                <div className={styles.barFill} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
