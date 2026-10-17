import { MotionController } from "@/components/MotionController";
import { RevealObserver } from "@/components/RevealObserver";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BrandSection,
  CapabilityStrip,
  FaqSection,
  FinalCta,
  Hero,
  HowItWorks,
  ProductCollection,
  ProfileFeature,
  SiteFooter,
  TeamsSection,
  UseCases,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <CapabilityStrip />
        <HowItWorks />
        <ProductCollection />
        <ProfileFeature />
        <UseCases />
        <BrandSection />
        <TeamsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
      <RevealObserver />
      <MotionController />
      <ScrollAnimations />
    </>
  );
}
