'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './Team.module.css';

const members = [
  {
    initials: 'IL',
    name: 'Illia Lisovskyi',
    role: 'Co-founder · Finance & Strategy',
    bio: 'P&G · Deloitte · ETH Warsaw, Degen Hack winner. Knows how to build a business, not just a product.',
    tags: ['Finance', 'Strategy', 'Go-to-market'],
    linkedin: 'https://www.linkedin.com/in/illia-lisovskyi/',
  },
  {
    initials: 'YR',
    name: 'Yevhenii Riabokin',
    role: 'Co-founder · Engineering & Growth',
    bio: '4 years engineering · Growth at Leaply · 11 hackathons, 70% win rate. Builds fast, ships faster.',
    tags: ['Engineering', 'Growth', 'Product'],
    linkedin: 'https://www.linkedin.com/in/yevhenii-riabokin-10a104257',
  },
];

export default function Team() {
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

        gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card, i) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: i * 0.18,
              scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 78%' },
            },
          );
          // Subtle line draw on card left border
          const line = card.querySelector<HTMLElement>(`.${styles.cardLine}`);
          if (line) {
            gsap.fromTo(line,
              { scaleY: 0 },
              {
                scaleY: 1, duration: 0.8, ease: 'power2.out', delay: i * 0.18 + 0.3,
                scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 78%' },
              },
            );
          }
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
        <ScrambleText text="The Team" className={styles.eyebrow} />
        <h2 className={styles.headline} aria-label="Operators, not just builders.">
          {['Operators,'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
          <br />
          {['not', 'just', 'builders.'].map((w, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.wordInner}>{w}</span>{' '}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          {members.map((m, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardLine} aria-hidden="true" />
              <div className={styles.cardTop}>
                <div className={styles.avatar}>{m.initials}</div>
                <div>
                  <h3 className={styles.name}>{m.name}</h3>
                  <p className={styles.role}>{m.role}</p>
                </div>
              </div>
              <p className={styles.bio}>{m.bio}</p>
              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {m.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedinLink}
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
