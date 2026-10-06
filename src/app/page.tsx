import { AdSlot } from "@/components/ads/AdSlot";
import { DiceEducation, FAQ, Footer, HowTo, Introduction, UseCases } from "@/components/content/Editorial";
import { DiceRoller } from "@/features/dice/components/DiceRoller";

export default function Home() {
  return <div id="top" className="min-h-screen bg-background">
    <DiceRoller/>
    <AdSlot name="Primary"/>
    <Introduction/>
    <HowTo/>
    <DiceEducation/>
    <AdSlot name="Secondary"/>
    <UseCases/>
    <FAQ/>
    <Footer/>
  </div>;
}
