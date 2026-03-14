import { metadata } from '../layout';
import robots from '../robots';
import sitemap from '../sitemap';

describe('layout.tsx metadata', () => {
  it('should define the correct title', () => {
    expect(metadata.title).toEqual({
      default: 'TARDIS — Scan it. Style it. Own it.',
      template: '%s | TARDIS',
    });
  });

  it('should define the correct description', () => {
    expect(metadata.description).toBe(
      'TARDIS uses iPhone LiDAR to map your room in 60 seconds, drops AI-selected furniture photorealistically, and checks out across IKEA, Wayfair, CB2 and more — one cart, one tap.',
    );
  });

  it('should define the correct keywords', () => {
    expect(metadata.keywords).toEqual([
      'home renovation app',
      'AI interior design',
      'LiDAR room scanner',
      'AR furniture placement',
      'virtual room designer',
      'interior design app',
      'furniture shopping app',
      'room planner app',
      'IKEA alternative',
      'home decor app',
      'AI home design',
      '3D room scanner iPhone',
    ]);
  });
});

describe('layout.tsx openGraph metadata', () => {
  it('should set the correct URL', () => {
    expect(metadata.openGraph).toHaveProperty('url', 'https://www.tardis-ai.com');
  });

  it('should set the correct title', () => {
    expect(metadata.openGraph).toHaveProperty('title', 'TARDIS — Scan it. Style it. Own it.');
  });

  it('should set the correct description', () => {
    expect(metadata.openGraph).toHaveProperty(
      'description',
      'LiDAR scan your room → AI places furniture photorealistically → one-click checkout across IKEA, Wayfair, CB2 and more. Home design, reimagined.',
    );
  });

  it('should set the correct image', () => {
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.images).toEqual([
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TARDIS — AI-powered home design app',
      },
    ]);
  });
});

describe('layout.tsx twitter metadata', () => {
  it('should set the card type to summary_large_image', () => {
    expect(metadata.twitter).toHaveProperty('card', 'summary_large_image');
  });

  it('should set the correct title', () => {
    expect(metadata.twitter).toHaveProperty('title', 'TARDIS — Scan it. Style it. Own it.');
  });

  it('should set the correct description', () => {
    expect(metadata.twitter).toHaveProperty(
      'description',
      'LiDAR scan → AI furniture placement → one-tap multi-brand checkout. Home design, finally solved.',
    );
  });

  it('should set the correct image', () => {
    expect(metadata.twitter).toHaveProperty('images', ['/og-image.png']);
  });
});

describe('robots.ts', () => {
  it('should allow all user agents to index the site', () => {
    const result = robots();
    expect(result.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });
  });

  it('should specify the sitemap URL', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://www.tardis-ai.com/sitemap.xml');
  });

  it('should specify the host', () => {
    const result = robots();
    expect(result.host).toBe('https://www.tardis-ai.com');
  });
});

describe('sitemap.ts', () => {
  it('should return an array with one entry for the main URL', () => {
    const result = sitemap();
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('https://www.tardis-ai.com');
  });

  it('should set lastModified to a recent Date', () => {
    const before = new Date();
    const result = sitemap();
    const after = new Date();

    const lastModified = result[0].lastModified as Date;
    expect(lastModified.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(lastModified.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('should set changeFrequency to monthly', () => {
    const result = sitemap();
    expect(result[0].changeFrequency).toBe('monthly');
  });

  it('should set priority to 1', () => {
    const result = sitemap();
    expect(result[0].priority).toBe(1);
  });
});
