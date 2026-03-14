import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TARDIS — AI-powered home design app';
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
          background: '#080808',
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
              'linear-gradient(rgba(200,169,126,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.04) 1px, transparent 1px)',
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
            background: 'radial-gradient(circle, rgba(200,169,126,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c8a97e',
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          Home Renovation · Reimagined
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 80,
            fontWeight: 700,
            color: '#f0ede8',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: 32,
          }}
        >
          <span>Scan it.</span>
          <span>Style it.</span>
          <span style={{ color: '#c8a97e' }}>Own it.</span>
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#8a8a8a',
            lineHeight: 1.5,
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          LiDAR room scan → AI furniture placement → one-tap multi-brand checkout.
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
              fontSize: 28,
              fontWeight: 700,
              color: '#f0ede8',
              letterSpacing: '-0.02em',
            }}
          >
            TARDIS
          </div>
          <div
            style={{
              display: 'flex',
              gap: 32,
              fontSize: 14,
              color: '#8a8a8a',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>Scan</span>
            <span style={{ color: 'rgba(200,169,126,0.4)' }}>·</span>
            <span>Design</span>
            <span style={{ color: 'rgba(200,169,126,0.4)' }}>·</span>
            <span>Buy</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
