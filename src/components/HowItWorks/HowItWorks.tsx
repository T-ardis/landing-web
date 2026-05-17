'use client';

import { useEffect, useState } from 'react';
import styles from './HowItWorks.module.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

export default function HowItWorks() {
  return (
    <section id="products" className={styles.section}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">
              <span className="dot" />
              The toolkit
            </span>
            <h2 className={styles.heading}>
              Three tools. <span className="italic">One workflow.</span>
            </h2>
          </div>
          <p className="lead">
            TARDIS is a sequence: <strong className={styles.strong}>scan</strong> your room,{' '}
            <strong className={styles.strong}>style</strong> it with AI,{' '}
            <strong className={styles.strong}>view</strong> it in AR before you buy.
            Each piece works on its own — together, they replace ten tabs and four months of indecision.
          </p>
        </div>

        <ProductRow
          id="scan"
          number="01"
          tag="TARDIS · SCAN"
          keyword="house 3d scanner · 3d scanning home interiors"
          titlePrefix="Your iPhone becomes a "
          titleItalic="3D scanner."
          body="LiDAR fires 20,000+ depth points across your room in 60 seconds. The result is a millimeter-precise digital twin you can design from, share with a contractor, or export to any 3D tool."
          features={[
            'iPhone 12 Pro and newer · all iPad Pro 2020+',
            '±1cm precision · pro-grade output',
            'Export USDZ · OBJ · GLTF · DXF · PDF',
          ]}
          cta="Coming soon"
          href={APP_URL}
          comingSoon
          visual={<ScanVisual />}
        />

        <Divider />

        <ProductRow
          id="studio"
          number="02"
          tag="TARDIS · STUDIO"
          keyword="furniture visualization tool · visualize furniture in room AI · room viewer"
          titlePrefix="AI styles your "
          titleItalic="whole room."
          body="Not another single-SKU AR app. Studio reads your scan, your style, and your budget — then composes complete photoreal designs across every retailer. Swap one piece, mix two, generate ten more in seconds."
          features={[
            'Full-room AI rendering · photoreal lighting',
            'Mix brands freely: IKEA + CB2 + West Elm',
            'Side-by-side variants · share + collaborate',
          ]}
          cta="Coming soon"
          href={APP_URL}
          comingSoon
          visual={<StudioVisual />}
          reverse
        />

        <Divider />

        <ProductRow
          id="view"
          number="03"
          tag="TARDIS · VIEW · LIVE"
          keyword="view in room · AR view · view in room furniture"
          titlePrefix="See it in "
          titleItalic="your room."
          titleSuffix=" Before you buy."
          body="Drop any product image into a precise scan of your space. Real walls, real light, real shadows. Works with the Wayfair you've been browsing, the Amazon link your friend sent, the CB2 sofa you've been circling for weeks."
          features={[
            'Web-based AR · iPhone + Android · no app',
            'Any retailer · drag a photo, see it placed',
            'One cart across IKEA · Wayfair · CB2 · more',
          ]}
          cta="Try the AR viewer free"
          href={APP_URL}
          visual={<ViewVisual />}
        />
      </div>
    </section>
  );
}

/* =========================================================
   ProductRow
========================================================= */
interface ProductRowProps {
  id: string;
  number: string;
  tag: string;
  keyword: string;
  titlePrefix: string;
  titleItalic: string;
  titleSuffix?: string;
  body: string;
  features: string[];
  cta: string;
  href: string;
  comingSoon?: boolean;
  visual: React.ReactNode;
  reverse?: boolean;
}

