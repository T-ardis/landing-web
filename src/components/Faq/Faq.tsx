'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './Faq.module.css';

const faqs = [
  {
    q: 'What is an AR furniture visualizer?',
    a: 'An AR furniture visualizer is an app that uses augmented reality and your phone’s camera (plus a LiDAR depth sensor, when available) to render 3D models of real furniture inside your actual room. You see how a sofa, table, lamp or shelf looks and fits at true scale — before buying.',
  },
  {
    q: 'How do I see furniture in my room before buying?',
    a: 'Open TARDIS on a LiDAR-equipped iPhone, scan your room in 60 seconds, then drop furniture from IKEA, Wayfair, CB2 and more into the scene. The furniture visualizer renders each piece photorealistically in your actual room — color, material, and scale matched to your light.',
  },
  {
    q: 'Is TARDIS the same as Wayfair’s Tardis tool?',
    a: 'No. Wayfair’s Tardis renders Wayfair products inside your room. TARDIS is a multi-brand AR furniture visualizer that pulls real products from IKEA, Wayfair, CB2 and other retailers into one design — with a single unified checkout across every brand.',
  },
  {
    q: 'Can I try furniture before I buy with AR?',
    a: 'Yes. TARDIS is built around AR furniture try-on: scan your room once, then place any product from the catalog at true scale, swap styles or colors, and walk around it through your phone. AR visualization has been shown to cut furniture returns by up to 25%.',
  },
  {
    q: 'Which iPhones support the TARDIS furniture visualizer?',
    a: 'TARDIS works best on iPhones with the LiDAR sensor — iPhone 12 Pro and later Pro models, plus all iPad Pro models from 2020 onwards. Non-Pro iPhones still support augmented reality furniture viewing, but the room geometry won’t be as precise.',
  },
  {
    q: 'Is the TARDIS furniture visualizer free?',
    a: 'Yes — TARDIS is free to download. Scanning your room, visualizing furniture in your room with AR, and exporting designs are all free. A premium subscription unlocks advanced AI styling features.',
  },
  {
    q: 'Does TARDIS support multi-brand checkout?',
    a: 'TARDIS supports unified checkout across IKEA, Wayfair, CB2, and more. Every item from your AR-visualized design goes into a single cart — one payment, coordinated delivery, no juggling five separate orders.',
  },
];

export default function Faq() {
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
          gsap.set([`.${styles.wordInner}`, `.${styles.item}`], { y: '0%', opacity: 1 });
          return;
        }

        gsap.from(section.querySelectorAll(`.${styles.wordInner}`), {
          y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });

        gsap.from(section.querySelectorAll(`.${styles.item}`), {
          y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06,
          scrollTrigger: { trigger: `.${styles.list}`, start: 'top 85%' },
        });
      }, section);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <ScrambleText text="Common Questions" className={styles.eyebrow} />
        <h2 className={styles.headline} aria-label="Things people ask.">
          {['Things'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          {['people'].map((w, i) => (
            <span key={`p-${i}`} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <span className={styles.wordWrap}>
            <span className={`${styles.wordInner} ${styles.accentWord}`}>ask.</span>
          </span>
        </h2>

        <ul className={styles.list}>
          {faqs.map((f, i) => (
            <li key={i} className={styles.item}>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.qText}>{f.q}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                      <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className={styles.answer}>{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
