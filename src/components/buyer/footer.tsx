import Image from "next/image";
import Link from "next/link";
import { project } from "@/data/project";
import { navigation } from "@/data/navigation";
import { brochure, registrations } from "@/data/buyer-content";
export function Footer() {
  return (
    <footer className="buyer-footer page-gutter" data-nav-theme="light">
      <div className="buyer-footer-top">
        <Link href="/" aria-label="Simāna home">
          <Image
            src="/images/branding/simana-light.svg"
            alt="Simāna — The Urban Oasis"
            width={80}
            height={90}
            unoptimized
          />
        </Link>
        <p>
          An urban oasis.
          <br />
          <em>A Bhoomi Group address.</em>
        </p>
        <Link href="/about-bhoomi" aria-label="Bhoomi Group">
          <Image
            src="/images/branding/bhoomi-light.svg"
            alt="Bhoomi Group"
            width={54}
            height={90}
            unoptimized
          />
        </Link>
      </div>
      <div className="buyer-footer-links">
        <nav aria-label="Footer navigation">
          {navigation.map((n) => (
            <Link href={n.href} key={n.label}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
        </nav>
        <div>
          <span className="eyebrow">Resources</span>
          <a href={brochure.href} download>
            Download brochure ↓
          </a>
          <Link href="/residences#residences">Floor plans</Link>
          <Link href="/rera">MahaRERA & registrations</Link>
          <Link href="/about-bhoomi">Bhoomi Group</Link>
        </div>
        <div>
          <span className="eyebrow">A personal introduction</span>
          <a href={project.contact.phoneHref}>{project.contact.phone}</a>
          <a href={`mailto:${project.contact.email}`}>
            {project.contact.email}
          </a>
          <a href={project.contact.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp ↗
          </a>
          <a href={project.contact.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </div>
      </div>
      <div className="footer-registrations">
        <span className="eyebrow">MahaRERA</span>
        {registrations.map((r) => (
          <a key={r.number} href={r.href} target="_blank" rel="noreferrer">
            {r.wing} — {r.number}
          </a>
        ))}
        <small>
          <Link href="/rera">View MahaRERA records</Link>
        </small>
      </div>
      <p className="footer-disclaimer">
        {project.disclaimer} Actual photographs, rendered images and
        illustrations are labelled. Views vary by residence. Published plans do
        not confirm current availability.
      </p>
      <div className="footer-legal">
        <span>Simāna by Bhoomi Group · Lalbaug, Mumbai</span>
        <Link href="/privacy">Privacy policy</Link>
        <Link href="/disclaimer">Disclaimer & terms</Link>
      </div>
    </footer>
  );
}
