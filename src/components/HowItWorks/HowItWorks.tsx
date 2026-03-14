'use client';

import { useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    label: 'Scan',
    title: 'Point. Capture. Done.',
    body: 'iPhone LiDAR builds a millimeter-precise 3D room map in under 60 seconds. Walls, windows, alcoves — captured automatically.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="2"/>
        <path d="M8 18h32M18 8v32M28 8v32M8 28h32"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Design',
    title: 'AI drops furniture. Instantly.',
    body: 'Photorealistic furniture from our multi-brand catalog appears in your actual room. Swap styles, colors, sizes in real time.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 42l8-8 4 4-8 8z"/><path d="M14 34l20-20"/>
        <path d="M34 14l4-4a3 3 0 014 4l-4 4z"/>
        <circle cx="36" cy="14" r="2" fill="currentColor" stroke="none"/>
        <path d="M24 24l6 6" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Buy',
    title: 'Love it? One tap buys all.',
    body: 'Everything in your design — IKEA, Wayfair, CB2 and more — goes into one cart. One checkout. Items arrive coordinated.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 12h36l-4 20H10L6 12z"/>
        <circle cx="18" cy="38" r="2" fill="currentColor" stroke="none"/>
        <circle cx="30" cy="38" r="2" fill="currentColor" stroke="none"/>
        <path d="M12 20h24M12 26h20"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
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

      if (prefersReduced) {
        wrapper.querySelectorAll<HTMLElement>(`.${styles.step}`)
          .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; el.style.clipPath = 'none'; });
        return () => {};
      }

      // Each step reveals at 0%, 33%, 66% of the scroll distance
      const stepEls = wrapper.querySelectorAll<HTMLElement>(`.${styles.step}`);

      stepEls.forEach((step, i) => {
        // start: when wrapper top + i/3 of scroll distance hits the top of viewport
        const startOffset = `${Math.round((i / steps.length) * 100)}%`;

        gsap.fromTo(step,
          { y: 50, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wrapper,
              start: `top+=${startOffset} top`,
              // once: never reverses — step stays visible forever
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Headline wipe
      gsap.from(wrapper.querySelectorAll(`.${styles.wordInner}`), {
        y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: wrapper, start: 'top 80%' },
      });

      // Pin the sticky div while steps accumulate
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        pin: sticky,
        pinSpacing: false,
      });
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    // Wrapper is tall — gives scroll distance for 3 step reveals
    <div ref={wrapperRef} id="how-it-works" className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.inner}>

          {/* Left: headline stays pinned */}
          <div className={styles.left}>
            <span className={styles.eyebrow}>The Solution</span>
            <h2 className={styles.headline}>
              {['Three', 'steps.'].map((w, i) => (
                <span key={i} className={styles.wordWrap}>
                  <span className={styles.wordInner}>{w}</span>{' '}
                </span>
              ))}
              <br />
              {['One', 'app.'].map((w, i) => (
                <span key={i} className={styles.wordWrap}>
                  <span className={styles.wordInner}>{w}</span>{' '}
                </span>
              ))}
            </h2>
            <p className={styles.sub}>Scroll to reveal each step</p>
          </div>

          {/* Right: steps stack up */}
          <div className={styles.stepsCol}>
            {steps.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepHead}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </div>
                <div className={styles.stepBody}>
                  <div className={styles.icon}>{step.icon}</div>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
