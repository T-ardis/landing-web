import styles from './Faq.module.css';

const FAQS = [
  {
    q: 'What is TARDIS, exactly?',
    a: 'An embeddable AR layer for your product pages. You add one script; shoppers tap “View in your room” and see the product at true scale in their space — a generated 3D model for furniture (object AR), or a live surface preview for wall coverings (surface AR). No app for shoppers, no SDK for you.',
  },
  {
    q: 'How hard is it to install?',
    a: 'One script tag on your product-page template plus a data-attribute on the button — about the effort of adding an analytics snippet. It works on Shopify, Magento, BigCommerce, WooCommerce, or a custom front end. Most retailers are live the same day.',
  },
  {
    q: 'Where do the 3D models come from?',
    a: 'We auto-generate them from your product photos, so AR can cover the whole catalogue — not just hero SKUs. That’s the difference from tools that hand-model each product: no per-SKU 3D bill and no waiting on a modelling studio.',
  },
  {
    q: 'How is this different from Roomvo, Cylindo, or Threekit?',
    a: 'Roomvo focuses on surfaces; Cylindo and Threekit do furniture 3D by hand, per SKU. TARDIS is the only embed that covers both object and surface from one script, with the assets generated automatically from a photo.',
  },
  {
    q: 'What does it cost?',
    a: 'Pricing scales with catalogue size and traffic, and the two modes — object and surface — are the tiers: one integration, pay for the capability you use. Book a demo and we’ll scope a plan.',
  },
  {
    q: 'How accurate is the AR, honestly?',
    a: 'Object AR is high-fidelity and true-to-scale — built to each product’s listed dimensions, using native AR Quick Look on iOS and Scene Viewer on Android. Surface AR is preview-grade on the web (accurate colour and pattern, not a measured render), with native-grade fidelity via the iOS App Clip tier.',
  },
  {
    q: 'Will it touch my shoppers’ data or slow my page?',
    a: 'The widget is a tiny script that lazy-loads its heavy code, and the shopper hot path is served from the edge/CDN — it never touches your backend. It records only anonymous AR-interaction analytics (opens and views), scoped to your account.',
  },
];

export { FAQS };

export default function Faq() {
  return (
    <section id="faq" className={styles.section}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">FAQ</span>
          <h2 className={styles.heading}>
            Frequently asked questions
          </h2>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <details key={i} className={styles.faq}>
              <summary className={styles.summary}>{f.q}</summary>
              <p className={styles.answer}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
