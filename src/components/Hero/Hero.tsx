'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function Hero() {
  return (
    <header id="hero" className={styles.hero}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className="eyebrow">
              <span className="dot" />
              HOME DESIGN · FINALLY SOLVED
            </span>
            <h1 className={styles.headline}>
              Scan it. <span className="italic">Style it.</span>
              <br />
              Own it.
            </h1>
            <p className={`lead ${styles.lead}`}>
              TARDIS turns your iPhone into a furniture superpower. Scan your room in 60 seconds.
              Let AI style it across every retailer. Buy it — coordinated, in one cart.
            </p>

            <div className={styles.ctaRow}>
              <a href={APP_URL} className="btn btn-primary">
                Try the AR viewer free <span className="arrow">→</span>
              </a>
              <a href="#products" className="btn btn-ghost">
                See the three tools
              </a>
            </div>

            <div className={styles.stats}>
              <Stat value="60" unit="s"   label="AVERAGE ROOM SCAN" />
              <Stat value="±1" unit="cm"  label="PLACEMENT PRECISION" />
              <Stat value="1"  unit="×"   label="CART · EVERY BRAND" />
            </div>
          </div>

          <PhotoRoomCard />
        </div>
      </div>
    </header>
  );
}

function Stat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statNum}>
        {value}
        <span className={styles.statUnit}>{unit}</span>
      </div>
      <div className={`caption ${styles.statLabel}`}>{label}</div>
    </div>
  );
}

