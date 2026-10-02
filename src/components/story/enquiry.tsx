"use client";
import Link from "next/link";
import { Suspense, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { project } from "@/data/project";
import { enquiryTypes } from "@/data/buyer-content";
import { getLeadErrors, validateLead, type LeadErrors } from "@/lib/enquiry";
export function Enquiry({ enabled = false }: { enabled?: boolean }) {
  return (
    <Suspense
      fallback={
        <section id="contact" className="enquiry-section page-gutter">
          <p>Contact Simāna: {project.contact.phone}</p>
        </section>
      }
    >
      <EnquiryForm enabled={enabled} />
    </Suspense>
  );
}
function EnquiryForm({ enabled }: { enabled: boolean }) {
  const query = useSearchParams();
  const [configuration, setConfiguration] = useState(
      (query.get("configuration") || "").slice(0, 100),
    ),
    [enquiryType, setEnquiryType] = useState<string>(() => {
      const t = query.get("type");
      return t && (enquiryTypes as readonly string[]).includes(t)
        ? t
        : "General Enquiry";
    });
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
      "idle",
    ),
    [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LeadErrors>({});
  const sending = useRef(false);
  function fieldError(name: keyof LeadErrors) {
    return fieldErrors[name] ? <span id={`enquiry-${name}-error`} className="field-error">{fieldErrors[name]}</span> : null;
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || state === "success") return;
    const form = event.currentTarget,
      data = new FormData(form);
    const raw = {
      ...Object.fromEntries(data),
      consent: data.get("consent") === "on",
    };
    const errors = getLeadErrors(raw);
    setFieldErrors(errors);
    const lead = validateLead(raw);
    if (!lead) {
      setError("Please check the highlighted fields.");
      const invalid = Object.keys(errors)[0];
      if (invalid) (form.elements.namedItem(invalid) as HTMLElement | null)?.focus();
      setState("error");
      return;
    }
    if (!enabled) return;
    sending.current = true;
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok)
        throw new Error(result.error || "We could not confirm your enquiry.");
      setState("success");
      form.reset();
      setConfiguration("");
    } catch {
      setState("error");
      setError(
        "Something went wrong. Please try again or contact us directly.",
      );
    } finally {
      sending.current = false;
    }
  }
  return (
    <section
      id="contact"
      className="enquiry-section story-section page-gutter"
      data-nav-theme="light"
      aria-labelledby="contact-title"
    >
      <div className="section-line">
        <span className="eyebrow">Your next chapter</span>
        <span className="eyebrow">A personal invitation</span>
      </div>
      <div className="enquiry-grid">
        <div>
          <h2 id="contact-title" tabIndex={-1}>
            Come home <em>to Simāna.</em>
          </h2>
          <p>
            Request residence details, current pricing or a private
            presentation. Let the project team guide your next step.
          </p>
          <a
            className="action-link"
            href={project.contact.appointment}
            target="_blank"
            rel="noreferrer"
          >
            Book a private presentation ↗
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
        <form id="enquiry-form" onSubmit={submit} noValidate onBlur={(event) => {
          const field = event.target;
          if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
          const data = new FormData(event.currentTarget);
          const errors = getLeadErrors({ ...Object.fromEntries(data), consent: data.get("consent") === "on" });
          if (field.name) setFieldErrors((previous) => ({ ...previous, [field.name]: errors[field.name as keyof LeadErrors] }));
        }}>
          <span className="eyebrow">Request residence details</span>
          {!enabled && (
            <p className="form-service-note">
              Online enquiries are not enabled yet. To reach the sales team now,
              please call, WhatsApp or use the official private-presentation
              booking page. This form does not send or store your details.
            </p>
          )}
          <div className="form-fields">
            <label>
              Full name*
              <input
                name="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "enquiry-name-error" : undefined}
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
              />
              {fieldError("name")}
            </label>
            <label>
              Mobile number*
              <input
                name="phone"
                inputMode="tel"
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "enquiry-phone-error" : undefined}
                type="tel"
                autoComplete="tel"
                required
                maxLength={22}
              />
              {fieldError("phone")}
            </label>
            <label>
              Email address*
              <input
                name="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "enquiry-email-error" : undefined}
                type="email"
                autoComplete="email"
                required
                maxLength={150}
              />
              {fieldError("email")}
            </label>
            <label>
              Configuration
              <select
                name="configuration"
                aria-label="Configuration"
                value={configuration}
                onChange={(e) => setConfiguration(e.target.value)}
              >
                <option value="">Not sure</option>
                {["2 BHK", "3 BHK", "3 BHK Smart", "3 BHK Grand", "4 BHK", "5 BHK", "Jodi option"].map(
                  (v) => (
                    <option key={v}>{v}</option>
                  ),
                )}
              </select>
            </label>
            <label>
              Enquiry type
              <select
                name="enquiryType"
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
              >
                {enquiryTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="message-field">
              Message (optional)
              <textarea name="message" rows={3} maxLength={1200} />
            </label>
            <label className="form-honeypot" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="fine-print">
            Configuration preferences are requests, not confirmation of
            availability.
          </p>
          <label className="consent-label">
            <input type="checkbox" name="consent" required aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "enquiry-consent-error" : undefined} />
            <span>
              I agree to be contacted about this enquiry and have read the{" "}
              <Link href="/privacy">privacy policy</Link>.
            </span>
          </label>
          {fieldError("consent")}
          <button
            className="action-link"
            type="submit"
            disabled={!enabled || state === "sending" || state === "success"}
          >
            {!enabled
              ? "Online enquiries coming soon"
              : state === "sending"
                ? "Submitting…"
                : state === "success"
                  ? "Enquiry received"
                  : "Submit Enquiry"}
          </button>
          <div aria-live="polite">
            {state === "success" && (
              <p className="enquiry-ready" role="status">
                Thank you. Your enquiry has been received. Our team will get in
                touch with you shortly.
              </p>
            )}
            {state === "error" && (
              <p className="enquiry-ready" role="alert">
                {error}{" "}
                <a href={project.contact.phoneHref}>Call the team</a>{" or "}
                <a href={project.contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
