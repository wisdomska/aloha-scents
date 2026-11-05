"use client";

import type { MouseEvent } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { NAV, PAGE_MSG, PATHS } from "@/content/site";
import { track } from "@/lib/analytics";
import { waHello, waLink } from "@/lib/whatsapp";

/** Main navigation items with active state, shared by header, mobile menu and footer. */
export function useNav() {
  const { activeKey, navigate } = useSite();
  return NAV.map((n, i) => {
    const on = activeKey === n.key;
    return {
      ...n,
      href: PATHS[n.page] + (n.anchor ? "#" + n.anchor : ""),
      current: on ? ("page" as const) : undefined,
      color: on ? "#2E1A16" : "#6B3F35",
      mark: on ? "1" : "0",
      delay: 80 + i * 50 + "ms",
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        navigate(n.page, n.anchor, n.key);
      },
    };
  });
}

/** Context-aware WhatsApp link (message depends on the current page) plus tracking helpers. */
export function useWhatsApp() {
  const { page, isReduced } = useSite();
  return {
    fabHref: waLink(PAGE_MSG[page]),
    contactHref: waLink(PAGE_MSG.contact),
    headerWaClick: () => track("whatsapp_click", { source: "header", page }),
    fabClick: () => track("whatsapp_click", { source: "floating", page }),
    waHello: (e: MouseEvent<HTMLElement>) => waHello(e, isReduced()),
  };
}
