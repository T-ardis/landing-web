import styles from './Faq.module.css';

const FAQS = [
  {
    q: 'What does TARDIS actually do?',
    a: 'TARDIS is an embeddable AR furniture visualizer. A retailer adds one script to their product pages, and shoppers tap a button to see an item at true scale in their own room — a generated 3D model for furniture (object AR), or a preview-grade surface for rugs and wall coverings. No app, no SDK.',
  },
  {
    q: 'How do shoppers use it — do they need an app?',
    a: 'No. It runs in the browser: AR Quick Look on iPhone, Scene Viewer on Android, and an interactive 3D fallback everywhere else. Shoppers never install anything.',
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing depends on your catalog size and traffic, so we scope a plan per retailer — get in touch and we’ll put one together. You can try the live demo free today.',
  },
  {
    q: 'Which products work?',
    a: 'Furniture and décor get a true-scale 3D model (object AR). Rugs and wall coverings use preview-grade surface AR. If a product has a public page or a clear photo, we can usually build it — across catalogs like IKEA, Wayfair, CB2, West Elm, Article, and Amazon.',
  },
  {
    q: 'Is TARDIS the same as Wayfair’s Tardis tool?',
    a: 'No. Wayfair’s internal tool renders Wayfair products on Wayfair. TARDIS is an independent, embeddable AR layer any retailer can add to their own product pages, for their own catalog.',
  },
  {
    q: 'How accurate are the 3D models?',
    a: 'Object models are generated at each product’s listed dimensions, so the scale a shopper sees in AR matches the real piece. Surface AR is preview-grade — a realistic in-room preview, not a measured render. Always confirm exact specifications before purchase.',
  },
  {
    q: 'What’s next for TARDIS?',
    a: 'Object AR and preview-grade surface AR are live on the web today. A native App Clip with LiDAR room scanning is in development for higher-fidelity placement. Book a demo to see the current product and the roadmap.',
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
