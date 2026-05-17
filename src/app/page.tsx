import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import Problem from '@/components/Problem/Problem';
import Marquee from '@/components/Marquee/Marquee';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Retailers from '@/components/Retailers/Retailers';
import Testimonials from '@/components/Testimonials/Testimonials';
import Faq from '@/components/Faq/Faq';
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
      alternateName: ['TARDIS AI', 'TARDIS Furniture Visualizer'],
      description:
        'AR furniture visualizer for iPhone. Scan your room with LiDAR, see how furniture looks in your room photorealistically, and check out across IKEA, Wayfair & CB2.',
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.tardis-ai.com/#app',
      name: 'TARDIS — AR Furniture Visualizer',
      alternateName: 'TARDIS',
      applicationCategory: ['LifestyleApplication', 'ShoppingApplication'],
      applicationSubCategory: 'AR Furniture Visualizer',
      operatingSystem: 'iOS',
      description:
        'TARDIS is an AR furniture visualizer for iPhone. Scan your room with LiDAR in 60 seconds, see furniture in your room photorealistically with augmented reality, and check out across IKEA, Wayfair, CB2 and more — one cart, one tap.',
      url: 'https://www.tardis-ai.com',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free AR furniture visualizer with optional premium subscription',
      },
      featureList: [
        'AR furniture visualizer — see furniture in your room at true scale',
        'iPhone LiDAR 3D room scanner — millimeter-precise in 60 seconds',
        'Augmented reality furniture viewer with photorealistic rendering',
        'AR furniture try-on across IKEA, Wayfair, CB2 and more',
        'Furniture in room visualizer — real products, not generic 3D shapes',
        'Multi-brand unified checkout — one cart for every retailer',
        'Real-time style, color, and material swapping',
        '3D scan furniture and existing rooms for accurate planning',
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
          name: 'What is an AR furniture visualizer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An AR furniture visualizer is an app that uses augmented reality and your phone’s camera (plus a LiDAR depth sensor, when available) to render 3D models of real furniture inside your actual room. You see how a sofa, table, lamp or shelf will look and fit at true scale before buying — so the product that arrives matches the product you saw on your phone.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I see furniture in my room before buying?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Open TARDIS on a LiDAR-equipped iPhone, scan your room in 60 seconds, then drop furniture from IKEA, Wayfair, CB2 and more into the scene. The furniture visualizer renders each piece photorealistically in your actual room — color, material, and scale matched to your space.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is TARDIS the same as Wayfair’s Tardis tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Wayfair’s Tardis renders Wayfair products inside your room. TARDIS is a multi-brand AR furniture visualizer that pulls real products from IKEA, Wayfair, CB2 and other retailers into one design — with a single unified checkout across every brand.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I try furniture before I buy with AR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. TARDIS is built around AR furniture try-on: scan your room once, then place any product from the catalog at true scale, swap styles or colors, and walk around it through your phone. AR visualization has been shown to cut furniture returns by up to 25%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which iPhones support the TARDIS furniture visualizer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TARDIS works best on iPhones with the LiDAR sensor — iPhone 12 Pro and later Pro models, plus all iPad Pro models from 2020 onwards. Non-Pro iPhones still support augmented reality furniture viewing, but room geometry won’t be as precise.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the TARDIS furniture visualizer free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — TARDIS is free to download. Scanning your room, visualizing furniture in your room with AR, and exporting designs are all free. A premium subscription unlocks advanced AI styling features.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does TARDIS support multi-brand checkout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TARDIS supports unified checkout across IKEA, Wayfair, CB2, and more. Every item from your AR-visualized design goes into a single cart — one payment, coordinated delivery, no juggling five separate orders.',
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
        <Marquee />
        <Problem />
        <HowItWorks />
        <Retailers />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
