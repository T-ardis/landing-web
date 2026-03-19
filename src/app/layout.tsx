import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = 'https://www.tardis-ai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'TARDIS — Scan it. Style it. Own it.',
    template: '%s | TARDIS',
  },
  description:
    'TARDIS uses iPhone LiDAR to map your room in 60 seconds, drops AI-selected furniture photorealistically, and checks out across IKEA, Wayfair, CB2 and more — one cart, one tap.',
  keywords: [
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
    title: 'TARDIS — Scan it. Style it. Own it.',
    description:
      'LiDAR scan your room → AI places furniture photorealistically → one-click checkout across IKEA, Wayfair, CB2 and more. Home design, reimagined.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TARDIS — AI-powered home design app',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TARDIS — Scan it. Style it. Own it.',
    description:
      'LiDAR scan → AI furniture placement → one-tap multi-brand checkout. Home design, finally solved.',
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
    apple: '/apple-touch-icon.png',
  },

  verification: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body style={{ fontFamily: 'var(--font-body, Inter, sans-serif)' }}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
