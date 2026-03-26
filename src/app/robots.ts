import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/opengraph-image', '/blog/*/opengraph-image'],
    },
    sitemap: 'https://www.tardis-ai.com/sitemap.xml',
    host: 'https://www.tardis-ai.com',
  };
}