function ProductRow({
  id, number, tag, keyword, titlePrefix, titleItalic, titleSuffix,
  body, features, cta, href, comingSoon, visual, reverse,
}: ProductRowProps) {
  return (
    <div id={id} className={`${styles.row} ${reverse ? styles.rowReverse : ''}`}>
      <div className={styles.text}>
        <div className={styles.rowHead}>
          <span className={styles.bigNum}>{number}</span>
          <span className="caption">{tag}</span>
        </div>
        <h3 className={styles.rowTitle}>
          {titlePrefix}
          <span className="italic">{titleItalic}</span>
          {titleSuffix}
        </h3>
        <p className={`lead ${styles.rowBody}`}>{body}</p>
        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={i} className={styles.feature}>
              <span className={styles.bullet}>✦</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        {comingSoon ? (
          <span className={styles.soonPill} aria-label={`${cta} — feature not yet available`}>
            <span className={styles.soonDot} aria-hidden="true" />
            {cta}
          </span>
        ) : (
          <a href={href} className="btn btn-primary">
            {cta} <span className="arrow">→</span>
          </a>
        )}
        <p className={`caption ${styles.keyword}`}>RANKS FOR: {keyword}</p>
      </div>
      <div className={styles.visual}>{visual}</div>
    </div>
  );
}

function Divider() {
  return (
    <div className={styles.divider}>
      <hr className={styles.dividerLine} />
      <span className="caption">↓</span>
      <hr className={styles.dividerLine} />
    </div>
  );
}

