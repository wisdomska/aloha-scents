import { PageHero } from "@/components/ui/PageHero";

export function GiftsIntro() {
  return (
    <PageHero
      id="gifts-page-title"
      eyebrow="Gift sets & catalogue"
      title={
        <>
          Find the gift, <em>or the scent.</em>
        </>
      }
      lede="Every set leaves wrapped, with a handwritten or voice note. Prices are ranges, and we'll always match within yours."
      product={{ src: "/assets/hero-amber.png", alt: "An amber faceted perfume bottle with a gold collar" }}
    />
  );
}
