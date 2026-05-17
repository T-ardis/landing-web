import type { Metadata } from 'next';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
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
    'The AR furniture visualizer for iPhone. Scan your room with LiDAR, see how furniture looks in your room photorealistically, and check out across IKEA, Wayfair & CB2 in one tap.',
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
      'Scan your room with iPhone LiDAR. See how furniture looks in your room with photorealistic AR. Check out across IKEA, Wayfair & CB2 in one tap.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TARDIS — AR furniture visualizer for iPhone',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AR Furniture Visualizer — See Furniture in Your Room | TARDIS',
    description:
      'AR furniture visualizer for iPhone. Scan, see, and shop furniture in your room — one cart across IKEA, Wayfair & CB2.',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  verification: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
      data-theme="light"
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
