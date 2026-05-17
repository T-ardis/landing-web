import styles from './Faq.module.css';

const FAQS = [
  {
    q: 'What does TARDIS actually do?',
    a: 'TARDIS is three connected tools. (1) Scan: turn your iPhone into a millimeter-precise 3D scanner with LiDAR. (2) Studio: AI styles your whole room across every retailer’s catalog. (3) View: see any product in your real space with AR. Everything ends in one cart at checkout.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. TARDIS runs entirely in your browser — Safari on iPhone, Chrome on Android. The AR experience uses AR Quick Look on iOS and Scene Viewer / ARCore on Android.',
  },
  {
    q: 'Is it free?',
    a: 'The scanner, AR viewer, and basic Studio designs are free with no signup. Saving multiple designs and one-cart multi-brand checkout are part of the full TARDIS experience, currently in beta with a waitlist.',
  },
  {
    q: 'Which retailers work?',
    a: 'IKEA, Wayfair, CB2, Crate & Barrel, West Elm, Pottery Barn, Article, Amazon, and growing. You can also upload any product photo from anywhere — our AI handles it.',
  },
  {
    q: 'Is TARDIS the same as Wayfair’s Tardis tool?',
    a: 'No. Wayfair’s Tardis renders Wayfair products inside your room. TARDIS is a multi-brand AR furniture visualizer that pulls real products from IKEA, Wayfair, CB2 and other retailers into one design — with a single unified checkout across every brand.',
  },
  {
    q: 'Which iPhones support the TARDIS furniture visualizer?',
    a: 'TARDIS works best on iPhones with the LiDAR sensor — iPhone 12 Pro and later Pro models, plus all iPad Pro models from 2020 onwards. Non-Pro iPhones still support augmented reality furniture viewing, but the room geometry won’t be as precise.',
  },
  {
    q: 'Does TARDIS support multi-brand checkout?',
    a: 'TARDIS supports unified checkout across IKEA, Wayfair, CB2, and more. Every item from your AR-visualized design goes into a single cart — one payment, coordinated delivery, no juggling five separate orders.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className={styles.section}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Frequently asked
            </span>
            <h2 className={styles.heading}>
              Questions, <span className="italic">answered.</span>
            </h2>
          </div>
        </div>

        <div className={styles.list}>
          <hr className="divider-thick" />
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
