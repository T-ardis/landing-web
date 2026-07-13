import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import ProofBand from '@/components/ProofBand/ProofBand';
import Problem from '@/components/Problem/Problem';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Modes from '@/components/Modes/Modes';
import Why from '@/components/Why/Why';
import Showcase from '@/components/Showcase/Showcase';
import ForYourStack from '@/components/ForYourStack/ForYourStack';
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
        'Embeddable AR furniture visualizer. Retailers add one script to their product pages so shoppers see items in their room at true scale — object AR for furniture plus preview-grade surface AR for wall coverings.',
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
        'TARDIS is an embeddable AR furniture visualizer. Retailers add one script to their product pages, and shoppers see a true-scale interactive 3D model in their room with AR — object AR for furniture plus preview-grade surface AR — in the browser, no app required.',
      url: 'https://app.tardis-ai.com',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free live demo — try the AR furniture visualizer in your browser',
      },
      featureList: [
        'Embeddable AR furniture visualizer — add it to any product page with one script',
        'Object AR: shoppers see furniture at true scale in their room',
        'Preview-grade surface AR for rugs and wall coverings',
        'True-to-scale placement using each product’s listed dimensions',
        'Runs in the browser — AR Quick Look on iOS, Scene Viewer on Android',
        'No app and no SDK for shoppers',
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
        'TARDIS builds an embeddable AR layer that lets retailers show shoppers furniture at true scale in their own room — object AR and preview-grade surface AR on the web today, with a native App Clip in development.',
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
        <ProofBand />
        <Problem />
        <HowItWorks />
        <Modes />
        <Why />
        <Showcase />
        <ForYourStack />
        <Faq />
        <FromBlog />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
