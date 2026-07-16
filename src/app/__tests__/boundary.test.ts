import { readFileSync } from 'fs';
import { resolve } from 'path';

// Marketing surfaces whose visible copy makes public product claims.
const FILES = [
  '../../components/Hero/Hero.tsx',
  '../../components/ProofBand/ProofBand.tsx',
  '../../components/Problem/Problem.tsx',
  '../../components/HowItWorks/HowItWorks.tsx',
  '../../components/Why/Why.tsx',
  '../../components/Showcase/Showcase.tsx',
  '../../components/ForYourStack/ForYourStack.tsx',
  '../../components/Nav/Nav.tsx',
  '../../components/Footer/Footer.tsx',
  '../../components/Faq/Faq.tsx',
  '../../components/Cta/Cta.tsx',
  '../../components/mockups/MockupAR/MockupAR.tsx',
  '../../components/mockups/MockupPDP/MockupPDP.tsx',
  '../../components/mockups/MockupAdmin/MockupAdmin.tsx',
  '../layout.tsx',
  '../page.tsx',
  '../about/page.tsx',
  '../opengraph-image.tsx',
].map((f) => resolve(__dirname, f));

function combinedCopy(): string {
  return FILES.map((f) => readFileSync(f, 'utf8')).join('\n').toLowerCase();
}

describe('public claims match the core product boundary', () => {
  const copy = combinedCopy();

  it.each([
    ['stripe', 'payments / Stripe are not shipped'],
    ['mattercraft', 'Mattercraft is not shipped'],
    ['zappar', 'Zappar is not shipped'],
  ])('should never claim %s (%s)', (term) => {
    expect(copy).not.toContain(term);
  });

  it('should not imply live self-serve billing (no pricing/checkout page)', () => {
    // Billing is contact-sales; the copy must not advertise a pricing page.
    expect(copy).not.toContain('pricing page');
    expect(copy).not.toContain('start your free trial');
  });

  // The embed ships furniture (object AR) only. "surfaces" as a bare word is
  // allowed; the banned terms are the ones that claim a surface product.
  it.each([
    ['wallpaper', 'wall coverings are out of scope'],
    ['wall covering', 'wall coverings are out of scope'],
    ['surface ar', 'the surface mode is not part of the product'],
    ['preview-grade', 'preview-grade only ever qualified surface AR'],
  ])('should never claim %s (%s)', (term) => {
    expect(copy).not.toContain(term);
  });

  it('should position the product as an embeddable one-script layer', () => {
    expect(copy).toContain('script');
    expect(copy).toContain('object ar');
  });
});
