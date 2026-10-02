import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { project, associates, socials } from "@/data/project";
import { media } from "@/data/source-media";
import { interiors } from "@/data/residences";
import { clubhouseGallery } from "@/data/amenities";
import { testimonials, testimonialVideos, press } from "@/data/stories";
import { EditorialImage } from "@/components/media/editorial-image";
import { ImageStory, ProjectFilm } from "./image-story";

export function ProjectHallmarks() {
  return (
    <div className="hallmarks page-gutter" data-nav-theme="dark">
      <div className="hallmark-numbers">
        {project.hallmarks.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="hallmark-details">
        <div>
          <span className="eyebrow">Considered from every angle</span>
          <ProjectFilm />
        </div>
        <ul>
          {project.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function InteriorStory() {
  return (
    <section
      id="interiors"
      className="interiors-section story-section"
      data-nav-theme="light"
      aria-labelledby="interiors-title"
    >
      <div className="page-gutter">
        <div className="section-line">
          <span className="eyebrow">03 / Beyond the threshold</span>
          <span className="eyebrow">Interiors</span>
        </div>
        <div className="section-heading">
          <h2 id="interiors-title">
            Step inside <em>the everyday.</em>
          </h2>
          <p>
            Light-filled rooms. Refined finishes. Spaces that feel personal,
            from the first moment.
          </p>
        </div>
      </div>
      <ImageStory slides={interiors} label="residence interiors" />
    </section>
  );
}
export function LifestyleStory() {
  return (
    <section
      id="lifestyle"
      className="lifestyle-section story-section"
      data-nav-theme="dark"
      aria-labelledby="lifestyle-title"
    >
      <div className="page-gutter">
        <div className="section-line">
          <span className="eyebrow">04 / The art of living</span>
          <span className="eyebrow">Life at Simāna</span>
        </div>
        <div className="lifestyle-heading">
          <span className="eyebrow">Room to breathe. Space to belong.</span>
          <h2 id="lifestyle-title" tabIndex={-1}>
            Life, <em>considered.</em>
          </h2>
        </div>
        <div className="lifestyle-pair">
          <EditorialImage
            asset={media.lifestyle}
            label="Life within Simāna"
            aspectRatio="4 / 5"
            reveal
            parallax
          />
          <div>
            <EditorialImage
              asset={media.hallmark}
              label="Life at a Bhoomi property"
              aspectRatio="4 / 5"
              reveal
            />
            <p>
              In a city that never slows down, discover the pleasure of a more
              composed day. A home, a community, a little more space for
              yourself.
            </p>
          </div>
        </div>
        <div className="clubhouse-intro">
          <span className="eyebrow">Aikyam / The signature clubhouse</span>
          <h3>
            The essence
            <br />
            of <em>togetherness.</em>
          </h3>
          <p>
            Named for unity and harmony, Aikyam is Simāna’s social heart. A
            place for shared occasions, quiet retreat and everyday well-being.
          </p>
        </div>
      </div>
      <EditorialImage
        asset={media.clubhouse}
        label="Aikyam clubhouse"
        aspectRatio="16 / 8"
        sizes="100vw"
        className="clubhouse-hero"
        parallax
      />
      <div className="clubhouse-gallery-label page-gutter">
        <span className="eyebrow">Within Aikyam</span>
        <span className="eyebrow">Actual clubhouse photography</span>
      </div>
      <ImageStory
        label="clubhouse"
        slides={clubhouseGallery.map((image) => ({
          label: "Aikyam",
          title: image.alt.replace("Aikyam ", ""),
          description: "Spaces for wellness, leisure and community living.",
          image,
        }))}
      />
    </section>
  );
}
export function DeveloperStory() {
  return (
    <section
      className="developer-section page-gutter story-section"
      data-nav-theme="dark"
      aria-labelledby="developer-title"
    >
      <div className="section-line">
        <span className="eyebrow">07 / The people behind the place</span>
        <span className="eyebrow">Bhoomi Group</span>
      </div>
      <div className="section-heading">
        <h2 id="developer-title">
          A legacy of <em>creating values.</em>
        </h2>
        <div>
          <p>
            Since 1993, Bhoomi Group has shaped homes and communities across
            Mumbai, Thane and Pune. Thoughtful design, engineering and enduring
            relationships lie at the heart of its work.
          </p>
          <a
            className="action-link"
            href="https://bhoomi-group.com/"
            target="_blank"
            rel="noreferrer"
          >
            Discover Bhoomi Group <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="developer-stats">
        {project.developerStats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="fine-print">
        Bhoomi Group figures as published on Simāna’s website.
      </p>
      <div className="associates">
        <span className="eyebrow">Key associates</span>
        <div className="associates-grid">
          {associates.map((item) => (
            <figure key={item.role}>
              <div>
                <Image
                  src={`/images/simana/${item.logo}`}
                  alt={item.name}
                  fill
                  sizes="(max-width: 600px) 40vw, 15vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <figcaption>{item.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="voices">
        <span className="eyebrow">
          In their words / From the Simāna website
        </span>
        <div>
          {testimonials.map((item) => (
            <blockquote key={item.name}>
              <p>“{item.quote}”</p>
              <cite>{item.name}</cite>
            </blockquote>
          ))}
        </div>
        <details>
          <summary>
            Watch the published customer stories{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="video-links">
            {testimonialVideos.map((id, index) => (
              <a
                key={id}
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Story {String(index + 1).padStart(2, "0")} ↗
              </a>
            ))}
          </div>
        </details>
      </div>
      <a
        className="press-link"
        href={press.href}
        target="_blank"
        rel="noreferrer"
      >
        <span className="eyebrow">In the press / {press.publication}</span>
        <span>{press.title}</span>
        <ArrowUpRight size={24} />
      </a>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer page-gutter" data-nav-theme="light">
      <div className="footer-main">
        <a href="#home" className="footer-wordmark">
          Simāna<span>The Urban Oasis</span>
        </a>
        <div>
          <span className="eyebrow">Bhoomi Group</span>
          <p>Lalbaug, Mumbai</p>
          <a href={project.contact.phoneHref}>{project.contact.phone}</a>
          <a href={project.contact.salesPhoneHref}>
            {project.contact.salesPhone}
          </a>
          <a href={`mailto:${project.contact.email}`}>
            {project.contact.email}
          </a>
        </div>
        <div>
          {socials.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer">
              {name} ↗
            </a>
          ))}
          <a href={project.contact.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp ↗
          </a>
        </div>
        <div>
          <a
            href="https://purnataatbhoomisimana.com/"
            target="_blank"
            rel="noreferrer"
          >
            Purnata ↗
          </a>
          <a href="#residences">Residences</a>
          <a href="#main-tower">The walkthrough</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <p className="fine-print">
        Tower-specific residence plans, availability and registration details are awaiting confirmation.
        Project-film imagery depicts the wider Simāna development.
      </p>
      <details className="legal">
        <summary>
          Project disclaimer <span aria-hidden="true">+</span>
        </summary>
        <p>{project.disclaimer}</p>
      </details>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Simāna by Bhoomi Group</span>
        <a href={project.source} target="_blank" rel="noreferrer">
          Official project website ↗
        </a>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
