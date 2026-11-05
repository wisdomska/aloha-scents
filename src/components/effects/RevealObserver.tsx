"use client";

import { useEffect } from "react";

/**
 * Scroll reveal for every [data-reveal] element (optional data-d = delay in ms).
 * Hidden state is pure CSS (`.js [data-reveal]:not([data-in])`), so content stays
 * visible without JavaScript. Watches the DOM so elements added by route changes
 * or filters are picked up automatically.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const el = en.target as HTMLElement;
          io.unobserve(el);
          setTimeout(() => el.setAttribute("data-in", ""), +(el.dataset.d || 0));
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    const watched = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    scan();
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return null;
}
