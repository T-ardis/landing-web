import { metadata } from '../layout';
import robots from '../robots';
import sitemap from '../sitemap';

describe('layout.tsx metadata', () => {
  it('should define a keyword-led B2B title for embeddable-AR SERPs', () => {
    expect(metadata.title).toEqual({
      default: 'Embeddable AR for Product Pages — See It in Your Room | TARDIS',
      template: '%s | TARDIS',
    });
  });

  it('should define a description that front-loads the embeddable-AR B2B keyword', () => {
    expect(metadata.description).toBe(
      'TARDIS adds embeddable AR to your product pages with one script. Shoppers see furniture and surfaces in their room at true scale — object AR plus preview-grade surface AR. We generate the 3D model from a product photo — no app, no SDK, no per-SKU 3D bill.',
    );
  });

  it('should include the B2B commercial-intent keywords', () => {
    const keywords = metadata.keywords as string[];
    // Head terms for the B2B embeddable-AR category
    expect(keywords).toContain('embeddable AR');
    expect(keywords).toContain('AR for product pages');
    expect(keywords).toContain('AR ecommerce widget');
    expect(keywords).toContain('3D product visualization');
    expect(keywords).toContain('AR product visualization');
    // Buyer intent + platform
    expect(keywords).toContain('AR for Shopify');
    expect(keywords).toContain('view in your room widget');
    expect(keywords).toContain('reduce ecommerce returns with AR');
    // Competitor / brand-defensive
    expect(keywords).toContain('Roomvo alternative');
    expect(keywords).toContain('Cylindo alternative');
    expect(keywords).toContain('Threekit alternative');
    // Product differentiators
    expect(keywords).toContain('3D model generation from photo');
    expect(keywords).toContain('object AR and surface AR');
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
      'Embeddable AR for Product Pages — See It in Your Room | TARDIS',
    );
  });

  it('should set a keyword-rich B2B OG description', () => {
    expect(metadata.openGraph).toHaveProperty(
      'description',
      'Add embeddable AR to your product pages with one script. Shoppers see furniture and surfaces in their room at true scale — object AR plus preview-grade surface AR.',
    );
  });

  it('should set the OG image with keyword-rich alt text', () => {
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.images).toEqual([
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TARDIS — embeddable AR for product pages',
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
      'Embeddable AR for Product Pages — See It in Your Room | TARDIS',
    );
  });

  it('should set a keyword-rich B2B Twitter description', () => {
    expect(metadata.twitter).toHaveProperty(
      'description',
      'Add embeddable AR to your product pages with one script. Shoppers see furniture and surfaces in their room at true scale — object AR plus preview-grade surface AR.',
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
