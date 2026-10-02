import { Navigation } from "@/components/navigation/navigation";
import { Hero } from "@/components/hero/hero";
import { TowerJourney } from "@/components/journey/tower-journey";
import { SmoothScroll } from "@/components/animation/smooth-scroll";
import { Footer } from "@/components/buyer/footer";
import { LocationStory } from "@/components/story/location-story";
import { Enquiry } from "@/components/story/enquiry";
import {
  ProjectFacts,
  WhySimana,
  AikyamSection,
  ViewSection,
  DeveloperSection,
  AssociatesSection,
  JournalSection,
  FAQSection,
  PresentationSection,
} from "@/components/buyer/sections";
import { ResidenceCollection } from "@/components/residences/residence-collection";
import { ResidenceGallery } from "@/components/buyer/residence-gallery";
import { AmenitiesStory } from "@/components/story/amenities-story";
import { MobileActions } from "@/components/buyer/mobile-actions";
import { siteUrl, address } from "@/data/buyer-content";
import { project } from "@/data/project";
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "Simāna by Bhoomi Group",
            url: siteUrl,
            description:
              "A three-tower residential development in Lalbaug, Parel, Mumbai, by Bhoomi Group, with Purnata residences and the Aikyam clubhouse.",
            address: {
              "@type": "PostalAddress",
              streetAddress: address.street,
              addressLocality: "Lalbaug, Parel, Mumbai",
              addressRegion: address.region,
              postalCode: address.postalCode,
              addressCountry: "IN",
            },
            telephone: project.contact.phone,
            image: `${siteUrl}/images/simana/native-v3/tower.webp`,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <SmoothScroll />
      <Navigation />
      <main id="main">
        <Hero />
        <ProjectFacts />
        <TowerJourney />
        <WhySimana />
        <ResidenceCollection />
        <ResidenceGallery />
        <AikyamSection />
        <AmenitiesStory />
        <ViewSection />
        <LocationStory />
        <DeveloperSection />
        <AssociatesSection />
        <JournalSection />
        <FAQSection />
        <PresentationSection />
        <Enquiry enabled={Boolean(process.env.LEAD_WEBHOOK_URL)} />
      </main>
      <Footer />
      <MobileActions />
    </>
  );
}
