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
    default: 'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
    template: '%s | TARDIS',
  },
  description:
    'TARDIS is an AR furniture visualizer. Paste a product link from IKEA, Wayfair, CB2 or any store, get a true-scale 3D model, and see furniture in your room with AR — free, in your browser.',
  keywords: [
    'AR furniture visualizer',
    'furniture visualizer',
    'furniture visualiser',
    'augmented reality furniture viewer',
    '3d augmented reality furniture',
    'AR furniture try-on',
    'furniture in room visualizer',
    'ar for furniture',
    'furniture visualization',
    'furniture visualization tool',
    'furniture room visualizer',
    'see furniture in your room',
    'see furniture in my room',
    'visualize furniture in room',
    'visualize furniture in my room',
    'view furniture in your room',
    'view furniture in room',
    'see how furniture looks in a room',
    'how to view furniture in your room',
    'ar view',
    'ar room viewer',
    'view in room',
    'view in my space',
    'room viewer',
    'iPhone LiDAR room scanner',
    'LiDAR room scanner',
    'house 3d scanner',
    '3d scanning home interiors',
    '3d scan furniture',
    'home renovation app',
    'AI interior design',
    'best room scanner app iPhone',
    'try furniture before you buy',
    'wayfair tardis alternative',
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
    title: 'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
    description:
      'Add an AR furniture visualizer to your product pages with one script. Shoppers see items in their room at true scale — object AR plus preview-grade surface AR.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TARDIS — AR furniture visualizer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
    description:
      'Add an AR furniture visualizer to your product pages with one script. Shoppers see items in their room at true scale — object AR plus preview-grade surface AR.',
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
