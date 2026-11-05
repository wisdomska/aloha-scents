import { GiftSets } from "@/components/gifts/GiftSets";
import { Hero } from "@/components/home/Hero";
import { HowToWear } from "@/components/home/HowToWear";
import { NoteComposer } from "@/components/home/NoteComposer";
import { OurStory } from "@/components/home/OurStory";
import { ScentFinder } from "@/components/home/ScentFinder";
import { ValueStrip } from "@/components/home/ValueStrip";
import { RibbonOudToIvory, RibbonOudToSand } from "@/components/ui/SilkRibbon";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <RibbonOudToSand />
      <ScentFinder />
      <GiftSets />
      <NoteComposer />
      <RibbonOudToIvory />
      <OurStory />
      <HowToWear />
    </>
  );
}
