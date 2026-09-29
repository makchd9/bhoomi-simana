import { project } from "@/data/project";
import { Navigation } from "@/components/navigation/navigation";
import { Hero } from "@/components/hero/hero";
import { SmoothScroll } from "@/components/animation/smooth-scroll";
import { Footer } from "@/components/story/project-story";
import { TowerOverview } from "@/components/story/tower-overview";
import { LocationStory } from "@/components/story/location-story";
import { Enquiry } from "@/components/story/enquiry";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: project.name,
            url: project.source,
            description:
              "A 58-floor residential tower in Lalbaug, Mumbai, by Bhoomi Properties.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lalbaug, Mumbai",
              addressRegion: "Maharashtra",
              addressCountry: "IN",
            },
            telephone: project.contact.phone,
            image: "https://simanabhoomi.com/images/simana/journey-hd/tower-000-poster.webp",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <SmoothScroll />
      <Navigation />
      <main id="main">
        <Hero />
        <TowerOverview />
        <LocationStory />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
