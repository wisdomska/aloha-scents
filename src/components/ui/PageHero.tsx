import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./PageHero.module.css";

type Photo = { src: string; alt: string; position?: string };

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  /** Main arch photo. */
  photo?: Photo;
  /** Or: a cut-out product render (transparent PNG) standing on the band, no frame. */
  product?: Photo;
  /** Optional second photo shown as a small card resting against the arch. */
  inset?: Photo;
  /** Short label on the photo, e.g. what is pictured. */
  tag?: string;
};

const STAR = "M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z";

/** Hero for the inner pages: tinted band, copy on the left, photo composition on the right. */
export function PageHero({ id, eyebrow, title, lede, photo, product, inset, tag }: Props) {
  return (
    <section aria-labelledby={id} className={styles.hero} data-product={product ? "" : undefined}>
      <div className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id={id} className={styles.title}>
            {title}
          </h1>
          <p className={styles.lede}>{lede}</p>
        </div>

        {product && (
          <div className={styles.product}>
            <Image
              src={product.src}
              alt={product.alt}
              width={1000}
              height={1000}
              priority
              sizes="(max-width: 880px) 70vw, 520px"
              className={styles.productImg}
            />
            <span className={styles.floorShadow} aria-hidden="true" />
          </div>
        )}
        {photo && (
          <div className={styles.visual} data-inset={inset ? "" : undefined}>
            <div className={styles.arch}>
              <div className={styles.window}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(max-width: 880px) 90vw, 440px"
                  style={{ objectPosition: photo.position ?? "center" }}
                />
              </div>
            </div>
            {inset && (
              <div className={styles.inset}>
                <Image
                  src={inset.src}
                  alt={inset.alt}
                  fill
                  sizes="(max-width: 880px) 40vw, 190px"
                  style={{ objectPosition: inset.position ?? "center" }}
                />
              </div>
            )}
            {tag && (
              <p className={styles.tag}>
                <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#C99A5B" d={STAR} />
                </svg>
                {tag}
              </p>
            )}
            <svg className={styles.spark} viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#C99A5B" d={STAR} />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
