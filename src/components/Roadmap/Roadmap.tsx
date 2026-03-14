'use client';

import { useEffect, useRef } from 'react';
import styles from './Roadmap.module.css';

const phases = [
  { num: '01', title: 'Proof of Concept', desc: 'Validate the LiDAR scan-to-design pipeline. Confirm feasibility before building the full product.', active: true },
  { num: '02', title: 'MVP Launch',        desc: 'Ship the integrated scan-design-buy experience. First real users interact with the full loop.', active: false },
  { num: '03', title: 'Organic Growth',    desc: 'Iterative refinement driven by real user behavior. Optimize retention through rapid feedback cycles.', active: false },
  { num: '04', title: 'Scale & Expand',    desc: 'Ramp onboarding programs. Enter new markets and unlock additional user segments at scale.', active: false },
];

export default function Roadmap() {
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
          gsap.set([`.${styles.wordInner}`, `.${styles.phase}`, `.${styles.trackFill}`], { y: '0%', opacity: 1, scaleX: 1 });
          return;
        }

        // Headline wipe
        gsap.from(section.querySelectorAll(`.${styles.wordInner}`), {
          y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });

        // Track line scrubbed to scroll
        gsap.to(`.${styles.trackFill}`, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1.5,
          },
        });

        // Phase cards fan in
        gsap.utils.toArray<HTMLElement>(`.${styles.phase}`).forEach((phase, i) => {
          gsap.fromTo(phase,
            { y: 60, opacity: 0, rotateX: 8 },
            {
              y: 0, opacity: 1, rotateX: 0,
              duration: 0.8, ease: 'power2.out',
              delay: i * 0.14,
              scrollTrigger: { trigger: `.${styles.phases}`, start: 'top 75%' },
            },
          );
        });

        // Parallax section number
        gsap.to(`.${styles.bgPhase}`, {
          y: '-20%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 2,
          },
        });
      }, section);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className={styles.section}>
      <span className={styles.bgPhase} aria-hidden="true">04</span>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Roadmap</span>
        <h2 className={styles.headline} aria-label="From proof to platform.">
          {['From', 'proof'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <br />
          {['to', 'platform.'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
        </h2>

        <div className={styles.roadmap}>
          <div className={styles.track}>
            <div className={styles.trackFill} />
          </div>

          <div className={styles.phases}>
            {phases.map((p, i) => (
              <div key={i} className={`${styles.phase} ${p.active ? styles.phaseActive : ''}`}>
                <div className={styles.dot} />
                <span className={styles.phaseNum}>Phase {p.num}</span>
                <h4 className={styles.phaseTitle}>{p.title}</h4>
                <p className={styles.phaseDesc}>{p.desc}</p>
                {p.active && <span className={styles.status}>In Progress</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
