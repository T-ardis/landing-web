'use client';

import { useEffect, useRef } from 'react';
import styles from './Team.module.css';

const members = [
  {
    initials: 'IL',
    name: 'Illia Lisovskyi',
    role: 'Co-founder · Finance & Strategy',
    bio: 'P&G · Deloitte · ETH Warsaw, Degen Hack winner. Knows how to build a business, not just a product.',
    tags: ['Finance', 'Strategy', 'Go-to-market'],
  },
  {
    initials: 'YR',
    name: 'Yevhenii Riabokin',
    role: 'Co-founder · Engineering & Growth',
    bio: '4 years engineering · Growth at Leaply · 11 hackathons, 70% win rate. Builds fast, ships faster.',
    tags: ['Engineering', 'Growth', 'Product'],
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
        <span className={styles.eyebrow}>The Team</span>
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
              <div className={styles.tags}>
                {m.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
