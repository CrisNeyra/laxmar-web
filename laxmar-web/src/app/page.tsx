import dynamic from "next/dynamic";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";

const DestinationsSection = dynamic(
  () =>
    import("@/components/sections/destinations-section").then(
      (mod) => mod.DestinationsSection,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const FleetSection = dynamic(
  () =>
    import("@/components/sections/fleet-section").then(
      (mod) => mod.FleetSection,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const ProcessSection = dynamic(
  () =>
    import("@/components/sections/process-section").then(
      (mod) => mod.ProcessSection,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/testimonials-section").then(
      (mod) => mod.TestimonialsSection,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const CoverageSection = dynamic(
  () =>
    import("@/components/sections/coverage-section").then(
      (mod) => mod.CoverageSection,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const MissionCallToAction = dynamic(
  () =>
    import("@/components/sections/mission-call-to-action").then(
      (mod) => mod.MissionCallToAction,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then(
      (mod) => mod.ContactSection,
    ),
  { loading: () => <SectionPlaceholder /> },
);

function SectionPlaceholder() {
  return <div className="min-h-[200px] w-full" aria-hidden="true" />;
}

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
        <ContactSection />
      </main>
    </div>
  );
}
