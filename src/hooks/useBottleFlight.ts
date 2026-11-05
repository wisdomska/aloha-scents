"use client";

import { useEffect, type RefObject } from "react";

/** Layout position in document coordinates (ignores transforms, so it is stable while animating). */
function docBox(el: HTMLElement) {
  let x = 0;
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Scroll-driven flight: the hero bottle drifts down with the page, shrinks and tips the
 * other way, and comes to rest on the bottom-right corner of the target card. Once landed
 * it scrolls with the card. Disabled for reduced motion (the bottle simply stays in the hero).
 */
export function useBottleFlight(
  bottleRef: RefObject<HTMLElement | null>,
  heroRef: RefObject<HTMLElement | null>,
  targetId: string,
) {
  useEffect(() => {
    const bottle = bottleRef.current;
    const hero = heroRef.current;
    const card = document.getElementById(targetId);
    if (!bottle || !hero || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let geo = { dx: 0, dy: 0, scale: 1, end: 1 };
    let raf = 0;
    let settleTimer = 0;

    const measure = () => {
      const b = docBox(bottle);
      const c = docBox(card);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Landed size: a small accent, relative to the card.
      const targetW = Math.min(190, Math.max(96, c.w * (vw < 720 ? 0.3 : 0.2)));
      const scale = targetW / b.w;
      // Perch on the corner: mostly hanging past the card's bottom edge so it never covers content.
      const tx = c.x + c.w - targetW * (vw < 720 ? 0.26 : 0.16);
      const ty = c.y + c.h + targetW * 0.08;
      // Finish when the card's bottom edge reaches ~80% of the viewport.
      const end = Math.max(1, c.y + c.h - vh * 0.8);
      geo = { dx: tx - (b.x + b.w / 2), dy: ty - (b.y + b.h / 2), scale, end };
    };

    const apply = () => {
      raf = 0;
      const p = clamp01(window.scrollY / geo.end);
      const e = easeInOut(p);
      // y tracks scroll directly, x / tilt / size ease: together they trace a gentle arc.
      bottle.style.transform =
        `translate3d(${(geo.dx * e).toFixed(1)}px, ${(geo.dy * p).toFixed(1)}px, 0) ` +
        `rotate(${(32 * e).toFixed(2)}deg) scale(${lerp(1, geo.scale, e).toFixed(4)})`;
      // Let it leave the hero once it starts moving; keep the original clipping at rest.
      hero.style.overflowY = p > 0 ? "visible" : "hidden";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLayout = () => {
      measure();
      // Glide (rather than jump) when the card changes height, e.g. a new finder step.
      bottle.style.transition = "transform 500ms cubic-bezier(.23,1,.32,1)";
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => (bottle.style.transition = ""), 520);
      apply();
    };

    measure();
    apply();
    const ro = new ResizeObserver(onLayout);
    ro.observe(card);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onLayout);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onLayout);
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      bottle.style.transform = "";
      bottle.style.transition = "";
      hero.style.overflowY = "hidden";
    };
  }, [bottleRef, heroRef, targetId]);
}
