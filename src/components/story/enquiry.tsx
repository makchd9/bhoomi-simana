"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { project } from "@/data/project";
export function Enquiry() {
  const [configuration, setConfiguration] = useState("");
  const [draft, setDraft] = useState<string | null>(null);
  useEffect(() => {
    const select = (event: Event) => {
      setConfiguration((event as CustomEvent<string>).detail);
      setDraft(null);
    };
    window.addEventListener("residence:enquire", select);
    return () => window.removeEventListener("residence:enquire", select);
  }, []);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Hello, I would like a private presentation at Simana.\n\nName: ${String(data.get("name")).trim()}\nPhone: ${String(data.get("phone")).trim()}\nEmail: ${String(data.get("email")).trim()}\nPreferred configuration: ${configuration || "Please advise"}\n\n${String(data.get("message")).trim()}`;
    setDraft(
      `mailto:${project.contact.email}?subject=${encodeURIComponent("Simana — private presentation enquiry")}&body=${encodeURIComponent(text)}`,
    );
  }
  return (
    <section
      id="contact"
      className="enquiry-section story-section page-gutter"
      data-nav-theme="light"
      aria-labelledby="contact-title"
    >
      <div className="section-line">
        <span className="eyebrow">08 / Your next chapter</span>
        <span className="eyebrow">A personal invitation</span>
      </div>
      <div className="enquiry-grid">
        <div>
          <h2 id="contact-title" tabIndex={-1}>
            Come home
            <br />
            to <em>Simāna.</em>
          </h2>
          <p>
            Experience the spaces in person. Arrange a private presentation with
            the Simāna team.
          </p>
          <a
            className="action-link"
            href={project.contact.appointment}
            target="_blank"
            rel="noreferrer"
          >
            Book a private presentation <ArrowUpRight size={15} />
          </a>
          <div className="contact-direct">
            <a href={project.contact.phoneHref}>{project.contact.phone}</a>
            <a href={`mailto:${project.contact.email}`}>
              {project.contact.email}
            </a>
            <a href={project.contact.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp enquiry ↗
            </a>
          </div>
        </div>
        <form onSubmit={prepare} onChange={() => setDraft(null)}>
          <span className="eyebrow">Request more information</span>
          <div className="form-fields">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="[+0-9 ()-]{7,22}"
                title="Enter a phone number with 7–22 digits, spaces, brackets or a + sign."
                maxLength={22}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={150}
              />
            </label>
            <label>
              Preferred configuration
              <input
                name="configuration"
                value={configuration}
                maxLength={100}
                placeholder="Your preference, if known"
                onChange={(event) => setConfiguration(event.target.value)}
              />
            </label>
            <label className="message-field">
              Message
              <textarea name="message" rows={3} maxLength={1200} />
            </label>
          </div>
          <p className="fine-print">
            Prepare an email enquiry below. Nothing is stored or sent by this
            website; you review and send it in your own email app.
          </p>
          <button className="action-link" type="submit">
            Prepare my enquiry <ArrowUpRight size={15} />
          </button>
          {draft && (
            <div className="enquiry-ready" role="status">
              <p>Your enquiry is ready to review in your email app.</p>
              <a href={draft} className="action-link">
                Open email draft <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
