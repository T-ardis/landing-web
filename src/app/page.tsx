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

export default function Home() {
  return (
    <>
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
