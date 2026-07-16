import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TARDIS — embeddable AR for product pages';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#0B0A08',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(212,180,131,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,180,131,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,180,131,0.13) 0%, transparent 70%)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 15,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#D2B07E',
            marginBottom: 28,
            fontWeight: 600,
          }}
        >
          Embeddable AR for retailers
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 76,
            fontWeight: 700,
            color: '#F3EEE5',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 32,
          }}
        >
          <span>Add AR to your</span>
          <span style={{ color: '#D2B07E' }}>product pages</span>
          <span>in one script.</span>
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#ABA294',
            lineHeight: 1.5,
            maxWidth: 680,
            marginBottom: 48,
          }}
        >
          Shoppers see furniture in their room at true scale — from one script on your product page.
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 700,
              color: '#F3EEE5',
              letterSpacing: '0.34em',
            }}
          >
            TARDIS
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 15,
              color: '#ABA294',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            tardis-ai.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
