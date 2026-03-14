'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './Features.module.css';

const rows = [
  { feature: 'LiDAR 3D Scanning',    tardis: 'Full room capture',   ikea: 'Single-item AR',    houzz: '—',               wayfair: '—' },
  { feature: 'Multi-brand Commerce', tardis: 'Neutral platform',    ikea: 'IKEA only',         houzz: 'Referral links',  wayfair: 'Wayfair only' },
  { feature: 'AI-powered Design',    tardis: 'Real-time AI styling',ikea: '—',                 houzz: 'Basic matching',  wayfair: 'Limited' },
  { feature: 'Unified Checkout',     tardis: 'One cart, all brands',ikea: 'IKEA only',         houzz: '—',               wayfair: 'Wayfair only' },
  { feature: 'Photorealistic Preview',tardis: 'In your actual room',ikea: 'AR placement',      houzz: 'Room visualizer', wayfair: '—' },
];

export default function Features() {
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
          gsap.set([`.${styles.wordInner}`, `.${styles.row}`], { y: '0%', opacity: 1, x: 0 });
          return;
        }

        // Headline word wipe
        gsap.from(section.querySelectorAll(`.${styles.wordInner}`), {
          y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });

        // Table rows: staggered left-wipe clip-path
        gsap.utils.toArray<HTMLElement>(`.${styles.row}`).forEach((row, i) => {
          gsap.fromTo(row,
            { clipPath: 'inset(0 100% 0 0)', x: -10, opacity: 0 },
            {
              clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1,
              duration: 0.65, ease: 'power2.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: row, start: 'top 90%' },
            },
          );
        });

      }, section);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="features" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <ScrambleText text="Why TARDIS" className={styles.eyebrow} />
        <h2 className={styles.headline} aria-label="Built different. By design.">
          {['Built', 'different.'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <br />
          {['By', 'design.'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
        </h2>

        <div className={styles.tableWrap}>

          <table className={styles.table}>
            <colgroup>
              <col /><col /><col /><col /><col />
            </colgroup>
            <thead>
              <tr>
                <th>Feature</th>
                <th className={styles.thTardis}>TARDIS</th>
                <th>IKEA Place</th>
                <th>Houzz</th>
                <th>Wayfair</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={styles.row}>
                  <td className={styles.featureLabel}>{row.feature}</td>
                  <td className={styles.colTardis}>
                    <span className={styles.check}>✓</span>{' '}{row.tardis}
                  </td>
                  <td className={row.ikea === '—' ? styles.cross : styles.partial}>{row.ikea}</td>
                  <td className={row.houzz === '—' ? styles.cross : styles.partial}>{row.houzz}</td>
                  <td className={row.wayfair === '—' ? styles.cross : styles.partial}>{row.wayfair}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