/* =========================================================
   PhotoRoomCard — rotates between empty / scanning / styled
========================================================= */
function PhotoRoomCard() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 3400);
    return () => clearInterval(id);
  }, []);

  const chipLabel =
    phase === 0 ? 'ROOM · UNFURNISHED'
    : phase === 1 ? 'SCANNING · LIDAR'
    : 'STYLED · AI · ONE CART';

  return (
    <figure className={styles.photoCard}>
      <div className={styles.photoStack}>
        <div className={styles.photoLayer} style={{ opacity: phase === 0 ? 1 : 0 }}>
          <PhotoRoomEmpty />
        </div>
        <div className={styles.photoLayer} style={{ opacity: phase === 1 ? 1 : 0 }}>
          <PhotoRoomEmpty />
          <div className={styles.scanOverlay}>
            <ScanOverlay active={phase === 1} />
          </div>
        </div>
        <div className={styles.photoLayer} style={{ opacity: phase === 2 ? 1 : 0 }}>
          <PhotoRoomStyled />
        </div>

        <div className={`chip ${styles.phaseChip}`}>
          <span className="led" />
          {chipLabel}
        </div>

        <div className={styles.dots}>
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setPhase(i)}
              aria-label={`Show step ${i + 1}`}
              className={`${styles.dot} ${phase === i ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </figure>
  );
}

/* =========================================================
   SVG illustrations — magazine-quality empty + styled room
========================================================= */
function PhotoRoomEmpty() {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="he-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE5D2" />
          <stop offset="100%" stopColor="#E5D7BD" />
        </linearGradient>
        <linearGradient id="he-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A07349" />
          <stop offset="100%" stopColor="#6F4A2A" />
        </linearGradient>
        <linearGradient id="he-window" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FFF4DD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF4DD" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="he-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9B8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFE9B8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="340" fill="url(#he-wall)" />
      <polygon points="0,340 400,340 400,500 0,500" fill="url(#he-floor)" />
      <g stroke="#4A2E18" strokeWidth="0.5" opacity="0.3">
        <line x1="60" y1="340" x2="40" y2="500" />
        <line x1="140" y1="340" x2="140" y2="500" />
        <line x1="220" y1="340" x2="240" y2="500" />
        <line x1="300" y1="340" x2="340" y2="500" />
      </g>
      <rect x="0" y="332" width="400" height="10" fill="#FBFAF7" />
      <line x1="0" y1="342" x2="400" y2="342" stroke="#4A2E18" strokeWidth="0.4" opacity="0.5" />

      <rect x="50" y="60" width="220" height="200" fill="#F5F1EA" stroke="#3A2818" strokeWidth="1.5" />
      <line x1="160" y1="60" x2="160" y2="260" stroke="#3A2818" strokeWidth="1.5" />
      <line x1="50" y1="160" x2="270" y2="160" stroke="#3A2818" strokeWidth="1" />
      <rect x="52" y="62" width="216" height="196" fill="url(#he-window)" />
      <rect x="52" y="200" width="216" height="58" fill="#C9D8C2" opacity="0.5" />
      <circle cx="220" cy="120" r="22" fill="#FFE9B8" opacity="0.6" />

      <polygon points="60,340 270,340 330,500 30,500" fill="url(#he-sun)" opacity="0.85" />

      <rect x="320" y="80" width="60" height="252" fill="#4A2E18" opacity="0.05" stroke="#3A2818" strokeWidth="0.6" />
      <rect x="328" y="100" width="44" height="60" fill="none" stroke="#3A2818" strokeWidth="0.5" />
      <rect x="328" y="170" width="44" height="60" fill="none" stroke="#3A2818" strokeWidth="0.5" />
      <rect x="328" y="240" width="44" height="80" fill="none" stroke="#3A2818" strokeWidth="0.5" />
      <circle cx="335" cy="218" r="2" fill="#3A2818" />

      <g fontFamily="var(--font-mono)" fontSize="8" fill="#3A2818" opacity="0.55" letterSpacing="0.12em">
        <text x="20" y="490">4.2M × 2.8M</text>
        <text x="380" y="490" textAnchor="end">UNFURNISHED</text>
      </g>
    </svg>
  );
}

function PhotoRoomStyled() {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0E6D2" />
          <stop offset="100%" stopColor="#E1CFB2" />
        </linearGradient>
        <linearGradient id="hs-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A87850" />
          <stop offset="100%" stopColor="#704A2A" />
        </linearGradient>
        <linearGradient id="hs-window" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FFF4DD" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF4DD" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9B8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFE9B8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hs-lamp" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#FFCB80" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFCB80" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-sofa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3530" />
          <stop offset="100%" stopColor="#1F1B17" />
        </linearGradient>
        <pattern id="hs-rug" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#9CAE92" />
          <line x1="0" y1="10" x2="20" y2="10" stroke="#6E8068" strokeWidth="0.4" />
          <line x1="10" y1="0" x2="10" y2="20" stroke="#6E8068" strokeWidth="0.4" />
          <circle cx="10" cy="10" r="1.5" fill="#6E8068" opacity="0.5" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="400" height="340" fill="url(#hs-wall)" />
      <polygon points="0,340 400,340 400,500 0,500" fill="url(#hs-floor)" />
      <g stroke="#4A2E18" strokeWidth="0.5" opacity="0.3">
        <line x1="60" y1="340" x2="40" y2="500" />
        <line x1="140" y1="340" x2="140" y2="500" />
        <line x1="220" y1="340" x2="240" y2="500" />
        <line x1="300" y1="340" x2="340" y2="500" />
      </g>
      <rect x="0" y="332" width="400" height="10" fill="#FBFAF7" />

      <rect x="50" y="60" width="220" height="200" fill="#F5F1EA" stroke="#3A2818" strokeWidth="1.5" />
      <line x1="160" y1="60" x2="160" y2="260" stroke="#3A2818" strokeWidth="1.5" />
      <line x1="50" y1="160" x2="270" y2="160" stroke="#3A2818" strokeWidth="1" />
      <rect x="52" y="62" width="216" height="196" fill="url(#hs-window)" />
      <rect x="52" y="200" width="216" height="58" fill="#C9D8C2" opacity="0.5" />
      <circle cx="220" cy="120" r="22" fill="#FFE9B8" opacity="0.6" />

      <rect x="298" y="90" width="80" height="100" fill="#FBFAF7" stroke="#3A2818" strokeWidth="1.2" />
      <rect x="304" y="96" width="68" height="88" fill="#C95A3A" opacity="0.85" />
      <circle cx="338" cy="135" r="22" fill="#F5E6D0" opacity="0.85" />

      <polygon points="60,340 270,340 330,500 30,500" fill="url(#hs-sun)" />

      <polygon points="40,400 360,400 380,470 20,470" fill="url(#hs-rug)" opacity="0.95" />
      <polygon points="40,400 360,400 380,470 20,470" fill="none" stroke="#3A2818" strokeWidth="0.6" opacity="0.5" />

      <ellipse cx="200" cy="408" rx="160" ry="14" fill="#000" opacity="0.18" />
      <polygon points="60,360 340,360 360,400 40,400" fill="url(#hs-sofa)" />
      <polygon points="60,300 340,300 340,360 60,360" fill="url(#hs-sofa)" opacity="0.85" />
      <line x1="150" y1="300" x2="150" y2="395" stroke="#000" strokeWidth="0.5" opacity="0.4" />
      <line x1="250" y1="300" x2="250" y2="395" stroke="#000" strokeWidth="0.5" opacity="0.4" />
      <rect x="60" y="300" width="280" height="6" fill="#5A4F45" opacity="0.4" />
      <ellipse cx="100" cy="318" rx="22" ry="14" fill="#C95A3A" />
      <ellipse cx="100" cy="316" rx="20" ry="10" fill="#D87555" opacity="0.7" />
      <rect x="62" y="395" width="6" height="6" fill="#1A1815" />
      <rect x="332" y="395" width="6" height="6" fill="#1A1815" />

      <ellipse cx="200" cy="450" rx="80" ry="8" fill="#000" opacity="0.18" />
      <polygon points="140,420 260,420 280,445 120,445" fill="#8B6F47" />
      <polygon points="120,445 280,445 280,455 120,455" fill="#5C4527" />
      <rect x="150" y="455" width="4" height="14" fill="#5C4527" />
      <rect x="246" y="455" width="4" height="14" fill="#5C4527" />
      <ellipse cx="200" cy="423" rx="10" ry="3" fill="#F5F1EA" />
      <path d="M 195 423 Q 200 412, 205 423" fill="#F5F1EA" />

      <ellipse cx="350" cy="468" rx="22" ry="5" fill="#000" opacity="0.18" />
      <ellipse cx="350" cy="463" rx="20" ry="4" fill="#1A1815" />
      <rect x="347" y="270" width="6" height="195" fill="#1A1815" />
      <ellipse cx="350" cy="265" rx="28" ry="8" fill="#FBFAF7" stroke="#3A2818" strokeWidth="0.8" />
      <polygon points="322,265 378,265 372,290 328,290" fill="#FBFAF7" stroke="#3A2818" strokeWidth="0.8" />
      <ellipse cx="350" cy="320" rx="80" ry="55" fill="url(#hs-lamp)" />

      <ellipse cx="50" cy="468" rx="22" ry="5" fill="#000" opacity="0.18" />
      <path d="M 32 465 L 68 465 L 65 430 L 35 430 Z" fill="#5C4527" />
      <ellipse cx="50" cy="410" rx="6" ry="22" fill="#5C7A52" transform="rotate(-25 50 410)" />
      <ellipse cx="50" cy="408" rx="6" ry="24" fill="#6E8C62" transform="rotate(10 50 408)" />
      <ellipse cx="50" cy="412" rx="6" ry="22" fill="#5C7A52" transform="rotate(35 50 412)" />
      <ellipse cx="50" cy="405" rx="5" ry="20" fill="#7A9670" transform="rotate(-5 50 405)" />

      <g fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.1em">
        <line x1="200" y1="320" x2="200" y2="100" stroke="var(--terracotta)" strokeWidth="0.6" strokeDasharray="2 3" />
        <rect x="170" y="86" width="62" height="18" rx="9" fill="var(--paper)" stroke="var(--terracotta)" strokeWidth="0.6" />
        <text x="201" y="98" textAnchor="middle" fill="var(--terracotta)">CB2 · $1,899</text>
        <line x1="350" y1="265" x2="370" y2="220" stroke="var(--terracotta)" strokeWidth="0.6" strokeDasharray="2 3" />
        <rect x="320" y="208" width="68" height="18" rx="9" fill="var(--paper)" stroke="var(--terracotta)" strokeWidth="0.6" />
        <text x="354" y="220" textAnchor="middle" fill="var(--terracotta)">WEST ELM · $329</text>
      </g>
    </svg>
  );
}

function ScanOverlay({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 500" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <defs>
        <linearGradient id="hero-sweep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--terracotta)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--terracotta)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--terracotta)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="var(--terracotta)" strokeWidth="0.5" fill="none" opacity="0.7">
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => {
            const x = 40 + (c / 7) * 320;
            const y = 60 + (r / 8) * 380;
            const x2 = 40 + ((c + 1) / 7) * 320;
            const y2 = 60 + ((r + 1) / 8) * 380;
            return (
              <g key={`${r}-${c}`}>
                {c < 7 && <line x1={x} y1={y} x2={x2} y2={y} />}
                {r < 8 && <line x1={x} y1={y} x2={x} y2={y2} />}
                {c < 7 && r < 8 && <line x1={x} y1={y} x2={x2} y2={y2} />}
              </g>
            );
          })
        )}
      </g>
      <rect x="0" y="0" width="400" height="80" fill="url(#hero-sweep)">
        {active && <animate attributeName="y" values="0;420;0" dur="2.6s" repeatCount="indefinite" />}
      </rect>
      {[[40, 60], [360, 60], [40, 440], [360, 440]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--paper)" stroke="var(--terracotta)" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
