import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about the gift and we'll come back with ideas that fit your budget. Prefer to chat? WhatsApp +233 595 873 933.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return <ContactSection />;
}
