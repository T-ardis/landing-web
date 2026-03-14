import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import Problem from '@/components/Problem/Problem';
import Marquee from '@/components/Marquee/Marquee';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Features from '@/components/Features/Features';
import Market from '@/components/Market/Market';
import BusinessModel from '@/components/BusinessModel/BusinessModel';
import Team from '@/components/Team/Team';
import Roadmap from '@/components/Roadmap/Roadmap';
import Cta from '@/components/Cta/Cta';
import Footer from '@/components/Footer/Footer';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.tardis-ai.com/#website',
      url: 'https://www.tardis-ai.com',
      name: 'TARDIS',
      description: 'AI-powered home design app. LiDAR scan → AI furniture placement → multi-brand checkout.',
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.tardis-ai.com/#app',
      name: 'TARDIS',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS',
      description:
        'TARDIS uses iPhone LiDAR to map your room in 60 seconds, places furniture photorealistically with AI, and lets you check out across IKEA, Wayfair, CB2 and more — one cart, one tap.',
      url: 'https://www.tardis-ai.com',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free to download with optional premium subscription',
      },
      featureList: [
        'iPhone LiDAR 3D room scanning',
        'AI photorealistic furniture placement',
        'Multi-brand shopping cart (IKEA, Wayfair, CB2)',
        'One-tap checkout across brands',
        'Real-time style and color swapping',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.tardis-ai.com/#organization',
      name: 'TARDIS',
      url: 'https://www.tardis-ai.com',
      foundingDate: '2024',
      founders: [
        {
          '@type': 'Person',
          name: 'Illia Lisovskyi',
          sameAs: 'https://www.linkedin.com/in/illia-lisovskyi/',
        },
        {
          '@type': 'Person',
          name: 'Yevhenii Riabokin',
          sameAs: 'https://www.linkedin.com/in/yevhenii-riabokin-10a104257',
        },
      ],
      description: 'TARDIS is building the future of home renovation — from scan to delivery, all in one app.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does TARDIS scan a room?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TARDIS uses the iPhone LiDAR sensor to build a millimeter-precise 3D map of your room in under 60 seconds. Walls, windows, alcoves, and furniture placement areas are captured automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which stores does TARDIS support for checkout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TARDIS supports multi-brand checkout across IKEA, Wayfair, CB2, and more. All items from your design go into a single cart for one unified checkout.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is TARDIS free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TARDIS is free to download. A premium subscription unlocks advanced AI design features for power users and design enthusiasts.',
          },
        },
        {
          '@type': 'Question',
          name: 'What iPhone models support TARDIS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TARDIS requires an iPhone with LiDAR — iPhone 12 Pro and later (Pro models), as well as all iPad Pro models from 2020 onwards.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Marquee />
        <HowItWorks />
        <Marquee reverse items={['LIDAR SCAN', 'AI DESIGN', 'MULTI-BRAND', 'ONE CHECKOUT', 'TARDIS', 'YOUR ROOM']} />
        <Features />
        <Market />
        <BusinessModel />
        <Team />
        <Roadmap />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