/* =========================================================
   ScanVisual — animated LiDAR scan
========================================================= */
function ScanVisual() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = ((t - start) / 4000) % 1;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.deviceCard}>
      <div className={styles.deviceBar}>
        <span className={styles.deviceBarLeft}>
          <span className="pulse-dot" /> SCANNING · {Math.round(progress * 100)}%
        </span>
        <span>±0.4CM PRECISION</span>
      </div>

      <div className={styles.deviceCanvas}>
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }} aria-hidden="true">
          <defs>
            <linearGradient id="sv-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFE5D2" />
              <stop offset="100%" stopColor="#E5D7BD" />
            </linearGradient>
            <linearGradient id="sv-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A07349" />
              <stop offset="100%" stopColor="#6F4A2A" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sv-wall)" />
          <polygon points="0,200 400,200 400,300 0,300" fill="url(#sv-floor)" />
          <rect x="40" y="40" width="180" height="130" fill="#F5F1EA" stroke="#3A2818" strokeWidth="1.2" />
          <line x1="130" y1="40" x2="130" y2="170" stroke="#3A2818" strokeWidth="1" />
          <line x1="40" y1="105" x2="220" y2="105" stroke="#3A2818" strokeWidth="0.8" />
          <rect x="280" y="60" width="50" height="120" fill="#4A2E18" opacity="0.06" stroke="#3A2818" strokeWidth="0.5" />

          <g stroke="var(--terracotta)" strokeWidth="0.6" fill="none" opacity="0.65">
            {Array.from({ length: 9 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => {
                if (r / 8 > progress) return null;
                const x = 30 + (c / 7) * 340;
                const y = 30 + (r / 8) * 240;
                const x2 = 30 + ((c + 1) / 7) * 340;
                const y2 = 30 + ((r + 1) / 8) * 240;
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

          <line
            x1="20" y1={30 + progress * 240}
            x2="380" y2={30 + progress * 240}
            stroke="var(--terracotta)" strokeWidth="1.4" opacity="0.9"
          />
        </svg>
      </div>

      <div className={styles.deviceBar}>
        <span>LIDAR · iPHONE 16 PRO</span>
        <span>{Math.round(progress * 19840)} PTS</span>
        <span>EST {Math.max(1, Math.round(60 * (1 - progress)))}S</span>
      </div>
    </div>
  );
}

/* =========================================================
   StudioVisual — variant switcher
========================================================= */
function StudioVisual() {
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setVariant((v) => (v + 1) % 3), 3200);
    return () => clearInterval(id);
  }, []);

  const variants = [
    { label: 'WARM MINIMAL',   sub: 'CB2 · Article',     accent: '#C95A3A' },
    { label: 'EDITORIAL DARK', sub: 'West Elm · Amazon', accent: '#1A1815' },
    { label: 'JAPANDI',        sub: 'IKEA · CB2',        accent: '#9CAE92' },
  ];

  return (
    <div className={styles.deviceCard}>
      <div className={styles.deviceBar}>
        <span className={styles.deviceBarLeft}>
          <span className="pulse-dot" /> STUDIO · VARIANT {variant + 1}/3
        </span>
        <span>{variants[variant].sub}</span>
      </div>

      <div className={styles.deviceCanvas}>
        {variants.map((v, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: variant === i ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            <RoomVariant accent={v.accent} variant={i} />
          </div>
        ))}

        <div className={styles.variantBar}>
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setVariant(i)}
              className={`${styles.variantBtn} ${variant === i ? styles.variantBtnActive : ''}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.deviceBar}>
        <span>4 PIECES · 3 BRANDS</span>
        <span>UNDER $3,200</span>
        <span>ONE CART</span>
      </div>
    </div>
  );
}

function RoomVariant({ accent, variant }: { accent: string; variant: number }) {
  const wallTop = variant === 1 ? '#2A2622' : '#F0E6D2';
  const wallBot = variant === 1 ? '#14130F' : '#E1CFB2';
  const floorTop = variant === 2 ? '#C9B894' : '#A87850';
  const floorBot = variant === 2 ? '#A09472' : '#704A2A';

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <defs>
        <linearGradient id={`rv-wall-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wallTop} />
          <stop offset="100%" stopColor={wallBot} />
        </linearGradient>
        <linearGradient id={`rv-floor-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={floorTop} />
          <stop offset="100%" stopColor={floorBot} />
        </linearGradient>
      </defs>

      <rect width="400" height="200" fill={`url(#rv-wall-${variant})`} />
      <polygon points="0,200 400,200 400,300 0,300" fill={`url(#rv-floor-${variant})`} />
      <rect x="0" y="195" width="400" height="6" fill={variant === 1 ? '#1F1B17' : '#FBFAF7'} />

      <rect x="40" y="40" width="180" height="130" fill="#F5F1EA" stroke="#3A2818" strokeWidth="1.2" opacity={variant === 1 ? 0.4 : 1} />
      <line x1="130" y1="40" x2="130" y2="170" stroke="#3A2818" strokeWidth="1" opacity={variant === 1 ? 0.4 : 1} />

      <rect x="280" y="60" width="60" height="80" fill={variant === 1 ? '#0F0E0C' : '#FBFAF7'} stroke="#3A2818" strokeWidth="0.9" />
      <rect x="285" y="65" width="50" height="70" fill={accent} opacity="0.85" />

      {variant === 0 && <polygon points="50,240 360,240 380,280 30,280" fill="#9CAE92" opacity="0.75" stroke="#3A2818" strokeWidth="0.6" />}
      {variant === 1 && <polygon points="50,240 360,240 380,280 30,280" fill="#3A3530" stroke="#000" strokeWidth="0.5" />}
      {variant === 2 && <polygon points="50,240 360,240 380,280 30,280" fill="#E8DCC0" stroke="#3A2818" strokeWidth="0.6" />}

      <ellipse cx="195" cy="246" rx="150" ry="10" fill="#000" opacity="0.18" />
      <polygon points="60,215 330,215 350,245 40,245" fill={variant === 0 ? '#3A3530' : variant === 1 ? '#5A4F45' : '#D9C7AA'} />
      <polygon points="60,175 330,175 330,215 60,215" fill={variant === 0 ? '#1F1B17' : variant === 1 ? '#3A3530' : '#C2B093'} />
      <ellipse cx="100" cy="190" rx="20" ry="12" fill={accent} />

      <rect x="345" y="100" width="5" height="140" fill="#1A1815" />
      <polygon points="325,100 370,100 365,118 330,118" fill={variant === 1 ? '#3A3530' : '#FBFAF7'} stroke="#3A2818" strokeWidth="0.6" />

      <path d="M 30 270 L 70 270 L 67 240 L 33 240 Z" fill="#5C4527" />
      <ellipse cx="50" cy="225" rx="5" ry="18" fill="#5C7A52" transform="rotate(-25 50 225)" />
      <ellipse cx="50" cy="223" rx="5" ry="20" fill="#6E8C62" transform="rotate(10 50 223)" />
      <ellipse cx="50" cy="227" rx="5" ry="18" fill="#5C7A52" transform="rotate(35 50 227)" />
    </svg>
  );
}

