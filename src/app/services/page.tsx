import type { Metadata } from "next";
import { ServicesShowcase } from "@/components/services/ServicesShowcase";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom gift sets, scent matching, corporate and occasion gifting, souvenirs and diffusers. One person or a whole team, we'll help.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return <ServicesShowcase />;
}
