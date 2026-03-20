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

  it('should define keywords including commercial-intent terms', () => {
    const keywords = metadata.keywords as string[];
    expect(keywords).toContain('home renovation app');
    expect(keywords).toContain('AI interior design');
    expect(keywords).toContain('LiDAR room scanner');
    expect(keywords).toContain('best room scanner app iPhone');
    expect(keywords).toContain('try furniture before you buy');
    expect(keywords.length).toBeGreaterThanOrEqual(12);
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
        url: '/opengraph-image',
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
    expect(metadata.twitter).toHaveProperty('images', ['/opengraph-image']);
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
  it('should include home, blog index, and all blog posts', () => {
    const result = sitemap();
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result[0].url).toBe('https://www.tardis-ai.com');
    expect(result[1].url).toBe('https://www.tardis-ai.com/blog');
  });

  it('should set home page priority to 1', () => {
    const result = sitemap();
    expect(result[0].priority).toBe(1);
  });

  it('should set blog index priority to 0.9', () => {
    const result = sitemap();
    expect(result[1].priority).toBe(0.9);
  });

  it('should include blog posts with proper URLs', () => {
    const result = sitemap();
    const blogPosts = result.filter((r) => r.url.includes('/blog/') && r.url !== 'https://www.tardis-ai.com/blog');
    expect(blogPosts.length).toBeGreaterThanOrEqual(6);
    blogPosts.forEach((post) => {
      expect(post.url).toMatch(/^https:\/\/www\.tardis-ai\.com\/blog\/.+/);
      expect(post.changeFrequency).toBe('monthly');
    });
  });

  it('should give higher priority to keyword-targeted posts', () => {
    const result = sitemap();
    const blogPosts = result.filter((r) => r.url.includes('/blog/') && r.url !== 'https://www.tardis-ai.com/blog');
    const highPriority = blogPosts.filter((p) => p.priority === 0.8);
    expect(highPriority.length).toBeGreaterThan(0);
  });
});
