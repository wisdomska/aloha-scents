/**
 * All editable site content lives here: gift sets, finder questions, catalogue,
 * services, contact details and form options. Components read from this file only.
 */
import { photo, IMG } from "./images";

export type Page = "home" | "gifts" | "services" | "contact";
export type Line = "her" | "him";

export const CONTACT = {
  whatsappNumber: "233595873933",
  whatsappDisplay: "+233 595 873 933",
  instagram: { handle: "@_alohascents", url: "https://instagram.com/_alohascents" },
  tiktok: { handle: "@_alohascentsgh", url: "https://www.tiktok.com/@_alohascentsgh" },
  city: "Accra, Ghana",
} as const;

export const PATHS: Record<Page, string> = {
  home: "/",
  gifts: "/gifts",
  services: "/services",
  contact: "/contact",
};

export interface NavItem {
  key: string;
  label: string;
  page: Page;
  anchor?: string;
}

export const NAV: NavItem[] = [
  { key: "gifts", label: "Gift Sets", page: "gifts" },
  { key: "perfumes", label: "Perfumes & Oils", page: "gifts", anchor: "catalogue" },
  { key: "services", label: "Services", page: "services" },
  { key: "story", label: "Our Story", page: "home", anchor: "story" },
  { key: "contact", label: "Contact", page: "contact" },
];

export const TIERS = [
  "A thoughtful first gift",
  "A little more to unwrap",
  "Layered, soft and lasting",
  "The grand gesture",
] as const;

export interface GiftSet {
  name: string;
  contents: string[];
  price: string;
  /** Contents not yet confirmed by the client. */
  tbc?: boolean;
}

export const SETS: Record<Line, GiftSet[]> = {
  her: [
    { name: "Adepa", contents: ["1 perfume (100 ml)", "3 perfume oils (3 ml)"], price: "GHS 300 – 350" },
    { name: "Ahwenepa", contents: ["Perfume and oils, tailored to her"], tbc: true, price: "GHS 400" },
    { name: "Ohemaa", contents: ["3 perfume oils (6 ml)", "1 body splash"], price: "GHS 450 – 510" },
    { name: "Medofo", contents: ["1 perfume", "4–5 perfume oils", "1 body splash"], price: "GHS 500 – 1,000" },
  ],
  him: [
    { name: "Odehyie", contents: ["1 perfume (100 ml)", "3 perfume oils (3 ml)"], price: "GHS 300 – 350" },
    { name: "Osikani", contents: ["Perfume and oils, tailored to him"], tbc: true, price: "GHS 400" },
    { name: "Odogwu", contents: ["3 perfume oils (6 ml)", "1 body splash"], price: "GHS 450 – 510" },
    { name: "Od33fo", contents: ["1 perfume", "4–5 perfume oils", "1 body splash"], price: "GHS 500 – 1,000" },
  ],
};

export const OCCASIONS = [
  { name: "Birthdays", who: "A set built around them, ready for the day.", occ: "Birthday" },
  { name: "Weddings & anniversaries", who: "Two scents that belong together.", occ: "Anniversary" },
  { name: "Corporate & team gifts", who: "Wrapped consistently for your whole team.", occ: "Corporate gifting" },
  { name: "Thank-yous & farewells", who: "Hello, goodbye and thank you, in one bottle.", occ: "Thank you" },
] as const;

export interface Choice<V> {
  v: V;
  t: string;
  h: string;
}

export type Who = "her" | "him" | "me";
export type Vibe = "floral" | "woody" | "fresh" | "sweet" | "unsure";

export const WHO: Choice<Who>[] = [
  { v: "her", t: "Her", h: "Mum, sister, partner, a friend" },
  { v: "him", t: "Him", h: "Dad, brother, partner, a friend" },
  { v: "me", t: "Me", h: "Because you deserve it too" },
];

export const VIBES: Choice<Vibe>[] = [
  { v: "floral", t: "Soft & floral", h: "Rose, jasmine, powdery musk" },
  { v: "woody", t: "Warm & woody", h: "Oud, amber, sandalwood" },
  { v: "fresh", t: "Fresh & clean", h: "Citrus, sea air, crisp linen" },
  { v: "sweet", t: "Bold & sweet", h: "Vanilla, caramel, warm spice" },
  { v: "unsure", t: "Not sure", h: "We'll help you find it" },
];

