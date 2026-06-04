import styles from './Faq.module.css';

const FAQS = [
  {
    q: 'What does TARDIS actually do?',
    a: 'TARDIS turns a furniture product page into something you can see in your own room. Paste a product URL or upload a photo, and we generate a true-scale, interactive 3D model you can place in your space with AR — before you buy.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. TARDIS runs entirely in your browser — Safari on iPhone, Chrome on Android. The AR experience uses AR Quick Look on iOS and Scene Viewer on Android.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Generating 3D models and viewing them in your room with AR is free, with no signup. Advanced features like full-room AI styling will be part of the premium experience as the product grows.',
  },
  {
    q: 'Which retailers work?',
    a: 'Most of them. If a product has a public product page or a clear photo, TARDIS can usually build a model from it — including IKEA, Wayfair, CB2, Crate & Barrel, West Elm, Pottery Barn, Article, and Amazon.',
  },
  {
    q: 'Is TARDIS the same as Wayfair’s Tardis tool?',
    a: 'No. Wayfair’s internal tool renders Wayfair products only. TARDIS is an independent, multi-brand visualizer: it works with products from many retailers, so you can design one room with pieces from different stores.',
  },
  {
    q: 'How accurate are the 3D models?',
    a: 'Models are generated at the product’s listed dimensions, so the scale you see in AR matches the real piece. Renders are estimates of shape and material — always double-check exact specifications with the retailer before buying.',
  },
  {
    q: 'What’s next for TARDIS?',
    a: 'An iOS app with LiDAR room scanning is in development: scan your room once, let AI style the entire space across retailers, and check out in a single cart. Join the waitlist to be first in line.',
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
