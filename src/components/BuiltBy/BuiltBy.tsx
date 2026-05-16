'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './BuiltBy.module.css';

const members = [
  {
    initials: 'IL',
    name: 'Illia Lisovskyi',
    role: 'Finance & Strategy',
    blurb: 'P&G · Deloitte · Degen Hack winner',
    linkedin: 'https://www.linkedin.com/in/illia-lisovskyi/',
  },
  {
    initials: 'YR',
    name: 'Yevhenii Riabokin',
    role: 'Engineering & Growth',
    blurb: '4y engineering · 11 hackathons · 70% win rate',
    linkedin: 'https://www.linkedin.com/in/yevhenii-riabokin-10a104257',
  },
];

export default function BuiltBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const ctx = gsap.context(() => {
        gsap.from(section.querySelectorAll(`.${styles.member}`), {
          y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 85%' },
        });
        gsap.from(section.querySelector(`.${styles.label}`), {
          opacity: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        });
      }, section);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <section id="team" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <ScrambleText text="Built By" className={styles.label} />
        <div className={styles.row}>
          {members.map((m, i) => (
            <a
              key={i}
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.member}
              aria-label={`${m.name} on LinkedIn`}
            >
              <span className={styles.avatar}>{m.initials}</span>
              <span className={styles.text}>
                <span className={styles.name}>{m.name}</span>
                <span className={styles.role}>{m.role}</span>
                <span className={styles.blurb}>{m.blurb}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
        <p className={styles.aboutLink}>
          Investor &amp; company details on <a href="/about" className={styles.aboutLinkAnchor}>the about page</a>.
        </p>
      </div>
    </section>
  );
}
