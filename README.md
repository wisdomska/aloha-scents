# Aloha Scents

**Gifts that smell like love.** Marketing site for Aloha Scents, an Accra perfume and gift-set studio: perfumes from Dubai and around the world, perfume oils, body splashes and gift sets, matched to your budget and wrapped with a handwritten note.

Live: <https://alohascents.vercel.app>

## Stack

- [Next.js 16](https://nextjs.org) App Router, React 19, TypeScript (strict)
- Self-hosted Google Fonts via `next/font` (Cormorant Garamond, DM Sans, Pinyon Script)
- `next/image` (AVIF/WebP) for bottles and logos
- No UI framework: design tokens are CSS custom properties in `src/app/globals.css`
- Deployed on Vercel; every route is statically prerendered

## Getting started

```bash
nvm use            # Node 22 (>= 20.9 works)
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server with hot reload       |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint (Next core-web-vitals)    |
| `npm run typecheck` | TypeScript, no emit              |

## Project structure

```
src/
  app/                      Routes, metadata, SEO (sitemap, robots, OG image)
    page.tsx                /          Home: hero, finder, gift sets, note, story, how to wear
    gifts/page.tsx          /gifts     Gift sets and perfume catalogue
    services/page.tsx       /services  Services accordion
    contact/page.tsx        /contact   Enquiry form
    globals.css             Tokens, base styles, keyframes, reveal + responsive helpers
    interactions.css        Hover / active / focus states
  components/
    layout/                 Header, MobileMenu, Footer, WhatsAppFab, SkipLink
    home/ gifts/ services/ contact/   Page sections
    ui/SilkRibbon.tsx       Flowing copper ribbon dividers
    effects/                Scroll reveal, cursor sparkle and burst layers
    providers/SiteProvider  Shared state: finder answers, gift note, request, enquiry form, navigation
    seo/                    LocalBusiness JSON-LD
  content/
    site.ts                 All copy and data: gift sets, finder options, catalogue, services, contacts
    images.ts               Photo URLs (stock stand-ins) in one place
  hooks/                    useNav, useCarousel, useMist
  lib/                      analytics (dataLayer), WhatsApp links, enquiry adapter + validation, motion
public/assets/              Logos, bottle renders, social icons
```

## Editing content

- **Gift sets, prices, finder questions, catalogue, services, contact details:** `src/content/site.ts`
- **Photography:** `src/content/images.ts` (currently Unsplash / Pexels stand-ins; replace with the Aloha shoot and self-host)

## Enquiry form

Submissions go through `submitEnquiry()` in `src/lib/enquiry.ts`. Set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` (see `.env.example`) to a Google Apps Script web app, Airtable or Zapier hook that accepts a JSON body. Without it, submissions are saved to the visitor's browser only.

## Analytics

Every key action pushes to `window.dataLayer`, ready for Google Tag Manager: `whatsapp_click`, `request_start`, `scent_finder_complete`, `note_attached`, `enquiry_submit`, `enquiry_submit_invalid`, `enquiry_submit_error`, `page_view`.

## Accessibility & motion

Skip link, labelled landmarks, ARIA tabs/accordion/dialog patterns, keyboard support (arrow keys on tabs, Escape closes the menu), visible focus rings, inline validation with focus on the first error. `prefers-reduced-motion` turns off particles, parallax, tilt, cursor sparkle and bursts, and collapses the remaining animations. Content stays visible without JavaScript.

## Still to confirm with the client

- Replace stock photography and the four "How to wear" illustration placeholders
- Ahwenepa and Osikani (GHS 400) contents; him-line contents
- Whether catalogue starting prices can be published
- Social handle spelling, and the "within the day" response promise
- Master SVG logos for sharper rendering