export const BUDGETS: Choice<number>[] = [
  { v: 0, t: "GHS 300 – 350", h: "A thoughtful first gift" },
  { v: 1, t: "Around GHS 400", h: "A little more to unwrap" },
  { v: 2, t: "GHS 450 – 510", h: "Layered and lasting" },
  { v: 3, t: "GHS 500 – 1,000", h: "The grand gesture" },
];

export const CATALOGUE = [
  {
    name: "Perfumes",
    body: "Dubai ouds, Arabian classics and international houses. Name one you love and we'll find it.",
  },
  { name: "Perfume oils", body: "Concentrated and long-lasting, worn close to the skin." },
  { name: "Body splashes", body: "Light, easy layers for every day and every bag." },
  { name: "Diffusers", body: "Scent for the home, the office or the car." },
  { name: "Souvenirs", body: "Small keepsakes to send someone home with." },
] as const;

export const WEAR = [
  {
    t: "Pulse points",
    b: "Dab on your wrists, inner elbows and the base of your throat, where warmth lifts the scent. Press, don't rub.",
    ill: "wrist & throat",
  },
  {
    t: "Behind the palm and chest",
    b: "Warm a drop between your palms, then press them to your chest so the scent rises with you.",
    ill: "palms to chest",
  },
  { t: "Beard", b: "One drop worked through the beard keeps the scent close all day.", ill: "beard" },
  {
    t: "Clothing",
    b: "A touch on a collar or scarf lingers long after you leave. Test on a hidden spot first.",
    ill: "collar & scarf",
  },
] as const;

export const OCCASION_OPTS = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Graduation",
  "Thank you",
  "Farewell",
  "Corporate gifting",
  "Just because",
  "Other",
] as const;
export const BUDGET_OPTS = [
  "GHS 300 – 350",
  "Around GHS 400",
  "GHS 450 – 510",
  "GHS 500 – 1,000",
  "Not sure yet",
] as const;
export const CONTACT_OPTS = ["WhatsApp", "Phone call", "Either is fine"] as const;
export const SERVICE_OPTS = [
  "A gift set",
  "Custom gift set",
  "Scent matching",
  "Corporate & occasion gifting",
  "Souvenirs & diffusers",
  "Something else",
] as const;

/** Prefilled WhatsApp message for the header / floating button, per page. */
export const PAGE_MSG: Record<Page, string> = {
  home: "Hi Aloha, I'd like help choosing a scent.",
  gifts: "Hi Aloha, I'm looking at your gift sets and would love some help choosing.",
  services: "Hi Aloha, I'd like to ask about your services.",
  contact: "Hi Aloha, I have a question about a gift.",
};

export const SERVICES = [
  {
    title: "Custom gift sets",
    body: "Tell us who it's for and what you'd like to spend. We'll build a set around them, from perfume to oils to body splash, and wrap it with a note in your words.",
    cta: "Build a gift set",
    hint: "Three quick questions",
    label: "Made for one",
    img: photo(IMG.services[0]),
  },
  {
    title: "Scent matching",
    body: "By budget, by vibe, or by a perfume you already love. Give us one name, or three answers, and we'll find the scent that fits.",
    cta: "Find my scent",
    hint: "Takes about a minute",
    label: "Matched to them",
    img: photo(IMG.services[1]),
  },
  {
    title: "Corporate & occasion gifting",
    body: "Weddings, birthdays, launches and end-of-year thank-yous. Consistent sets for many people, each with its own note.",
    cta: "Plan a corporate gift",
    hint: "Short enquiry form",
    label: "Made for many",
    img: photo(IMG.services[2]),
  },
  {
    title: "Souvenirs & diffusers",
    body: "Keepsakes to send someone home with, and diffusers that make a room smell like you.",
    cta: "Enquire about souvenirs",
    hint: "Short enquiry form",
    label: "To take home",
    img: photo(IMG.services[3]),
  },
] as const;