/* =========================================================
   ViewVisual — phone + catalog
========================================================= */
function ViewVisual() {
  const [item, setItem] = useState(0);
  const items = [
    { label: 'Linen sectional', brand: 'CB2',      price: '$1,899' },
    { label: 'Lounge chair',    brand: 'Article',  price: '$649'   },
    { label: 'Arc floor lamp',  brand: 'West Elm', price: '$329'   },
  ];

  useEffect(() => {
    const id = setInterval(() => setItem((i) => (i + 1) % items.length), 2400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.viewGrid}>
      <div className={styles.phone}>
        <div className={styles.notch} />
        <div className={styles.phoneInner}>
          <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }} aria-hidden="true">
            <defs>
              <linearGradient id="ph-wall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0E6D2" />
                <stop offset="100%" stopColor="#E1CFB2" />
              </linearGradient>
              <linearGradient id="ph-floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A87850" />
                <stop offset="100%" stopColor="#704A2A" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#ph-wall)" />
            <polygon points="0,500 400,500 400,700 0,700" fill="url(#ph-floor)" />
            <rect x="50" y="120" width="220" height="180" fill="#F5F1EA" stroke="#3A2818" strokeWidth="1.5" />
            <rect x="300" y="160" width="70" height="100" fill="#FBFAF7" stroke="#3A2818" strokeWidth="1.2" />
            <rect x="306" y="166" width="58" height="88" fill="#C95A3A" opacity="0.85" />

            <polygon points="40,560 360,560 380,640 20,640" fill="#9CAE92" opacity="0.85" />
            <ellipse cx="200" cy="570" rx="160" ry="14" fill="#000" opacity="0.18" />
            <polygon points="60,510 340,510 360,560 40,560" fill="#1F1B17" />
            <polygon points="60,460 340,460 340,510 60,510" fill="#3A3530" />
          </svg>
        </div>
        <div className={styles.reticle}>
          <div className={styles.reticleInner} />
        </div>
        <div className={styles.phoneToolbar}>
          <span>✓ FITS · 92CM</span>
          <span className={styles.toolbarAccent}>ADD →</span>
        </div>
      </div>

      <div className={styles.catalog}>
        <div className="caption">CATALOG · DRAGGABLE</div>
        {items.map((it, i) => (
          <div
            key={i}
            className={`${styles.catItem} ${item === i ? styles.catItemActive : ''}`}
          >
            <div className={styles.catThumb}>
              {i === 0 && (
                <svg viewBox="0 0 32 24" width="32" aria-hidden="true">
                  <rect x="2" y="10" width="28" height="10" fill="#1A1815" />
                  <rect x="4" y="5" width="24" height="6" fill="#3A3530" />
                </svg>
              )}
              {i === 1 && (
                <svg viewBox="0 0 32 24" width="32" aria-hidden="true">
                  <rect x="9" y="10" width="14" height="10" fill="#C95A3A" />
                  <rect x="9" y="4" width="14" height="7" fill="#D87555" />
                </svg>
              )}
              {i === 2 && (
                <svg viewBox="0 0 32 24" width="32" aria-hidden="true">
                  <path d="M 21 22 Q 21 4, 10 4" stroke="#1A1815" strokeWidth="1.2" fill="none" />
                  <ellipse cx="10" cy="4" rx="5" ry="2" fill="#1A1815" />
                </svg>
              )}
            </div>
            <div className={styles.catText}>
              <div className={styles.catLabel}>{it.label}</div>
              <div className={`caption ${styles.catMeta}`}>{it.brand} · {it.price}</div>
            </div>
            {item === i && <span className={styles.catArrow}>↗</span>}
          </div>
        ))}
        <div className={styles.cartBar}>
          <span>ONE CART</span>
          <span>3 BRANDS · $2,877</span>
        </div>
      </div>
    </div>
  );
}
