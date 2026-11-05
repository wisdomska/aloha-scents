import type { Metadata } from "next";
import { Catalogue } from "@/components/gifts/Catalogue";
import { GiftSets } from "@/components/gifts/GiftSets";
import { GiftsIntro } from "@/components/gifts/GiftsIntro";

export const metadata: Metadata = {
  title: "Gift sets & perfumes",
  description:
    "Gift sets for her and for him, plus perfumes, perfume oils, body splashes, diffusers and souvenirs. Every set leaves wrapped with a handwritten or voice note.",
  alternates: { canonical: "/gifts" },
  openGraph: { url: "/gifts" },
};

export default function GiftsPage() {
  return (
    <>
      <GiftsIntro />
      <GiftSets />
      <Catalogue />
    </>
  );
}
