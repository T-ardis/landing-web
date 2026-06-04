import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import LogoStrip from '@/components/LogoStrip/LogoStrip';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Demo from '@/components/Demo/Demo';
import Why from '@/components/Why/Why';
import Faq, { FAQS } from '@/components/Faq/Faq';
import FromBlog from '@/components/FromBlog/FromBlog';
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
        'AI furniture visualizer. Paste a product link from IKEA, Wayfair, CB2 or any store, get a true-scale 3D model, and see it in your room with AR.',
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.tardis-ai.com/#app',
      name: 'TARDIS — AR Furniture Visualizer',
      alternateName: 'TARDIS',
      applicationCategory: ['LifestyleApplication', 'ShoppingApplication'],
      applicationSubCategory: 'AR Furniture Visualizer',
      operatingSystem: 'Web, iOS, Android',
      description:
        'TARDIS is an AI furniture visualizer. Paste a furniture product link or upload a photo, get a true-scale interactive 3D model, and place it in your room with AR — in the browser, no download required.',
      url: 'https://app.tardis-ai.com',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free AR furniture visualizer',
      },
      featureList: [
        'AR furniture visualizer — see furniture in your room at true scale',
        'Generate an interactive 3D model from any product URL or photo',
        'Works with products from IKEA, Wayfair, CB2, West Elm, Article, Amazon and more',
        'True-to-scale placement using listed product dimensions',
        'Runs in the browser — AR Quick Look on iOS, Scene Viewer on Android',
        'No download, no signup required',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.tardis-ai.com/#organization',
      name: 'TARDIS',
      url: 'https://www.tardis-ai.com',
      email: 'founders@tardis-ai.com',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Warsaw',
        addressCountry: 'PL',
      },
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
      description:
        'TARDIS builds AI tools that let people see furniture in their homes before they buy it — from a single product link today to full-room scanning and styling next.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
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
        <LogoStrip />
        <HowItWorks />
        <Demo />
        <Why />
        <Faq />
        <FromBlog />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
