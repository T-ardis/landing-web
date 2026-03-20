import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'edge';
export const alt = 'TARDIS Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'TARDIS Blog';
  const tags = post?.tags?.slice(0, 3) ?? [];
  const readTime = post?.readTime ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080808',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid */}
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
            top: '-120px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(200,169,126,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Top: eyebrow + tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c8a97e',
              fontWeight: 500,
            }}
          >
            TARDIS Blog{readTime ? ` · ${readTime}` : ''}
          </div>

          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 13,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#c8a97e',
                    border: '1px solid rgba(200,169,126,0.3)',
                    borderRadius: 100,
                    padding: '6px 16px',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 48 : 56,
              fontWeight: 700,
              color: '#f0ede8',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          {/* Footer */}
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
                fontSize: 16,
                color: '#8a8a8a',
                letterSpacing: '0.08em',
              }}
            >
              tardis-ai.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
