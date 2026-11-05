import type { MouseEvent } from "react";
import { CONTACT } from "@/content/site";

export const waLink = (text: string) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

const HELLO_KEY = "aloha-hello";

/** One small "hello" wiggle of the WhatsApp icon per session. */
export function waHello(e: MouseEvent<HTMLElement>, reduced: boolean) {
  if (reduced) return;
  try {
    if (sessionStorage.getItem(HELLO_KEY)) return;
    sessionStorage.setItem(HELLO_KEY, "1");
  } catch {
    /* storage unavailable */
  }
  const icon = e.currentTarget.querySelector("[data-wa-icon]");
  icon?.animate(
    [
      { transform: "rotate(0)" },
      { transform: "rotate(-14deg)" },
      { transform: "rotate(10deg)" },
      { transform: "rotate(-5deg)" },
      { transform: "rotate(0)" },
    ],
    { duration: 620, easing: "ease-in-out" },
  );
}
