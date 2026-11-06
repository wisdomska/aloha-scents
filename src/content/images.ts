/**
 * Stock photography (Unsplash / Pexels licence) standing in for the Aloha shoot.
 * Swap the URLs here when the real photography arrives.
 */
const U = (id: string) => `https://unsplash.com/photos/${id}/download?w=1000`;
const PX = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`;

export const IMG = {
  hero: U("a5917t2ea8I"),
  story: PX(3927238),
  her: [U("AdfA5C0c12M"), U("79FmeCtL9NE"), U("eX-FeKAgPe0"), PX(6102495)],
  him: [U("79FmeCtL9NE"), U("AdfA5C0c12M"), U("Qyp0OvNhPyc"), U("eX-FeKAgPe0")],
  occasions: [PX(6650015), U("FDTlWHmwIz8"), PX(1050256), U("Qyp0OvNhPyc")],
  catalogue: [U("79FmeCtL9NE"), U("UaO58q6ioxI"), PX(9832103), U("n8BjsYWTH8w"), PX(6650015)],
  /** Services hero: hands wrapping a gift, and a small stack of gift boxes. */
  wrapping: PX(5970866),
  giftBoxes: PX(4271686),
  services: [PX(1050256), PX(9832103), U("FDTlWHmwIz8"), U("W7AyAs7azHc")],
} as const;

/** Photo as a layered CSS background: warm tint over the image, rose-clay fallback. */
export const photo = (url: string, pos = "center") =>
  `linear-gradient(180deg, rgba(201,154,91,.10), rgba(46,26,22,.16)), url("${url}") ${pos} / cover no-repeat, #E7C3B5`;
