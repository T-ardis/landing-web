import styles from './Testimonials.module.css';

/* What real furniture-shopping pain sounds like online.
   We don't fabricate testimonials — instead we surface the public
   sentiment TARDIS is built to fix. */
const VOICES = [
  {
    quote: 'Got scammed by a designer. After paying upfront, he charged an extra $2,500 just to release the files.',
    source: 'r/InteriorDesign',
    href: 'https://www.reddit.com/r/InteriorDesign/comments/1akbhqr/got_scammed_by_a_designer/',
  },
  {
    quote: "Does this kitchen layout make sense? I've been staring at it for three weeks and I genuinely can't tell anymore.",
    source: 'r/kitchens',
    href: 'https://www.reddit.com/r/kitchens/comments/1rioli0/does_this_kitchen_layout_make_sense/',
  },
  {
    quote: 'House renovations are making me depressed. I am doing everything by myself. Every step forward, five steps back.',
    source: 'r/DIYUK',
    href: 'https://www.reddit.com/r/DIYUK/comments/1ciqed2/house_renovations_are_making_me_depressed/',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">
              <span className="dot" />
              The sound of buying blind
            </span>
            <h2 className={styles.heading}>
              Less <span className="italic">guesswork.</span>
              <br />
              More furniture that fits.
            </h2>
          </div>
          <p className="lead">
            Furniture is a $30B-a-year gamble, and the receipts are public.
            These are real posts from real people — the kind of pain TARDIS exists to remove.
          </p>
        </div>

        <div className={styles.grid}>
          {VOICES.map((v, i) => (
            <figure key={i} className={`card ${styles.card}`}>
              <blockquote className={styles.quote}>
                <span className={styles.mark}>&ldquo;</span>
                {v.quote}
              </blockquote>
              <figcaption className={styles.caption}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`caption ${styles.source}`}
                >
                  {v.source} ↗
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
