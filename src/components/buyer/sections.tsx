import Image from "next/image";
import Link from "next/link";
import {
  facts,
  brochureFeatures,
  differentiators,
  brochure,
  developer,
  verifiedAssociates,
  journal,
  faqs,
  currentOffering,
  registrations,
  registrationNotice,
  mahareraUrl,
} from "@/data/buyer-content";
import { project } from "@/data/project";
import { media } from "@/data/source-media";
import { EditorialImage } from "@/components/media/editorial-image";
import { journey } from "@/data/journey";

export function ProjectFacts() {
  return (
    <section
      id="project"
      className="buyer-section project-facts page-gutter"
      data-nav-theme="dark"
      aria-labelledby="facts-title"
    >
      <div className="section-line">
        <span className="eyebrow">Simāna at a glance</span>
        <span className="eyebrow">Lalbaug / Parel</span>
      </div>
      <div className="section-heading">
        <h2 id="facts-title">
          The city outside. <em>A world within.</em>
        </h2>
        <p>
          Three residential towers by Bhoomi Group, brought together by landscape and
          shared spaces. Discover Purnata, the residential offering, and Aikyam,
          the social heart of Simāna.
        </p>
      </div>
      <dl className="buyer-statistics">
        {facts.map((f) => (
          <div key={f.label}>
            <dd>{f.value}</dd>
            <dt>{f.label}</dt>
          </div>
        ))}
      </dl>
      <div className="facts-notes">
        <span>Strategic bylane address</span>
        <span>Aikyam signature clubhouse</span>
        <span>German Formliner Technology</span>
        <span>5 entry & exit gates</span>
        {brochureFeatures.map((feature) => (
          <span key={feature.label} title={feature.detail}>{feature.label}</span>
        ))}
      </div>
      <div className="section-tail">
        <p className="fine-print">
          Published project and brochure highlights. City and sea views vary by
          tower, floor and orientation. Parking allocation is subject to the
          applicable sale documents.
        </p>
        <a href="#main-tower" className="action-link">
          Enter the experience <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
export function WhySimana() {
  return (
    <section
      id="why-simana"
      className="buyer-section page-gutter why-simana"
      data-nav-theme="dark"
    >
      <div className="section-line">
        <span className="eyebrow">Why Simāna</span>
        <span className="eyebrow">An address with intention</span>
      </div>
      <div className="buyer-editorial-grid">
        <div className="buyer-sticky">
          <h2>
            More than <em>a place to live.</em>
          </h2>
          <p>
            What makes a home extends beyond its walls. The setting, the shared
            spaces and the small decisions in its planning all shape daily life.
          </p>
        </div>
        <div className="reason-list">
          {differentiators.map((d, i) => (
            <details key={d.title} open={i === 0}>
              <summary>
                <span className="eyebrow">0{i + 1}</span>
                {d.title}
                <span className="detail-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{d.detail}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PurnataIntroduction() {
  return (
    <div className="offering-note">
      <div>
        <span className="eyebrow">Purnata at Simāna / Current offering</span>
        <h3>
          A home that <em>understands space.</em>
        </h3>
      </div>
      <div>
        <p>{currentOffering.description}</p>
        <div className="inline-actions">
          <Link
            href="/contact?type=Check%20Availability"
            className="action-link"
          >
            Request current availability ↗
          </Link>
          <a href={brochure.href} download className="action-link">
            Download brochure ↓
          </a>
        </div>
      </div>
    </div>
  );
}
export function AikyamSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <section
      id="aikyam"
      className="buyer-section aikyam-section"
      data-nav-theme="dark"
    >
      <div className="page-gutter section-heading">
        <div>
          <span className="eyebrow">Aikyam / The clubhouse at Simāna</span>
          <h2>
            The pleasure <em>of belonging.</em>
          </h2>
        </div>
        <div>
          <p>
            A place for movement, recreation and shared occasions. Aikyam brings
            the community together, from a morning workout to an evening
            celebration.
          </p>
          <Link href="/#clubhouse" className="action-link">
            Enter the clubhouse walkthrough ↗
          </Link>
        </div>
      </div>
      <div className="aikyam-image">
        <EditorialImage
          asset={journey.find((s) => s.id === "clubhouse")!.image}
          label="Aikyam clubhouse"
          aspectRatio="16 / 9"
          sizes="100vw"
          quality={95}
        />
      </div>
      <div className="page-gutter aikyam-facilities">
        <span className="eyebrow">Inside Aikyam</span>
        <ul>
          {[
            "Gymnasium",
            "Yoga room",
            "Double-height squash court",
            "Banquet hall",
            "Indoor games",
            "Private dining",
          ].map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        {!detailed && (
          <Link className="action-link" href="/aikyam">
            Discover Aikyam ↗
          </Link>
        )}
      </div>
    </section>
  );
}
export function ViewSection() {
  return (
    <section
      id="the-view"
      className="buyer-section view-section page-gutter"
      data-nav-theme="dark"
    >
      <div>
        <span className="eyebrow">The view</span>
        <h2>
          Mumbai, <em>from another perspective.</em>
        </h2>
        <p>
          The city changes with the light. This view is published by the project
          as an actual image; the outlook from each home depends on its tower,
          floor and orientation.
        </p>
        <p className="fine-print">
          A sea or harbour view is not promised for every residence. Ask to see
          the outlook from your selected home.
        </p>
      </div>
      <figure>
        <Image
          src={media.view.src}
          alt={media.view.alt}
          width={654}
          height={553}
          sizes="(max-width:767px) 90vw, 45vw"
          unoptimized
        />
        <figcaption>Actual image · View published by Simāna</figcaption>
      </figure>
    </section>
  );
}
export function DeveloperSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <section
      id="bhoomi"
      className="buyer-section developer-legacy page-gutter"
      data-nav-theme="light"
    >
      <div className="section-line">
        <span className="eyebrow">Bhoomi Group</span>
        <span className="eyebrow">The developer behind Simāna</span>
      </div>
      <div className="buyer-editorial-grid">
        <div>
          <span className="legacy-year">
            Since <strong>{developer.since}</strong>
          </span>
          <h2>
            A legacy <em>behind your home.</em>
          </h2>
        </div>
        <div>
          <p>{developer.description}</p>
          <ul className="quiet-list">
            {developer.principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link
            className="action-link"
            href={detailed ? developer.source : "/about-bhoomi"}
            {...(detailed ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {detailed ? "Visit Bhoomi Group" : "The Bhoomi story"} ↗
          </Link>
        </div>
      </div>
      {developer.statistics.approved && (
        <div className="legacy-proof">
          <dl className="buyer-statistics">
            {developer.statistics.items.map((stat) => (
              <div key={stat.label}><dd>{stat.value}</dd><dt>{stat.label}</dt></div>
            ))}
          </dl>
          <p className="eyebrow">{developer.statistics.locations}</p>
        </div>
      )}
      <div className="legacy-projects">
        <span className="eyebrow">Selected Bhoomi projects</span>
        <div>
          {developer.projects.map((p) => (
            <a
              href="https://bhoomi-group.com/"
              target="_blank"
              rel="noreferrer"
              key={p.name}
            >
              <h3>{p.name}</h3>
              <span>{p.location}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AssociatesSection() {
  return (
    <section
      className="buyer-section associates-section page-gutter"
      data-nav-theme="dark"
    >
      <div className="section-heading">
        <h2>
          The minds <em>behind Simāna.</em>
        </h2>
        <p>
          Architecture, construction and structural engineering brought together
          around one development.
        </p>
      </div>
      <div className="associate-list">
        {verifiedAssociates.map((a) => (
          <div key={a.name}>
            <Image
              src={`/images/simana/${a.logo}`}
              alt={a.name}
              width={180}
              height={100}
              sizes="180px"
            />
            <span className="eyebrow">{a.role}</span>
            <h3>{a.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
export function JournalSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <section
      id="journal"
      className="buyer-section journal-section page-gutter"
      data-nav-theme="dark"
    >
      <div className="section-line">
        <span className="eyebrow">From the journal</span>
        <span className="eyebrow">Media spotlight</span>
      </div>
      <div className="journal-feature">
        <span className="journal-publication">{journal.publisher}</span>
        <div>
          <h2>{journal.title}</h2>
          <p>{journal.description}</p>
          <a
            className="action-link"
            href={journal.href}
            target="_blank"
            rel="noreferrer"
          >
            Read the GoodHomes feature ↗
          </a>
        </div>
      </div>
      {!detailed && (
        <Link href="/blog" className="action-link">
          Visit the journal ↗
        </Link>
      )}
    </section>
  );
}
export function FAQSection() {
  return (
    <section
      id="questions"
      className="buyer-section faq-section page-gutter"
      data-nav-theme="dark"
    >
      <div className="buyer-editorial-grid">
        <div>
          <span className="eyebrow">A little more clarity</span>
          <h2>
            Before you <em>make it home.</em>
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span className="detail-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PresentationSection() {
  return (
    <section
      id="presentation"
      className="buyer-section presentation-section page-gutter"
      data-nav-theme="dark"
    >
      <span className="eyebrow">Your next step</span>
      <h2>
        First, the details. <em>Then, the feeling.</em>
      </h2>
      <p>
        Keep the Purnata brochure for a closer look, or experience Simāna in
        person with a private presentation.
      </p>
      <div className="inline-actions">
        <a href={brochure.href} download className="action-link">
          Download brochure ↓
        </a>
        <a
          href={project.contact.appointment}
          target="_blank"
          rel="noreferrer"
          className="action-link"
        >
          Book a private presentation ↗
        </a>
        <Link href="/contact?type=Book%20Site%20Visit" className="action-link">
          Schedule a site visit ↗
        </Link>
      </div>
      <p className="fine-print">
        {brochure.label} · {brochure.date}. Specifications and availability are
        subject to confirmation.
      </p>
    </section>
  );
}
export function ReraSection() {
  return (
    <section
      className="buyer-section rera-section page-gutter"
      data-nav-theme="dark"
    >
      <span className="eyebrow">Project registrations</span>
      <h2>MahaRERA</h2>
      <p>{registrationNotice}</p>
      <div className="rera-list">
        {registrations.map((r) => (
          <div key={r.number}>
            <span className="eyebrow">{r.wing}</span>
            <Image
              src={r.qr}
              width={160}
              height={160}
              alt={`Original ${r.wing} MahaRERA QR code for registration ${r.number}`}
              unoptimized
            />
            <h3>{r.number}</h3>
            <a
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="action-link"
            >
              View on MahaRERA
            </a>
          </div>
        ))}
      </div>
      <p className="fine-print">
        Scan a QR code to view MahaRERA details, or follow the corresponding
        official record link.
      </p>
      <a
        href={mahareraUrl}
        target="_blank"
        rel="noreferrer"
        className="action-link"
      >
        Visit MahaRERA ↗
      </a>
    </section>
  );
}
