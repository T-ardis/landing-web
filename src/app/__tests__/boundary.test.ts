import { readFileSync } from 'fs';
import { resolve } from 'path';

// Marketing surfaces whose visible copy makes public product claims.
const FILES = [
  '../../components/Hero/Hero.tsx',
  '../../components/HowItWorks/HowItWorks.tsx',
  '../../components/Why/Why.tsx',
  '../../components/Demo/Demo.tsx',
  '../../components/LogoStrip/LogoStrip.tsx',
  '../../components/Nav/Nav.tsx',
  '../../components/Footer/Footer.tsx',
  '../../components/Faq/Faq.tsx',
  '../../components/Cta/Cta.tsx',
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

  it('should label surface AR as preview-grade where it is claimed', () => {
    expect(copy).toContain('preview-grade');
  });

  it('should position the product as an embeddable one-script layer', () => {
    expect(copy).toContain('script');
    expect(copy).toContain('object ar');
  });
});
