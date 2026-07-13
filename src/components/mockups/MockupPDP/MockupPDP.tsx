import Image from 'next/image';
import styles from './MockupPDP.module.css';

// Real capture of the TARDIS embed on a retailer product page (the "HAVEN" demo
// store) — the shopper-facing "View in your room" button live in the buy box.
export default function MockupPDP() {
  return (
    <figure className={`frame ${styles.frame}`}>
      <div className="frameBar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="urlbar">haven.example&#8239;/&#8239;halden-sectional-sofa</span>
      </div>
      <Image
        className={styles.shot}
        src="/mockups/pdp.png"
        width={1440}
        height={960}
        alt="A retailer product page with the TARDIS “View in your room” button in the buy box"
        sizes="(max-width: 820px) 92vw, 640px"
      />
    </figure>
  );
}
