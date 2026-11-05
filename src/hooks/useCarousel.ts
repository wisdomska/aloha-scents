"use client";

import { useState, type UIEvent } from "react";

/** Tracks which card is in view on the mobile snap carousel and builds the dot indicators. */
export function useCarousel(count: number) {
  const [index, setIndex] = useState(0);

  const onScroll = (e: UIEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const first = el.firstElementChild;
    if (!first) return;
    const step = first.getBoundingClientRect().width + 14;
    const i =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 ? el.children.length - 1 : Math.round(el.scrollLeft / step);
    if (i !== index) setIndex(i);
  };

  const dots = Array.from({ length: count }, (_, i) => {
    const on = i === Math.min(index, count - 1);
    return { w: on ? "22px" : "6px", bg: on ? "#6B3F35" : "rgba(46,26,22,.22)" };
  });

  return { onScroll, dots };
}
