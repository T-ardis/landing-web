import { metadata } from '../layout';
import robots from '../robots';
import sitemap from '../sitemap';

describe('layout.tsx metadata', () => {
  it('should define a keyword-led title for AR furniture visualizer SERPs', () => {
    expect(metadata.title).toEqual({
      default: 'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
      template: '%s | TARDIS',
    });
  });

  it('should define a description that front-loads the AR furniture visualizer keyword', () => {
    expect(metadata.description).toBe(
      'TARDIS is an AR furniture visualizer. Paste a product link from IKEA, Wayfair, CB2 or any store, get a true-scale 3D model, and see furniture in your room with AR — free, in your browser.',
    );
  });

  it('should include the top-volume Search Console keywords', () => {
    const keywords = metadata.keywords as string[];
    // Head terms straight from Google Search Console (highest impressions)
    expect(keywords).toContain('AR furniture visualizer');
    expect(keywords).toContain('furniture visualizer');
    expect(keywords).toContain('furniture visualiser');
    expect(keywords).toContain('augmented reality furniture viewer');
    expect(keywords).toContain('3d augmented reality furniture');
    expect(keywords).toContain('AR furniture try-on');
    expect(keywords).toContain('furniture in room visualizer');
    // Long-tail intent variants
    expect(keywords).toContain('see furniture in your room');
    expect(keywords).toContain('visualize furniture in room');
    expect(keywords).toContain('view furniture in room');
    // Brand-defensive
    expect(keywords).toContain('wayfair tardis alternative');
    // Original commercial-intent kept for breadth
    expect(keywords).toContain('home renovation app');
    expect(keywords).toContain('AI interior design');
    expect(keywords).toContain('LiDAR room scanner');
    expect(keywords).toContain('best room scanner app iPhone');
    expect(keywords).toContain('try furniture before you buy');
    expect(keywords.length).toBeGreaterThanOrEqual(20);
  });
});

describe('layout.tsx openGraph metadata', () => {
  it('should set the correct URL', () => {
    expect(metadata.openGraph).toHaveProperty('url', 'https://www.tardis-ai.com');
  });

  it('should set a keyword-led OG title', () => {
    expect(metadata.openGraph).toHaveProperty(
      'title',
      'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
    );
  });

  it('should set a keyword-rich, B2B-inclusive OG description', () => {
    expect(metadata.openGraph).toHaveProperty(
      'description',
      'Add an AR furniture visualizer to your product pages with one script. Shoppers see items in their room at true scale — object AR plus preview-grade surface AR.',
    );
  });

  it('should set the OG image with keyword-rich alt text', () => {
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.images).toEqual([
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TARDIS — AR furniture visualizer',
      },
    ]);
  });
});

describe('layout.tsx twitter metadata', () => {
  it('should set the card type to summary_large_image', () => {
    expect(metadata.twitter).toHaveProperty('card', 'summary_large_image');
  });

  it('should set a keyword-led Twitter title', () => {
    expect(metadata.twitter).toHaveProperty(
      'title',
      'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
    );
  });

  it('should set a keyword-rich, B2B-inclusive Twitter description', () => {
    expect(metadata.twitter).toHaveProperty(
      'description',
      'Add an AR furniture visualizer to your product pages with one script. Shoppers see items in their room at true scale — object AR plus preview-grade surface AR.',
    );
  });

  it('should set the correct Twitter image', () => {
    expect(metadata.twitter).toHaveProperty('images', ['/opengraph-image']);
  });
});

describe('robots.ts', () => {
  it('should allow all user agents to index the site', () => {
    const result = robots();
    expect(result.rules).toEqual({
      userAgent: '*',
      allow: '/',
      disallow: ['/opengraph-image', '/blog/*/opengraph-image'],
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
  it('should include home, blog index, about page, and all blog posts', () => {
    const result = sitemap();
    expect(result.length).toBeGreaterThanOrEqual(4);
    expect(result[0].url).toBe('https://www.tardis-ai.com');
    expect(result[1].url).toBe('https://www.tardis-ai.com/blog');
    expect(result[2].url).toBe('https://www.tardis-ai.com/about');
  });

  it('should set home page priority to 1', () => {
    const result = sitemap();
    expect(result[0].priority).toBe(1);
  });

  it('should set blog index priority to 0.9', () => {
    const result = sitemap();
    expect(result[1].priority).toBe(0.9);
  });

  it('should set about page priority lower than blog (secondary content)', () => {
    const result = sitemap();
    expect(result[2].priority).toBe(0.6);
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
