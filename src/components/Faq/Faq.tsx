import styles from './Faq.module.css';

const FAQS = [
  {
    q: 'What is TARDIS, exactly?',
    a: 'An embeddable AR layer for your furniture product pages. You add one script; shoppers tap “View in your room” and see the piece at true scale in their space — a generated 3D model placed in the room with object AR. No app for shoppers, no SDK for you.',
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
    a: 'All three are strong, and all three build the 3D asset per SKU — a studio or a prepared pipeline for every product. That is the cost that makes AR stop at your hero SKUs. TARDIS generates the model from photography you already have, so AR reaches the whole catalogue in a day rather than a quarter. The trade is hand-finished polish: if you need art-directed 3D for a flagship product, a studio pipeline still beats us.',
  },
  {
    q: 'What does it cost?',
    a: 'Pricing scales with catalogue size and traffic — one integration, no per-SKU 3D bill. Book a demo and we’ll scope a plan.',
  },
  {
    q: 'How accurate is the AR, honestly?',
    a: 'Object AR is high-fidelity and true-to-scale — built to each product’s listed dimensions, using native AR Quick Look on iOS and Scene Viewer on Android. The model itself is generated from your product photos, so how closely it matches the real piece tracks the quality of the photography you already have.',
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
