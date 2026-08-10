import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/sections/contact-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { DestinationsSection } from "@/components/sections/destinations-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionCallToAction } from "@/components/sections/mission-call-to-action";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <DestinationsSection />
        <FleetSection />
        <ProcessSection />
        <TestimonialsSection />
        <CoverageSection />
        <MissionCallToAction />
        <FaqSection />
        <ContactSection />
      </main>
    </div>
  );
}
