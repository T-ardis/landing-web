'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    label: 'Scan',
    title: 'Point. Capture. Done.',
    body: 'iPhone LiDAR builds a millimeter-precise 3D map of your room in under 60 seconds. Walls, windows, alcoves — captured automatically. The foundation every AR furniture visualizer needs to render at true scale.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="2"/>
        <path d="M8 18h32M18 8v32M28 8v32M8 28h32"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none"/>
      </svg>
    ),
    bg: 'var(--bg-dark)',
  },
  {
    num: '02',
    label: 'Design',
    title: 'See furniture in your room.',
    body: 'Photorealistic furniture from IKEA, Wayfair, CB2 and more appears inside your actual room with augmented reality — at true scale, in your light. Swap styles, colors and sizes in real time.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 42l8-8 4 4-8 8z"/><path d="M14 34l20-20"/>
        <path d="M34 14l4-4a3 3 0 014 4l-4 4z"/>
        <circle cx="36" cy="14" r="2" fill="currentColor" stroke="none"/>
        <path d="M24 24l6 6" strokeDasharray="2 2"/>
      </svg>
    ),
    bg: '#101008',
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
    bg: '#080d0d',
  },
];

export default function HowItWorks() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    if (!wrapper || !sticky) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // ── MOBILE: IntersectionObserver fade-in per step ──
    if (isMobile) {
      const stepEls = wrapper.querySelectorAll<HTMLElement>(`.${styles.step}`);

      if (prefersReduced) {
        stepEls.forEach(el => el.classList.add(styles.stepVisible));
        return;
      }

      const io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.stepVisible);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      stepEls.forEach(el => io.observe(el));
      return () => io.disconnect();
    }

    // ── DESKTOP: Paradigm-style scrubbed unfold ──
    if (prefersReduced) {
      wrapper.querySelectorAll<HTMLElement>(`.${styles.step}`)
        .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; el.style.clipPath = 'none'; });
      return;
    }

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Total scroll travel inside the pinned section
      const scrollDistance = wrapper.offsetHeight - window.innerHeight;
      // Each step reveal occupies 28% of the scroll travel
      const revealSpan = scrollDistance * 0.28;

      const stepEls = wrapper.querySelectorAll<HTMLElement>(`.${styles.step}`);

      // Set initial state — scaleY collapse from top
      gsap.set(stepEls, { scaleY: 0, opacity: 0, transformOrigin: 'top center' });

      stepEls.forEach((step, i) => {
        const startPx = Math.round((i / steps.length) * scrollDistance);
        const endPx   = startPx + revealSpan;

        // Scrubbed scaleY unfold — tied directly to scroll (Paradigm style)
        gsap.to(step, {
          scaleY:  1,
          opacity: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: wrapper,
            start: `top+=${startPx} top`,
            end:   `top+=${endPx} top`,
            scrub: 0.5,
          },
        });

        // Background colour shift at each step (like Paradigm)
        gsap.to(sticky, {
          backgroundColor: steps[i].bg,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: `top+=${startPx} top`,
            end:   `top+=${startPx + revealSpan * 0.5} top`,
            scrub: true,
          },
        });
      });

      // Headline word wipe
      gsap.from(wrapper.querySelectorAll(`.${styles.wordInner}`), {
        y: '105%', duration: 0.85, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: wrapper, start: 'top 80%' },
      });

      // Pin sticky while steps unfold
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        pin: sticky,
        pinSpacing: false,
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    };

    init().then(fn => { cleanup = fn; });
    return () => cleanup?.();
  }, []);

  return (
    <div ref={wrapperRef} id="how-it-works" className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.inner}>

          {/* Left: headline stays pinned */}
          <div className={styles.left}>
            <ScrambleText text="The Solution" className={styles.eyebrow} />
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
            <p className={styles.sub}>
              LiDAR room scan → AR furniture visualizer → one-tap multi-brand checkout.
            </p>
          </div>

          {/* Right: steps unfold on scroll */}
          <div className={styles.stepsCol}>
            {steps.map((step) => (
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
