import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/data/pages";
import { brochure } from "@/data/buyer-content";
import { project } from "@/data/project";
import { Navigation } from "@/components/navigation/navigation";
import { Footer } from "@/components/buyer/footer";
import { MobileActions } from "@/components/buyer/mobile-actions";
import { ResidenceCollection } from "@/components/residences/residence-collection";
import { ResidenceGallery } from "@/components/buyer/residence-gallery";
import {
  AikyamSection,
  ViewSection,
  DeveloperSection,
  AssociatesSection,
  JournalSection,
  FAQSection,
  PresentationSection,
  ReraSection,
} from "@/components/buyer/sections";
import { AmenitiesStory } from "@/components/story/amenities-story";
import { LocationStory } from "@/components/story/location-story";
import { Enquiry } from "@/components/story/enquiry";
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
type Props = { params: Promise<{ section: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const page = pages[section as keyof typeof pages];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${section}` },
    openGraph: {
      title: `${page.title} | Simāna by Bhoomi`,
      description: page.description,
      url: `/${section}`,
      images: [
        {
          url: "/images/simana/native-v3/tower.webp",
          alt: "Simāna architectural visualisation",
        },
      ],
    },
  };
}
export default async function InformationPage({ params }: Props) {
  const { section } = await params;
  const page = pages[section as keyof typeof pages];
  if (!page) notFound();
  return (
    <>
      <Navigation initialTheme="dark" />
      <main id="main" className="information-page">
        <header className="page-introduction page-gutter" data-nav-theme="dark">
          <Link className="eyebrow" href="/">
            Simāna by Bhoomi / {page.title}
          </Link>
          <h1>{page.headline}</h1>
          <p>{page.description}</p>
        </header>
        {(section === "residences" || section === "purnata") && (
          <>
            <ResidenceCollection />
            <ResidenceGallery />
            <ViewSection />
            <PresentationSection />
          </>
        )}
        {section === "amenities" && (
          <>
            <AmenitiesStory />
            <AikyamSection />
            <PresentationSection />
          </>
        )}
        {section === "aikyam" && (
          <>
            <AikyamSection detailed />
            <AmenitiesStory />
            <PresentationSection />
          </>
        )}
        {section === "location" && (
          <>
            <LocationStory />
            <PresentationSection />
          </>
        )}
        {section === "about-bhoomi" && (
          <>
            <DeveloperSection detailed />
            <AssociatesSection />
            <PresentationSection />
          </>
        )}
        {section === "blog" && <JournalSection detailed />}
        {section === "contact" && (
          <>
            <Enquiry enabled={Boolean(process.env.LEAD_WEBHOOK_URL)} />
            <PresentationSection />
            <FAQSection />
          </>
        )}
        {section === "rera" && <ReraSection />}
        {section === "privacy" && (
          <article className="legal-copy page-gutter" data-nav-theme="dark">
            <h2>Enquiries</h2>
            <p>
              {process.env.LEAD_WEBHOOK_URL
                ? "When you submit an enquiry with your consent, the details you provide are sent to the configured sales integration so the team can respond."
                : "Online enquiry delivery is not enabled on this version of the website. Details typed into the form are not sent to a sales system or stored by this website."}{" "}
              We do not use enquiry information for unrelated marketing without
              your consent.
            </p>
            <h2>Direct contact and external services</h2>
            <p>
              Phone, email, WhatsApp and private-presentation links take you to
              your chosen app or the official project website. Those services
              process information under their own policies. Google Maps loads
              only when you choose to open the map; doing so connects to Google
              and may share technical information such as your IP address.
            </p>
            <h2>Downloads and browsing</h2>
            <p>
              Brochures and floor plans are available without a lead form. This
              site does not include advertising pixels or analytics trackers.
              The hosting provider may process ordinary request logs to deliver
              and protect the website.
            </p>
            <h2>Your choices</h2>
            <p>
              To ask about your enquiry, request correction or deletion,
              withdraw contact consent, or clarify retention of information held
              by the sales team, email{" "}
              <a href={`mailto:${project.contact.email}`}>
                {project.contact.email}
              </a>
              . Please do not include financial, identity or other sensitive
              documents in the enquiry form.
            </p>
          </article>
        )}
        {section === "disclaimer" && (
          <article className="legal-copy page-gutter" data-nav-theme="dark">
            <h2>Project information</h2>
            <p>{project.disclaimer}</p>
            <h2>Plans and availability</h2>
            <p>
              Published Simāna plans are project-wide reference layouts. They do
              not establish current availability in Purnata. Carpet area, floor,
              configuration, price, possession, tower registration and all
              contractual specifications must be verified for the selected
              residence.
            </p>
            <h2>Imagery and views</h2>
            <p>
              Actual photographs, rendered images, illustrations and floor plans
              are distinguished through captions and context. The opening
              three-tower composition is an illustration, not a surveyed site
              view. Furnishings, planting, lighting and representative elements
              may be illustrative. Views depend on the tower, floor, orientation
              and surrounding development.
            </p>
            <h2>Source discrepancies</h2>
            <p>
              Project websites differ on A/B wing registration mapping,
              floor-to-floor height and developer totals. Disputed height and
              corporate totals are withheld; the registration page explains the
              mapping discrepancy. No possession date, price or availability is
              asserted without current confirmation.
            </p>
            <h2>Brochure</h2>
            <p>
              The downloadable <a href={brochure.href}>{brochure.label}</a>{" "}
              reproduces the supplied document dated {brochure.date}. It is
              reference material; later approved documents and the Agreement for
              Sale govern the purchase.
            </p>
            <h2>Use of this website</h2>
            <p>
              This website is an informational introduction, not a booking or
              payment service. External links are provided for reference. For
              approved project documents and purchase terms, speak with the
              project team and consult the relevant MahaRERA record.
            </p>
          </article>
        )}
      </main>
      <Footer />
      <MobileActions />
    </>
  );
}
