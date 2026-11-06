import type { Metadata } from "next";
import { ServicesShowcase } from "@/components/services/ServicesShowcase";
import { PageHero } from "@/components/ui/PageHero";
import { IMG } from "@/content/images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom gift sets, scent matching, corporate and occasion gifting, souvenirs and diffusers. One person or a whole team, we'll help.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        id="services-title"
        eyebrow="Services"
        title={
          <>
            However you give, <em>we&apos;ll help.</em>
          </>
        }
        lede="One person or a whole team, one bottle or a full set. Tell us what you need and we'll take it from there."
        photo={{
          src: IMG.wrapping,
          alt: "Close-up of hands tying a ribbon around a kraft-paper wrapped gift",
          position: "58% 72%",
        }}
        inset={{ src: IMG.giftBoxes, alt: "A neat stack of pastel gift boxes", position: "50% 62%" }}
        tag="Wrapped by hand"
      />
      <ServicesShowcase />
    </>
  );
}
