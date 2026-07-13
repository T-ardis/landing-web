import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const SITE_URL = 'https://www.tardis-ai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Embeddable AR for Product Pages — See It in Your Room | TARDIS',
    template: '%s | TARDIS',
  },
  description:
    'TARDIS adds embeddable AR to your product pages with one script. Shoppers see furniture and surfaces in their room at true scale — object AR plus preview-grade surface AR. We generate the 3D model from a product photo — no app, no SDK, no per-SKU 3D bill.',
  keywords: [
    'embeddable AR',
    'AR for product pages',
    'AR ecommerce widget',
    '3D product visualization',
    '3D product visualization platform',
    'AR product visualization',
    'ecommerce AR',
    'AR shopping widget',
    'view in your room widget',
    'AR try before you buy',
    'Roomvo alternative',
    'Cylindo alternative',
    'Threekit alternative',
    'furniture AR for retailers',
    'surface AR wall visualizer',
    'AR for Shopify',
    'AR for product detail pages',
    '3D model generation from photo',
    'reduce ecommerce returns with AR',
    'AR conversion rate',
    'web AR embed',
    'product page AR',
    'see it in your room',
    'AR for furniture retailers',
    'AR for home goods',
    'AR for wall coverings',
    'object AR and surface AR',
    'one script AR',
    'no-app AR viewer',
    'AR visual commerce',
  ],
  authors: [
    { name: 'Illia Lisovskyi' },
    { name: 'Yevhenii Riabokin' },
  ],
  creator: 'TARDIS',
  publisher: 'TARDIS',
  applicationName: 'TARDIS',
  category: 'technology',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'TARDIS',
    title: 'Embeddable AR for Product Pages — See It in Your Room | TARDIS',
    description:
      'Add embeddable AR to your product pages with one script. Shoppers see furniture and surfaces in their room at true scale — object AR plus preview-grade surface AR.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TARDIS — embeddable AR for product pages',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Embeddable AR for Product Pages — See It in Your Room | TARDIS',
    description:
      'Add embeddable AR to your product pages with one script. Shoppers see furniture and surfaces in their room at true scale — object AR plus preview-grade surface AR.',
    images: ['/opengraph-image'],
    creator: '@tardisapp',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
