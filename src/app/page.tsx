import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import ProofBand from '@/components/ProofBand/ProofBand';
import Problem from '@/components/Problem/Problem';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
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
        'Embeddable AR furniture visualizer. Retailers add one script to their product pages so shoppers see furniture in their room at true scale, from 3D models generated out of product photos.',
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
        'TARDIS is an embeddable AR furniture visualizer. Retailers add one script to their product pages, and shoppers see a true-scale interactive 3D model of the furniture in their room with AR — in the browser, no app required.',
      url: 'https://app.tardis-ai.com/demo',
      featureList: [
        'Embeddable AR furniture visualizer — add it to any product page with one script',
        'Object AR: shoppers see furniture at true scale in their room',
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
        'TARDIS builds an embeddable AR layer that lets retailers show shoppers furniture at true scale in their own room — object AR on the web today, with the 3D models generated automatically from product photos.',
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
